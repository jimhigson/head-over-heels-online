import { roomHeightBlocks } from "@/game/physics/mechanicsConstants";
import { blockXyzToFineXyz } from "@/game/render/projectToScreen";
import { floorBlockMinMax } from "@/game/render/renderExtent";
import { defaultItemProperties } from "@/model/defaultItemProperties";
import type { UnknownItemInPlay, ItemInPlay } from "@/model/ItemInPlay";
import type { RoomJson } from "@/model/RoomJson";
import type { PlanetName } from "@/sprites/planets";
import { blockSizePx } from "@/sprites/spritePivots";
import { unitVectors } from "@/utils/vectors/unitVectors";
import { addXyz, originXy, originXyz } from "@/utils/vectors/vectors";

export function* loadFloorAndCeiling<RoomId extends string>(
  roomJson: RoomJson<PlanetName, RoomId>,
): Generator<UnknownItemInPlay<RoomId>> {
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

  if (roomJson.floor === "none" && roomJson.roomBelow !== undefined) {
    // yield a floor purely for the rendering ("no" floor still renders an edge)
    yield {
      ...defaultItemProperties,
      ...{
        type: "floor",
        id: "floor",
        config: {
          deadly: false,
        },

        aabb: roomNaturalFootprintAabb,
        // no shadows on a none floor:
        shadowMask: undefined,
        state: {
          position: floorPosition,
          expires: null,
          stoodOnBy: new Set(),
          disappear: null,
        },
        renders: true,
        fixedZIndex: -1,
      },
    } satisfies ItemInPlay<"floor", PlanetName, RoomId>;
    // yield a portal for going to the room below:
    yield {
      ...defaultItemProperties,
      ...{
        type: "portal",
        id: "floor/portal",
        config: {
          toRoom: roomJson.roomBelow,
          relativePoint: originXyz,
          direction: unitVectors["down"],
        },

        aabb: roomNaturalFootprintAabb,
        state: {
          position: floorPosition,
          expires: null,
          stoodOnBy: new Set(),
          disappear: null,
        },
        renders: false,
      },
    } satisfies ItemInPlay<"portal", PlanetName, RoomId>;
  } else
    yield {
      ...defaultItemProperties,
      ...{
        type: "floor",
        id: "floor",
        config: {
          deadly: roomJson.floor === "deadly",
        },

        aabb: roomExtendedFootprintAabb,
        shadowMask: { relativeTo: "origin" },
        state: {
          position: roomExtendedPosition,
          expires: null,
          stoodOnBy: new Set(),
          disappear: null,
        },
        renders: true,
        fixedZIndex: -1,
      },
    } satisfies ItemInPlay<"floor", PlanetName, RoomId>;

  if (roomJson.roomAbove !== undefined) {
    const ceilingPosition = addXyz(floorPosition, {
      z: blockSizePx.h * roomHeightBlocks,
    });
    yield {
      ...defaultItemProperties,
      ...{
        type: "portal",
        id: "ceiling",
        config: {
          toRoom: roomJson.roomAbove,
          relativePoint: { x: 0, y: 0, z: -blockSizePx.h },
          direction: unitVectors["up"],
        },

        aabb: roomNaturalFootprintAabb,
        state: {
          position: ceilingPosition,
          expires: null,
          stoodOnBy: new Set(),
          disappear: null,
        },
        renders: false,
      },
    } satisfies ItemInPlay<"portal", PlanetName, RoomId>;
  }
}
