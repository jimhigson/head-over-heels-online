import type { Monaco } from "@monaco-editor/react";
import { loader } from "@monaco-editor/react";
import * as monaco from "monaco-editor";
import editorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker";
import jsonWorker from "monaco-editor/esm/vs/language/json/json.worker?worker";
import paletteJson from "../../../gfx/spritesheetPalette.json";
import { halfbriteHex } from "../../utils/colour/halfBrite";
import { importOnce } from "../../utils/importOnce";

export const monacoLoader = async (): Promise<Monaco> => {
  self.MonacoEnvironment = {
    getWorker(_, label) {
      if (label === "json") {
        return new jsonWorker();
      }
      // if (label === "css" || label === "scss" || label === "less") {
      // return new cssWorker();
      // }
      // if (label === "html" || label === "handlebars" || label === "razor") {
      // return new htmlWorker();
      // }
      // if (label === "typescript" || label === "javascript") {
      // return new tsWorker();
      // }
      return new editorWorker();
    },
  };

  loader.config({ monaco });

  const monacoInstance = await loader.init();

  monacoInstance.editor.defineTheme("hoh-dark", {
    base: "vs-dark",
    inherit: true,
    rules: [
      { token: "string.key.json", foreground: paletteJson.pastelBlue },
      { token: "string.value.json", foreground: paletteJson.lightBeige },
      { token: "number.json", foreground: paletteJson.lightBeige },
      {
        token: "keyword.json",
        foreground: paletteJson.midRed,
        fontStyle: "bold",
      },
      {
        token: "punctuation.separator.key-value.json",
        foreground: paletteJson.pink,
      },
      {
        token: "punctuation.separator.array.json",
        foreground: paletteJson.midGrey,
      },
      { token: "delimiter.bracket.json", foreground: paletteJson.redShadow },
      { token: "delimiter.array.json", foreground: paletteJson.moss },
      { token: "delimiter.comma.json", foreground: paletteJson.midGrey },
      { token: "delimiter.colon.json", foreground: paletteJson.midGrey },
    ],
    // list of colours at https://github.com/microsoft/monaco-editor/issues/1631
    colors: {
      "editor.foreground": paletteJson.midGrey,
      "editor.background": paletteJson.pureBlack,
      "editorLineNumber.foreground": paletteJson.shadow,
      "editorLineNumber.activeForeground": paletteJson.midRed,
      "editor.selectionBackground": paletteJson.shadow,
      "editorIndentGuide.background1": paletteJson.shadow,
      "editorIndentGuide.activeBackground1": paletteJson.midRed,
      "editor.lineHighlightBackground": halfbriteHex(paletteJson.redShadow),
      "editor.lineHighlightBorder": "#00000000", // transparent
    },
  });

  return monacoInstance;
};

export const loadMonacoOnce = importOnce(monacoLoader);
