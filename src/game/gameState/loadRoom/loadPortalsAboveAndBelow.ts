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
  if (roomJson.roomBelow !== undefined) {
    // the below portals should come with a floor with floorType='none' - base on the footprint
    // of these floors:
    for (const floor of iterateRoomItems(roomStateItems).filter(isFloor)) {
      const {
        config: { naturalFootprint },
      } = floor;

      // yield a portal for going to the room below:
      yield {
        ...defaultItemProperties,
        ...{
          type: "portal",
          id: "floor/portal" as RoomItemId,
          fixedZIndex: nonRenderingItemFixedZIndex,
          config: {
            toRoom: roomJson.roomBelow,
            // floor and ceiling relative points are the middle of the portal, this fixes
            // falling into dissimilar-sized rooms, ie penitentiary21 falling into penitentiary20
            relativePoint: {
              x: naturalFootprint.aabb.x / 2,
              y: naturalFootprint.aabb.y / 2,
              // the relative point is on the top of the aabb - the top edge
              // of the floor portal is the one we're expecting to interact with
              z: naturalFootprint.aabb.z,
            },
            direction: unitVectors["down"],
          },

          aabb: naturalFootprint.aabb,
          state: {
            ...defaultBaseState(),
            position: naturalFootprint.position,
          },
          renders: false,
        },
      } satisfies ItemInPlay<"portal", RoomId, RoomItemId>;
    }
  }

  if (roomJson.roomAbove !== undefined) {
    for (const floor of iterateRoomItems(roomStateItems).filter(isFloor)) {
      const {
        config: { naturalFootprint },
      } = floor;

      yield {
        ...defaultItemProperties,
        ...{
          type: "portal",
          id: "ceilingPortal" as RoomItemId,
          fixedZIndex: nonRenderingItemFixedZIndex,
          config: {
            toRoom: roomJson.roomAbove,
            // floor and ceiling relative points are the middle of the portal, this fixes
            // falling into dissimilar-sized rooms, ie penitentiary21 falling into penitentiary20
            relativePoint: {
              ...(roomJson.ceilingRelativePoint !== undefined ?
                blockXyzToFineXyz(roomJson.ceilingRelativePoint)
              : {
                  x: naturalFootprint.aabb.x / 2,
                  y: naturalFootprint.aabb.y / 2,
                }),
              z: -blockSizePx.h,
            },
            direction: unitVectors["up"],
          },

          aabb: { ...naturalFootprint.aabb, z: blockSizePx.h },
          state: {
            ...defaultBaseState(),
            position: addXyz(
              naturalFootprint.position,
              {
                z: naturalFootprint.aabb.z,
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
}
