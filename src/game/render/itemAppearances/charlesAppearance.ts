import { variantTextureId } from "../../../sprites/spritesheet/variantTextureId";
import {
  resolveSpriteDirectionIndexXy4,
  spriteFlipXAtAngle,
} from "../../../utils/vectors/resolveCameraRelativeVector";
import type { DirectionIndexXy4 } from "../../../utils/vectors/vectors";
import { isActedOnNowByItemOfType } from "../../physics/isActedOnNowByItemOfType";
import { createStackedSprites } from "./createStackedSprites";
import type { ItemAppearance } from "./ItemAppearance";

type CharlesRenderProps = {
  /** the directional sprite-variant index drawn */
  resolvedFacingArtIndexXy4: DirectionIndexXy4;
  /** whether the directional sprite is drawn horizontally flipped */
  flipX: boolean;
  controlledByJoystick: boolean;
  activated: boolean;
};

export const charlesAppearance: ItemAppearance<
  "charles",
  CharlesRenderProps
> = ({
  renderContext: {
    isReflection,
    item,
    room,
    general: { spritesheets, cameraAngle },
  },
  currentRendering,
}) => {
  const {
    state: { facing, activated = true },
  } = item;
  const currentlyRenderedProps = currentRendering?.renderProps;

  // the facing resolves to a sprite-variant index with its paired flip - the
  // flip keeps the painted shading on charles' world faces (light source
  // fixed in the world):
  const resolvedFacingArtIndexXy4 = resolveSpriteDirectionIndexXy4(
    facing,
    cameraAngle,
    isReflection,
  );
  const flipX = spriteFlipXAtAngle(cameraAngle);

  const controlledByJoystick = isActedOnNowByItemOfType(item, room, "joystick");

  const render =
    currentlyRenderedProps === undefined ||
    resolvedFacingArtIndexXy4 !==
      currentlyRenderedProps.resolvedFacingArtIndexXy4 ||
    flipX !== currentlyRenderedProps.flipX ||
    controlledByJoystick !== currentlyRenderedProps.controlledByJoystick ||
    activated !== currentlyRenderedProps.activated;

  if (!render) {
    return "no-update";
  }

  const { spritesheetForCurrentRoom: spritesheet } = spritesheets;

  return {
    output: createStackedSprites({
      top: {
        textureId: variantTextureId(
          `charles.d${resolvedFacingArtIndexXy4}`,
          isReflection,
          false,
          !activated,
          false,
        ),
        flipX,
        spritesheet,
      },
      bottom: {
        textureId: variantTextureId(
          controlledByJoystick ? "headlessBase.all" : "headlessBase",
          isReflection,
          false,
          !activated,
          false,
        ),
        flipX,
        spritesheet,
      },
    }),
    renderProps: {
      resolvedFacingArtIndexXy4,
      flipX,
      controlledByJoystick,
      activated,
    },
  };
};
