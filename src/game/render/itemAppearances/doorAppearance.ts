import { Container } from "pixi.js";
import { createSprite } from "../createSprite";
import { doorTexture } from "./doorTexture";
import {
  projectBlockXyzToScreenXy,
  projectWorldXyzToScreenXy,
} from "../projectToScreen";
import type { UnknownRoomState } from "../../../model/modelTypes";
import { blockSizePx } from "../../../sprites/spritePivots";
import {
  edgePaletteSwapFilters,
  mainPaletteSwapFilter,
} from "../filters/standardFilters";
import type { DirectionXy4, Xy, Xyz } from "../../../utils/vectors/vectors";
import {
  doorAlongAxis,
  originXy,
  addXy,
  perpendicularAxisXy,
} from "../../../utils/vectors/vectors";
import type { ItemInPlay } from "../../../model/ItemInPlay";
import { iterateToContainer } from "../../iterateToContainer";
import type { ItemAppearance } from "./ItemAppearance";
import { itemRenderOnce } from "./ItemAppearance";

function* doorLegsGenerator(
  { config: { direction, inHiddenWall, height } }: ItemInPlay<"doorLegs">,
  room: UnknownRoomState,
): Generator<Container> {
  const axis = doorAlongAxis(direction);

  // drag legs etc
  const pivotX = axis === "y" ? 1 : 16;

  function* legGenerator(
    /** an offset, since doors have two legs and they can't render in exactly the same place */
    offset: Xy,
  ): Generator<Container> {
    if (inHiddenWall) {
      if (height !== 0) {
        //draw the 'floating' (no legs) threshold:

        const sprite = createSprite({
          textureId: `generic.door.floatingThreshold.${axis}`,
          ...addXy(offset, {
            y: -blockSizePx.h * height,
          }),
        });
        sprite.filters = edgePaletteSwapFilters(
          room,
          axis === "x" ? "towards" : "right",
          true,
        );
        yield sprite;
      }
    } else {
      yield createSprite({
        pivot: { x: pivotX, y: 9 },
        textureId: "generic.door.legs.base",
        ...addXy(offset, {}),
      });

      for (let h = 1; h < height; h++) {
        yield createSprite({
          pivot: { x: pivotX, y: 9 },
          textureId: "generic.door.legs.pillar",
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
      textureId: `generic.door.legs.threshold.double.${axis}`,
      ...projectBlockXyzToScreenXy({ ...originXy, [axis]: 1 }),
    });
  }
}

/**
 * since door aabbs are like tunnels that extend out of the room, render on the other side of the aabb (the side in the room)
 */
const xyToTranslateToInsideOfRoom = (
  direction: DirectionXy4,
  aabb: Xyz,
): Xy => {
  const axis = doorAlongAxis(direction);
  const crossAxis = perpendicularAxisXy(axis);

  const doorPostRenderedDepth = 8;
  return direction === "towards" || direction === "right" ?
      projectWorldXyzToScreenXy({
        [crossAxis]: aabb[crossAxis] - doorPostRenderedDepth,
      })
    : originXy;
};

export const doorLegsAppearance: ItemAppearance<"doorLegs"> = itemRenderOnce(
  ({ subject: doorLegsItem, renderContext: { room } }) => {
    return iterateToContainer(
      doorLegsGenerator(doorLegsItem, room),
      new Container({
        filters: mainPaletteSwapFilter(room),
        ...xyToTranslateToInsideOfRoom(
          doorLegsItem.config.direction,
          doorLegsItem.aabb,
        ),
      }),
    );
  },
);

export const doorFrameAppearance: ItemAppearance<"doorFrame"> = itemRenderOnce(
  ({
    subject: {
      config: { direction, part },
      aabb,
    },
    renderContext: { room },
  }) => {
    const axis = doorAlongAxis(direction);
    return createSprite({
      textureId: doorTexture(room, axis, part),
      filter: mainPaletteSwapFilter(room),
      ...xyToTranslateToInsideOfRoom(direction, aabb),
    });
  },
);
