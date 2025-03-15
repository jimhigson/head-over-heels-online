import type { MarkdownPageName } from "../../../../manual/pages";
import { markdownPages } from "../../../../manual/pages";
import { keys } from "../../../../utils/entries";

const markdownDialogIds = keys(markdownPages).map(
  (pageName) => `markdown/${pageName}`,
) as `markdown/${MarkdownPageName}`[];

export const dialogIds = [
  "controlOptions",
  "crowns",
  "emulatedResolution",
  "errorCaught",
  "hold",
  "inputPreset",
  "mainMenu",
  "modernisationOptions",
  "offerReincarnation",
  "proclaimEmperor",
  "quitGameConfirm",
  "readTheManual",
  "score",
  "wrongOrientation",
  ...markdownDialogIds,
] as const;

export type DialogId = (typeof dialogIds)[number];
