import { defaultItemProperties } from "../../../model/defaultItemProperties";
import type { ItemInPlay } from "../../../model/ItemInPlay";
import type { StoodOnBy } from "src/model/StoodOnBy";
import type { RoomJson } from "../../../model/RoomJson";
import { blockSizePx } from "../../../sprites/spritePivots";
import { unitVectors } from "../../../utils/vectors/unitVectors";
import { originXy, originXyz, addXyz } from "../../../utils/vectors/vectors";
import { defaultRoomHeightBlocks } from "../../physics/mechanicsConstants";
import { blockXyzToFineXyz } from "../../render/projectToScreen";
import { floorBlockMinMax } from "../../render/renderExtent";
import { defaultBaseState } from "./itemDefaultStates";

export function* loadFloorAndCeiling<
  RoomId extends string,
  RoomItemId extends string,
>(
  roomJson: RoomJson<RoomId, RoomItemId>,
): Generator<
  | ItemInPlay<"floor", RoomId, RoomItemId>
  | ItemInPlay<"floorEdge", RoomId, RoomItemId>
  | ItemInPlay<"portal", RoomId, RoomItemId>
> {
  const roomHeightBlocks = roomJson.size.z ?? defaultRoomHeightBlocks;

  const roomNaturalFootprintAabb = blockXyzToFineXyz({
    ...roomJson.size,
    z: 1,
  });

  const { blockXMax, blockXMin, blockYMax, blockYMin } =
    floorBlockMinMax(roomJson);

  /** room footprint made a bit bigger for the area under doors: */
  const roomExtendedFootprintAabb = blockXyzToFineXyz({
    x: blockXMax - blockXMin,
    y: blockYMax - blockYMin,
    z: 1,
  });

  const floorPosition = blockXyzToFineXyz({ ...originXy, z: -1 });

  const roomExtendedPosition = blockXyzToFineXyz({
    x: blockXMin,
    y: blockYMin,
    z: -1,
  });

  yield {
    id: "floorEdge" as RoomItemId,
    ...defaultItemProperties,
    type: "floorEdge",
    state: {
      ...defaultBaseState<RoomItemId>(),
      // unlike the actual floor, the edge is not set down to have some depth:
      position: { ...roomExtendedPosition, z: 0 },
    },
    // zero-volume:
    aabb: originXyz,
    config: {},
    // this is always rendered in front of everything
    fixedZIndex: 9999,
  };

  if (roomJson.floor === "none" && roomJson.roomBelow !== undefined) {
    // yield a floor purely for the rendering ("no" floor still renders an edge)
    yield {
      ...defaultItemProperties,
      ...{
        type: "floor",
        id: "floor" as RoomItemId,
        config: {
          type: "none",
        },

        aabb: roomNaturalFootprintAabb,
        // no shadows on a none floor:
        shadowMask: undefined,
        state: {
          position: roomExtendedPosition,
          expires: null,
          stoodOnBy: {} as StoodOnBy<RoomItemId>,
          disappear: null,
        },
        renders: true,
        fixedZIndex: -1,
      },
    } satisfies ItemInPlay<"floor", RoomId, RoomItemId>;
    // yield a portal for going to the room below:
    yield {
      ...defaultItemProperties,
      ...{
        type: "portal",
        id: "floor/portal" as RoomItemId,
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
          position: floorPosition,
          expires: null,
          stoodOnBy: {} as StoodOnBy<RoomItemId>,
          disappear: null,
        },
        renders: false,
      },
    } satisfies ItemInPlay<"portal", RoomId, RoomItemId>;
  } else
    yield {
      ...defaultItemProperties,
      ...{
        type: "floor",
        id: "floor" as RoomItemId,
        config: {
          type: roomJson.floor === "deadly" ? "deadly" : "standable",
        },

        aabb: roomExtendedFootprintAabb,
        shadowMask: { relativeTo: "origin" },
        state: {
          position: roomExtendedPosition,
          expires: null,
          stoodOnBy: {} as StoodOnBy<RoomItemId>,
          disappear: null,
        },
        renders: true,
        fixedZIndex: -1,
      },
    } satisfies ItemInPlay<"floor", RoomId, RoomItemId>;

  if (roomJson.roomAbove !== undefined) {
    const ceilingPosition = addXyz(floorPosition, {
      z: blockSizePx.h * roomHeightBlocks,
    });
    yield {
      ...defaultItemProperties,
      ...{
        type: "portal",
        id: "ceiling" as RoomItemId,
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
          position: ceilingPosition,
          expires: null,
          stoodOnBy: {} as StoodOnBy<RoomItemId>,
          disappear: null,
        },
        renders: false,
      },
    } satisfies ItemInPlay<"portal", RoomId, RoomItemId>;
  }
}
