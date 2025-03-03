import path from "path";
import type { PluginOption } from "vite";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { visualizer } from "rollup-plugin-visualizer";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    visualizer({
      gzipSize: true,
      brotliSize: true,
      template: "treemap",
      filename: "build-stats.html",
    }) as PluginOption,
    VitePWA({
      registerType: "autoUpdate",
      devOptions: {
        enabled: true,
      },
      includeAssets: ["./gfx/sprites.png"],
      manifest: {
        background_color: "#000000",
        theme_color: "#000000",
        name: "Head over Heels",
        short_name: "Head over Heels",
        orientation: "landscape",
        display: "fullscreen",
        scope: "/",
        start_url: "/",
        icons: [
          {
            src: "/icon-192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/icon-512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
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
    allowedHosts: [".local"],
    // consistent port number for this project (not vite default)
    port: 5200,
  },
  preview: {
    port: 5201,
  },
});
