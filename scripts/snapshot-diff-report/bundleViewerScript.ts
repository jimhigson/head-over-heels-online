import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { build } from "vite";

const viewerEntryPath = join(
  dirname(fileURLToPath(import.meta.url)),
  "viewer",
  "viewerMain.ts",
);

/**
 * Bundles the viewer's TypeScript sources into a single ES module, returned as
 * a string for the generator to inline in the page it writes. Vite is used in
 * library mode with `write: false`, so nothing is emitted to disk and no
 * bundler beyond the repo's own is needed.
 *
 * The result imports nothing, so it inlines into a `<script type="module">`
 * that makes no network request of any kind - which is what keeps the
 * generated page openable straight off the filesystem, or as a claude.ai
 * artifact, with no loader and no globals leaked to a host page.
 */
export const bundleViewerScript = async (): Promise<string> => {
  const buildResult = await build({
    configFile: false,
    logLevel: "warn",
    root: dirname(viewerEntryPath),
    build: {
      write: false,
      minify: false,
      target: "es2022",
      lib: {
        entry: viewerEntryPath,
        formats: ["es"],
        fileName: "viewer",
      },
    },
  });

  const outputs =
    Array.isArray(buildResult) ? buildResult
    : "output" in buildResult ? [buildResult]
    : [];
  const [firstOutput] = outputs;
  if (firstOutput === undefined) {
    throw new Error("bundling the viewer produced no output");
  }
  const [firstChunk] = firstOutput.output;
  if (firstChunk.type !== "chunk") {
    throw new Error("bundling the viewer produced an asset, not a script");
  }
  if (firstOutput.output.length > 1) {
    throw new Error(
      "bundling the viewer produced more than one file - the page can only inline a single script",
    );
  }
  if (firstChunk.code.includes("</script")) {
    throw new Error(
      "the bundled viewer contains the text '</script', which would end the script block it is inlined into",
    );
  }
  return firstChunk.code;
};
