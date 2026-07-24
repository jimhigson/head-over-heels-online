import { variantTextureId } from "../../../sprites/spritesheet/variantTextureId";
import {
  resolveSpriteDirectionIndexXy4,
  spriteFlipXAtAngle,
} from "../../../utils/vectors/resolveCameraRelativeVector";
import { nearestQuarterAngle } from "../../../utils/vectors/rotateXy";
import { type Xy, xyEqual } from "../../../utils/vectors/vectors";
import { createSprite } from "../createSprite";
import { type ItemAppearance } from "./ItemAppearance";

type LampRenderProps = {
  activated: boolean;
  /** the directional sprite resolves per camera angle */
  cameraQuarterAngle: Xy;
};

export const lampAppearance: ItemAppearance<"lamp", LampRenderProps> = ({
  renderContext: {
    isReflection,
    item: {
      state: { activated },
      config: { direction, times },
    },
    general: { spritesheets, cameraAngle },
  },
  currentRendering,
}) => {
  const cameraQuarterAngle = nearestQuarterAngle(cameraAngle);
  const currentlyRenderedProps = currentRendering?.renderProps;

  const render =
    currentlyRenderedProps === undefined ||
    activated !== currentlyRenderedProps.activated ||
    !xyEqual(cameraQuarterAngle, currentlyRenderedProps.cameraQuarterAngle);

  if (!render) {
    return "no-update";
  }

  // resolve the lamp's facing against the continuous camera angle to the
  // sprite-variant index, with its paired flip - the flip keeps the painted
  // shading on the lamp's world faces (light source fixed in the world) -
  // rounded only here, at the texture pick:
  const resolvedFacingArtIndexXy4 = resolveSpriteDirectionIndexXy4(
    direction,
    cameraAngle,
    false,
  );

  return {
    output: createSprite({
      textureId: variantTextureId(
        `lamp.${activated ? "on" : "off"}.d${resolvedFacingArtIndexXy4}`,
        isReflection,
        false,
        false,
        false,
      ),
      flipX: spriteFlipXAtAngle(cameraAngle),
      // stacked to double/triple height when the lamp has times.z:
      times,
      cameraQuarterAngle,
      // deactivated lamps don't render in the deactivated palette, they have separate 'off' sprites:
      spritesheet: spritesheets.spritesheetForCurrentRoom,
    }),
    renderProps: { activated, cameraQuarterAngle },
  };
};
