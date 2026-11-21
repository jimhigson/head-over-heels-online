import { unrunRunner } from "unplugin-macros";

const assetIdPattern = /\.webp$/;

/**
 * runs build-time macros. Their imports are bundled outside vite, so images
 * (eg the spritesheet metas' art) import as their path, which is all a macro
 * can use them for
 */
export const macroRunner = () =>
  unrunRunner({
    inputOptions: {
      plugins: [
        {
          name: "macro-asset-imports",
          load(id) {
            if (!assetIdPattern.test(id)) {
              return null;
            }
            return `export default ${JSON.stringify(id)};`;
          },
        },
      ],
    },
  });
