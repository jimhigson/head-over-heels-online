import { Container } from "pixi.js";

import { type LightBeamEnd } from "../../../model/ItemStateMap";
import { originalGameFrameDuration } from "../../../originalGame";
import { unitVectors } from "../../../utils/vectors/unitVectors";
import {
  type DirectionXy4,
  perpendicularAxisXy,
  tangentAxis,
} from "../../../utils/vectors/vectors";
import {
  lightBeamCrossSectionPx,
  lightBeamLiftPx,
} from "../../physics/mechanics/lightBeams";
import { blockSizePx } from "../../physics/mechanicsConstants";
import { createSprite } from "../createSprite";
import { projectWorldXyzToScreenXy } from "../projections";
import { type ItemAppearance } from "./ItemAppearance";

type LightBeamRenderProps = {
  direction: DirectionXy4;
  lengthPx: number;
  end: LightBeamEnd;
  timesZ: number;
};

/** world px of beam covered by one beam tile sprite (half a block) */
const beamTilePx = lightBeamCrossSectionPx;

/**
 * the corner sprites are drawn in a full block cell (the reflecting mirror's
 * cell), one per pair of world directions the bend connects. Each also serves
 * the flow in the opposite sense, by playing its animation in reverse
 */
const cornerSprites = {
  "left.reflect-left": { animationId: "lightBeam.corner.leftToAway" },
  "towards.reflect-right": {
    animationId: "lightBeam.corner.leftToAway",
    reverse: true,
  },
  "away.reflect-right": { animationId: "lightBeam.corner.awayToLeft" },
  "right.reflect-left": {
    animationId: "lightBeam.corner.awayToLeft",
    reverse: true,
  },
  "left.reflect-right": { animationId: "lightBeam.corner.leftToTowards" },
  "away.reflect-left": {
    animationId: "lightBeam.corner.leftToTowards",
    reverse: true,
  },
  "towards.reflect-left": { animationId: "lightBeam.corner.towardsToLeft" },
  "right.reflect-right": {
    animationId: "lightBeam.corner.towardsToLeft",
    reverse: true,
  },
} as const satisfies Record<
  `${DirectionXy4}.${"reflect-left" | "reflect-right"}`,
  { animationId: `lightBeam.corner.${string}`; reverse?: boolean }
>;

/**
 * beams render as a row of animated tile sprites along the beam's axis, one
 * tile per half block - repeated at every block of a tall beam's height.
 * The animation frames shift the light's pattern along the beam, so it
 * appears to travel in the direction of emission - reversed playback covers
 * the negative directions, like conveyors do.
 *
 * Beams re-render whenever their length changes (eg something moving in/out
 * of their path), so the animation starts on a frame derived from the room
 * time, not the sprites' own clocks - keeping every segment of every beam
 * in the room in phase through re-renders.
 *
 * The beam's length is quantised to the nearest tile, with the quantisation
 * error kept at the beam's tip (where it hits whatever blocks it) rather
 * than at the lamp it shines out of
 */
export const lightBeamAppearance: ItemAppearance<
  "lightBeam",
  LightBeamRenderProps
> = ({
  renderContext: {
    item: {
      aabb,
      config: { direction, times },
      state: { end },
    },
    room: { roomTime },
    general: { paused, spritesheetVariants },
  },
  currentRendering,
}) => {
  const axis = tangentAxis(direction);
  const lengthPx = aabb[axis];
  const timesZ = times?.z ?? 1;

  const currentlyRenderedProps = currentRendering?.renderProps;
  const render =
    currentlyRenderedProps === undefined ||
    direction !== currentlyRenderedProps.direction ||
    end !== currentlyRenderedProps.end ||
    lengthPx !== currentlyRenderedProps.lengthPx ||
    timesZ !== currentlyRenderedProps.timesZ;

  if (!render) {
    return "no-update";
  }

  const spritesheet = spritesheetVariants.currentMainSpritesheet();
  const sign = unitVectors[direction][axis];
  const tileCount = Math.max(1, Math.round(lengthPx / beamTilePx));

  const animationId = `lightBeam.${axis}` as const;
  const { animationSpeed, length: frameCount } =
    spritesheet.data.animations[animationId];
  const frameDurationMs = originalGameFrameDuration / animationSpeed;
  const startFrame = Math.floor(roomTime / frameDurationMs) % frameCount;

  const rendering = new Container({ label: "lightBeam" });
  for (let row = 0; row < timesZ; row++) {
    const rowZ = row * blockSizePx.z;
    for (let tileI = 0; tileI < tileCount; tileI++) {
      const alongAxis =
        sign > 0 ? tileI * beamTilePx : lengthPx - (tileI + 1) * beamTilePx;
      const screenXy = projectWorldXyzToScreenXy({
        [axis]: alongAxis,
        z: rowZ,
      });
      const tileSprite = createSprite({
        animationId,
        // the art's frames travel in the positive direction along the axis;
        // play in reverse for beams going the negative way:
        reverse: sign < 0,
        paused,
        x: screenXy.x,
        y: screenXy.y,
        spritesheet,
      });
      if (paused) {
        tileSprite.gotoAndStop(startFrame);
      } else {
        tileSprite.gotoAndPlay(startFrame);
      }
      rendering.addChild(tileSprite);
    }

    if (end === "terminus") {
      // the glow of the beam's energy dissipating against whatever blocks
      // it, centred on the beam's cross-section at its tip:
      const tipScreenXy = projectWorldXyzToScreenXy({
        [axis]: sign > 0 ? lengthPx : 0,
        [perpendicularAxisXy(axis)]: lightBeamCrossSectionPx / 2,
        z: rowZ + lightBeamCrossSectionPx / 2,
      });
      rendering.addChild(
        createSprite({
          textureId: `lightBeam.terminus.${axis}`,
          anchor: { x: 0.5, y: 0.5 },
          x: tipScreenXy.x,
          y: tipScreenXy.y,
          spritesheet,
        }),
      );
    } else if (end === "reflect-left" || end === "reflect-right") {
      /*
       * the bend through the reflecting mirror's block, carrying the light
       * from this segment's tip up to the mirror's visible surface and off
       * again. The corner art fills a whole block cell, placed where the
       * mirror's block at this row is - which the renderer assumes is
       * centred on the beam's line (true whenever the lamp and mirror are
       * both grid-aligned)
       */
      const perpAxis = perpendicularAxisXy(axis);
      const mirrorMinCornerScreenXy = projectWorldXyzToScreenXy({
        [axis]: sign > 0 ? lengthPx : -blockSizePx[axis],
        [perpAxis]: -(blockSizePx[perpAxis] - lightBeamCrossSectionPx) / 2,
        z: rowZ - lightBeamLiftPx,
      });
      const cornerSprite = createSprite({
        ...cornerSprites[`${direction}.${end}`],
        paused,
        x: mirrorMinCornerScreenXy.x,
        y: mirrorMinCornerScreenXy.y,
        spritesheet,
      });
      if (paused) {
        cornerSprite.gotoAndStop(startFrame);
      } else {
        cornerSprite.gotoAndPlay(startFrame);
      }
      rendering.addChild(cornerSprite);
    }
  }

  return {
    output: rendering,
    renderProps: { direction, lengthPx, end, timesZ },
  };
};
