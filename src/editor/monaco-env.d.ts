// We import from edcore.main instead of the top-level "monaco-editor" to avoid
// bundling all ~80 language grammars and unused language services (CSS, HTML,
// TypeScript, LSP). edcore.main has no .d.ts of its own, so we declare it here
// with the same types as the full package — the runtime API is identical.
declare module "monaco-editor/esm/vs/editor/edcore.main" {
  export * from "monaco-editor";
}

declare module "monaco-editor/esm/vs/language/json/monaco.contribution" {
  import type { languages } from "monaco-editor";
  export const jsonDefaults: languages.json.LanguageServiceDefaults;
}
