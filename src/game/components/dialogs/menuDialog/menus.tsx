import type { MarkdownPageName } from "../../../../manual/pages";
import { markdownPages } from "../../../../manual/pages";
import { keys } from "../../../../utils/entries";

const markdownDialogIds = keys(markdownPages).map(
  (pageName) => `markdown/${pageName}`,
) as `markdown/${MarkdownPageName}`[];

export const dialogIds = [
  "mainMenu",
  "selectKeys",
  "modernisationOptions",
  "inputPreset",
  "readTheManual",
  "hold",
  "crowns",
  "gameOver",
  "quitGameConfirm",
  "proclaimEmperor"
  ...markdownDialogIds,
] as const;

export type DialogId = (typeof dialogIds)[number];
