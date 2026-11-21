import { registerHooks } from "node:module";
import { fileURLToPath } from "node:url";

const assetUrlPattern = /\.webp$/;

/**
 * lets node import modules written for vite, like they are in vite
 *
 * - an image's default export is its path
 * - a macro import (`with { type: "macro" }`) is an ordinary import, so
 *   its functions run when called rather than at build time
 *
 * Pass to tsx like:
 *    --import ./scripts/registerAssetImportHooks.ts`
 */
registerHooks({
  resolve(specifier, context, nextResolve) {
    // absent for a require(), despite node's types
    if (context.importAttributes?.type !== "macro") {
      return nextResolve(specifier, context);
    }
    const importAttributes = { ...context.importAttributes };
    delete importAttributes.type;
    return {
      ...nextResolve(specifier, { ...context, importAttributes }),
      importAttributes,
    };
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
