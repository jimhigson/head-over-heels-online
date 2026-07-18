import { type BlockStyle } from "../../../model/json/utilityJsonConfigTypes";
import { isTextureId } from "../../../sprites/assertIsTextureId";
import { type SceneryName } from "../../../sprites/planets";
import { type TextureId } from "../../../sprites/spritesheet/spritesheetData/makeSpritesheetData";
import { type AppSpritesheetData } from "../../../sprites/spritesheet/variants/AppSpritesheet";
import {
  asReuseSprite,
  maybeRenderContainerToSprite,
} from "../../../utils/pixi/renderContainerToSprite";
import { nearestQuarterAngle } from "../../../utils/vectors/rotateXy";
import { type Xy } from "../../../utils/vectors/vectors";
import { createSprite } from "../createSprite";
import {
  cameraQuarterAngleEqual,
  type ItemAppearance,
  multipliedLayoutAngle,
} from "./ItemAppearance";

type BlockRenderProps = {
  // flatten disappear down to a single value, since all we care about is if it is on or not
  // for the sake of rendering
  isDissapearing: boolean;
  /**
   * the multiplied tiling resolves per camera angle; null for single blocks,
   * which never re-render for a rotation
   */
  multipliedAtAngle: null | Xy;
};

const blockTextureId = (
  isDark: boolean,
  style: BlockStyle,
  isDissapearing: boolean,
  scenery: SceneryName,
  spritesheetData: AppSpritesheetData,
): TextureId => {
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
    isReflection,
    general: { pixiRenderer, spritesheetVariants, cameraAngle },
    item,
    item: {
      config: { style, times },
      state: { disappearing: disappear },
    },
    room,
  },
  currentRendering,
}) => {
  const cameraQuarterAngle = nearestQuarterAngle(cameraAngle);
  const currentlyRenderedProps = currentRendering?.renderProps;
  const isDissapearing = disappear !== null;
  const multipliedAtAngle = multipliedLayoutAngle(item, cameraQuarterAngle);
  const render =
    currentlyRenderedProps === undefined ||
    currentlyRenderedProps.isDissapearing !== isDissapearing ||
    !cameraQuarterAngleEqual(
      currentlyRenderedProps.multipliedAtAngle,
      multipliedAtAngle,
    );

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
          spritesheetVariants.originalSpritesheet.data,
        ),
        times,
        cameraQuarterAngle,
        spritesheet: spritesheetVariants.currentMainSpritesheet(
          false,
          false,
          isReflection,
        ),
      }),
      // camera-angle re-renders bake into the previous render texture (the
      // multiplied bake is the same size at every quarter turn):
      asReuseSprite(currentRendering?.output),
    ),
    renderProps: { isDissapearing, multipliedAtAngle },
  };
};
