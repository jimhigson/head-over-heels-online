import type { ItemAppearance } from "./ItemAppearance";

import { keysIter } from "../../../utils/entries";
import { iterate } from "../../../utils/iterate";
import {
  type DirectionXy4,
  vectorClosestDirectionXy4,
} from "../../../utils/vectors/vectors";
import { isJoystick } from "../../physics/itemPredicates";
import { createStackedSprites } from "./createStackedSprites";

type CharlesRenderProps = {
  facingXy4: DirectionXy4;
  controlledByJoystick: boolean;
};

export const charlesAppearance: ItemAppearance<
  "charles",
  CharlesRenderProps
> = ({
  renderContext: {
    item: {
      state: {
        facing,
        actedOnAt: { roomTime: roomTimeActedOn, by },
      },
    },
    room: { roomTime, items },
    general: { colourised },
  },
  currentRendering,
}) => {
  const currentlyRenderedProps = currentRendering?.renderProps;
  const facingXy4 = vectorClosestDirectionXy4(facing) ?? "towards";

  const controlledByJoystick =
    roomTime === roomTimeActedOn &&
    iterate(keysIter(by)).some((id) => isJoystick(items[id]));

  const render =
    currentlyRenderedProps === undefined ||
    facingXy4 !== currentlyRenderedProps.facingXy4 ||
    controlledByJoystick !== currentlyRenderedProps.controlledByJoystick;

  if (!render) {
    return "no-update";
  }

  const spritesheetVariant = colourised ? "for-current-room" : "uncolourised";

  return {
    output: createStackedSprites({
      top: { textureId: `charles.${facingXy4}`, spritesheetVariant },
      bottom: {
        textureId: controlledByJoystick ? "headlessBase.all" : "headlessBase",
        spritesheetVariant,
      },
    }),
    renderProps: { facingXy4, controlledByJoystick },
  };
};
