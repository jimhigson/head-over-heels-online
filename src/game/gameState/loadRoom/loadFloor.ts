import { blockXyzToFineXyz } from "../../render/projections";
import type { ItemInPlay } from "../../../model/ItemInPlay";
import { addXyz, originXyz } from "../../../utils/vectors/vectors";
import type { JsonItemUnion } from "../../../model/json/JsonItem";
import { type JsonItem } from "../../../model/json/JsonItem";

import {
  fullBlockAabb,
  multiplyBoundingBox,
} from "../../collision/boundingBoxes";
import type { RoomJson } from "../../../model/RoomJson";
import { defaultBaseState } from "./itemDefaultStates";
import { objectValues } from "iter-tools";
import { iterate } from "../../../utils/iterate";

// can't take room height blocks times block height, or it is still possible to
// jump over the wall in some cases in rooms without a ceiling portal.
// a value of 3 makes items less likely to get pushed through the floor if
// there are collisions on-load, than if it were just 1.
export const floorThicknessBlocks = 3;
/**
 * the room edge is much thinner since we don't have to worry about things
 * being pushed through it
 */
export const floorEdgeRenderThicknessPx = 10;

/**
 * how much (in blocks) to extend the floor for doors?
 * this value (for far) happens to give the right amount of floor drawn visible 'through'
 * the door to match the original game.
 *
 * I could extend the rendering, but with floors as first-class items, this impacts
 * non-extended floors too, and makes them draw too much
 */
const extraFloorAmountForDoorsFar = 0.52;
const extraFloorAmountForDoorsNear = 0.5;

export const loadFloor = <RoomId extends string, RoomItemId extends string>(
  itemId: RoomItemId,
  floorJson: JsonItem<"floor", RoomId, RoomItemId>,
  roomJson: RoomJson<RoomId, RoomItemId>,
): ItemInPlay<"floor", RoomId, RoomItemId> => {
  const {
    config: { times },
    position: floorBlockPosition,
  } = floorJson;

  const naturalPositionBlocks = addXyz(floorBlockPosition, {
    z: -floorThicknessBlocks,
  });
  const naturalAabbBlocks = {
    ...times,
    z: floorThicknessBlocks,
  };
  let adjustedPositionBlocks = naturalPositionBlocks;
  let adjustedSizeBlocks = naturalAabbBlocks;

  const doorsIter = iterate(objectValues<JsonItemUnion>(roomJson.items)).filter(
    (jsonItem) => jsonItem.type === "door",
  );

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
          if (doorJsonPosition.y === naturalPositionBlocks.y) {
            adjustedSizeBlocks = addXyz(adjustedSizeBlocks, {
              y: extraFloorAmountForDoorsNear,
            });
            adjustedPositionBlocks = addXyz(adjustedPositionBlocks, {
              y: -extraFloorAmountForDoorsNear,
            });
          }
          break;
        case "away":
          if (doorJsonPosition.y === naturalPositionBlocks.y + times.y) {
            adjustedSizeBlocks = addXyz(adjustedSizeBlocks, {
              y: extraFloorAmountForDoorsFar,
            });
          }
          break;
        case "right":
          if (doorJsonPosition.x === naturalPositionBlocks.x) {
            adjustedSizeBlocks = addXyz(adjustedSizeBlocks, {
              x: extraFloorAmountForDoorsNear,
            });
            adjustedPositionBlocks = addXyz(adjustedPositionBlocks, {
              x: -extraFloorAmountForDoorsNear,
            });
          }
          break;
        case "left":
          if (doorJsonPosition.x === naturalPositionBlocks.x + times.x) {
            adjustedSizeBlocks = addXyz(adjustedSizeBlocks, {
              x: extraFloorAmountForDoorsFar,
            });
          }
          break;
        default:
          direction satisfies never;
      }
    }
  }

  const floorPosition = blockXyzToFineXyz(adjustedPositionBlocks);
  const floorAabb = multiplyBoundingBox(fullBlockAabb, adjustedSizeBlocks);

  return {
    type: "floor",
    id: itemId,
    jsonItemId: itemId,
    config: {
      ...floorJson.config,
      naturalFootprint: {
        aabb: multiplyBoundingBox(fullBlockAabb, naturalAabbBlocks),
        position: blockXyzToFineXyz(naturalPositionBlocks),
      },
    },
    aabb: floorAabb,
    // the floor is 1px thick for the sake of rendering
    renderAabb: {
      ...floorAabb,
      z: floorEdgeRenderThicknessPx,
    },
    renderAabbOffset: {
      ...originXyz,
      z: floorAabb.z - floorEdgeRenderThicknessPx,
    },

    // unusual for a floor to cast a shadow, but could be raised somehow in the remake engine
    shadowCastTexture: "shadow.fullBlock",

    // floors don't get a fixedZIndes - if there is only one
    // of them. Otherwise, they can be in front/behind each other, and need
    // to be sorted to get the relative z-position between floors correct
    state: {
      ...defaultBaseState(),
      // lower the floor by one block, since its position in the json is relative to
      // it's top side
      position: floorPosition,
    },
  };
};
