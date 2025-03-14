import type { MarkdownPageName } from "../../../../manual/pages";
import { markdownPages } from "../../../../manual/pages";
import { keys } from "../../../../utils/entries";

const markdownDialogIds = keys(markdownPages).map(
  (pageName) => `markdown/${pageName}`,
) as `markdown/${MarkdownPageName}`[];

export const dialogIds = [
  "wrongOrientation",
  "mainMenu",
  "controlOptions",
  "inputPreset",
  "modernisationOptions",
  "emulatedResolution",
  "readTheManual",
  "hold",
  "crowns",
  "score",
  "offerReincarnation",
  "quitGameConfirm",
  "proclaimEmperor",
  ...markdownDialogIds,
] as const;

export type DialogId = (typeof dialogIds)[number];
