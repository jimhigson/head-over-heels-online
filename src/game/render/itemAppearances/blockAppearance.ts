import type { BlockStyle } from "../../../model/json/utilityJsonConfigTypes";
import type { SceneryName } from "../../../sprites/planets";
import type { TextureId } from "../../../sprites/spritesheet/spritesheetData/makeSpritesheetData";
import type { ItemAppearance } from "./ItemAppearance";

import { isTextureId } from "../../../sprites/assertIsTextureId";
import { originalSpriteSheet } from "../../../sprites/spritesheet/loadedSpriteSheet";
import { maybeRenderContainerToSprite } from "../../../utils/pixi/renderContainerToSprite";
import { createSprite } from "../createSprite";

type BlockRenderProps = {
  // flatten disappear down to a single value, since all we care about is if it is on or not
  // for the sake of rendering
  isDissapearing: boolean;
};

const blockTextureId = (
  isDark: boolean,
  style: BlockStyle,
  isDissapearing: boolean,
  scenery: SceneryName,
): TextureId => {
  const spritesheetData = originalSpriteSheet().data;

  if (style === "tower") {
    const sceneryTower = `tower.${scenery}`;
    return isTextureId(sceneryTower, spritesheetData) ?
        (sceneryTower as TextureId)
      : "tower";
  }
  if (style === "book") {
    return `book.x`;
  }
  const base = `block.${style}`;
  const suffix = isDissapearing ? ".disappearing" : "";
  if (isDark) {
    const darkId = `${base}.dark${suffix}`;
    if (isTextureId(darkId, spritesheetData)) {
      return darkId as TextureId;
    }
  }
  return `${base}${suffix}` as TextureId;
};

export const blockAppearance: ItemAppearance<"block", BlockRenderProps> = ({
  renderContext: {
    general: { pixiRenderer, spriteOption },
    item: {
      config: { style, times },
      state: { disappearing: disappear },
    },
    room,
  },
  currentRendering,
}) => {
  const currentlyRenderedProps = currentRendering?.renderProps;
  const isDissapearing = disappear !== null;
  const render =
    currentlyRenderedProps === undefined ||
    currentlyRenderedProps.isDissapearing !== isDissapearing;

  if (!render) {
    return "no-update";
  }

  return {
    output: maybeRenderContainerToSprite(
      pixiRenderer,
      createSprite({
        textureId: blockTextureId(
          room.color.shade === "dimmed",
          style,
          isDissapearing,
          room.planet,
        ),
        times,
        spritesheetVariant:
          spriteOption.uncolourised ? "uncolourised" : "for-current-room",
      }),
    ),
    renderProps: { isDissapearing },
  };
};
