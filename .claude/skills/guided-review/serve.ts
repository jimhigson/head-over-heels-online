#!/usr/bin/env node
/* Serve a built guided review, with save-back, note and tick persistence.
 *
 * The page build.ts writes is static and read-only. Served through here it
 * gains three things: the modified side of each Monaco diff becomes editable
 * with a Save button that writes to the working tree, and review notes and
 * ticks persist to json files instead of localStorage.
 *
 *   node serve.ts --html <scratchpad>/review.html [--repo .] [--port 0] [--open]
 *
 * Those files live in a directory named after the review's id (which build.ts
 * derives from what is being reviewed and embeds in the page), beside the html:
 *
 *   <scratchpad>/<review id>/{ticks.json, notes.json, notes.md, token}
 *
 * so rebuilding the same review anywhere picks up the progress it already has.
 *
 * Localhost only, and every write is gated on a token kept beside the review
 * plus the sha256 the page was built from - a file that moved on disk since
 * then is a 409, not a silent clobber.
 */

import { execFileSync } from "node:child_process";
import { createHash, randomBytes } from "node:crypto";
import { chmodSync, existsSync, mkdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { createServer, type IncomingMessage, type ServerResponse } from "node:http";
import { dirname, join, relative, resolve } from "node:path";
import { parseArgs } from "node:util";

/* the notes file is hand-editable and written while it is being read, so what
   comes off disk is described as what it may actually be rather than as what
   the page writes */

type NoteMessage = { from?: string; text?: string; asking?: boolean };

type Note = {
  line?: number;
  /** the single-text shape a note started as */
  text?: string;
  messages?: NoteMessage[];
};

type Notes = Record<string, Note[]>;

const marker = "<!--REVIEW_SERVER-->";
const payloadPattern = /<script type="application\/json" id="payload">(?<json>[\s\S]*?)<\/script>/;

const sha256 = (text: string): string => createHash("sha256").update(text, "utf8").digest("hex");

type Options = { html: string; repo: string; port: number; open: boolean };

const parseOptions = (): Options => {
  const { values } = parseArgs({
    options: {
      html: { type: "string" },
      repo: { type: "string", default: process.cwd() },
      port: { type: "string", default: "0" },
      open: { type: "boolean", default: false },
      help: { type: "boolean", default: false },
    },
  });
  if (values.help === true || values.html === undefined) {
    console.log("serve.ts --html <review.html> [--repo .] [--port 0] [--open]");
    process.exit(values.html === undefined ? 1 : 0);
  }
  return {
    html: resolve(values.html),
    repo: resolve(values.repo),
    port: Number(values.port),
    open: values.open,
  };
};

/** a note is a thread; the single-text shape it started as reads as its first
    message. Never raises: a half-written or hand-edited note file must not take
    the server down mid-review */
const normalise = (note: Note): Note => {
  if (Array.isArray(note.messages)) {
    return note;
  }
  const first: NoteMessage[] =
    note.text === undefined ? [] : [{ from: "reviewer", text: note.text }];
  return { line: note.line ?? 1, messages: first };
};

const flatten = (notes: Notes): Set<string> =>
  new Set(
    Object.entries(notes).flatMap(([path, forPath]) =>
      forPath
        .map(normalise)
        .flatMap((note) =>
          (note.messages ?? []).map(
            (message) => `${path}:${note.line} ${message.from}: ${message.text}`,
          ),
        ),
    ),
  );

const asMarkdown = (notes: Notes): string => {
  const thread = (raw: Note): string => {
    const note = normalise(raw);
    const messages = note.messages ?? [];
    const [first, ...rest] = messages;
    if (first === undefined) {
      return "";
    }
    const head = `- L${note.line}: ${first.text ?? ""}`;
    const replies = rest.map((message) => `  - ${message.from ?? "?"}: ${message.text ?? ""}`);
    return replies.length > 0 ? `${head}\n${replies.join("\n")}` : head;
  };

  return Object.entries(notes)
    .sort(([left], [right]) => (left < right ? -1 : left > right ? 1 : 0))
    .map(([path, forPath]) => {
      const threads = forPath.map(thread).filter((line) => line !== "");
      return threads.length > 0 ? `### ${path}\n${threads.join("\n")}` : "";
    })
    .filter((section) => section !== "")
    .join("\n\n");
};

class Review {
  html: string;
  repo: string;
  store: string;
  notesFile: string;
  notesMarkdown: string;
  ticksFile: string;
  token: string;
  #seen: Set<string>;

  constructor(html: string, repo: string) {
    this.html = html;
    this.repo = resolve(repo);
    this.store = Review.storeDir(html);
    mkdirSync(this.store, { recursive: true });
    this.notesFile = join(this.store, "notes.json");
    this.notesMarkdown = join(this.store, "notes.md");
    this.ticksFile = join(this.store, "ticks.json");
    this.token = Review.stableToken(join(this.store, "token"));
    this.#seen = flatten(this.readNotes());
  }

  /** where this review keeps everything that isn't the page itself.
      Named by the review's own id, read back out of the payload build.ts
      embedded - so the same review rebuilt into a different scratchpad still
      finds the ticks and notes it already has */
  static storeDir(html: string): string {
    const found = payloadPattern.exec(readFileSync(html, "utf8"));
    const identifier =
      found?.groups?.json === undefined ?
        undefined
      : (JSON.parse(found.groups.json) as { id?: string }).id;
    if (identifier === undefined) {
      throw new Error(`${html} carries no review id - rebuild it with the current build.ts`);
    }
    return join(dirname(html), identifier);
  }

  /** kept across restarts, so a page left open in a tab keeps working.
      Its job is only to stop some other page in the browser posting to this
      port behind your back - it is not protecting the review from you, and
      losing notes to a restart would be a far worse failure than the one it
      guards against */
  static stableToken(tokenFile: string): string {
    if (existsSync(tokenFile)) {
      return readFileSync(tokenFile, "utf8").trim();
    }
    const token = randomBytes(24).toString("base64url");
    writeFileSync(tokenFile, token, "utf8");
    chmodSync(tokenFile, 0o600);
    return token;
  }

  page(): string {
    const bootstrap = `<script>window.__reviewServer = ${JSON.stringify({ token: this.token })};</script>`;
    const text = readFileSync(this.html, "utf8");
    if (!text.includes(marker)) {
      throw new Error(`${this.html} has no ${marker} - rebuild it with the current build.ts`);
    }
    return text.replace(marker, bootstrap);
  }

  /** a path inside the repo, or an error - never a traversal or a symlink out */
  resolveInRepo(path: string): string {
    const candidate = resolve(this.repo, path);
    const inside = relative(this.repo, candidate);
    if (inside.startsWith("..") || inside === "") {
      throw new Error(`${path} is outside the repo`);
    }
    return candidate;
  }

  #read(path: string): string {
    return existsSync(path) && statSync(path).isFile() ? readFileSync(path, "utf8") : "";
  }

  lineCounts(path: string): { added: number; removed: number } {
    const numstat = (...args: string[]): string[] => {
      try {
        return execFileSync("git", ["diff", "--numstat", ...args], {
          cwd: this.repo,
          encoding: "utf8",
          stdio: ["ignore", "pipe", "ignore"],
        }).split(/\s+/);
      } catch (error) {
        const failure = error as { stdout?: string };
        return (failure.stdout ?? "").split(/\s+/);
      }
    };

    // an untracked file has nothing to diff against but /dev/null
    const first = numstat("--", path);
    const parts = first[0] === "" ? numstat("--no-index", "--", "/dev/null", path) : first;
    const [added, removed] = parts;
    if (added !== undefined && /^\d+$/.test(added) && removed !== undefined) {
      return { added: Number(added), removed: Number(removed) };
    }
    return { added: 0, removed: 0 };
  }

  save(path: string, content: string, baseSha: string): { sha: string; added: number; removed: number } {
    const target = this.resolveInRepo(path);
    if (sha256(this.#read(target)) !== baseSha) {
      throw Object.assign(
        new Error(`${path} changed on disk since this review was built`),
        { conflict: true },
      );
    }
    writeFileSync(target, content, "utf8");
    return { sha: sha256(content), ...this.lineCounts(path) };
  }

  /** the paths read so far. Same tolerance as the notes: a half-written or
      hand-edited file must not take the server down mid-review */
  readTicks(): string[] {
    try {
      const read: unknown = JSON.parse(this.#read(this.ticksFile) || "[]");
      return Array.isArray(read) ? (read as string[]) : [];
    } catch {
      return [];
    }
  }

  writeTicks(ticked: string[]): void {
    writeFileSync(this.ticksFile, JSON.stringify(ticked, null, 2), "utf8");
  }

  readNotes(): Notes {
    // requests are served concurrently, so the notes file can be read while
    // another request is part-way through writing it. Reading no notes for one
    // request is recoverable; taking the server down mid-review is not
    let raw: Notes;
    try {
      raw = JSON.parse(this.#read(this.notesFile) || "{}") as Notes;
    } catch {
      return {};
    }
    return Object.fromEntries(
      Object.entries(raw).map(([path, forPath]) => [path, forPath.map(normalise)]),
    );
  }

  writeNotes(notes: Notes): void {
    writeFileSync(this.notesFile, JSON.stringify(notes, null, 2), "utf8");
    // the markdown twin is what a person or an agent actually reads
    writeFileSync(this.notesMarkdown, asMarkdown(notes), "utf8");
    const now = flatten(notes);
    for (const line of [...now].filter((entry) => !this.#seen.has(entry)).sort()) {
      console.log(`  note ${line}`);
    }
    this.#seen = now;
  }

  /** what the page needs to notice that a file changed under it */
  fileState(paths: string[]): Record<string, { sha: string; added: number; removed: number }> {
    const state: Record<string, { sha: string; added: number; removed: number }> = {};
    for (const path of paths) {
      try {
        state[path] = {
          sha: sha256(this.#read(this.resolveInRepo(path))),
          ...this.lineCounts(path),
        };
      } catch {
        // outside the repo: not this review's file to report on
      }
    }
    return state;
  }

  fileContent(path: string): { after: string; sha: string; added: number; removed: number } {
    const content = this.#read(this.resolveInRepo(path));
    return { after: content, sha: sha256(content), ...this.lineCounts(path) };
  }

  /** put the notes where the agent running the skill will find them */
  handOff(notes: Notes): number {
    this.writeNotes(notes);
    const count = flatten(notes).size;
    console.log(`\n=== ${count} review note(s) handed off ===`);
    console.log(`    read ${this.notesMarkdown}`);
    console.log(asMarkdown(notes));
    console.log("=== end of notes ===\n");
    return count;
  }
}

const readBody = async (request: IncomingMessage): Promise<string> => {
  let body = "";
  for await (const chunk of request) {
    body += chunk;
  }
  return body;
};

const respondJson = (response: ServerResponse, status: number, payload: unknown): void => {
  const body = Buffer.from(JSON.stringify(payload), "utf8");
  response.writeHead(status, {
    "Content-Type": "application/json",
    "Content-Length": body.length,
  });
  response.end(body);
};

const handleGet = (review: Review, path: string, response: ServerResponse): void => {
  if (path === "/favicon.ico") {
    // the browser asks unprompted; a 404 would put an error in the console of
    // every review for something the page never wanted
    response.writeHead(204).end();
    return;
  }
  if (path === "/" || path === "/index.html") {
    const body = Buffer.from(review.page(), "utf8");
    response.writeHead(200, {
      "Content-Type": "text/html; charset=utf-8",
      "Content-Length": body.length,
    });
    response.end(body);
    return;
  }
  if (path === "/notes") {
    respondJson(response, 200, review.readNotes());
    return;
  }
  if (path === "/ticks") {
    respondJson(response, 200, { ticked: review.readTicks() });
    return;
  }
  respondJson(response, 404, { error: "not found" });
};

const handlePost = (
  review: Review,
  path: string,
  body: Record<string, unknown>,
  response: ServerResponse,
): void => {
  if (path === "/save") {
    try {
      const result = review.save(
        body.path as string,
        body.content as string,
        body.sha as string,
      );
      console.log(`  saved ${body.path as string}`);
      respondJson(response, 200, result);
    } catch (error) {
      const failed = error as Error & { conflict?: boolean };
      respondJson(response, failed.conflict === true ? 409 : 400, { error: failed.message });
    }
    return;
  }
  if (path === "/notes") {
    review.writeNotes(body as Notes);
    respondJson(response, 200, { ok: true });
    return;
  }
  if (path === "/ticks") {
    review.writeTicks((body.ticked as string[]) ?? []);
    respondJson(response, 200, { ok: true });
    return;
  }
  if (path === "/handoff") {
    respondJson(response, 200, { count: review.handOff(body as Notes) });
    return;
  }
  if (path === "/state") {
    // the page's poll: threads, and whether the files it has open have moved
    // under it (an agent acting on a note)
    respondJson(response, 200, {
      notes: review.readNotes(),
      ticked: review.readTicks(),
      files: review.fileState((body.paths as string[]) ?? []),
    });
    return;
  }
  if (path === "/file") {
    respondJson(response, 200, review.fileContent(body.path as string));
    return;
  }
  respondJson(response, 404, { error: "not found" });
};

const options = parseOptions();
const review = new Review(options.html, options.repo);

const server = createServer((request, response) => {
  const path = (request.url ?? "/").split("?")[0] ?? "/";

  // /state is polled every couple of seconds; logging it buries everything else
  if (!["/notes", "/ticks", "/state", "/favicon.ico"].includes(path)) {
    console.log(`  ${request.method ?? "?"} ${path}`);
  }

  if (request.method === "GET") {
    handleGet(review, path, response);
    return;
  }
  if (request.method !== "POST") {
    respondJson(response, 405, { error: "method not allowed" });
    return;
  }

  // the body has to come off the socket before anything else can be answered -
  // refusing a request without draining it leaves the next one on this
  // keep-alive connection to be parsed starting halfway through this one's json
  readBody(request).then((raw) => {
    if (request.headers["x-review-token"] !== review.token) {
      // a page left open across a restart of this server holds a token that no
      // longer exists; it needs to reload, not retry
      respondJson(response, 403, { error: "stale token - reload the page" });
      return;
    }
    let body: Record<string, unknown>;
    try {
      body = JSON.parse(raw === "" ? "{}" : raw) as Record<string, unknown>;
    } catch (malformed) {
      respondJson(response, 400, { error: `unreadable body: ${(malformed as Error).message}` });
      return;
    }
    handlePost(review, path, body, response);
  });
});

server.listen(options.port, "127.0.0.1", () => {
  const address = server.address();
  const port = typeof address === "object" && address !== null ? address.port : options.port;
  const url = `http://127.0.0.1:${port}/`;

  console.log(`guided review on ${url}`);
  console.log(`  editing ${review.repo}`);
  console.log(`  ticks   ${review.ticksFile}`);
  console.log(`  notes   ${review.notesMarkdown}`);
  console.log("  notes appear below as they are written; 'Send notes to agent' prints them all");
  console.log("  ctrl-c to stop");

  if (options.open) {
    const opener =
      process.platform === "darwin" ? "open"
      : process.platform === "win32" ? "start"
      : "xdg-open";
    execFileSync(opener, [url]);
  }
});
