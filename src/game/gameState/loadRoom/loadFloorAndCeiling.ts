import { roomHeightBlocks } from "@/game/physics/mechanicsConstants";
import { blockXyzToFineXyz } from "@/game/render/projectToScreen";
import { defaultItemProperties } from "@/model/defaultItemProperties";
import type { UnknownItemInPlay, ItemInPlay } from "@/model/ItemInPlay";
import type { RoomJson } from "@/model/modelTypes";
import type { PlanetName } from "@/sprites/planets";
import { blockSizePx } from "@/sprites/spritePivots";
import { addXy, addXyz, subXyz } from "@/utils/vectors";

export function* loadFloorAndCeiling<RoomId extends string>(
  room: RoomJson<PlanetName, RoomId>,
): Generator<UnknownItemInPlay<RoomId>> {
  const aabb = {
    ...blockXyzToFineXyz(addXy(room.size, { x: 2, y: 2 })),
    z: 0,
  };
  const floorPosition = blockXyzToFineXyz({ x: -1, y: -1, z: 0 });

  if (room.floor === "none" && room.roomBelow !== undefined)
    yield {
      ...defaultItemProperties,
      ...{
        type: "portal",
        id: "floor",
        config: {
          toRoom: room.roomBelow,
          relativePoint: floorPosition,
          direction: "down",
        },
        // the floor's bounding box is extended to be 1 block bigger than the room in
        // all directions - this is because doors extend outside of the box by half a block
        // on the towards/left sides. Since the floor doesn't render, it doesn't matter
        // for z-sorting how big it is. Althoughao it probably wouldn't happen anyway, this
        // safeguards against falling 'off the edge of the world'
        aabb,
        state: {
          position: floorPosition,
          expires: null,
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
        aabb,
        state: {
          position: floorPosition,
          expires: null,
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
          relativePoint: subXyz(ceilingPosition, { z: blockSizePx.h }),
          direction: "up",
        },
        // the floor's bounding box is extended to be 1 block bigger than the room in
        // all directions - this is because doors extend outside of the box by half a block
        // on the towards/left sides. Since the floor doesn't render, it doesn't matter
        // for z-sorting how big it is. Althoughao it probably wouldn't happen anyway, this
        // safeguards against falling 'off the edge of the world'
        aabb,
        state: {
          position: ceilingPosition,
          expires: null,
        },
        renders: false,
      },
    } satisfies ItemInPlay<"portal", PlanetName, RoomId>;
  }
}