import type { SpritesheetData } from "pixi.js";

import { seriesOfNamedTextures } from "./spriteGenerators";

export const editorSpritesheetData = {
  frames: {
    ...seriesOfNamedTextures(
      ["share", "save", "pointer", "eyedropper"],
      { x: 588, y: 0 },
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
