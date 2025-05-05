import {
  vectorClosestDirectionXy4,
  type DirectionXy4,
} from "../../../utils/vectors/vectors";
import { createStackedSprites } from "./createStackedSprites";
import type { ItemAppearance } from "./ItemAppearance";

type CharlesRenderProps = {
  facingXy4: DirectionXy4;
};

export const charlesAppearance: ItemAppearance<
  "charles",
  CharlesRenderProps
> = ({
  renderContext: {
    item: {
      state: { facing },
    },
  },
  currentRendering,
}) => {
  const currentlyRenderedProps = currentRendering?.renderProps;
  const facingXy4 = vectorClosestDirectionXy4(facing) ?? "towards";

  const render =
    currentlyRenderedProps === undefined ||
    facingXy4 !== currentlyRenderedProps.facingXy4;

  if (!render) {
    return "no-update";
  }
  return {
    output: createStackedSprites({ top: `charles.${facingXy4}` }),
    renderProps: { facingXy4 },
  };
};
