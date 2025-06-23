import path from "node:path";
import type { PluginOption } from "vite";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { visualizer } from "rollup-plugin-visualizer";

/**
 * vite config specific to the level editor, which is a separately
 * built and deployed web-app. Otherwise, the PWA for the main game
 * gets too large because monaco (used for json editong) is very big.
 *
 * This would be better as a monorepo, not a kludged dual-vite build
 * in a single package, but for now I'm not doing the work to split them
 * out
 */
// https://vitejs.dev/config/
export default defineConfig({
  /* the path the editor is served from after being built */
  base: "/editor/",

  plugins: [
    react({
      // during development, use the same build target as builds - ie,
      // assume a capable browser and avoid unnecessary transpilation
      devTarget: "esnext",
    }),
    visualizer({
      gzipSize: true,
      brotliSize: true,
      template: "treemap",
      filename: "build-stats-editor.html",
    }) as PluginOption,
  ],

  build: {
    target: "esnext",
    outDir: "../../dist/editor/",
  },

  resolve: {
    alias: {
      gfx: path.resolve(__dirname, "./gfx"),
    },
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

  define: {
    __gitHash__: JSON.stringify(process.env.GIT_HASH),
    __buildDate__: JSON.stringify(process.env.BUILD_DATE),
  },
});
