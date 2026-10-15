/*
 * the few node apis that build-time macros use, so the app's typecheck (which
 * has no node types) can follow the macros' imports
 */
declare module "node:child_process" {
  export const execSync: (command: string) => { toString: () => string };
}

declare module "node:process" {
  export const env: Partial<Record<string, string>>;
}
