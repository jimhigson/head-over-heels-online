import preact from "@preact/preset-vite";
import { execSync } from "node:child_process";
import path from "path";
import { visualizer } from "rollup-plugin-visualizer";
import { defineConfig, type PluginOption } from "vite";
import glsl from "vite-plugin-glsl";
import { VitePWA } from "vite-plugin-pwa";

import { hmrOnlyPreact } from "./hmrOnlyPreact";

// read by tailwind.config.ts (which runs in this same process) to exclude
// editor-only sources from the game's css
process.env.TAILWIND_APP = "game";

const readGitBranch = (): string => {
  try {
    return execSync("git rev-parse --abbrev-ref HEAD").toString().trim();
  } catch {
    return "";
  }
};

// put git branch on env for dev builds:
process.env.VITE_GIT_BRANCH = readGitBranch();

const oneWeekInSeconds = 60 * 60 * 24 * 7;

type Mode =
  | "development"
  | "production"
  | "tauri"
  | "visual-regression"
  // R2 hosting builds: the editor is its own origin and assets are served
  // precompressed. One mode per deploy environment so each loads its own
  // .env.<mode> (domains differ; build settings are production-like)
  | "r2-main"
  | "r2-production"
  // points the game at the local Supabase stack (`supabase start`); see DEVELOPING.md
  | "local-db";

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
            globPatterns: ["**/*.{js,css,html,json,png,webp,opus,woff2}"],
            // the debug spritesheet is cheats-only - don't push it to every
            // player in the precache; it fetches on demand when selected
            globIgnores: ["**/spritesDebug*"],
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
                src: "/icon-192.webp",
                sizes: "192x192",
                type: "image/webp",
              },
              {
                src: "/icon-512.webp",
                sizes: "512x512",
                type: "image/webp",
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

      minify: mode !== "visual-regression",
      // source maps in visual-regression builds so error-dialog stack traces
      // map back to the original source files rather than the bundled output
      sourcemap: mode === "visual-regression",
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
              // vite 8.1's rolldown fragments code into many more chunks than
              // vite 8.0, costing per-chunk boilerplate and cross-chunk
              // compression loss. These groups re-merge fragments within a
              // single load boundary without changing which journey loads
              // them. (Vendor/runtime chunks are deliberately NOT grouped:
              // forcing those into a shared chunk breaks module
              // initialisation order and the game fails to boot.)
              advancedChunks: {
                // groups take only their matched modules; without this,
                // rolldown recursively absorbs each group's dependencies,
                // dragging game-only code into menu-eager chunks (and vice
                // versa)
                includeDependenciesRecursively: false,
                groups: [
                  {
                    // all rarely-opened dialogs batch into one lazy chunk:
                    // they load together on the first rare-dialog open rather
                    // than as ~17 tiny chunks (which compress badly)
                    name: "rareDialogs",
                    test: (id: string) =>
                      /[\\/]src[\\/]game[\\/]components[\\/]dialogs[\\/]menuDialog[\\/]dialogs[\\/](about|communityGames|controlOptions|death|displayOptions|emulatedResolution|hold|inputPreset|install|offerReincarnation|options|proclaimEmperor|quitGameConfirm|reincarnatedRestart|score|sound|sureWantEditor)[\\/]/.test(
                        id,
                      ) &&
                      // the *.lazy.tsx wrappers are the eager stubs that
                      // import() this chunk - they must stay outside it
                      !/\.lazy\.tsx?$/.test(id),
                  },
                  {
                    // game-engine code loaded between menu-ready and first
                    // room render; excludes menu-used files and cheats-only
                    // debug modules (which stay in the lazy Cheats chunk)
                    name: "game",
                    test: (id: string) =>
                      /[\\/]src[\\/](game|sound|sprites)[\\/]/.test(id) &&
                      !/[\\/]src[\\/](game[\\/](components|input)[\\/]|game[\\/]gameState[\\/]saving[\\/]|game[\\/](gameMain\.import|handleGameBoot|isInPlaytestMode)\.|game[\\/]physics[\\/](itemPredicates|mechanicsConstants)\.|game[\\/]gameState[\\/]mutators[\\/](deleteItemFromRoom|standingOn[\\/]removeStandingOn)\.|game[\\/]mainLoop[\\/]frameTiming[\\/]enableDetailedFrameTimingLog\.|game[\\/]render[\\/](item[\\/]itemRender[\\/](ItemBoundingBoxRenderer|boundingBoxDecorateItemRenderer|debugPointerDecorateItemRenderer)|room[\\/]subRoomBoundariesDecorateRoomRenderer|sortZ[\\/]zGraphDump[\\/]dumpZGraph|useRegisterDecorateItemRenderers|useRegisterDecorateRoomRenderers)\.|sound[\\/](audioCtx|loadAndDecode|soundsLoader)\.|sound[\\/]soundUtils[\\/]|sprites[\\/](escapeCharForTailwind|planets)\.|sprites[\\/]palette[\\/]spritesheetPalette\.|sprites[\\/]spritesheet[\\/]spritesheetData[\\/])/.test(
                        id,
                      ),
                  },
                ],
              },
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
      port: 5_200,
    },
    preview: {
      port: 5_201,
    },
  };
});
