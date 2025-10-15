import type { PluginOption } from "vite";

import react from "@vitejs/plugin-react-swc";
import path from "node:path";
import { visualizer } from "rollup-plugin-visualizer";
import { defineConfig } from "vite";

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
  /* the path the editor webapp is served from after being built */
  base: "/editor/",

  // Set the root to src/editor since that's where index.html is
  root: path.resolve(__dirname, "src/editor"),

  // don't conflict with the game's vite cache
  cacheDir: path.resolve(__dirname, ".vite/editor"),

  // Use the root public directory for static assets
  publicDir: path.resolve(__dirname, "public"),

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
    cssTarget: "esnext", // Don't transpile CSS for modern browsers
    minify: "esbuild", // Use esbuild for faster minification
    // Optional: adjust module preload for better performance
    modulePreload: {
      polyfill: false, // Modern browsers don't need the polyfill
    },
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
});
