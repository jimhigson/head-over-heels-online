/// <reference types="vite/client" />

declare module "*.frag" {
  const content: string;
  export default content;
}

declare module "*.vert" {
  const content: string;
  export default content;
}

declare const __gitHash__: string;
declare const __buildDate__: string;

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
