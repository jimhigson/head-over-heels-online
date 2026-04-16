import type { SpriteOption } from "./gameMenusSlice";

export const spriteOptionEquals = (a: SpriteOption, b: SpriteOption): boolean =>
  a.name === b.name && a.uncolourised === b.uncolourised;
