import { type Sprite } from "pixi.js";

import { wallTileSize } from "../../../sprites/spritesheet/spritesheetData/textureSizes";
import { nearestQuarterAngle } from "../../../utils/vectors/rotateXy";
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
    general: { paused, spritesheetVariants, cameraAngle },
  },
  tickContext: { deltaMS },
  currentRendering,
}) => {
  const currentlyRenderedProps = currentRendering?.renderProps;

  const distanceTravelled =
    (currentlyRenderedProps?.distanceTravelled ?? 0) +
    lengthXy(sliding) * (paused ? 0 : deltaMS);

  // the camera angle contributes one animation step per quarter turn: the
  // ball is seen from a different side after a turn, so its rolling phase
  // reads differently. Added at render time (not accumulated into
  // distanceTravelled), so a full revolution restores the original phase.
  // The angle resolves arithmetically to anticlockwise turns in [0,1)
  // (quarters land on 0, ¼, ½, ¾); the round guards the ulp of error atan2
  // introduces so the downstream step floor never wavers:
  const cameraQuarterAngle = nearestQuarterAngle(cameraAngle);
  const angleFullTurns =
    Math.atan2(cameraQuarterAngle.y, cameraQuarterAngle.x) / (2 * Math.PI);
  const angleDistance =
    Math.round((angleFullTurns < 0 ? angleFullTurns + 1 : angleFullTurns) * 4) *
    (wallTileSize.w / 2);

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

  const stepsTravelled = Math.floor(
    ((distanceTravelled + angleDistance) * 2) / wallTileSize.w,
  );
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
