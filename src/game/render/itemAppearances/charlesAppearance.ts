import { variantTextureId } from "../../../sprites/spritesheet/variantTextureId";
import { keysIter } from "../../../utils/entries";
import { resolveCameraRelativeVectorXy4 } from "../../../utils/vectors/resolveCameraRelativeVector";
import { type DirectionXy4 } from "../../../utils/vectors/vectors";
import { isJoystick } from "../../physics/itemPredicates";
import { createStackedSprites } from "./createStackedSprites";
import { type ItemAppearance } from "./ItemAppearance";

type CharlesRenderProps = {
  resolvedFacingXy4: DirectionXy4;
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

  const resolvedFacingXy4 = resolveCameraRelativeVectorXy4(
    facing,
    cameraAngle,
    isReflection,
  );

  const controlledByJoystick =
    roomTime === roomTimeActedOn &&
    keysIter(by).some((id) => isJoystick(items[id]));

  const render =
    currentlyRenderedProps === undefined ||
    resolvedFacingXy4 !== currentlyRenderedProps.resolvedFacingXy4 ||
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
          `charles.${resolvedFacingXy4}`,
          isReflection,
          false,
          !activated,
          false,
        ),
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
        spritesheet,
      },
    }),
    renderProps: { resolvedFacingXy4, controlledByJoystick, activated },
  };
};
