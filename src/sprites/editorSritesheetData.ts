import type { SpritesheetData } from "pixi.js";

export const editorSpritesheetData = {
  frames: {
    "editor.tool.pointer": { frame: { w: 12, h: 12, x: 614, y: 0 } },
    "editor.tool.eyedropper": { frame: { w: 12, h: 12, x: 628, y: 0 } },
  },
} as const satisfies Pick<SpritesheetData, "frames">;
