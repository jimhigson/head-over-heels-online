/* Bundles src/ into the one script and one stylesheet a review page is made of.
 *
 * Nothing is written to disk: the two strings come back for build.ts to inline,
 * because the page has to keep working opened as a file and published as an
 * artifact, and both of those cut it off from anything it would otherwise have
 * fetched. Monaco is the one exception, and it is allowed to fail.
 */

import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { build } from "vite";

const skillDir = dirname(fileURLToPath(import.meta.url));

export type PageBundle = {
  script: string;
  css: string;
};

/** the shape of a built file, whichever bundler vite is driving */
type BuiltFile = {
  type: string;
  fileName: string;
  code?: string;
  source?: string | Uint8Array;
};

const asText = (source: string | Uint8Array | undefined): string =>
  source === undefined ? ""
  : typeof source === "string" ? source
  : new TextDecoder().decode(source);

export const buildPage = async (): Promise<PageBundle> => {
  const result = await build({
    configFile: false,
    logLevel: "warn",
    root: skillDir,
    resolve: {
      // react-resizable-panels is a react library; preact/compat is the react
      // it gets, so that it and the page share one renderer. Hooks and context
      // resolve through state inside preact, so a component built against a
      // second copy would find no renderer and throw
      alias: { react: "preact/compat", "react-dom": "preact/compat" },
    },
    build: {
      write: false,
      minify: true,
      target: "es2022",
      lib: {
        entry: join(skillDir, "src", "main.tsx"),
        formats: ["es"],
        fileName: "review",
      },
    },
  });

  const bundles = Array.isArray(result) ? result : [result];
  const [firstBundle] = bundles;
  if (firstBundle === undefined || !("output" in firstBundle)) {
    throw new Error("bundling the review page produced no output");
  }
  const output = firstBundle.output as unknown as BuiltFile[];

  const scripts = output.filter((part) => part.type === "chunk");
  if (scripts.length !== 1) {
    throw new Error(
      `bundling the review page produced ${scripts.length} scripts - the page can only inline one`,
    );
  }
  const [script] = scripts;
  const stylesheet = output.find(
    (part) => part.type === "asset" && part.fileName.endsWith(".css"),
  );

  const bundle: PageBundle = {
    script: script?.code ?? "",
    css: asText(stylesheet?.source),
  };

  for (const [what, code] of [
    ["script", bundle.script],
    ["stylesheet", bundle.css],
  ] as const) {
    // an inline block ends at the first `</script` or `</style`, wherever in it
    // that text happens to appear
    if (/<\/(script|style)/i.test(code)) {
      throw new Error(`the bundled ${what} contains a closing tag that would end its own block`);
    }
  }

  return bundle;
};
