import { variantTextureId } from "../../../sprites/spritesheet/variantTextureId";
import { keysIter } from "../../../utils/entries";
import {
  resolveSpriteDirectionIndexXy4,
  spriteFlipXAtAngle,
} from "../../../utils/vectors/resolveCameraRelativeVector";
import { type DirectionIndexXy4 } from "../../../utils/vectors/vectors";
import { isJoystick } from "../../physics/itemPredicates";
import { createStackedSprites } from "./createStackedSprites";
import { type ItemAppearance } from "./ItemAppearance";

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
    item: {
      state: {
        facing,
        actedOnAt: { roomTime: roomTimeActedOn, by },
        activated = true,
      },
    },
    room: { roomTime, items },
    general: { spritesheets, cameraAngle },
  },
  currentRendering,
}) => {
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

  const controlledByJoystick =
    roomTime === roomTimeActedOn &&
    keysIter(by).some((id) => isJoystick(items[id]));

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
