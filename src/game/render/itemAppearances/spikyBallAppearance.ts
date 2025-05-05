import type { Sprite } from "pixi.js";
import { lengthXy } from "../../../utils/vectors/vectors";
import type { ItemAppearance } from "./ItemAppearance";
import { loadedSpriteSheet } from "../../../sprites/spriteSheet";
import { wallTileSize } from "../../../sprites/textureSizes";
import { createSprite } from "../createSprite";
import { itemAppearanceOutsideView } from "./itemAppearanceOutsideView";

type SpikyBallRenderProps = {
  distanceTravelled: number;
};

const spikyBallAppearanceImpl: ItemAppearance<
  "slidingDeadly",
  SpikyBallRenderProps,
  Sprite
> = ({
  renderContext: {
    item: {
      state: {
        vels: { sliding },
      },
      config: { startingPhase },
    },
    paused,
  },
  tickContext: { deltaMS },
  currentRendering,
}) => {
  const currentlyRenderedProps = currentRendering?.renderProps;

  const distanceTravelled =
    (currentlyRenderedProps?.distanceTravelled ?? 0) +
    lengthXy(sliding) * (paused ? 0 : deltaMS);

  const previousRendering = currentRendering?.output;

  const rendering = previousRendering ?? createSprite("spikyBall.1");

  const stepsTravelled = Math.floor((distanceTravelled * 2) / wallTileSize.w);
  const phase = (((stepsTravelled + startingPhase) % 2) + 1) as 1 | 2;
  rendering.texture = loadedSpriteSheet().textures[`spikyBall.${phase}`];

  return {
    output: rendering,
    renderProps: { distanceTravelled },
  };
};

export const spikyBallAppearance = itemAppearanceOutsideView(
  spikyBallAppearanceImpl,
);
