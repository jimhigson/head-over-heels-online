#!/usr/bin/env node
/* Serve a built guided review, with save-back, note and tick persistence.
 *
 * The page build.ts / buildStack.ts writes is static and read-only. Served
 * through here it gains three things: the modified side of each Monaco diff
 * becomes editable with a Save button that writes to the working tree, and
 * review notes and ticks persist to json files instead of localStorage.
 *
 *   node serve.ts --html <scratchpad>/review.html [--repo .] [--port 0] [--open]
 *
 * A page can carry several reviews (a PR stack); each keeps its own files, in
 * a directory named after its review id, beside the html:
 *
 *   <scratchpad>/<review id>/{ticks.json, notes.json, notes.md, token}
 *
 * so rebuilding the same review anywhere picks up the progress it already
 * has. The shell is re-read when the html changes on disk, so a stack review
 * contributed later (rebuild in place) gets its store without a restart.
 *
 * Only the review whose head branch the --repo checkout has on disk may save
 * back - the others' editors are read-only, their notes and ticks still live.
 * Localhost only, and every write is gated on a token kept beside the review
 * plus the sha256 the page was built from - a file that moved on disk since
 * then is a 409, not a silent clobber.
 */

import { execFileSync } from "node:child_process";
import { createHash, randomBytes } from "node:crypto";
import { chmodSync, existsSync, mkdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { createServer, type IncomingMessage, type ServerResponse } from "node:http";
import { dirname, extname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
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

/** the slice of the page's shell this server routes on */
type ShellReview = {
  number: number;
  head?: string;
  reviewId?: string;
};

const marker = "<!--REVIEW_SERVER-->";
const shellPattern = /<script type="application\/json" id="shell">(?<json>[\s\S]*?)<\/script>/;

/* monaco is served from this skill's own install - the page has no other
   source for it, so its absence is a startup failure, not a degraded mode */
const skillDir = dirname(fileURLToPath(import.meta.url));
const monacoDir = join(skillDir, "node_modules", "monaco-editor", "min", "vs");
if (!existsSync(join(monacoDir, "loader.js"))) {
  throw new Error(
    `monaco is not installed at ${monacoDir} - run \`pnpm install --ignore-workspace\` in ${skillDir}`,
  );
}

const monacoMimes: Record<string, string> = {
  ".js": "text/javascript",
  ".css": "text/css",
  ".ttf": "font/ttf",
  ".json": "application/json",
};

const serveMonaco = (path: string, response: ServerResponse): void => {
  const target = join(monacoDir, path.slice("/vs/".length));
  const inside = relative(monacoDir, target);
  if (inside.startsWith("..") || !existsSync(target) || !statSync(target).isFile()) {
    respondJson(response, 404, { error: `no such monaco file: ${path}` });
    return;
  }
  const body = readFileSync(target);
  response.writeHead(200, {
    "Content-Type": monacoMimes[extname(target)] ?? "application/octet-stream",
    "Content-Length": body.length,
    // versioned by the monaco install itself; the browser can keep it
    "Cache-Control": "max-age=86400",
  });
  response.end(body);
};

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

/** one review's persistence: its ticks and notes files, named by its id */
class ReviewStore {
  id: string;
  /** how this review is named in the server's own output */
  label: string;
  notesFile: string;
  notesMarkdown: string;
  ticksFile: string;
  #seen: Set<string>;

  constructor(htmlDir: string, id: string, label: string) {
    this.id = id;
    this.label = label;
    const dir = join(htmlDir, id);
    mkdirSync(dir, { recursive: true });
    this.notesFile = join(dir, "notes.json");
    this.notesMarkdown = join(dir, "notes.md");
    this.ticksFile = join(dir, "ticks.json");
    this.#seen = flatten(this.readNotes());
  }

  static read(path: string): string {
    return existsSync(path) && statSync(path).isFile() ? readFileSync(path, "utf8") : "";
  }

  /** same tolerance as the notes: a half-written or hand-edited file must not
      take the server down mid-review */
  readTicks(): string[] {
    try {
      const read: unknown = JSON.parse(ReviewStore.read(this.ticksFile) || "[]");
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
      raw = JSON.parse(ReviewStore.read(this.notesFile) || "{}") as Notes;
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
      console.log(`  note ${this.label} ${line}`);
    }
    this.#seen = now;
  }

  /** put the notes where the agent running the skill will find them */
  handOff(notes: Notes): number {
    this.writeNotes(notes);
    const count = flatten(notes).size;
    console.log(`\n=== ${count} review note(s) handed off (${this.label}) ===`);
    console.log(`    read ${this.notesMarkdown}`);
    console.log(asMarkdown(notes));
    console.log("=== end of notes ===\n");
    return count;
  }
}

class ReviewPage {
  html: string;
  repo: string;
  token: string;
  #stores = new Map<string, ReviewStore>();
  #shellMtimeMs = -1;
  #reviews: ShellReview[] = [];

  constructor(html: string, repo: string) {
    this.html = html;
    this.repo = resolve(repo);
    this.#refreshShell();
    const [firstStore] = this.#stores.values();
    if (firstStore === undefined) {
      throw new Error(`${html} carries no reviews - rebuild it with the current build.ts`);
    }
    this.token = ReviewPage.stableToken(join(dirname(html), firstStore.id, "token"));
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

  /** the html is rebuilt in place as stack reviews are contributed; the shell
      (and so the store list) follows it without a restart */
  #refreshShell(): void {
    const { mtimeMs } = statSync(this.html);
    if (mtimeMs === this.#shellMtimeMs) {
      return;
    }
    this.#shellMtimeMs = mtimeMs;
    const found = shellPattern.exec(readFileSync(this.html, "utf8"));
    if (found?.groups?.json === undefined) {
      throw new Error(`${this.html} carries no shell - rebuild it with the current build.ts`);
    }
    const shell = JSON.parse(found.groups.json) as { reviews: ShellReview[] };
    this.#reviews = shell.reviews;
    const carried = shell.reviews.filter(
      (review): review is ShellReview & { reviewId: string } => review.reviewId !== undefined,
    );
    const labelled = carried.length > 1;
    for (const review of carried) {
      if (!this.#stores.has(review.reviewId)) {
        this.#stores.set(
          review.reviewId,
          new ReviewStore(dirname(this.html), review.reviewId, labelled ? `#${review.number}` : ""),
        );
      }
    }
  }

  stores(): ReviewStore[] {
    this.#refreshShell();
    return [...this.#stores.values()];
  }

  store(reviewIdParam: null | string): ReviewStore | undefined {
    this.#refreshShell();
    if (reviewIdParam !== null) {
      return this.#stores.get(reviewIdParam);
    }
    // a page built before stacks sends no review param; with one store there
    // is nothing to disambiguate
    const all = [...this.#stores.values()];
    const [only] = all;
    return all.length === 1 ? only : undefined;
  }

  /** the review whose head branch the served checkout has on disk - the only
      one allowed to save back. A single-review page edits the checkout by
      definition (worktree and commit modes have no head to match) */
  editableReviewId(): string | undefined {
    this.#refreshShell();
    const carried = this.#reviews.filter((review) => review.reviewId !== undefined);
    const [only] = carried;
    if (carried.length === 1) {
      return only?.reviewId;
    }
    const checkedOut = execFileSync("git", ["rev-parse", "--abbrev-ref", "HEAD"], {
      cwd: this.repo,
      encoding: "utf8",
    }).trim();
    return carried.find((review) => review.head === checkedOut)?.reviewId;
  }

  page(): string {
    const bootstrap = `<script>window.__reviewServer = ${JSON.stringify({
      token: this.token,
      editableReviewId: this.editableReviewId(),
    })};</script>`;
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
    if (sha256(ReviewStore.read(target)) !== baseSha) {
      throw Object.assign(
        new Error(`${path} changed on disk since this review was built`),
        { conflict: true },
      );
    }
    writeFileSync(target, content, "utf8");
    return { sha: sha256(content), ...this.lineCounts(path) };
  }

  /** what the page needs to notice that a file changed under it */
  fileState(paths: string[]): Record<string, { sha: string; added: number; removed: number }> {
    const state: Record<string, { sha: string; added: number; removed: number }> = {};
    for (const path of paths) {
      try {
        state[path] = {
          sha: sha256(ReviewStore.read(this.resolveInRepo(path))),
          ...this.lineCounts(path),
        };
      } catch {
        // outside the repo: not this review's file to report on
      }
    }
    return state;
  }

  fileContent(path: string): { after: string; sha: string; added: number; removed: number } {
    const content = ReviewStore.read(this.resolveInRepo(path));
    return { after: content, sha: sha256(content), ...this.lineCounts(path) };
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

const handleGet = (
  reviewPage: ReviewPage,
  path: string,
  store: ReviewStore | undefined,
  response: ServerResponse,
): void => {
  if (path === "/favicon.ico") {
    // the browser asks unprompted; a 404 would put an error in the console of
    // every review for something the page never wanted
    response.writeHead(204).end();
    return;
  }
  if (path.startsWith("/vs/")) {
    serveMonaco(path, response);
    return;
  }
  if (path === "/" || path === "/index.html") {
    const body = Buffer.from(reviewPage.page(), "utf8");
    response.writeHead(200, {
      "Content-Type": "text/html; charset=utf-8",
      "Content-Length": body.length,
    });
    response.end(body);
    return;
  }
  if (path === "/notes") {
    if (store === undefined) {
      respondJson(response, 404, { error: "unknown review" });
      return;
    }
    respondJson(response, 200, store.readNotes());
    return;
  }
  if (path === "/ticks") {
    if (store === undefined) {
      respondJson(response, 404, { error: "unknown review" });
      return;
    }
    respondJson(response, 200, { ticked: store.readTicks() });
    return;
  }
  respondJson(response, 404, { error: "not found" });
};

const handlePost = (
  reviewPage: ReviewPage,
  path: string,
  store: ReviewStore | undefined,
  body: Record<string, unknown>,
  response: ServerResponse,
): void => {
  if (store === undefined) {
    respondJson(response, 404, { error: "unknown review" });
    return;
  }
  // writing to the working tree is only for the review whose branch is
  // actually checked out there
  const editable = store.id === reviewPage.editableReviewId();

  if (path === "/save") {
    if (!editable) {
      respondJson(response, 403, {
        error: "this review's branch is not the served checkout - nothing to save into",
      });
      return;
    }
    try {
      const result = reviewPage.save(
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
    store.writeNotes(body as Notes);
    respondJson(response, 200, { ok: true });
    return;
  }
  if (path === "/ticks") {
    store.writeTicks((body.ticked as string[]) ?? []);
    respondJson(response, 200, { ok: true });
    return;
  }
  if (path === "/handoff") {
    respondJson(response, 200, { count: store.handOff(body as Notes) });
    return;
  }
  if (path === "/state") {
    // the page's poll: threads, and whether the files it has open have moved
    // under it (an agent acting on a note) - the latter only for the review
    // the checkout can actually change
    respondJson(response, 200, {
      notes: store.readNotes(),
      ticked: store.readTicks(),
      files: editable ? reviewPage.fileState((body.paths as string[]) ?? []) : {},
    });
    return;
  }
  if (path === "/file") {
    if (!editable) {
      respondJson(response, 403, {
        error: "this review's branch is not the served checkout",
      });
      return;
    }
    respondJson(response, 200, reviewPage.fileContent(body.path as string));
    return;
  }
  respondJson(response, 404, { error: "not found" });
};

const options = parseOptions();
const reviewPage = new ReviewPage(options.html, options.repo);

const server = createServer((request, response) => {
  const url = new URL(request.url ?? "/", "http://localhost");
  const path = url.pathname;
  const store = reviewPage.store(url.searchParams.get("review"));

  // /state is polled every couple of seconds, and monaco is dozens of asset
  // requests; logging them buries everything else
  if (!["/notes", "/ticks", "/state", "/favicon.ico"].includes(path) && !path.startsWith("/vs/")) {
    console.log(`  ${request.method ?? "?"} ${path}`);
  }

  if (request.method === "GET") {
    handleGet(reviewPage, path, store, response);
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
    if (request.headers["x-review-token"] !== reviewPage.token) {
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
    handlePost(reviewPage, path, store, body, response);
  });
});

server.listen(options.port, "127.0.0.1", () => {
  const address = server.address();
  const port = typeof address === "object" && address !== null ? address.port : options.port;
  const url = `http://127.0.0.1:${port}/`;

  console.log(`guided review on ${url}`);
  console.log(`  editing ${reviewPage.repo}`);
  const editableId = reviewPage.editableReviewId();
  for (const store of reviewPage.stores()) {
    const marker2 = store.id === editableId ? " (editable - matches the checkout)" : "";
    console.log(`  ${store.label === "" ? "review" : store.label}  ${store.notesMarkdown}${marker2}`);
  }
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
