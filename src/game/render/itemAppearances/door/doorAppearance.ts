import { Container } from "pixi.js";

import type { ItemInPlay } from "../../../../model/ItemInPlay";
import type { Campaign } from "../../../../model/modelTypes";
import type { RoomState } from "../../../../model/RoomState";
import type { DirectionXy4, Xy, Xyz } from "../../../../utils/vectors/vectors";
import type { ItemAppearance } from "../ItemAppearance";

import { blockSizePx } from "../../../../sprites/spritePivots";
import { selectMaybeCurrentCampaign } from "../../../../store/selectors";
import { store } from "../../../../store/store";
import { iterateToContainer } from "../../../../utils/pixi/iterateToContainer";
import {
  addXy,
  doorAlongAxis,
  originXy,
  perpendicularAxisXy,
} from "../../../../utils/vectors/vectors";
import { createSprite } from "../../createSprite";
import {
  edgePaletteSwapFilters,
  mainPaletteSwapFilter,
} from "../../filters/standardFilters";
import {
  projectBlockXyzToScreenXy,
  projectWorldXyzToScreenXy,
} from "../../projections";
import { itemAppearanceRenderOnce } from "../ItemAppearance";
import { doorTexture } from "./doorTexture";

function* doorLegsGenerator<RoomId extends string, RoomItemId extends string>(
  {
    config: { direction, inHiddenWall, height },
  }: ItemInPlay<"doorLegs", RoomId, RoomItemId>,
  room: RoomState<RoomId, RoomItemId>,
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
        textureId: `generic.door.legs.base.${axis}`,
        ...addXy(offset, {}),
      });

      for (let h = 1; h < height; h++) {
        yield createSprite({
          pivot: { x: pivotX, y: 9 },
          textureId: `generic.door.legs.pillar.${axis}`,
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
 * since door aabbs are like tunnels that extend out of the room, render
 * on the other side of the aabb (the side in the room)
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

export const doorLegsAppearance: ItemAppearance<"doorLegs"> =
  itemAppearanceRenderOnce(({ renderContext: { item, room } }) => {
    return iterateToContainer(
      doorLegsGenerator(item, room),
      new Container({
        filters: mainPaletteSwapFilter(room),
        ...xyToTranslateToInsideOfRoom(item.config.direction, item.aabb),
      }),
    );
  });

export const doorFrameAppearance: ItemAppearance<"doorFrame"> =
  itemAppearanceRenderOnce(
    ({
      renderContext: {
        item: {
          config: { direction, part, toRoom },
          aabb,
        },
        room,
      },
    }) => {
      const campaign =
        selectMaybeCurrentCampaign(store.getState()) ??
        (store.getState().levelEditor?.campaignInProgress as
          | Campaign<string>
          | undefined);

      const axis = doorAlongAxis(direction);

      const useColoursFromRoom =
        campaign?.rooms[toRoom] ??
        // toRoom might not exist if working in the editor and didn't make it yet
        room;

      const doorFrameSprite = createSprite({
        textureId: doorTexture(room, axis, part),
        filter: mainPaletteSwapFilter(useColoursFromRoom),
        ...xyToTranslateToInsideOfRoom(direction, aabb),
      });

      return doorFrameSprite;
    },
  );
