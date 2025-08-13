import { produce } from "immer";
import { entries } from "../../../utils/entries";
import type { Xyz, Xy, DirectionXy4 } from "../../../utils/vectors/vectors";
import {
  subXyz,
  addXyz,
  tangentAxis,
  perpendicularAxisXy,
} from "../../../utils/vectors/vectors";
import type {
  EditorRoomItemId,
  EditorRoomId,
  EditorJsonItem,
} from "../../editorTypes";

import { roomEditTarget } from "./addItemInPlace";
import type { PreviewedRoomItemEdits } from "../levelEditorSlice";
import { type LevelEditorState } from "../levelEditorSlice";
import { selectRoomFromLevelEditorState } from "../levelEditorSelectors";
import { completeTimesXy, wallTimes } from "../../../model/times";

export function* generateHoleInWallsForDoor(
  items: PreviewedRoomItemEdits,
  doorDirection: DirectionXy4,
  doorPosition: Xyz,
): // yields the modified walls
Generator<[EditorRoomItemId, EditorJsonItem<"wall"> | null]> {
  for (const entry of entries(items)) {
    const [id, item] = entry;

    if (item === null) {
      continue;
    }

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
      tangentAxis(wallConfig.direction),
    );
    /** axis for direction of travel through the doorway */
    const doorDirectionAxis = tangentAxis(wallConfig.direction);

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

    if (relativePosition[alongWallAxis] >= currentWallTimes[alongWallAxis]) {
      // nothing changed so don't yield
      // door is after the end of this wall
      continue;
    }

    if (
      relativePosition[alongWallAxis] === 0 &&
      currentWallTimes[alongWallAxis] === 2
    ) {
      // door completely replaces this wall
      yield [id, null];
      continue;
    }

    // number of tiles to cut off at the start of the wall (if is 1 or 2)
    const cutWallAtStartNbr = 2 + relativePosition[alongWallAxis];
    const cutWallAtStart = cutWallAtStartNbr === 1 || cutWallAtStartNbr === 2;

    if (cutWallAtStart) {
      const modifiedWall = produce(item, (itemDraft) => {
        itemDraft.position = addXyz(wallPosition, {
          [alongWallAxis]: cutWallAtStartNbr,
        });
        const draftConfig = itemDraft.config;

        switch (draftConfig.direction) {
          case "towards":
          case "right":
            (draftConfig.times as Xy)[alongWallAxis] =
              currentWallTimes[alongWallAxis] - cutWallAtStartNbr;
            break;
          default:
            // remove the first 1 or 2 tiles:
            draftConfig.tiles = draftConfig.tiles.slice(cutWallAtStartNbr);
        }
      });
      // door is at the start of the wall, so cut the first part
      yield [id, modifiedWall];
      continue;
    }

    // number of tiles to cut off at the end of the wall (if is 1 or 2)
    const cutWallAtEndNbr =
      currentWallTimes[alongWallAxis] - relativePosition[alongWallAxis];
    const cutWallAtEnd = cutWallAtEndNbr === 2 || cutWallAtEndNbr === 1;

    // cut either 1 or 2 tiles off the end of the wall:
    if (cutWallAtEnd) {
      const modifiedWall = produce(item, (itemDraft) => {
        const draftConfig = itemDraft.config;

        switch (draftConfig.direction) {
          case "towards":
          case "right":
            (draftConfig.times as Xy)[alongWallAxis] =
              currentWallTimes[alongWallAxis] - cutWallAtEndNbr;
            break;

          default:
            // remove the last 1 or 2 tiles:
            draftConfig.tiles = draftConfig.tiles.slice(0, -cutWallAtEndNbr);
        }
      });
      // door is at the end of the wall, so cut the last part:
      yield [id, modifiedWall];
      continue; // cut it at the end, now this door can't do anything else to cut into this wall
    }

    // if not cutting the door at either end, cut into two parts:
    //if (!cutWallAtStart && !cutWallAtEnd) {
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
          draftConfig.tiles = draftConfig.tiles.slice(
            relativePosition[alongWallAxis] + 2,
          );
      }
    });
    yield [`${id}/afterDoor` as EditorRoomItemId, modifiedWallAfter];

    // remove the pre-splitting item:
    yield [id, null];
    //}
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

  for (const [itemId, modifiedWall] of generateHoleInWallsForDoor(
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
