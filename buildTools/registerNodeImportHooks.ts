import { registerHooks, type ResolveFnOutput } from "node:module";
import { fileURLToPath } from "node:url";

const assetUrlPattern = /\.webp$/;

/**
 * a relative or absolute path with no extension of its own, as vite (and
 * typescript) resolve but node does not
 */
const extensionlessPathPattern = /^\.{0,2}\/(?:.*\/)?[^./]+$/;

/**
 * what an extensionless path is tried as, in order
 */
const extensionlessPathSuffixes = [".ts", ".tsx", "/index.ts"];

const isModuleNotFound = (e: unknown): boolean =>
  e instanceof Error &&
  "code" in e &&
  (e.code === "ERR_MODULE_NOT_FOUND" ||
    e.code === "ERR_UNSUPPORTED_DIR_IMPORT");

/**
 * Lets node run the repo's typescript - scripts, and the app code they import
 * - as vite does:
 *
 * - an extensionless import is found as a `.ts`/`.tsx` file, or a
 *   directory's `index.ts`
 * - json is imported without needing `with { type: "json" }`
 * - an image's default export is its path
 * - a macro import (`with { type: "macro" }`) is an ordinary import, so
 *   its functions run when called rather than at build time
 *
 * Load it before anything else, with
 * `node --import ./buildTools/registerNodeImportHooks.ts` - the shebang every
 * runnable script starts with
 */
registerHooks({
  resolve(specifier, context, nextResolve): ResolveFnOutput {
    // absent for a require(), despite node's types
    const importAttributes = { ...context.importAttributes };
    if (importAttributes.type === "macro") {
      delete importAttributes.type;
    }
    const resolveAs = (asSpecifier: string): ResolveFnOutput => {
      const resolved = nextResolve(asSpecifier, {
        ...context,
        importAttributes,
      });
      return resolved.url.endsWith(".json") ?
          {
            ...resolved,
            importAttributes: { ...importAttributes, type: "json" },
          }
        : { ...resolved, importAttributes };
    };
    try {
      return resolveAs(specifier);
    } catch (e) {
      if (!isModuleNotFound(e) || !extensionlessPathPattern.test(specifier)) {
        throw e;
      }
      for (const suffix of extensionlessPathSuffixes) {
        try {
          return resolveAs(specifier + suffix);
        } catch (suffixError) {
          if (!isModuleNotFound(suffixError)) {
            throw suffixError;
          }
        }
      }
      throw e;
    }
  },
  load(url, context, nextLoad) {
    if (!assetUrlPattern.test(url)) {
      return nextLoad(url, context);
    }
    return {
      format: "module",
      source: `export default ${JSON.stringify(fileURLToPath(url))};`,
      shortCircuit: true,
    };
  },
});
