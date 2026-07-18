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
    general: { spritesheetVariants, cameraAngle },
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

  const spritesheet = spritesheetVariants.currentMainSpritesheet(
    !activated,
    false,
    isReflection,
  );

  return {
    output: createStackedSprites({
      top: { textureId: `charles.${resolvedFacingXy4}`, spritesheet },
      bottom: {
        textureId: controlledByJoystick ? "headlessBase.all" : "headlessBase",
        spritesheet,
      },
    }),
    renderProps: { resolvedFacingXy4, controlledByJoystick, activated },
  };
};
