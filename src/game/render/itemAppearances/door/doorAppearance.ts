import { Container } from "pixi.js";

import type { ItemInPlay } from "../../../../model/ItemInPlay";
import type { Campaign } from "../../../../model/modelTypes";
import type { SceneryName } from "../../../../sprites/planets";
import type { AppSpritesheet } from "../../../../sprites/spritesheet/loadedSpriteSheet";
import type { DirectionXy4, Xy, Xyz } from "../../../../utils/vectors/vectors";
import type { ItemAppearance } from "../ItemAppearance";

import { paletteBlockstack } from "../../../../sprites/palette/spritesheetPalette";
import { planetSpecificIfExists } from "../../../../sprites/planetSpecificIfExists";
import { getSpriteSheetVariant } from "../../../../sprites/spritesheet/variants/getSpriteSheetVariant";
import { selectMaybeCurrentCampaign } from "../../../../store/slices/gameMenus/gameMenusSelectors";
import { store } from "../../../../store/store";
import { resolveSwops } from "../../../../utils/palette/palette";
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
  spritesheet: AppSpritesheet,
  sceneryName: SceneryName,
  isDark: boolean,
): Generator<Container> {
  const axis = doorAlongAxis(direction);

  if (inHiddenWall) {
    if (height !== 0) {
      //draw the 'floating' (no legs) threshold (two sprites):

      for (const offset of [1, 0]) {
        yield createSprite({
          textureId: planetSpecificIfExists(
            sceneryName,
            `door.floatingThreshold.${axis}`,
            spritesheet.data,
            isDark,
          ),
          ...addXy(projectBlockXyzToScreenXy({ [axis]: offset }), {
            y: -blockSizePx.z * height,
          }),
          spritesheet,
        });
      }
    }
  } else {
    yield createSprite({
      textureId: planetSpecificIfExists(
        sceneryName,
        `door.legs.base.${axis}`,
        spritesheet.data,
        isDark,
      ),
      spritesheet,
    });

    const pillarTextureId = planetSpecificIfExists(
      sceneryName,
      `door.legs.pillar.${axis}`,
      spritesheet.data,
      isDark,
    );

    for (let h = 1; h < height; h++) {
      yield createSprite({
        textureId: pillarTextureId,
        y: -h * blockSizePx.z,
        spritesheet,
      });
    }
  }

  if (!inHiddenWall) {
    // non-floating threshold
    yield createSprite({
      textureId: planetSpecificIfExists(
        sceneryName,
        `door.legs.threshold.${axis}`,
        spritesheet.data,
        isDark,
      ),
      ...projectBlockXyzToScreenXy({ ...originXy, z: height }),
      spritesheet,
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
        general: { pixiRenderer, spriteOption },
        room: {
          planet,
          color: { shade },
        },
      },
    }) => {
      const spritesheetVariant =
        spriteOption === "Speccy" ? "uncolourised" : "for-current-room";
      const spritesheet = getSpriteSheetVariant(spritesheetVariant);
      const doorLegsContainer = iterateToContainer(
        doorLegsGenerator(item, spritesheet, planet, shade === "dimmed"),
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
        general: { pixiRenderer, spriteOption, spritesheetMeta },
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
        swops: resolveSwops(
          paletteBlockstack,
          replacementColours(
            useColoursFromRoom.color.hue,
            spritesheetMeta.paletteDim !== undefined &&
              room.color.shade === "dimmed",
            room.planet === "moonbase" ?
              // moonbase doors are illuminated:
              "light-mid"
            : "light-dark",
          ),
        ),
        lutType: "sparse",
      });

      const { x, y } = xyToTranslateToInsideOfRoom(direction, aabb);

      const doorFrameSprite = createSprite({
        textureId: doorTexture(room, axis, part),
        // needs a special filter since this may not be going to the same room:
        x,
        y,
        spritesheetVariant:
          spriteOption === "Speccy" ? "uncolourised" : "for-current-room",
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
