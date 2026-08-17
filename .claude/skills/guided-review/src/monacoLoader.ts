/* Monaco comes from the review server's own monaco-editor install (/vs) -
   nowhere else. It is a dependency, not an enhancement: served with the
   install missing is a server startup failure, and a page opened without a
   server has no code diffs and says so. Works fully offline. */

import { type MonacoApi } from "./monacoApi.ts";

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

let monacoPromise: Promise<MonacoApi> | undefined;

const loadFromBase = (base: string): Promise<MonacoApi> =>
  new Promise<MonacoApi>((resolve, reject) => {
    // workers have to be bootstrapped through a blob that imports the real
    // worker from its base. baseUrl is the directory *above* vs/, since the
    // worker resolves module ids that already start with vs/
    window.MonacoEnvironment = {
      getWorkerUrl: () =>
        URL.createObjectURL(
          new Blob(
            [
              `self.MonacoEnvironment = { baseUrl: "${base.replace(/\/vs$/, "/")}" };\n` +
                `importScripts("${base}/base/worker/workerMain.js");`,
            ],
            { type: "text/javascript" },
          ),
        ),
    };

    const script = document.createElement("script");
    const timeout = setTimeout(() => {
      script.remove();
      reject(new Error(`monaco timed out from ${base}`));
    }, monacoTimeoutMs);
    script.src = `${base}/loader.js`;
    script.addEventListener("error", () => {
      clearTimeout(timeout);
      script.remove();
      reject(new Error(`monaco could not be loaded from ${base}`));
    });
    script.addEventListener("load", () => {
      try {
        const loader = window.require;
        if (loader === undefined) {
          throw new Error("monaco's loader did not define require");
        }
        loader.config({ paths: { vs: base } });
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
  });

/** rejects when monaco can't be had - a failure to show, never to paper over */
export const loadMonaco = (): Promise<MonacoApi> => {
  if (monacoPromise !== undefined) {
    return monacoPromise;
  }
  if (window.__reviewServer === undefined) {
    monacoPromise = Promise.reject(
      new Error("code diffs need the review server - open this review through serve.ts"),
    );
  } else {
    monacoPromise = loadFromBase(new URL("/vs", location.href).toString());
  }
  // the memoised rejection is consumed by many editors; without a standing
  // handler every one after the first would log an unhandled-rejection error
  monacoPromise.catch(() => {});
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
