import { defaultItemProperties } from "../../../model/defaultItemProperties";
import type { ItemInPlay } from "../../../model/ItemInPlay";
import type { RoomJson } from "../../../model/RoomJson";
import { blockSizePx } from "../../../sprites/spritePivots";
import { unitVectors } from "../../../utils/vectors/unitVectors";
import { originXy, addXyz } from "../../../utils/vectors/vectors";
import { defaultRoomHeightBlocks } from "../../physics/mechanicsConstants";
import { blockXyzToFineXyz } from "../../render/projections";
import { nonRenderingItemFixedZIndex } from "../../render/sortZ/fixedZIndexes";
import { defaultBaseState } from "./itemDefaultStates";

export function* loadPortalsAboveAndBelow<
  RoomId extends string,
  RoomItemId extends string,
>(
  roomJson: RoomJson<RoomId, RoomItemId>,
): Generator<
  | ItemInPlay<"floor", RoomId, RoomItemId>
  | ItemInPlay<"portal", RoomId, RoomItemId>
> {
  const roomHeightBlocks = roomJson.size.z ?? defaultRoomHeightBlocks;

  const roomNaturalFootprintAabb = blockXyzToFineXyz({
    ...roomJson.size,
    z: 1,
  });

  const floorPosition = blockXyzToFineXyz({ ...originXy, z: -1 });

  if (roomJson.roomBelow !== undefined) {
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
            x: roomNaturalFootprintAabb.x / 2,
            y: roomNaturalFootprintAabb.y / 2,
            // the relative point is on the top of the aabb - the top edge
            // of the floor portal is the one we're expecting to interact with
            z: roomNaturalFootprintAabb.z,
          },
          direction: unitVectors["down"],
        },

        aabb: roomNaturalFootprintAabb,
        state: {
          ...defaultBaseState(),
          position: floorPosition,
        },
        renders: false,
      },
    } satisfies ItemInPlay<"portal", RoomId, RoomItemId>;
  }

  if (roomJson.roomAbove !== undefined) {
    const ceilingPosition = addXyz(floorPosition, {
      z: blockSizePx.h * roomHeightBlocks,
    });
    yield {
      ...defaultItemProperties,
      ...{
        type: "portal",
        id: "ceiling" as RoomItemId,
        fixedZIndex: nonRenderingItemFixedZIndex,
        config: {
          toRoom: roomJson.roomAbove,
          // floor and ceiling relative points are the middle of the portal, this fixes
          // falling into dissimilar-sized rooms, ie penitentiary21 falling into penitentiary20
          relativePoint: {
            ...(roomJson.ceilingRelativePoint !== undefined ?
              blockXyzToFineXyz(roomJson.ceilingRelativePoint)
            : {
                x: roomNaturalFootprintAabb.x / 2,
                y: roomNaturalFootprintAabb.y / 2,
              }),
            z: -blockSizePx.h,
          },
          direction: unitVectors["up"],
        },

        aabb: roomNaturalFootprintAabb,
        state: {
          ...defaultBaseState(),
          position: ceilingPosition,
        },
      },
    } satisfies ItemInPlay<"portal", RoomId, RoomItemId>;
  }
}
