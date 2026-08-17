import { execFile } from "node:child_process";
import { readFileSync } from "node:fs";
import { type IncomingMessage, type ServerResponse } from "node:http";
import { promisify } from "node:util";
import { type Plugin } from "vite";

import { smoothOutputPath } from "../node/buildFont";
import {
  readGlyphOverrides,
  writeGlyphOverrides,
} from "../node/readGlyphOverrides";

const run = promisify(execFile);

const bodyOf = async (request: IncomingMessage): Promise<string> => {
  const chunks: Buffer[] = [];
  for await (const chunk of request) {
    chunks.push(chunk as Buffer);
  }
  return Buffer.concat(chunks).toString("utf8");
};

const sendJson = (response: ServerResponse, status: number, body: unknown) => {
  response.statusCode = status;
  response.setHeader("content-type", "application/json");
  response.end(JSON.stringify(body));
};

/**
 * The editor's own back end, which exists only while its dev server is
 * running: it reads and writes the committed overrides file and runs the font
 * build, so an edit can be taken all the way to the real woff2 without
 * leaving the page. There is no production build of the editor for any of
 * this to reach.
 */
export const glyphOverridesApi = (repoRoot: string): Plugin => ({
  name: "font-editor-api",
  configureServer(server) {
    server.middlewares.use("/__overrides", (request, response, next) => {
      if (request.method === "GET") {
        sendJson(response, 200, readGlyphOverrides());
        return;
      }
      if (request.method !== "PUT") {
        next();
        return;
      }
      bodyOf(request)
        .then(async (body) => {
          await writeGlyphOverrides(JSON.parse(body));
          sendJson(response, 200, { saved: true });
        })
        .catch((e: unknown) => {
          sendJson(response, 400, { error: String(e) });
        });
    });

    server.middlewares.use("/__rebuild", (request, response, next) => {
      if (request.method !== "POST") {
        next();
        return;
      }
      run("pnpm", ["gen:font", "--force"], {
        cwd: repoRoot,
        maxBuffer: 1 << 24,
      })
        // a successful build says what it wrote on stdout; stderr carries
        // only node's own noise, so it is kept back for a failure to explain
        .then(({ stdout }) => {
          sendJson(response, 200, { ok: true, output: stdout });
        })
        .catch((e: unknown) => {
          const failed = e as { stdout?: string; stderr?: string };
          sendJson(response, 200, {
            ok: false,
            output: `${failed.stdout ?? ""}${failed.stderr ?? String(e)}`,
          });
        });
    });

    // the built font, read fresh on every request so a rebuild shows up
    // without restarting the server
    server.middlewares.use("/__smoothFont", (_request, response) => {
      try {
        const font = readFileSync(`${repoRoot}/${smoothOutputPath}`);
        response.setHeader("content-type", "font/woff2");
        response.setHeader("cache-control", "no-store");
        response.end(font);
      } catch {
        response.statusCode = 404;
        response.end();
      }
    });
  },
});
