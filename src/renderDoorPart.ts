import { Container } from "pixi.js";
import { createSprite } from "./game/render/createSprite";
import { doorTexture } from "./game/render/doorTexture";
import { projectBlockToScreen } from "./game/render/projectToScreen";
import { LoadedDoorConfig } from "./model/Item";
import { UnknownRoomState } from "./model/modelTypes";
import { blockSizePx, doorTexturePivot } from "./sprites/pixiSpriteSheet";
import { edgePaletteSwapFilters } from "./game/render/paletteSwapFilters";
import { AxisXy, crossAxisXy, Xyz } from "./utils/vectors";

function* renderDoorLeg(axis: AxisXy, z: number): Generator<Container> {
  // drag legs etc
  const pivotX = axis === "y" ? 0 : 16;

  yield createSprite({
    pivot: { x: pivotX, y: 9 },
    texture: "generic.door.legs.base",
    y: z,
  });

  for (let zi = z - blockSizePx.h; zi > 0; zi -= blockSizePx.h) {
    yield createSprite({
      pivot: { x: pivotX, y: 9 },
      texture: "generic.door.legs.pillar",
      y: zi,
    });
  }

  yield createSprite({
    pivot: { x: pivotX, y: 15 },
    texture: `generic.door.legs.threshold.${axis}`,
  });
}
export function* renderDoorPart(
  { axis, inHiddenWall }: LoadedDoorConfig<string>,
  room: UnknownRoomState,
  { z }: Xyz,
  /** is this the near post of the doorframe, or the far one? */
  nearness: "near" | "far",
): Generator<Container> {
  if (inHiddenWall) {
    if (z !== 0) {
      //draw the 'floating' threshold:
      const pivotX = axis === "x" ? 18 : 8;

      const sprite = createSprite({
        pivot: { x: pivotX, y: 12 },
        texture: `generic.door.threshold.${axis}`,
      });
      sprite.filters = edgePaletteSwapFilters(
        room,
        axis === "x" ? "towards" : "right",
      );
      yield sprite;
    }
  } else {
    // in a drawn wall:
    if (z !== 0) {
      // drag legs etc
      yield* renderDoorLeg(axis, z);
    } else {
      const offset = projectBlockToScreen({ [crossAxisXy(axis)]: 0.5 });

      if (nearness === "far") {
        yield createSprite({
          anchor: { x: 0, y: 1 },
          flipX: axis === "x",
          texture: "generic.wall.overdraw",
          ...offset,
        });
      }
    }
  }

  // draw the actual door
  yield createSprite({
    texture: doorTexture(room, axis, nearness),
    pivot: doorTexturePivot[nearness][axis],
  });
}
