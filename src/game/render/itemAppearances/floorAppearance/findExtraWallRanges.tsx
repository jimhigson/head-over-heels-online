import type { JsonItem } from "../../../../model/json/JsonItem";
import type { Xy, DirectionXy4 } from "../../../../utils/vectors/vectors";

export type ExtraWallRanges =
  | {
      left: [number, number];
      away: [number, number];
      right: undefined;
      towards: undefined;
    }
  | {
      left: undefined;
      away: undefined;
      right: [number, number];
      towards: [number, number];
    };

// get min/max of the extra walls
export const findExtraWallRanges = (
  extraWalls: Array<JsonItem<"wall">>,
  roomSize: Xy,
): ExtraWallRanges | undefined => {
  if (extraWalls.length === 0) {
    return undefined;
  }

  const ranges: Record<DirectionXy4, [number, number] | undefined> = {
    left: [roomSize.y, 0],
    right: [roomSize.y, 0],
    towards: [roomSize.x, 0],
    away: [roomSize.x, 0],
  };

  for (const wall of extraWalls) {
    const {
      config: { side },
      position: { x, y },
    } = wall;

    if (side === "left" || side === "right") {
      if (!ranges[side]) ranges[side] = [Infinity, -Infinity];
      ranges[side][0] = Math.min(ranges[side][0], y);
      ranges[side][1] = Math.max(ranges[side][1], y);
    } else if (side === "towards" || side === "away") {
      if (!ranges[side]) ranges[side] = [Infinity, -Infinity];
      ranges[side][0] = Math.min(ranges[side][0], x);
      ranges[side][1] = Math.max(ranges[side][1], x);
    }
  }

  return ranges as ExtraWallRanges;
};
