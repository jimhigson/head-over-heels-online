import { defaultItemProperties } from "../../../model/defaultItemProperties";
import type { ItemInPlay } from "../../../model/ItemInPlay";
import type { RoomJson } from "../../../model/RoomJson";
import {
  iterateRoomItems,
  type RoomStateItems,
} from "../../../model/RoomState";
import { blockSizePx } from "../../../sprites/spritePivots";
import { unitVectors } from "../../../utils/vectors/unitVectors";
import { addXyz } from "../../../utils/vectors/vectors";
import { isFloor } from "../../physics/itemPredicates";
import { defaultRoomHeightBlocks } from "../../physics/mechanicsConstants";
import { blockXyzToFineXyz } from "../../render/projections";
import { nonRenderingItemFixedZIndex } from "../../render/sortZ/fixedZIndexes";
import { defaultBaseState } from "./itemDefaultStates";

const portalThickness = blockSizePx.h;
/* the z of the top of the portal to below */
const portalToRoomBelowTop = -blockSizePx.h;

/**
 * combine all the floors of the room into one big, rectangular footprint to
 * cover the whole room:
 */
const floorsCombinedFootprint = <
  RoomId extends string,
  RoomItemId extends string,
>(
  roomStateItems: RoomStateItems<RoomId, RoomItemId>,
) => {
  const limits = iterateRoomItems(roomStateItems)
    .filter(isFloor)
    .reduce(
      (
        acc,
        {
          config: {
            naturalFootprint: {
              position: { x, y },
              aabb: { x: width, y: depth },
            },
          },
        },
      ) => {
        const xEnd = x + width;
        const yEnd = y + depth;

        return {
          minX: Math.min(acc.minX, x),
          maxX: Math.max(acc.maxX, xEnd),
          minY: Math.min(acc.minY, y),
          maxY: Math.max(acc.maxY, yEnd),
        };
      },
      {
        minX: Infinity,
        maxX: -Infinity,
        minY: Infinity,
        maxY: -Infinity,
      },
    );

  if (limits.minX > limits.maxY) {
    // nothing found
    return undefined;
  }
  return limits;
};

export function* loadPortalsAboveAndBelow<
  RoomId extends string,
  RoomItemId extends string,
>(
  roomJson: RoomJson<RoomId, RoomItemId>,
  roomStateItems: RoomStateItems<RoomId, RoomItemId>,
): Generator<
  | ItemInPlay<"floor", RoomId, RoomItemId>
  | ItemInPlay<"portal", RoomId, RoomItemId>
> {
  const floorFootprint = floorsCombinedFootprint(roomStateItems);
  if (floorFootprint === undefined) {
    return;
  }

  const { minX, maxX, minY, maxY } = floorFootprint;
  if (roomJson.roomBelow !== undefined) {
    // yield a portal for going to the room below:
    yield {
      ...defaultItemProperties,
      ...{
        type: "portal",
        id: `portal/toRoomBelow` as RoomItemId,
        fixedZIndex: nonRenderingItemFixedZIndex,
        config: {
          toRoom: roomJson.roomBelow,
          // floor and ceiling relative points are the middle of the portal, this fixes
          // falling into dissimilar-sized rooms, ie penitentiary21 falling into penitentiary20
          relativePoint: {
            x: (minX + maxX) / 2,
            y: (minY + maxY) / 2,
            // relative point one block high - this makes the player spawn on top of blocks when
            // transitioning to the room above, since a lot of rooms need you to appear *on* something,
            // and given these rooms usually have 'none' floors it probably isn't the floor
            z: portalThickness + blockSizePx.h,
          },
          direction: unitVectors["down"],
        },

        aabb: {
          x: maxX - minX,
          y: maxY - minY,
          z: portalThickness,
        },
        state: {
          ...defaultBaseState(),
          position: {
            x: minX,
            y: minY,
            z: portalToRoomBelowTop - portalThickness,
          },
        },
        renders: false,
      },
    } satisfies ItemInPlay<"portal", RoomId, RoomItemId>;
  }

  if (roomJson.roomAbove !== undefined) {
    yield {
      ...defaultItemProperties,
      ...{
        type: "portal",
        id: `portal/toRoomAbove` as RoomItemId,
        fixedZIndex: nonRenderingItemFixedZIndex,
        config: {
          toRoom: roomJson.roomAbove,
          // floor and ceiling relative points are the middle of the portal, this fixes
          // falling into dissimilar-sized rooms, ie penitentiary21 falling into penitentiary20
          relativePoint: {
            ...(roomJson.ceilingRelativePoint !== undefined ?
              blockXyzToFineXyz(roomJson.ceilingRelativePoint)
            : {
                x: (minX + maxX) / 2,
                y: (minY + maxY) / 2,
              }),
            z: -blockSizePx.h,
          },
          direction: unitVectors["up"],
        },

        aabb: {
          x: maxX - minX,
          y: maxY - minY,
          z: portalThickness,
        },
        state: {
          ...defaultBaseState(),
          position: addXyz(
            {
              x: minX,
              y: minY,
            },
            {
              z: blockSizePx.h * (roomJson.height ?? defaultRoomHeightBlocks),
            },
          ),
        },
      },
    } satisfies ItemInPlay<"portal", RoomId, RoomItemId>;
  }
}
