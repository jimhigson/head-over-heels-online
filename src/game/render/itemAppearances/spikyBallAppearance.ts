import { type Sprite } from "pixi.js";

import { wallTileSize } from "../../../sprites/spritesheet/spritesheetData/textureSizes";
import { lengthXy } from "../../../utils/vectors/vectors";
import { createSprite } from "../createSprite";
import { type ItemAppearance } from "./ItemAppearance";
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
    isReflection,
    item: {
      state: {
        vels: { sliding },
      },
      config: { startingPhase },
    },
    general: { paused, spritesheetVariants },
  },
  tickContext: { deltaMS },
  currentRendering,
}) => {
  const currentlyRenderedProps = currentRendering?.renderProps;

  const distanceTravelled =
    (currentlyRenderedProps?.distanceTravelled ?? 0) +
    lengthXy(sliding) * (paused ? 0 : deltaMS);

  const previousRendering = currentRendering?.output;

  const spritesheet = spritesheetVariants.currentMainSpritesheet(
    false,
    false,
    isReflection,
  );
  const rendering =
    previousRendering ??
    createSprite({
      textureId: "spikyBall.1",
      spritesheet,
    });

  const stepsTravelled = Math.floor((distanceTravelled * 2) / wallTileSize.w);
  const phase = (((stepsTravelled + startingPhase) % 2) + 1) as 1 | 2;
  rendering.texture = spritesheet.textures[`spikyBall.${phase}`];

  return {
    output: rendering,
    renderProps: { distanceTravelled },
  };
};

export const spikyBallAppearance = itemAppearanceOutsideView(
  spikyBallAppearanceImpl,
);
