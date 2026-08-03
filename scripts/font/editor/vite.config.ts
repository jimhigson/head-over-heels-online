import preact from "@preact/preset-vite";
import path from "node:path";
import { fileURLToPath } from "node:url";
import Macros from "unplugin-macros/vite";
import { defineConfig } from "vite";

import { glyphOverridesApi } from "./glyphOverridesApi";

const editorRoot = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(editorRoot, "../../..");

// tailwind scans this app's own sources as well as src/, whose ui components
// it borrows - see the content globs in tailwind.config.ts
process.env.TAILWIND_APP = "fontEditor";

// the borrowed ui components read the game's redux store, so this app builds
// one. Naming itself the editor keeps the store from registering the game's
// own listeners - menu sounds, saved games - which have nothing to do here
process.env.VITE_APP = "editor";

/**
 * The font outline editor: a dev-only app for drawing the glyphs whose art
 * the kernel rules cannot read, and for turning individual rules off per
 * character. It has no build - it exists only as this dev server, and its
 * output is the committed scripts/font/glyphOverrides.json that gen:font
 * reads.
 */
export default defineConfig({
  root: editorRoot,
  // the app's sources live in the repo, not under the editor's own root
  server: {
    port: 5_300,
    strictPort: true,
    fs: { allow: [repoRoot] },
  },
  css: { postcss: repoRoot },
  plugins: [preact(), Macros(), glyphOverridesApi(repoRoot)],
});
