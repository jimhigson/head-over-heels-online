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
  "installGuide",
  "mainMenu",
  "map",
  "modernisationOptions",
  "offerReincarnation",
  "proclaimEmperor",
  "quitGameConfirm",
  "readTheManual",
  "score",
  "sound",
  ...markdownDialogIds,
] as const;

export type DialogId = (typeof dialogIds)[number];
