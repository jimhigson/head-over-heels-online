import { type SpritesheetData } from "pixi.js";

import { seriesOfNamedTextures } from "./spriteGenerators";

export const editorSpritesheetData = {
  frames: {
    ...seriesOfNamedTextures(
      ["share", "save", "open"],
      { x: 640, y: 10 },
      { w: 12, h: 12 },
      undefined,
      "editor.tool",
    ),
    // sits in the editor tools' row on the sheet, but is not editor-specific:
    // it is also drawn in place of the os cursor throughout the game
    pointer: { frame: { x: 679, y: 10, w: 12, h: 12 } },
    ...seriesOfNamedTextures(
      ["eyedropper"],
      { x: 692, y: 10 },
      { w: 12, h: 12 },
      undefined,
      "editor.tool",
    ),
    ...seriesOfNamedTextures(
      [
        "single",
        "corridor",
        "double",
        "triple.line",
        "triple.^",
        "quad.square",
        "quad.s",
        "quad.31",
        "quad.t",
        "5.x",
      ],
      { x: 640, y: 0 },
      { w: 9, h: 9 },
      undefined,
      "editor.addRoom",
    ),
  },
} as const satisfies Pick<SpritesheetData, "frames">;
