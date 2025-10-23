import type { MarkdownPageName } from "../../../../manual/pages";

import { markdownPages } from "../../../../manual/pages";
import { keys } from "../../../../utils/entries";

const manualDialogIds = keys(markdownPages).map(
  (pageName) => `markdown/${pageName}`,
) as `markdown/${MarkdownPageName}`[];

export const dialogIds = [
  "communityGames",
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
  "reincarnatedRestart",
  "score",
  "displayOptions",
  "sound",
  "sureWantEditor",
  "whichGame",
  // 'standard' pages from the original game manual
  ...manualDialogIds,
  // inline markdown pages - the content is stored in the scroll item's json config
  "markdown/inline",
] as const;

export type DialogId = (typeof dialogIds)[number];
