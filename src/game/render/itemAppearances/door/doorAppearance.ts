import { Container } from "pixi.js";

import type { ItemInPlay } from "../../../../model/ItemInPlay";
import type { Campaign } from "../../../../model/modelTypes";
import type { SpritesheetVariant } from "../../../../sprites/spritesheet/variants/SpritesheetVariant";
import type { DirectionXy4, Xy, Xyz } from "../../../../utils/vectors/vectors";
import type { ItemAppearance } from "../ItemAppearance";

import { selectMaybeCurrentCampaign } from "../../../../store/slices/gameMenus/gameMenusSelectors";
import { store } from "../../../../store/store";
import { iterateToContainer } from "../../../../utils/pixi/iterateToContainer";
import { renderContainerToSprite } from "../../../../utils/pixi/renderContainerToSprite";
import {
  addXy,
  doorAlongAxis,
  originXy,
  perpendicularAxisXy,
} from "../../../../utils/vectors/vectors";
import { blockSizePx } from "../../../physics/mechanicsConstants";
import { createSprite } from "../../createSprite";
import { PaletteSwapFilter } from "../../filters/PaletteSwapFilter";
import { replacementColours } from "../../gameColours/gameColours";
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
  spritesheetVariant: SpritesheetVariant,
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
            y: -blockSizePx.z * height,
          }),
          spritesheetVariant,
        });

        yield sprite;
      }
    } else {
      yield createSprite({
        pivot: { x: pivotX, y: 9 },
        textureId: `generic.door.legs.base.${axis}`,
        ...addXy(offset, {}),
        spritesheetVariant,
      });

      for (let h = 1; h < height; h++) {
        yield createSprite({
          pivot: { x: pivotX, y: 9 },
          textureId: `generic.door.legs.pillar.${axis}`,
          ...addXy(offset, {
            y: -h * blockSizePx.z,
          }),
          spritesheetVariant,
        });
      }
    }
  }

  yield* legGenerator(projectBlockXyzToScreenXy({ ...originXy, [axis]: 1 }));
  yield* legGenerator(originXy);
  if (!inHiddenWall) {
    // non-floating threshold
    yield createSprite({
      pivot: { x: 16, y: blockSizePx.z * height + 13 },
      textureId: `generic.door.legs.threshold.double.${axis}`,
      ...projectBlockXyzToScreenXy({ ...originXy, [axis]: 1 }),
      spritesheetVariant,
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
  itemAppearanceRenderOnce(
    ({
      renderContext: {
        item,
        general: { pixiRenderer, colourised },
      },
    }) => {
      const spritesheetVariant =
        colourised ? "for-current-room" : "uncolourised";
      const doorLegsContainer = iterateToContainer(
        doorLegsGenerator(item, spritesheetVariant),
      );

      // door legs can take quite a few sprites (ie, 11 each for the 5-high
      // doors in #blacktooth39 - reduce down to a single sprite:
      const sprite = renderContainerToSprite(pixiRenderer, doorLegsContainer);

      const spriteXy = xyToTranslateToInsideOfRoom(
        item.config.direction,
        item.aabb,
      );
      sprite.x = spriteXy.x;
      sprite.y = spriteXy.y;

      return sprite;
    },
  );

export const doorFrameAppearance: ItemAppearance<"doorFrame"> =
  itemAppearanceRenderOnce(
    ({
      renderContext: {
        item: {
          config: { direction, part, toRoom },
          aabb,
        },
        room,
        general: { pixiRenderer, colourised },
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
        // so just colour using the current room's colours:
        room;

      const filter = new PaletteSwapFilter({
        paletteSwaps: replacementColours(
          useColoursFromRoom.color.hue,
          room.color.shade === "dimmed",
          room.planet === "moonbase" ?
            // moonbase doors are illuminated:
            "light-mid"
          : "light-dark",
        ),
        lutType: "sparse",
      });

      const { x, y } = xyToTranslateToInsideOfRoom(direction, aabb);

      const doorFrameSprite = createSprite({
        textureId: doorTexture(room, axis, part),
        // needs a special filter since this may not be going to the same room:
        x,
        y,
        spritesheetVariant: colourised ? "for-current-room" : "uncolourised",
      });
      doorFrameSprite.filters = filter;

      // render to a static sprite to avoid every-frame application of the filter
      // which would break sprite batching
      const spriteInContainer = new Container({ children: [doorFrameSprite] });
      const rendered = renderContainerToSprite(pixiRenderer, spriteInContainer);

      spriteInContainer.destroy({ children: true });
      filter.destroy({ destroyLutTexture: true, destroyMask: true });

      if (part === "top") {
        // the .5 is because the doortop happens to be positioned relative to the door near and
        // far at a position that means it renders vertically on the half-pixel, so this brings it
        // back to lining up with the pixels from the other door parts
        rendered.y = 0.5;
      }

      return rendered;
    },
  );
