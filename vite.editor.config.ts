import preact from "@preact/preset-vite";
import path from "node:path";
import { visualizer } from "rollup-plugin-visualizer";
import { defineConfig, loadEnv, type PluginOption } from "vite";
import glsl from "vite-plugin-glsl";

import { devFakeAuthPlugin } from "./devFakeAuthPlugin";
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
type Mode =
  | "development"
  | "production"
  // R2 hosting builds, one per deploy environment (each loads its own
  // .env.<mode>); the editor is served as its own origin with precompressed assets
  | "r2-main"
  | "r2-production"
  // points the editor at the local Supabase stack (`supabase start`); see DEVELOPING.md
  | "local-db";

// modes that serve the editor as its own origin (ed.<domain>) rather than the
// /editor/ subpath it occupies when it shares the game's origin on github pages
const ownOriginModes: Array<Mode> = ["r2-main", "r2-production"];

const targetPort = 5210;

// https://vitejs.dev/config/
export default defineConfig(({ mode: _mode }) => {
  const mode = _mode as Mode;
  const servedFromOwnOrigin = ownOriginModes.includes(mode);

  // local-db: the client must use the vite origin (so its requests route through
  // vite to be intercepted/proxied), while the proxy + fake-auth talk to the real
  // stack (VITE_SUPABASE_URL, the single source of truth). We hand the client the
  // origin by setting process.env, which vite's env injection prefers over .env.
  //
  // The config function runs more than once, so clear our own previous override
  // FIRST - otherwise loadEnv reads it back as the "real" url and the proxy ends
  // up pointing at vite itself (infinite loop / EAGAIN).
  if (mode === "local-db") {
    delete process.env.VITE_SUPABASE_URL;
  }
  const env = loadEnv(mode, path.resolve(__dirname, "src/editor"));
  const realSupabaseUrl = env.VITE_SUPABASE_URL;
  if (mode === "local-db") {
    // supabase is effectively on this server (proxied through)
    process.env.VITE_SUPABASE_URL = "/";
  }

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
      ...(mode === "local-db" ?
        [
          devFakeAuthPlugin({
            realSupabaseUrl,
            anonKey: env.VITE_SUPABASE_ANON_KEY,
          }),
        ]
      : []),
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
      port: targetPort,
      // local-db: forward the real supabase paths to the stack (the fake-auth
      // plugin intercepts /auth/v1/authorize + the pkce token exchange first)
      proxy:
        mode === "local-db" ?
          {
            "/rest/v1": { target: realSupabaseUrl, changeOrigin: true },
            "/auth/v1": { target: realSupabaseUrl, changeOrigin: true },
            "/storage/v1": { target: realSupabaseUrl, changeOrigin: true },
          }
        : undefined,
    },
    preview: {
      port: 5211,
    },
  };
});
