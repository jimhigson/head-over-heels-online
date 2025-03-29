import type { JsonItem } from "../../../../model/json/JsonItem";
import type { DirectionXy4, Xyz } from "../../../../utils/vectors/vectors";

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

/** get min/max of the 'extra' (non-perimeter) walls */
export const findExtraWallRanges = (
  extraWalls: Array<JsonItem<"wall">>,
): ExtraWallRanges | undefined => {
  if (extraWalls.length === 0) {
    return undefined;
  }

  const ranges: { [d in DirectionXy4]?: [number, number] } = {};

  for (const wall of extraWalls) {
    const {
      config: { direction, times },
      position: { x, y },
    } = wall;

    if (direction === "left" || direction === "right") {
      if (!ranges[direction]) ranges[direction] = [Infinity, -Infinity];
      ranges[direction][0] = Math.min(ranges[direction][0], y);
      ranges[direction][1] = Math.max(
        ranges[direction][1],
        y + ((times as Partial<Xyz>)?.y ?? 1) - 1,
      );
    } else if (direction === "towards" || direction === "away") {
      if (!ranges[direction]) ranges[direction] = [Infinity, -Infinity];
      ranges[direction][0] = Math.min(ranges[direction][0], x);
      ranges[direction][1] = Math.max(
        ranges[direction][1],
        x + ((times as Partial<Xyz>)?.x ?? 1) - 1,
      );
    }
  }

  return ranges as ExtraWallRanges;
};
