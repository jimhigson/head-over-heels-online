import { type ValueOf } from "type-fest";

import { type DirectionXyz4, type DirectionXyz8 } from "./vectors";

/**
 * the arrow glyph for each world direction, as it appears at the default
 * camera angle in the game's isometric projection
 */
export const directionXyz4Glyphs = {
  left: "↖",
  right: "↘",
  away: "↗",
  towards: "↙",
  up: "⬆",
  down: "⬇",
} as const satisfies Record<DirectionXyz4, string>;

export const directionXyz8Glyphs = {
  ...directionXyz4Glyphs,
  awayRight: "➡",
  towardsRight: "⬇",
  towardsLeft: "⬅",
  awayLeft: "⬆",
} as const satisfies Record<DirectionXyz8, string>;

export type DirectionXyz4Glyph = ValueOf<typeof directionXyz4Glyphs>;
