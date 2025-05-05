import { Container } from "pixi.js";
import { isStoodOn } from "../../../model/StoodOnBy";
import { directionAxis } from "../../../utils/vectors/vectors";
import { createSprite } from "../createSprite";
import type { ItemAppearance } from "./ItemAppearance";

type ConveyorRenderProps = {
  moving: boolean;
};

export const conveyorAppearance: ItemAppearance<
  "conveyor",
  ConveyorRenderProps
> = ({
  renderContext: {
    item: {
      config: { direction, times },
      state: { stoodOnBy },
    },
    paused,
  },
  currentRendering,
}) => {
  const currentlyRenderedProps = currentRendering?.renderProps;
  const moving = isStoodOn(stoodOnBy);

  const render =
    currentlyRenderedProps === undefined ||
    currentlyRenderedProps.moving !== moving;

  if (!render) {
    return "no-update";
  }

  const rendering = new Container();

  const axis = directionAxis(direction);
  rendering.addChild(
    createSprite(
      moving ?
        {
          animationId: `conveyor.${axis}`,
          reverse: direction === "towards" || direction === "right",
          times,
          paused,
        }
      : {
          textureId: `conveyor.${axis}.6`,
          times,
        },
    ),
  );

  return {
    output: rendering,
    renderProps: { moving },
  };
};
