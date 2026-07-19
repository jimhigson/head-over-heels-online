import { variantTextureId } from "../../../sprites/spritesheet/variantTextureId";
import { keysIter } from "../../../utils/entries";
import { resolveCameraRelativeIndexXy4 } from "../../../utils/vectors/resolveCameraRelativeVector";
import { type DirectionIndexXy4 } from "../../../utils/vectors/vectors";
import { isJoystick } from "../../physics/itemPredicates";
import { createStackedSprites } from "./createStackedSprites";
import { type ItemAppearance } from "./ItemAppearance";

type CharlesRenderProps = {
  resolvedFacingIndexXy4: DirectionIndexXy4;
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

  const resolvedFacingIndexXy4 = resolveCameraRelativeIndexXy4(
    facing,
    cameraAngle,
    isReflection,
  );

  const controlledByJoystick =
    roomTime === roomTimeActedOn &&
    keysIter(by).some((id) => isJoystick(items[id]));

  const render =
    currentlyRenderedProps === undefined ||
    resolvedFacingIndexXy4 !== currentlyRenderedProps.resolvedFacingIndexXy4 ||
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
          `charles.d${resolvedFacingIndexXy4}`,
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
    renderProps: { resolvedFacingIndexXy4, controlledByJoystick, activated },
  };
};
