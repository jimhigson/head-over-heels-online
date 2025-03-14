/// <reference types="vite/client" />

declare module "*.frag" {
  const content: string;
  export default content;
}

declare module "*.vert" {
  const content: string;
  export default content;
}

declare const __buildString__: string;
