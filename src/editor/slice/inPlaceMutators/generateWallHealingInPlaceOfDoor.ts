import type {
  EditorJsonItem,
  EditorRoomItemId,
  EditorRoomJson,
} from "../../editorTypes";

import {
  isWallHidden,
  type WallJsonConfig,
} from "../../../model/json/WallJsonConfig";
import { rotatingSceneryTiles } from "../rotatingSceneryTiles";
import { nextItemIdForItemTool } from "./addItemInPlace";

export function* generateWallHealingInPlaceOfDoor(
  item: EditorJsonItem<"door">,
  roomJson: EditorRoomJson,
): Generator<[EditorRoomItemId, EditorJsonItem<"wall">]> {
  const replacementWall: EditorJsonItem<"wall"> = {
    type: "wall" as const,
    config:
      isWallHidden(item.config.direction) ?
        item.config.direction === "towards" ?
          ({
            direction: item.config.direction,
            times: { x: 2 },
          } satisfies WallJsonConfig)
        : ({
            direction: item.config.direction,
            times: { y: 2 },
          } satisfies WallJsonConfig)
      : ({
          direction: item.config.direction,
          tiles: [
            ...rotatingSceneryTiles(
              roomJson.planet,
              2,
              item.position[item.config.direction === "away" ? "x" : "y"],
            ),
          ],
        } satisfies WallJsonConfig),
    position: { ...item.position, z: 0 },
  } satisfies EditorJsonItem<"wall">;

  // deleting a door - replace with the equivalent wall, and then consolidate to
  // join the new wall with adjacent walls:
  const nextWallId = nextItemIdForItemTool(roomJson, replacementWall, false);

  yield [nextWallId, replacementWall];
}
