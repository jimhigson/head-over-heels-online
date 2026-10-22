/*
 * the node apis that build-time macros outside the macros project
 * (tsconfig.macros.json) use, so the app's typecheck (which has no node
 * types) can follow the macros' imports
 */
declare module "node:fs" {
  // narrowed to the repo's gfx files so it never shadows node's own typing
  export function readFileSync(path: `gfx/${string}`): Uint8Array;
}
