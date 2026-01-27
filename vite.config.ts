import type { PluginOption } from "vite";

import react from "@vitejs/plugin-react-swc";
import path from "path";
import { visualizer } from "rollup-plugin-visualizer";
import { defineConfig } from "vite";
import glsl from "vite-plugin-glsl";
import { VitePWA } from "vite-plugin-pwa";

const oneWeekInSeconds = 60 * 60 * 24 * 7;

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  // don't conflict with the editor's vite cache
  cacheDir: ".vite/game",

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
      filename: "build-stats.html",
    }) as PluginOption,
    VitePWA({
      registerType: "autoUpdate",
      workbox: {
        globPatterns: ["**/*.{js,css,html,png,mp3,m4a}"],
        // visual-regression builds are unminified so assets are larger
        ...(mode === "visual-regression" && {
          maximumFileSizeToCacheInBytes: 5 * 1_024 * 1_024,
        }),
        runtimeCaching: [
          {
            // Cache everything *except* /editor/*
            urlPattern: ({ url }) => !url.pathname.startsWith("/editor"),
            handler: "NetworkFirst",
            options: {
              cacheName: "app-cache",
              expiration: {
                maxEntries: 999,
                maxAgeSeconds: oneWeekInSeconds,
              },
            },
          },
        ],
        navigateFallback: "/index.html",
        navigateFallbackDenylist: [/^\/editor/], // Don’t redirect /editor/* to index.html
      },
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
    glsl({
      minify: true,
    }),
  ],

  build: {
    target: "esnext",
    cssTarget: "esnext", // Don't transpile CSS for modern browsers
    // visual-regression builds are unminified for easier debugging of failures
    minify: mode === "visual-regression" ? false : "esbuild",
    // Optional: adjust module preload for better performance
    modulePreload: {
      polyfill: false, // Modern browsers don't need the polyfill
    },
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
}));
