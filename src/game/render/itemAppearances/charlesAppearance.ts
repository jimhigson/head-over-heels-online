import { maybeReflectedVector } from "../../../model/MirrorOrientation";
import { keysIter } from "../../../utils/entries";
import { rotateXy } from "../../../utils/vectors/rotateXy";
import {
  type DirectionXy4,
  vectorClosestDirectionXy4,
} from "../../../utils/vectors/vectors";
import { isJoystick } from "../../physics/itemPredicates";
import { createStackedSprites } from "./createStackedSprites";
import { type ItemAppearance } from "./ItemAppearance";

type CharlesRenderProps = {
  facingXy4: DirectionXy4;
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
  // rotate the facing by the camera angle so the directional sprite matches how
  // charles appears once the camera has turned:
  const facingXy4 =
    vectorClosestDirectionXy4(
      rotateXy(
        maybeReflectedVector(facing, isReflection, cameraAngle),
        cameraAngle,
      ),
    ) ?? "towards";

  const controlledByJoystick =
    roomTime === roomTimeActedOn &&
    keysIter(by).some((id) => isJoystick(items[id]));

  const render =
    currentlyRenderedProps === undefined ||
    facingXy4 !== currentlyRenderedProps.facingXy4 ||
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
      top: { textureId: `charles.${facingXy4}`, spritesheet },
      bottom: {
        textureId: controlledByJoystick ? "headlessBase.all" : "headlessBase",
        spritesheet,
      },
    }),
    renderProps: { facingXy4, controlledByJoystick, activated },
  };
};
