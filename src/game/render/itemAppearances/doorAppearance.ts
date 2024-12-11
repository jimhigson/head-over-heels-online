import type { Container } from "pixi.js";
import { createSprite } from "../createSprite";
import { doorTexture } from "./doorTexture";
import { projectBlockXyzToScreenXy } from "../projectToScreen";
import type { UnknownRoomState } from "../../../model/modelTypes";
import { doorTexturePivot } from "../../../sprites/spritePivots";
import { blockSizePx } from "../../../sprites/spritePivots";
import { edgePaletteSwapFilters } from "../filters/paletteSwapFilters";
import type { Xy } from "../../../utils/vectors/vectors";
import {
  perpendicularAxisXy,
  doorAlongAxis,
  originXy,
  addXy,
} from "../../../utils/vectors/vectors";
import type { ItemInPlay } from "../../../model/ItemInPlay";
import { iterateToContainer } from "../../iterateToContainer";
import type { ItemAppearance } from "./appearanceUtils";
import { renderOnce } from "./appearanceUtils";

function* doorLegsGenerator(
  { config: { direction, inHiddenWall, height } }: ItemInPlay<"doorLegs">,
  room: UnknownRoomState,
): Generator<Container> {
  const axis = doorAlongAxis(direction);

  // drag legs etc
  const pivotX = axis === "y" ? 0 : 16;

  function* legGenerator(offset: Xy): Generator<Container> {
    if (inHiddenWall) {
      if (height !== 0) {
        //draw the 'floating' (no legs) threshold:
        const pivotX = axis === "x" ? 18 : 8;

        const sprite = createSprite({
          pivot: { x: pivotX, y: 12 },
          texture: `generic.door.floatingThreshold.${axis}`,
          ...addXy(offset, {
            y: -blockSizePx.h * height,
          }),
        });
        sprite.filters = edgePaletteSwapFilters(
          room,
          axis === "x" ? "towards" : "right",
        );
        yield sprite;
      }
    } else {
      yield createSprite({
        pivot: { x: pivotX, y: 12 },
        texture: "generic.door.legs.base",
        ...addXy(offset, {
          y: height,
        }),
      });

      for (let h = 1; h < height; h++) {
        yield createSprite({
          pivot: { x: pivotX, y: 9 },
          texture: "generic.door.legs.pillar",
          ...addXy(offset, {
            y: -h * blockSizePx.h,
          }),
        });
      }
    }
  }

  yield* legGenerator(projectBlockXyzToScreenXy({ ...originXy, [axis]: 1 }));
  yield* legGenerator(originXy);
  if (!inHiddenWall) {
    // non-floating threshold
    yield createSprite({
      pivot: { x: 16, y: blockSizePx.h * height + 13 },
      texture: `generic.door.legs.threshold.double.${axis}`,
      ...projectBlockXyzToScreenXy({ ...originXy, [axis]: 1 }),
    });
  }
}
export const doorLegsAppearance: ItemAppearance<"doorLegs"> = renderOnce(
  ({ item: doorLegsItem, room }) => {
    return iterateToContainer(doorLegsGenerator(doorLegsItem, room));
  },
);

function* doorFrameGenerator(
  {
    config: { direction, inHiddenWall, nearness },
    state: { position },
  }: ItemInPlay<"doorFrame">,
  room: UnknownRoomState,
): Generator<Container> {
  const axis = doorAlongAxis(direction);
  const { z } = position;

  if (!inHiddenWall) {
    // in a drawn wall:
    if (z === 0) {
      const offset = projectBlockXyzToScreenXy({
        [perpendicularAxisXy(axis)]: 0.5,
      });

      if (nearness === "far") {
        // hide the floor behind the door
        yield createSprite({
          anchor: { x: 0, y: 1 },
          flipX: axis === "x",
          texture: "generic.wall.overdraw",
          ...offset,
        });
      }
    }
  }

  // draw the actual door frame
  yield createSprite({
    texture: doorTexture(room, axis, nearness),
    pivot: doorTexturePivot[nearness][axis],
  });
}
export const doorFrameAppearance: ItemAppearance<"doorFrame"> = renderOnce(
  ({ item: doorFrameItem, room }) => {
    return iterateToContainer(doorFrameGenerator(doorFrameItem, room));
  },
);
