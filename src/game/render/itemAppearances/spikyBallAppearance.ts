import type { Sprite } from "pixi.js";

import type { ItemAppearance } from "./ItemAppearance";

import { wallTileSize } from "../../../sprites/spritesheet/spritesheetData/textureSizes";
import { getSpriteSheetVariant } from "../../../sprites/spritesheet/variants/getSpriteSheetVariant";
import { lengthXy } from "../../../utils/vectors/vectors";
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
    general: { paused, colourised },
  },
  tickContext: { deltaMS },
  currentRendering,
}) => {
  const currentlyRenderedProps = currentRendering?.renderProps;

  const distanceTravelled =
    (currentlyRenderedProps?.distanceTravelled ?? 0) +
    lengthXy(sliding) * (paused ? 0 : deltaMS);

  const previousRendering = currentRendering?.output;

  const variant = colourised ? "for-current-room" : "uncolourised";
  const rendering =
    previousRendering ??
    createSprite({
      textureId: "spikyBall.1",
      spritesheetVariant: variant,
    });

  const stepsTravelled = Math.floor((distanceTravelled * 2) / wallTileSize.w);
  const phase = (((stepsTravelled + startingPhase) % 2) + 1) as 1 | 2;
  rendering.texture =
    getSpriteSheetVariant(variant).textures[`spikyBall.${phase}`];

  return {
    output: rendering,
    renderProps: { distanceTravelled },
  };
};

export const spikyBallAppearance = itemAppearanceOutsideView(
  spikyBallAppearanceImpl,
);
