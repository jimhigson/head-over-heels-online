import { produce } from "immer";
import { entries } from "../../../utils/entries";
import type { Xyz, Xy, DirectionXy4 } from "../../../utils/vectors/vectors";
import {
  subXyz,
  addXyz,
  directionAxis,
  perpendicularAxisXy,
} from "../../../utils/vectors/vectors";
import type {
  EditorRoomJsonItems,
  EditorRoomItemId,
  EditorRoomId,
  EditorJsonItem,
} from "../../editorTypes";
import {
  completeTimesXy,
  wallTimes,
} from "../../../game/collision/boundingBoxTimes";
import { roomEditTarget } from "./addItemInPlace";
import { type LevelEditorState } from "../levelEditorSlice";
import { selectRoomFromLevelEditorState } from "../levelEditorSliceSelectors";

function* iterateRoomItemsToCutWallsForDoors(
  items: EditorRoomJsonItems,
  doorDirection: DirectionXy4,
  doorPosition: Xyz,
): // yields the modified walls
Generator<[EditorRoomItemId, EditorJsonItem<"wall"> | null]> {
  // TODO: make return null for zero-volume walls so they can be removed

  for (const entry of entries(items)) {
    const [id, item] = entry;
    if (item.type !== "wall") {
      // nothing changed so don't yield
      // not a wall, so no need to cut
      continue;
    }
    if (item.config.direction !== doorDirection) {
      // nothing changed so don't yield
      // wall not facing in the direction that this door would cut
      continue;
    }

    const { position: wallPosition, config: wallConfig } = item;
    const currentWallTimes: Xy = completeTimesXy(wallTimes(wallConfig));

    /** axis running along the wall the door sits on */
    const alongWallAxis = perpendicularAxisXy(
      directionAxis(wallConfig.direction),
    );
    /** axis for direction of travel through the doorway */
    const doorDirectionAxis = directionAxis(wallConfig.direction);

    const relativePosition = subXyz(doorPosition, wallPosition);
    if (relativePosition[doorDirectionAxis] !== 0) {
      // nothing changed so don't yield
      // door is not on this wall's plane
      continue;
    }

    if (relativePosition[alongWallAxis] < -1) {
      // nothing changed so don't yield
      // door is before the start of this wall
      continue;
    }

    if (relativePosition[alongWallAxis] > currentWallTimes[alongWallAxis]) {
      // nothing changed so don't yield
      // door is after the end of this wall
      continue;
    }

    if (currentWallTimes[alongWallAxis] === 2) {
      // door completely replaces this wall
      console.log("yielding for for removal (complete replace) of ", id);
      yield [id, null];
      continue;
    }

    const cutWallAtStart = relativePosition[alongWallAxis] === 0;

    if (cutWallAtStart) {
      const modifiedWall = produce(item, (itemDraft) => {
        itemDraft.position = addXyz(wallPosition, { [alongWallAxis]: 2 });
        const draftConfig = itemDraft.config;

        switch (draftConfig.direction) {
          case "towards":
          case "right":
            (draftConfig.times as Xy)[alongWallAxis] =
              currentWallTimes[alongWallAxis] - 2;
            break;
          default:
            // remove the first two tiles:
            draftConfig.tiles = draftConfig.tiles.slice(2);
        }
      });
      // door is at the start of the wall, so cut the first part
      yield [id, modifiedWall];
    }

    const cutWallAtEnd =
      relativePosition[alongWallAxis] === currentWallTimes[alongWallAxis] - 2;
    if (cutWallAtEnd) {
      const modifiedWall = produce(item, (itemDraft) => {
        const draftConfig = itemDraft.config;

        switch (draftConfig.direction) {
          case "towards":
          case "right":
            (draftConfig.times as Xy)[alongWallAxis] =
              currentWallTimes[alongWallAxis] - 2;
            break;

          default:
            // remove the last two tiles:
            draftConfig.tiles = draftConfig.tiles.slice(0, -2);
        }
      });
      // door is at the end of the wall, so cut the last part:
      yield [id, modifiedWall];
    }

    // if not cutting the door at either end, cut into two parts:
    if (!cutWallAtStart && !cutWallAtEnd) {
      const modifiedWallBefore = produce(item, (itemDraft) => {
        const draftConfig = itemDraft.config;
        switch (draftConfig.direction) {
          case "towards":
          case "right":
            (draftConfig.times as Xy)[alongWallAxis] =
              relativePosition[alongWallAxis];

            break;
          default:
            draftConfig.tiles = draftConfig.tiles.slice(
              0,
              relativePosition[alongWallAxis],
            );
        }
      });
      yield [`${id}/beforeDoor` as EditorRoomItemId, modifiedWallBefore];
      const modifiedWallAfter = produce(item, (itemDraft) => {
        itemDraft.position = {
          ...wallPosition,
          [alongWallAxis]: doorPosition[alongWallAxis] + 2,
        };

        const draftConfig = itemDraft.config;
        switch (draftConfig.direction) {
          case "towards":
          case "right":
            (draftConfig.times as Xy)[alongWallAxis] =
              currentWallTimes[alongWallAxis] -
              relativePosition[alongWallAxis] -
              2;
            break;
          default:
            console.log("cutting tiles down in ", id);
            draftConfig.tiles = draftConfig.tiles.slice(
              relativePosition[alongWallAxis] + 2,
            );
        }
      });
      yield [`${id}/afterDoor` as EditorRoomItemId, modifiedWallAfter];

      // remove the pre-splitting item:
      console.log("yielding for removal (after splitting) of ", id);
      yield [id, null];
    }
  }
}

export const cutHoleInWallsForDoorsInPlace = (
  state: LevelEditorState,
  roomId: EditorRoomId,
  doorDirection: DirectionXy4,
  blockPosition: Xyz,
  preview: boolean,
) => {
  const room = selectRoomFromLevelEditorState(state, roomId);

  if (room === undefined) {
    throw new Error("can't cut hole in walls for a room that does not exist");
  }

  const target = roomEditTarget(state, preview, roomId);

  for (const [itemId, modifiedWall] of iterateRoomItemsToCutWallsForDoors(
    room.items,
    doorDirection,
    blockPosition,
  )) {
    if (preview) {
      target[itemId] = modifiedWall;
    } else {
      if (modifiedWall === null) {
        delete target[itemId];
      } else {
        target[itemId] = modifiedWall;
      }
    }
  }
};
