import { rotatingSceneryTiles } from "../../../model/inPlaceMutators/rotatingSceneryTiles";
import { type WallJsonConfig } from "../../../model/json/WallJsonConfig";
import { type SceneryName } from "../../../sprites/planets";
import { doorAlongAxis } from "../../../utils/vectors/vectors";
import { type EditorJsonItem, type EditorRoomItemId } from "../../editorTypes";
import { nextItemIdForItemTool } from "./addItemInPlace";

export function* generateWallHealingInPlaceOfDoor(
  item: EditorJsonItem<"door">,
  planet: SceneryName,
  existingIds: Iterable<EditorRoomItemId>,
): Generator<[EditorRoomItemId, EditorJsonItem<"wall">]> {
  const replacementWall: EditorJsonItem<"wall"> = {
    type: "wall" as const,
    config: {
      direction: item.config.direction,
      tiles: [
        ...rotatingSceneryTiles(
          planet,
          2,
          item.position[doorAlongAxis(item.config.direction)],
        ),
      ],
    } satisfies WallJsonConfig,
    position: { ...item.position, z: 0 },
  } satisfies EditorJsonItem<"wall">;

  // replace the door with the equivalent wall, and then consolidate to
  // join the new wall with adjacent walls:
  const nextWallId = nextItemIdForItemTool(existingIds, replacementWall, false);

  yield [nextWallId, replacementWall];
}
