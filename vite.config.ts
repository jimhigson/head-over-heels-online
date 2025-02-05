import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { visualizer } from "rollup-plugin-visualizer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    visualizer({
      gzipSize: true,
      brotliSize: true,
      template: "treemap",
      filename: "build-stats.html",
    }),
  ],

  build: {
    target: "esnext",
  },

  resolve: {
    alias: {
      // for shadcn: https://ui.shadcn.com/docs/installation/vite
      "@": path.resolve(__dirname, "./src"),
      gfx: path.resolve(__dirname, "./gfx"),
    },
  },

  server: {
    // want to test on my iphone
    host: true,
  },
});
