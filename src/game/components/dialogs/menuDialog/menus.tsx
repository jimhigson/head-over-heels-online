import type { MarkdownPageName } from "../../../../manual/pages";
import { markdownPages } from "../../../../manual/pages";
import { keys } from "../../../../utils/entries";

const markdownDialogIds = keys(markdownPages).map(
  (pageName) => `markdown/${pageName}`,
) as `markdown/${MarkdownPageName}`[];

export const dialogIds = [
  "mainMenu",
  "controlOptions",
  "inputPreset",
  "modernisationOptions",
  "emulatedResolution",
  "readTheManual",
  "hold",
  "crowns",
  "score",
  "quitGameConfirm",
  "proclaimEmperor",
  ...markdownDialogIds,
] as const;

export type DialogId = (typeof dialogIds)[number];
