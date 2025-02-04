import { markdownMenus } from "./markdownMenus";
import { keys } from "../../../../utils/entries";

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
  ...keys(markdownMenus),
] as const;

export type DialogId = (typeof dialogIds)[number];
