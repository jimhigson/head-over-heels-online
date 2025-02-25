import { objectValues } from "iter-tools";
import { iterate } from "../../../../utils/iterate";
import type { RoomJson } from "../../../../model/RoomJson";
import type { SceneryName } from "../../../../sprites/planets";
import type { JsonItem } from "../../../../model/json/JsonItem";
import { directionAxis } from "../../../../utils/vectors/vectors";

/**
 * find all walls that are not at the perimeter of the room. These usually happen in the
 * 'triple' rooms that were multiple rooms in the original game
 */
export const findNonPerimeterWalls = (
  roomJson: RoomJson<SceneryName, string, string>,
): Array<JsonItem<"wall">> => {
  return [
    ...iterate(objectValues(roomJson.items))
      .filter((item) => item.type === "wall")
      .filter((item) =>
        directionAxis(item.config.direction) === "x" ?
          item.position.x !== 0 && item.position.x !== roomJson.size.x
        : item.position.y !== 0 && item.position.y !== roomJson.size.y,
      ),
  ];
};
