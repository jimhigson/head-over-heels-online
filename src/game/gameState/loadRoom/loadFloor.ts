import {
  itemBehaviourKey,
  type ItemInPlay,
} from "../../../model/itemInPlay/ItemInPlay";
import type { JsonItem } from "../../../model/json/JsonItem";
import { completeTimesXy, completeTimesXyz } from "../../../model/times";
import { keys, valuesIter } from "../../../utils/entries";
import { unitVectors } from "../../../utils/vectors/unitVectors";
import {
  addXyz,
  boxWithSize,
  type DirectionXy4,
} from "../../../utils/vectors/vectors";
import { fullBlockAabb } from "../../collision/boundingBoxes";
import { multiplyBoundingBox } from "../../collision/multiplyBoundingBox";
import { getBehaviourForItemTypeAndConfig } from "../../itemBehaviours/attachBehaviourToItem";
import { blockXyzToFineXyz } from "../../render/projections";
import type { RoomDirectionalIndex } from "./buildRoomJsonDirectionalIndex";
import { defaultBaseState } from "./itemDefaultStates";

// a value of 3 makes items less likely to get pushed through the floor if
// there are collisions on-load, than if it were just 1.
const floorThicknessBlocks = 3;
/**
 * how much (in blocks) the floor physically extends through a doorway so a
 * player can't fall out of the world in the doorway. A whole 0.5 block (an
 * integer number of pixels) so the floor's aabb - and therefore its rendered
 * position - always lands exactly on the pixel grid, at every camera angle.
 * The apparently-far ("back") edges are *drawn* a further 0.02 block so they
 * meet the back wall like the original game; that cosmetic overhang lives in
 * the floor appearance / render box only (see floorBackEdgeOverhangBlocks in
 * makeItemRenderBoxAtCameraAngle), keyed off the doorExpandedSides this loader bakes into
 * the floor's config
 */
const extraFloorAmountForDoors = 0.5;

export const loadFloor = <RoomId extends string, RoomItemId extends string>(
  itemId: RoomItemId,
  floorJson: JsonItem<"floor", RoomId, RoomItemId>,
  directionalIndex: RoomDirectionalIndex<RoomId, RoomItemId>,
): ItemInPlay<"floor", RoomId, RoomItemId> => {
  const {
    config: { times: jsonTimes },
    position: floorBlockPosition,
  } = floorJson;
  // although the json can't have z, for consistency with other items, in-play floors get the full xyz
  const timesCompleted = completeTimesXyz(jsonTimes);

  const naturalPositionBlocks = addXyz(floorBlockPosition, {
    z: -floorThicknessBlocks,
  });
  const naturalAabbBlocks = {
    ...timesCompleted,
    z: floorThicknessBlocks,
  };
  let adjustedPositionBlocks = naturalPositionBlocks;
  let adjustedSizeBlocks = naturalAabbBlocks;

  const doorsIter = valuesIter(directionalIndex.doors).flatMap(
    (doorsAtLocation) => valuesIter(doorsAtLocation),
  );

  // can only expand once per direction:
  const expandedDirections: { [d in DirectionXy4]?: true } = {};

  const thisFloorMaxX = naturalPositionBlocks.x + timesCompleted.x;
  const thisFloorMaxY = naturalPositionBlocks.y + timesCompleted.y;

  /**
   * is there another floor at the same level lying flush against the given edge of
   * this floor? if so, expanding through a door on that edge would push this floor
   * into the neighbour - and the neighbour already provides the floor seen through
   * the doorway, so the expansion is both redundant and the cause of a collision
   */
  const hasAdjacentFloorTo = (direction: DirectionXy4): boolean =>
    directionalIndex.floors.some((other) => {
      if (other === floorJson || other.position.z !== floorBlockPosition.z) {
        return false;
      }
      const otherTimesCompleted = completeTimesXy(other.config.times);
      const otherMaxX = other.position.x + otherTimesCompleted.x;
      const otherMaxY = other.position.y + otherTimesCompleted.y;
      const overlapsOnX =
        other.position.x < thisFloorMaxX && naturalPositionBlocks.x < otherMaxX;
      const overlapsOnY =
        other.position.y < thisFloorMaxY && naturalPositionBlocks.y < otherMaxY;

      switch (direction) {
        case "towards":
          return otherMaxY === naturalPositionBlocks.y && overlapsOnX;
        case "away":
          return other.position.y === thisFloorMaxY && overlapsOnX;
        case "right":
          return otherMaxX === naturalPositionBlocks.x && overlapsOnY;
        case "left":
          return other.position.x === thisFloorMaxX && overlapsOnY;
        default:
          return direction satisfies never;
      }
    });

  // not possible in the original game where floors are always at height 0,
  // but in the remake, don't extend floors that are not at ground level
  // - this could maybe be improved by only loading a door's legs as far
  // down as the closest floor below it, and then extending all floors
  // that legs would reach down to
  if (floorBlockPosition.z === 0) {
    // find any doors that sit on the edge of this floor, and expand as necessary
    for (const doorJson of doorsIter) {
      const {
        position: doorJsonPosition,
        config: { direction },
      } = doorJson;

      switch (direction) {
        case "towards":
          if (
            !expandedDirections.towards &&
            // in on the edge of the flor in the door's axis of travel:
            doorJsonPosition.y === naturalPositionBlocks.y &&
            // in the range of the floor on the axis the door is sitting on:
            doorJsonPosition.x >= naturalPositionBlocks.x &&
            doorJsonPosition.x <=
              naturalPositionBlocks.x + timesCompleted.x - 2 &&
            // unless another floor already lies against this edge (would collide):
            !hasAdjacentFloorTo(direction)
          ) {
            adjustedSizeBlocks = addXyz(adjustedSizeBlocks, {
              y: extraFloorAmountForDoors,
            });
            adjustedPositionBlocks = addXyz(adjustedPositionBlocks, {
              y: -extraFloorAmountForDoors,
            });
            expandedDirections.towards = true;
          }
          break;
        case "away":
          if (
            !expandedDirections.away &&
            // in on the edge of the flor in the door's axis of travel:
            doorJsonPosition.y === naturalPositionBlocks.y + timesCompleted.y &&
            // in the range of the floor on the axis the door is sitting on:
            doorJsonPosition.x >= naturalPositionBlocks.x &&
            doorJsonPosition.x <=
              naturalPositionBlocks.x + timesCompleted.x - 2 &&
            // unless another floor already lies against this edge (would collide):
            !hasAdjacentFloorTo(direction)
          ) {
            adjustedSizeBlocks = addXyz(adjustedSizeBlocks, {
              y: extraFloorAmountForDoors,
            });
            expandedDirections.away = true;
          }
          break;
        case "right":
          if (
            !expandedDirections.right &&
            // in on the edge of the flor in the door's axis of travel:
            doorJsonPosition.x === naturalPositionBlocks.x &&
            // in the range of the floor on the axis the door is sitting on:
            doorJsonPosition.y >= naturalPositionBlocks.y &&
            doorJsonPosition.y <=
              naturalPositionBlocks.y + timesCompleted.y - 2 &&
            // unless another floor already lies against this edge (would collide):
            !hasAdjacentFloorTo(direction)
          ) {
            adjustedSizeBlocks = addXyz(adjustedSizeBlocks, {
              x: extraFloorAmountForDoors,
            });
            adjustedPositionBlocks = addXyz(adjustedPositionBlocks, {
              x: -extraFloorAmountForDoors,
            });
            expandedDirections.right = true;
          }
          break;
        case "left":
          if (
            !expandedDirections.left &&
            // in on the edge of the flor in the door's axis of travel:
            doorJsonPosition.x === naturalPositionBlocks.x + timesCompleted.x &&
            // in the range of the floor on the axis the door is sitting on:
            doorJsonPosition.y >= naturalPositionBlocks.y &&
            doorJsonPosition.y <=
              naturalPositionBlocks.y + timesCompleted.y - 2 &&
            // unless another floor already lies against this edge (would collide):
            !hasAdjacentFloorTo(direction)
          ) {
            adjustedSizeBlocks = addXyz(adjustedSizeBlocks, {
              x: extraFloorAmountForDoors,
            });
            expandedDirections.left = true;
          }
          break;
        default:
          direction satisfies never;
      }
    }
  }

  const floorPosition = blockXyzToFineXyz(adjustedPositionBlocks);
  const floorAabb = multiplyBoundingBox(fullBlockAabb, adjustedSizeBlocks);

  const config = {
    ...floorJson.config,
    times: timesCompleted,
    // side names become outward unit vectors in-play:
    doorExpandedSides: keys(expandedDirections).map((d) => unitVectors[d]),
    naturalFootprint: {
      aabb: multiplyBoundingBox(fullBlockAabb, naturalAabbBlocks),
      position: blockXyzToFineXyz(naturalPositionBlocks),
    },
  };
  return {
    type: "floor",
    // floors never animate, so the hash (only used to de-synchronise animations) is irrelevant:
    hash: 0,
    id: itemId,
    jsonItemId: itemId,
    config,
    [itemBehaviourKey]: getBehaviourForItemTypeAndConfig("floor", config),
    state: {
      ...defaultBaseState(),
      // lower the floor by one block, since its position in the json is relative to
      // it's top side
      box: boxWithSize(floorPosition, floorAabb),
    },
  };
};
