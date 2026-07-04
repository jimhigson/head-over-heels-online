import { type Color } from "pixi.js";

import { type ZxSpectrumRoomColour } from "../../../originalGame";
import { paletteBlockstack } from "../../../sprites/palette/spritesheetPalette";
import { resolveSwops } from "../../../utils/palette/palette";
import { getRoomColorScheme } from "./colourScheme";
import { replacementColours } from "./gameColours";

/**
 * the floor edge lip (and floating door threshold) textures are colour-swopped
 * per world side at spritesheet build. Their colours belong to the world edges
 * and must travel with them as the camera rotates: at odd quarter-turns each
 * rendered near edge is showing the other pair's world edge, so the two edge
 * colour sets swap on the baked pixels (180° pairs opposite edges, which share
 * a colour, so needs no swap).
 *
 * The baked pixels are the resolved targets: this maps each side's targets
 * onto the other side's, paired by their shared source colour, for applying
 * with a PaletteSwapFilter.
 */
export const floorEdgeCrossSwops = (
  roomColor: ZxSpectrumRoomColour,
): Map<Color, Color> => {
  const { edges } = getRoomColorScheme(roomColor);
  const isDim = roomColor.shade === "dimmed";
  const rightResolved = resolveSwops(
    paletteBlockstack,
    replacementColours(edges.right.hue, isDim, "light-mid"),
  );
  const towardsResolved = resolveSwops(
    paletteBlockstack,
    replacementColours(edges.towards.hue, isDim, "mid-dark"),
  );
  const crossSwops = new Map<Color, Color>();
  for (const [source, rightTarget] of rightResolved) {
    const towardsTarget = towardsResolved.get(source);
    if (towardsTarget !== undefined) {
      crossSwops.set(rightTarget, towardsTarget);
      crossSwops.set(towardsTarget, rightTarget);
    }
  }
  return crossSwops;
};
