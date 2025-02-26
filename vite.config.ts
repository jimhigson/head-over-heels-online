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
      gfx: path.resolve(__dirname, "./gfx"),
    },
  },

  server: {
    // want to test on my iphone
    host: true,
    // want to connect using (computername).local, not just the ip
    // @ts-expect-error - the typings don't have this setting (but it exists and works!)
    allowedHosts: [".local"],
    // consistent port number for this project (not vite default)
    port: 5200,
  },
});
