import { type BlockStyle } from "../../../model/json/utilityJsonConfigTypes";
import { isTextureId } from "../../../sprites/assertIsTextureId";
import { type SceneryName } from "../../../sprites/planets";
import { type AppSpritesheetData } from "../../../sprites/spritesheet/AppSpritesheet";
import { type BaseTextureIdWithPrefix } from "../../../sprites/spritesheet/spritesheetData/makeSpritesheetData";
import { variantTextureId } from "../../../sprites/spritesheet/variantTextureId";
import {
  asReuseSprite,
  maybeRenderContainerToSprite,
} from "../../../utils/pixi/bakeContainerToSprite";
import { nearestQuarterAngle } from "../../../utils/vectors/cameraAngleVectors";
import {
  octantIndexOfDirection,
  type OctantIndexOfDirection,
} from "../../../utils/vectors/octantIndexOfDirection" with { type: "macro" };
import { spriteFlipXAtAngle } from "../../../utils/vectors/resolveCameraRelativeVector";
import { type Xy } from "../../../utils/vectors/vectors";
import { createSprite } from "../createSprite";
import { cameraQuarterAngleEqual, type ItemAppearance } from "./ItemAppearance";

type BlockRenderProps = {
  // flatten disappear down to a single value, since all we care about is if it is on or not
  // for the sake of rendering
  isDissapearing: boolean;
  /** the flip (and any multiplied tiling) resolves per camera angle */
  renderedAtAngle: Xy;
};

type BaseBlockTextureId = BaseTextureIdWithPrefix<
  "block" | "tower" | `book.d${OctantIndexOfDirection<"left">}`
>;

const blockTextureId = (
  isDark: boolean,
  style: BlockStyle,
  isDissapearing: boolean,
  scenery: SceneryName,
  spritesheetData: AppSpritesheetData,
): BaseBlockTextureId => {
  if (style === "tower") {
    const sceneryTower = `tower.${scenery}` as const;
    return isTextureId(sceneryTower, spritesheetData) ? sceneryTower : "tower";
  }
  if (style === "book") {
    return `book.d${octantIndexOfDirection("left")}`;
  }
  const base = `block.${style}` as const;
  const suffix = isDissapearing ? ".disappearing" : "";
  if (isDark) {
    const darkId = `${base}.dark${suffix}` as const;
    if (isTextureId(darkId, spritesheetData)) {
      return darkId;
    }
  }
  return `${base}${suffix}` as const;
};

export const blockAppearance: ItemAppearance<"block", BlockRenderProps> = ({
  renderContext: {
    isReflection,
    general: { pixiRenderer, spritesheets, cameraAngle },
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
  const render =
    currentlyRenderedProps === undefined ||
    currentlyRenderedProps.isDissapearing !== isDissapearing ||
    !cameraQuarterAngleEqual(
      currentlyRenderedProps.renderedAtAngle,
      cameraQuarterAngle,
    );

  if (!render) {
    return "no-update";
  }

  return {
    output: maybeRenderContainerToSprite(
      pixiRenderer,
      createSprite({
        textureId: variantTextureId(
          blockTextureId(
            room.color.shade === "dimmed",
            style,
            isDissapearing,
            room.planet,
            spritesheets.originalSpritesheet.data,
          ),
          isReflection,
          false,
          false,
          false,
        ),
        // blocks flip on odd quarter turns so their painted shading stays on
        // their world faces (light source fixed in the world) - each
        // sub-sprite of a multiplied run flips individually before the bake:
        flipX: spriteFlipXAtAngle(cameraQuarterAngle),
        times,
        cameraQuarterAngle,
        spritesheet: spritesheets.spritesheetForCurrentRoom,
      }),
      // camera-angle re-renders bake into the previous render texture (the
      // multiplied bake is the same size at every quarter turn):
      asReuseSprite(currentRendering?.output),
    ),
    renderProps: { isDissapearing, renderedAtAngle: cameraQuarterAngle },
  };
};
