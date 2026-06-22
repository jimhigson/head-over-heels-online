import preact from "@preact/preset-vite";
import path from "node:path";
import { visualizer } from "rollup-plugin-visualizer";
import { defineConfig, type PluginOption } from "vite";
import glsl from "vite-plugin-glsl";

import { hmrOnlyPreact } from "./hmrOnlyPreact";

/**
 * vite config specific to the level editor, which is a separately
 * built and deployed web-app. Otherwise, the PWA for the main game
 * gets too large because monaco (used for json editong) is very big.
 *
 * This would be better as a monorepo, not a kludged dual-vite build
 * in a single package, but for now I'm not doing the work to split them
 * out
 */
// modes that serve the editor as its own origin (ed.<domain>) rather than the
// /editor/ subpath it occupies when it shares the game's origin on github pages
const ownOriginModes = ["r2-main", "r2-production"];

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const servedFromOwnOrigin = ownOriginModes.includes(mode);

  return {
    /*
     * the path the editor webapp is served from after being built: "/" when it
     * is its own origin, otherwise the /editor/ subpath. An explicit
     * EDITOR_BASE env var still wins if set.
     */
    base: process.env.EDITOR_BASE ?? (servedFromOwnOrigin ? "/" : "/editor/"),

    // Set the root to src/editor since that's where index.html is
    root: path.resolve(__dirname, "src/editor"),

    // don't conflict with the game's vite cache
    cacheDir: path.resolve(__dirname, ".vite/editor"),

    // Use the root public directory for static assets
    publicDir: path.resolve(__dirname, "public"),

    plugins: [
      hmrOnlyPreact(),
      preact({
        devtoolsInProd: false,
        include: [/\.tsx$/],
      }),
      visualizer({
        gzipSize: true,
        brotliSize: true,
        template: "treemap",
        filename: "build-stats-editor.html",
      }) as PluginOption,
      glsl({
        minify: true,
      }),
    ],

    build: {
      // don't inline binaries < 4kb since base64 encoding will make them bigger, and http2 is fine to request them separately
      assetsInlineLimit(filePath: string) {
        if (
          filePath.endsWith(".mp3") ||
          filePath.endsWith(".opus") ||
          filePath.endsWith(".webp") ||
          filePath.endsWith(".woff2")
        ) {
          return false;
        }
        return undefined;
      },

      target: "esnext",
      cssTarget: "esnext", // Don't transpile CSS for modern browsers
      minify: true,
      rolldownOptions: {
        output: {
          minify: {
            compress: {
              target: "esnext",
              treeshake: {
                propertyReadSideEffects: false,
              },
            },
          },
        },
      },
      modulePreload: {
        polyfill: false, // Modern browsers don't need the polyfill
      },
      // its own top-level dir when an independent origin (so the game build's
      // prune never sees editor files), otherwise nested under the game's dist
      outDir:
        process.env.EDITOR_OUT_DIR ??
        (servedFromOwnOrigin ? "../../dist-editor/" : "../../dist/editor/"),
    },

    resolve: {
      alias: {
        gfx: path.resolve(__dirname, "./gfx"),
      },
    },

    optimizeDeps: {
      // Excluding monaco-editor forces all its sub-modules to use native ESM in
      // dev. This guarantees a single shared ILanguageService instance across
      // edcore.main, monaco.contribution, and jsonMode — pre-bundling them as
      // separate entry points causes duplicate instances where language
      // registration is invisible to setTokensProvider.
      exclude: ["monaco-editor"],
    },

    server: {
      // want to test on my iphone
      host: true,
      // want to connect using (computername).local, not just the ip
      allowedHosts: [".local"],
      // consistent port number for this project (not vite default)
      port: 5210,
    },
    preview: {
      port: 5211,
    },
  };
});
