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
  // find any doors that sit on the edge of this floor, and expand as necessary
  for (const doorJson of doorsIter) {
    const {
      position: doorPosition,
      config: { direction },
    } = doorJson;

    switch (direction) {
      case "towards":
        if (doorPosition.y === naturalPositionBlocks.y) {
          adjustedSizeBlocks = addXyz(adjustedSizeBlocks, { y: 0.5 });
          adjustedPositionBlocks = addXyz(adjustedPositionBlocks, {
            y: -0.5,
          });
        }
        break;
      case "away":
        if (doorPosition.y === naturalPositionBlocks.y + times.y) {
          adjustedSizeBlocks = addXyz(adjustedSizeBlocks, { y: 0.5 });
        }
        break;
      case "right":
        if (doorPosition.x === naturalPositionBlocks.x) {
          adjustedSizeBlocks = addXyz(adjustedSizeBlocks, { x: 0.5 });
          adjustedPositionBlocks = addXyz(adjustedPositionBlocks, {
            x: -0.5,
          });
        }
        break;
      case "left":
        if (doorPosition.x === naturalPositionBlocks.x + times.x) {
          adjustedSizeBlocks = addXyz(adjustedSizeBlocks, { x: 0.5 });
        }
        break;
      default:
        direction satisfies never;
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
