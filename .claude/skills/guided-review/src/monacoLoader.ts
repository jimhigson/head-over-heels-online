/* Monaco comes from a cdn, and is allowed not to arrive. Opened as a file with
   no network, or published where a csp blocks external scripts, the loader
   rejects and every diff renders through the plain patch renderer instead. */

import { type MonacoApi } from "./monacoApi.ts";

const monacoVersion = "0.52.2";
const monacoBase = `https://cdn.jsdelivr.net/npm/monaco-editor@${monacoVersion}/min/vs`;
const monacoTimeoutMs = 6_000;

const languages: Record<string, string> = {
  ts: "typescript",
  tsx: "typescript",
  js: "javascript",
  jsx: "javascript",
  mjs: "javascript",
  json: "json",
  md: "markdown",
  css: "css",
  html: "html",
  sh: "shell",
  py: "python",
  yml: "yaml",
  yaml: "yaml",
};

export const languageFor = (path: string): string =>
  languages[(path.split(".").pop() ?? "").toLowerCase()] ?? "plaintext";

export const pageIsDark = (): boolean => {
  const stamped = document.documentElement.dataset.theme;
  if (stamped === "dark") {
    return true;
  }
  if (stamped === "light") {
    return false;
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
};

/** monaco themes carrying the same palette as the rest of the page */
const defineReviewThemes = (monaco: MonacoApi): void => {
  const shared = {
    "editor.background": "#00000000",
    "editorGutter.background": "#00000000",
    "diffEditor.insertedTextBackground": "#2ea17c33",
    "diffEditor.removedTextBackground": "#e55f4433",
    "diffEditor.insertedLineBackground": "#2ea17c1f",
    "diffEditor.removedLineBackground": "#e55f441f",
  };
  monaco.editor.defineTheme("review-light", {
    base: "vs",
    inherit: true,
    rules: [],
    colors: { ...shared, "editorLineNumber.foreground": "#7c6e6c" },
  });
  monaco.editor.defineTheme("review-dark", {
    base: "vs-dark",
    inherit: true,
    rules: [],
    colors: { ...shared, "editorLineNumber.foreground": "#9a8d8a" },
  });
};

const quietenLanguageServices = (monaco: MonacoApi): void => {
  // nothing here is edited against a real project, so the language services
  // would only cost a multi-megabyte worker download to report errors this page
  // isn't fixing
  for (const defaults of [
    monaco.languages.typescript.typescriptDefaults,
    monaco.languages.typescript.javascriptDefaults,
  ]) {
    defaults.setDiagnosticsOptions({
      noSemanticValidation: true,
      noSyntacticValidation: true,
      noSuggestionDiagnostics: true,
    });
    // ...and jsx has to be allowed, or every tag in a .tsx parses as a type
    // assertion and the file fills with "'>' expected"
    defaults.setCompilerOptions({
      ...defaults.getCompilerOptions(),
      jsx: monaco.languages.typescript.JsxEmit.Preserve,
      allowJs: true,
      allowNonTsExtensions: true,
      target: monaco.languages.typescript.ScriptTarget.ESNext,
    });
  }
};

/** resolves to the monaco module, or undefined when it can't be had */
let monacoPromise: Promise<MonacoApi | undefined> | undefined;

export const loadMonaco = (): Promise<MonacoApi | undefined> => {
  if (monacoPromise !== undefined) {
    return monacoPromise;
  }
  monacoPromise = new Promise<MonacoApi>((resolve, reject) => {
    // cross-origin workers have to be bootstrapped through a blob that imports
    // the real worker from the cdn. baseUrl is the directory *above* vs/, since
    // the worker resolves module ids that already start with vs/
    window.MonacoEnvironment = {
      getWorkerUrl: () =>
        URL.createObjectURL(
          new Blob(
            [
              `self.MonacoEnvironment = { baseUrl: "${monacoBase.replace(/\/vs$/, "/")}" };\n` +
                `importScripts("${monacoBase}/base/worker/workerMain.js");`,
            ],
            { type: "text/javascript" },
          ),
        ),
    };

    const timeout = setTimeout(() => reject(new Error("monaco timed out")), monacoTimeoutMs);
    const script = document.createElement("script");
    script.src = `${monacoBase}/loader.js`;
    script.addEventListener("error", () => {
      clearTimeout(timeout);
      reject(new Error("monaco could not be loaded"));
    });
    script.addEventListener("load", () => {
      try {
        const loader = window.require;
        if (loader === undefined) {
          throw new Error("monaco's loader did not define require");
        }
        loader.config({ paths: { vs: monacoBase } });
        loader(["vs/editor/editor.main"], () => {
          clearTimeout(timeout);
          const {monaco} = window;
          if (monaco === undefined) {
            reject(new Error("monaco loaded but defined no global"));
            return;
          }
          quietenLanguageServices(monaco);
          defineReviewThemes(monaco);
          monaco.editor.setTheme(pageIsDark() ? "review-dark" : "review-light");
          resolve(monaco);
        });
      } catch (error) {
        clearTimeout(timeout);
        reject(error);
      }
    });
    document.head.append(script);
  }).catch((error: Error) => {
    console.warn("falling back to the plain diff renderer:", error.message);
    return undefined;
  });
  return monacoPromise;
};

const applyMonacoTheme = (): void => {
  window.monaco?.editor.setTheme(pageIsDark() ? "review-dark" : "review-light");
};

/** monaco is re-themed from both theme signals the page reads */
export const followPageTheme = (): void => {
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", applyMonacoTheme);
  new MutationObserver(applyMonacoTheme).observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
};
