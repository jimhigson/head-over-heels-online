/// <reference types="vite/client" />

// We import from edcore.main instead of the top-level "monaco-editor" to avoid
// bundling all ~80 language grammars and unused language services (CSS, HTML,
// TypeScript, LSP). edcore.main has no .d.ts of its own, so we declare it here
// with the same types as the full package — the runtime API is identical.
declare module "monaco-editor/esm/vs/editor/edcore.main" {
  export * from "monaco-editor";
}

declare module "*.frag" {
  const content: string;
  export default content;
}

declare module "*.vert" {
  const content: string;
  export default content;
}

declare module "virtual:pwa-register" {
  import type { RegisterSWOptions } from "vite-plugin-pwa/types";
  export function registerSW(
    options?: RegisterSWOptions,
  ): (reloadPage?: boolean) => void;
}
interface ImportMetaEnv {
  readonly VITE_GAME_URL: string;
  readonly VITE_LOG_MOVE_ITEM?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
