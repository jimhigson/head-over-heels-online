import preact from "@preact/preset-vite";
import path from "path";
import { visualizer } from "rollup-plugin-visualizer";
import { defineConfig, type PluginOption } from "vite";
import glsl from "vite-plugin-glsl";
import { VitePWA } from "vite-plugin-pwa";

import { hmrOnlyPreact } from "./hmrOnlyPreact";

const oneWeekInSeconds = 60 * 60 * 24 * 7;

type Mode = "development" | "production" | "tauri" | "visual-regression";

// https://vitejs.dev/config/
export default defineConfig(({ mode: _mode }) => {
  const mode = _mode as Mode;

  return {
    // don't conflict with the editor's vite cache
    cacheDir: ".vite/game",

    clearScreen: false,

    envPrefix: ["VITE_", "TAURI_"],

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
        filename: "build-stats.html",
      }) as PluginOption,
      // tauri builds package the app as a native binary, so the PWA service
      // worker is not needed (and would conflict with tauri's own update flow)
      mode !== "tauri" &&
        VitePWA({
          registerType: "prompt",
          workbox: {
            globPatterns: ["**/*.{js,css,html,png,webp,mp3,m4a}"],
            // visual-regression builds are unminified so assets are larger
            ...(mode === "visual-regression" && {
              maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
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
      // keep tauri builds in their own dir, since they have tauri-specific
      // code injected into them, which doesn't work if run normally:
      outDir: mode === "tauri" ? "dist-tauri" : "dist",
      // don't inline mp3s < 4kb since base64 encoding will make them bigger, and http2 is fine to request them separately
      assetsInlineLimit(filePath) {
        if (filePath.endsWith(".mp3")) {
          return false;
        }
        return undefined;
      },
      target: "esnext",
      cssTarget: "esnext", // Don't transpile CSS for modern browsers

      minify: mode !== "visual-regression",
      rolldownOptions: {
        output:
          mode === "visual-regression" ?
            {
              // visual-regression snapshots render the error dialog's stack
              // trace, so keep the output readable and stable: unhashed asset
              // names (content edits don't change filenames) and no
              // minification (frames show real source function names, which are
              // consistent across builds rather than reshuffled mangled names)
              entryFileNames: "assets/[name].js",
              chunkFileNames: "assets/[name].js",
              assetFileNames: "assets/[name][extname]",
            }
          : {
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
  };
});
