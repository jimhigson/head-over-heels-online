import { produce } from "immer";

import { entries } from "../../utils/entries";
import {
  addXyz,
  type DirectionXy4,
  perpendicularAxisXy,
  subXyz,
  tangentAxis,
  type Xy,
  type Xyz,
} from "../../utils/vectors/vectors";
import { type JsonItem, type JsonItemUnion } from "../json/JsonItem";
import { completeTimesXy, wallTimes } from "../times";

export function* generateHoleInWallsForDoor<
  RoomId extends string,
  RoomItemId extends string,
>(
  items: Record<RoomItemId, JsonItemUnion<RoomId, RoomItemId> | null>,
  doorDirection: DirectionXy4,
  doorPosition: Xyz,
): Generator<[RoomItemId, JsonItem<"wall", RoomId, RoomItemId> | null]> {
  for (const entry of entries(items)) {
    const [id, item] = entry;

    if (item === null) {
      continue;
    }

    if (item.type !== "wall") {
      continue;
    }
    if (item.config.direction !== doorDirection) {
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
      continue;
    }

    if (relativePosition[alongWallAxis] < -1) {
      continue;
    }

    if (relativePosition[alongWallAxis] >= currentWallTimes[alongWallAxis]) {
      continue;
    }

    if (
      relativePosition[alongWallAxis] === 0 &&
      currentWallTimes[alongWallAxis] === 2
    ) {
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
      yield [id, modifiedWall];
      continue;
    }

    // number of tiles to cut off at the end of the wall (if is 1 or 2)
    const cutWallAtEndNbr =
      currentWallTimes[alongWallAxis] - relativePosition[alongWallAxis];
    const cutWallAtEnd = cutWallAtEndNbr === 2 || cutWallAtEndNbr === 1;

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
      yield [id, modifiedWall];
      continue;
    }

    // if not cutting the door at either end, cut into two parts:
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
    yield [`${id}/beforeDoor` as RoomItemId, modifiedWallBefore];
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
    yield [`${id}/afterDoor` as RoomItemId, modifiedWallAfter];

    // remove the pre-splitting item:
    yield [id, null];
  }
}
