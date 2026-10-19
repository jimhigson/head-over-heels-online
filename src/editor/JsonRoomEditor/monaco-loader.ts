import type * as Monaco from "monaco-editor";

import { loader } from "@monaco-editor/react";
// Import the core editor (edcore.main) instead of the top-level "monaco-editor"
// entry point. The top-level pulls in all ~80 language grammars, CSS/HTML/TypeScript
// language services, and the LSP client — we only need JSON. This halves the
// editor build output.
import * as monaco from "monaco-editor/esm/vs/editor/edcore.main";
import editorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker";
import jsonWorker from "monaco-editor/esm/vs/language/json/json.worker?worker";
import { jsonDefaults } from "monaco-editor/esm/vs/language/json/monaco.contribution";

import { paletteBlockstackHex } from "../../sprites/palette/spritesheetPalette";
import { halfbriteHex } from "../../utils/colour/halfbrite";
import { importOnce } from "../../utils/importOnce";

// Must be called at module level, not inside a useEffect or async function.
// @monaco-editor/react's <Editor> component calls loader.init() in its own
// useEffect on first mount. If loader.config hasn't run yet at that point,
// it falls back to fetching monaco from CDN. Module-level execution is
// guaranteed to happen before any component mounts.
//
// MonacoEnvironment must also be set at module level - if set inside the async
// monacoLoader function, a warm loader.init() (which resolves synchronously from
// cache) may request workers before MonacoEnvironment is assigned, causing the
// JSON language service to silently fall back to the plain editor worker and
// leaving the editor without JSON syntax highlighting or folding.
self.MonacoEnvironment = {
  getWorker(_, label) {
    if (label === "json") {
      return new jsonWorker();
    }
    // we don't need any other languages
    return new editorWorker();
  },
};
loader.config({ monaco });

const monacoLoader = async (): Promise<typeof Monaco> => {
  const monacoInstance = await loader.init();

  const roomSchema = await import("../../_generated/room.schema.json").then(
    ({ default: schema }) => schema,
  );
  jsonDefaults.setDiagnosticsOptions({
    validate: true,
    schemas: [
      {
        uri: "https://blockstack.org/room.schema.json",
        fileMatch: ["*"],
        schema: roomSchema,
      },
    ],
  });

  monacoInstance.editor.defineTheme("hoh-dark", {
    base: "vs-dark",
    inherit: true,
    rules: [
      { token: "string.key.json", foreground: paletteBlockstackHex.pastelBlue },
      {
        token: "string.value.json",
        foreground: paletteBlockstackHex.lightBeige,
      },
      { token: "number.json", foreground: paletteBlockstackHex.lightBeige },
      {
        token: "keyword.json",
        foreground: paletteBlockstackHex.midRed,
        fontStyle: "bold",
      },
      {
        token: "punctuation.separator.key-value.json",
        foreground: paletteBlockstackHex.pink,
      },
      {
        token: "punctuation.separator.array.json",
        foreground: paletteBlockstackHex.midGrey,
      },
      {
        token: "delimiter.bracket.json",
        foreground: paletteBlockstackHex.redShadow,
      },
      { token: "delimiter.array.json", foreground: paletteBlockstackHex.moss },
      {
        token: "delimiter.comma.json",
        foreground: paletteBlockstackHex.midGrey,
      },
      {
        token: "delimiter.colon.json",
        foreground: paletteBlockstackHex.midGrey,
      },
    ],
    // list of colours at https://github.com/microsoft/monaco-editor/issues/1631
    colors: {
      "editor.foreground": paletteBlockstackHex.midGrey,
      "editor.background": paletteBlockstackHex.pureBlack,
      "editorLineNumber.foreground": paletteBlockstackHex.shadow,
      "editorLineNumber.activeForeground": paletteBlockstackHex.midRed,
      "editor.selectionBackground": paletteBlockstackHex.shadow,
      "editorIndentGuide.background1": paletteBlockstackHex.shadow,
      "editorIndentGuide.activeBackground1": paletteBlockstackHex.midRed,
      "editor.lineHighlightBackground": halfbriteHex(
        paletteBlockstackHex.redShadow,
      ),
      "editor.lineHighlightBorder": "#00000000", // transparent
      "editor.foldPlaceholderForeground": paletteBlockstackHex.pink,
      // suggest (autocomplete) widget, matched to the app's Command/ContextMenu
      // dropdown: metallicBlue body, white text, selected row inverts to white
      "editorSuggestWidget.background": paletteBlockstackHex.metallicBlue,
      "editorSuggestWidget.border": paletteBlockstackHex.shadow,
      "editorSuggestWidget.foreground": paletteBlockstackHex.white,
      "editorSuggestWidget.selectedBackground": paletteBlockstackHex.white,
      "editorSuggestWidget.selectedForeground":
        paletteBlockstackHex.metallicBlue,
      "editorSuggestWidget.selectedIconForeground":
        paletteBlockstackHex.metallicBlue,
      "editorSuggestWidget.highlightForeground":
        paletteBlockstackHex.highlightBeige,
      "editorSuggestWidget.focusHighlightForeground":
        paletteBlockstackHex.midRed,
    },
  });

  return monacoInstance;
};

export const loadMonacoOnce = importOnce(monacoLoader);
