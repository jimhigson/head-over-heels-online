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
