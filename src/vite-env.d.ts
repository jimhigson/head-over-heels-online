/// <reference types="vite/client" />

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
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
