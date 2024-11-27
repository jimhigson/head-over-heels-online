import { roomHeightBlocks } from "@/game/physics/mechanicsConstants";
import { blockXyzToFineXyz } from "@/game/render/projectToScreen";
import { defaultItemProperties } from "@/model/defaultItemProperties";
import type { UnknownItemInPlay, ItemInPlay } from "@/model/ItemInPlay";
import type { RoomJson } from "@/model/modelTypes";
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

  if (room.floor === "none" && room.roomBelow !== undefined)
    yield {
      ...defaultItemProperties,
      ...{
        type: "portal",
        id: "floor",
        config: {
          toRoom: room.roomBelow,
          relativePoint: originXyz,
          direction: "down",
        },
        // the floor's bounding box is extended to be 1 block bigger than the room in
        // all directions - this is because doors extend outside of the box by half a block
        // on the towards/left sides. Since the floor doesn't render, it doesn't matter
        // for z-sorting how big it is. Althoughao it probably wouldn't happen anyway, this
        // safeguards against falling 'off the edge of the world'
        aabb: floorCeilingAabb,
        state: {
          position: floorPosition,
          expires: null,
          stoodOnBy: [],
          unsolidAfterProgression: -1,
        },
        renders: false,
      },
    } satisfies ItemInPlay<"portal", PlanetName, RoomId>;
  else
    yield {
      ...defaultItemProperties,
      ...{
        type: "floor",
        id: "floor",
        config: {
          deadly: room.floor === "deadly",
        },
        // the floor's bounding box is extended to be 1 block bigger than the room in
        // all directions - this is because doors extend outside of the box by half a block
        // on the towards/left sides. Since the floor doesn't render, it doesn't matter
        // for z-sorting how big it is. Althoughao it probably wouldn't happen anyway, this
        // safeguards against falling 'off the edge of the world'
        aabb: floorCeilingAabb,
        state: {
          position: floorPosition,
          expires: null,
          stoodOnBy: [],
          unsolidAfterProgression: null,
        },
        renders: false,
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
        // the floor's bounding box is extended to be 1 block bigger than the room in
        // all directions - this is because doors extend outside of the box by half a block
        // on the towards/left sides. Since the floor doesn't render, it doesn't matter
        // for z-sorting how big it is. Althoughao it probably wouldn't happen anyway, this
        // safeguards against falling 'off the edge of the world'
        aabb: floorCeilingAabb,
        state: {
          position: ceilingPosition,
          expires: null,
          stoodOnBy: [],
          unsolidAfterProgression: -1,
        },
        renders: false,
      },
    } satisfies ItemInPlay<"portal", PlanetName, RoomId>;
  }
}
