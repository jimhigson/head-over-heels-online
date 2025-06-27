import { produce } from "immer";
import { entries, fromAllEntries } from "../../../utils/entries";
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
  EditorRoomJsonItemUnion,
  EditorRoomJson,
} from "../../EditorRoomId";
import {
  completeTimesXy,
  wallTimes,
} from "../../../game/collision/boundingBoxTimes";

function* iterateRoomItemsToCutWallsForDoors(
  items: EditorRoomJsonItems,
  doorDirection: DirectionXy4,
  doorPosition: Xyz,
): Generator<[EditorRoomItemId, EditorRoomJsonItemUnion]> {
  for (const entry of entries(items)) {
    const [id, item] = entry;
    if (item.type !== "wall") {
      yield entry; // not a wall, so no need to cut
      continue;
    }
    if (item.config.direction !== doorDirection) {
      yield entry; // wall not facing in the direction that this door would cut
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
      yield entry; // door is not on this wall's plane
      continue;
    }

    if (relativePosition[alongWallAxis] < -1) {
      yield entry; // door is before the start of this wall
      continue;
    }

    if (relativePosition[alongWallAxis] > currentWallTimes[alongWallAxis]) {
      yield entry; // door is after the end of this wall
      continue;
    }

    if (currentWallTimes[alongWallAxis] === 2) {
      // door completely replaces this wall. Yield nothing.
      continue;
    }

    const cutWallAtStart = relativePosition[alongWallAxis] === 0;

    if (cutWallAtStart) {
      // door is at the start of the wall, so cut the first part
      yield [
        id,
        produce(item, (itemDraft) => {
          itemDraft.position = addXyz(wallPosition, { [alongWallAxis]: 2 });
          const draftConfig = itemDraft.config;

          switch (draftConfig.direction) {
            case "towards":
              draftConfig.times = {
                x: currentWallTimes[alongWallAxis] - 2,
              };
              break;
            case "right":
              draftConfig.times = {
                y: currentWallTimes[alongWallAxis] - 2,
              };
              break;
            default:
              // remove the first two tiles:
              draftConfig.tiles = draftConfig.tiles.slice(2);
          }
        }),
      ];
    }

    const cutWallAtEnd =
      relativePosition[alongWallAxis] === currentWallTimes[alongWallAxis] - 2;
    if (cutWallAtEnd) {
      // door is at the end of the wall, so cut the last part:
      yield [
        id,
        produce(item, (itemDraft) => {
          const draftConfig = itemDraft.config;

          switch (draftConfig.direction) {
            case "towards":
              draftConfig.times = {
                x: currentWallTimes[alongWallAxis] - 2,
              };
              break;
            case "right":
              draftConfig.times = {
                y: currentWallTimes[alongWallAxis] - 2,
              };
              break;
            default:
              // remove the last two tiles:
              draftConfig.tiles = draftConfig.tiles.slice(0, -2);
          }
        }),
      ];
    }

    // if not cutting the door at either end, cut into two parts:
    if (!cutWallAtStart && !cutWallAtEnd) {
      yield [
        `${id}/beforeDoor` as EditorRoomItemId,
        produce(item, (itemDraft) => {
          const draftConfig = itemDraft.config;
          switch (draftConfig.direction) {
            case "towards":
              draftConfig.times = {
                x: relativePosition[alongWallAxis],
              };
              break;
            case "right":
              draftConfig.times = {
                y: relativePosition[alongWallAxis],
              };
              break;
            default:
              draftConfig.tiles = draftConfig.tiles.slice(
                0,
                relativePosition[alongWallAxis],
              );
          }
        }),
      ];
      yield [
        `${id}/afterDoor` as EditorRoomItemId,
        produce(item, (itemDraft) => {
          itemDraft.position = {
            ...wallPosition,
            [alongWallAxis]: doorPosition[alongWallAxis] + 2,
          };

          const draftConfig = itemDraft.config;
          switch (draftConfig.direction) {
            case "towards":
              draftConfig.times = {
                x:
                  currentWallTimes[alongWallAxis] -
                  relativePosition[alongWallAxis] -
                  2,
              };
              break;
            case "right":
              draftConfig.times = {
                y:
                  currentWallTimes[alongWallAxis] -
                  relativePosition[alongWallAxis] -
                  2,
              };
              break;
            default:
              draftConfig.tiles = draftConfig.tiles.slice(
                relativePosition[alongWallAxis] + 2,
              );
          }
        }),
      ];
    }
  }
}

export const cutHoleInWallsForDoors = (
  room: EditorRoomJson,
  doorDirection: DirectionXy4,
  blockPosition: Xyz,
) => {
  room.items = fromAllEntries(
    iterateRoomItemsToCutWallsForDoors(
      room.items,
      doorDirection,
      blockPosition,
    ),
  );
};
