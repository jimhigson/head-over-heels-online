import type { DirectionXy } from "../../src/utils/vectors";
import type { CompassDirections } from "./readToJson";

export const convertDirection = (
  compassDirection: CompassDirections,
): DirectionXy => {
  // directions other than NESW are guesses and might be wrong - need to look into
  // why we have these.
  switch (compassDirection) {
    case "north":
    case "northwest":
    case "northeast":
      return "left";
    case "south":
    case "southeast":
    case "southwest":
      return "right";
    case "east":
    case "eastsouth":
    case "eastnorth":
      return "away";
    case "west":
    case "westnorth":
    case "westsouth":
      return "towards";

    default:
      compassDirection satisfies never;
      throw new Error(
        `Error converting direction: do not understand "${compassDirection}"`,
      );
  }
};
