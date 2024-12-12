import { roomHeightBlocks } from "@/game/physics/mechanicsConstants";
import { blockXyzToFineXyz } from "@/game/render/projectToScreen";
import { defaultItemProperties } from "@/model/defaultItemProperties";
import type { UnknownItemInPlay, ItemInPlay } from "@/model/ItemInPlay";
import type { RoomJson } from "@/model/RoomJson";
import type { PlanetName } from "@/sprites/planets";
import { blockSizePx } from "@/sprites/spritePivots";
import { addXy, addXyz, originXyz, subXy } from "@/utils/vectors/vectors";

export function* loadFloorAndCeiling<RoomId extends string>(
  room: RoomJson<PlanetName, RoomId>,
): Generator<UnknownItemInPlay<RoomId>> {
  const floorCeilingAabb = {
    ...blockXyzToFineXyz(addXy(room.size)),
    z: 0,
  };
  const floorPosition = blockXyzToFineXyz(subXy(originXyz));

  if (room.floor === "none" && room.roomBelow !== undefined) {
    // yield a floor purely for the rendering ("no" floor still renders an edge)
    yield {
      ...defaultItemProperties,
      ...{
        type: "floor",
        id: "floor",
        config: {
          deadly: false,
        },

        aabb: floorCeilingAabb,
        // no shadows on a none floor:
        shadowMaskTexture: undefined,
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
          toRoom: room.roomBelow,
          relativePoint: originXyz,
          direction: "down",
        },

        aabb: floorCeilingAabb,
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
          deadly: room.floor === "deadly",
        },

        aabb: floorCeilingAabb,
        shadowMaskTexture: "all",
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

  if (room.roomAbove !== undefined) {
    const ceilingPosition = addXyz(floorPosition, {
      z: blockSizePx.h * roomHeightBlocks,
    });
    yield {
      ...defaultItemProperties,
      ...{
        type: "portal",
        id: "ceiling",
        config: {
          toRoom: room.roomAbove,
          relativePoint: { x: 0, y: 0, z: -blockSizePx.h },
          direction: "up",
        },

        aabb: floorCeilingAabb,
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
