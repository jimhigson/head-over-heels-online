import { type AnimatedSprite, Container } from "pixi.js";

import { type LightBeamEnd } from "../../../model/ItemStateMap";
import { originalGameFrameDuration } from "../../../originalGame";
import { unitVectors } from "../../../utils/vectors/unitVectors";
import {
  type DirectionXy4,
  perpendicularAxisXy,
  tangentAxis,
} from "../../../utils/vectors/vectors";
import { lightBeamCrossSectionPx } from "../../physics/mechanics/lightBeams";
import { createSprite } from "../createSprite";
import { projectWorldXyzToScreenXy } from "../projections";
import { type ItemAppearance } from "./ItemAppearance";

type LightBeamRenderProps = {
  direction: DirectionXy4;
  lengthPx: number;
  end: LightBeamEnd;
  /** the live tile sprites, in order from the source, reused between renders */
  tiles: AnimatedSprite[];
  /** the live end-glow sprite, present only while the beam ends in a terminus */
  terminus: Container | undefined;
};

/** world px of beam covered by one beam tile sprite (half a block) */
const beamTilePx = lightBeamCrossSectionPx;

/**
 * beams render as a row of animated tile sprites along the beam's axis, one
 * tile per half block. The animation frames shift the light's pattern along
 * the beam, so it appears to travel in the direction of emission - reversed
 * playback covers the negative directions, like conveyors do.
 *
 * A beam re-renders whenever its length changes (eg something moving in/out of
 * its path). Rather than rebuilding the whole strip each time, it reconciles
 * incrementally: the matching tiles are kept and only the tip is grown or
 * trimmed, so a beam flickering longer/shorter doesn't churn its sprites. Tile
 * frames are (re)seeded from the room time, not the sprites' own clocks, so
 * every segment of every beam in the room stays in phase. A direction change is
 * the one case rebuilt from scratch, since every tile's position, flip and play
 * direction would differ.
 *
 * The beam's length is quantised to the nearest tile, with the quantisation
 * error kept at the beam's tip (where it hits whatever blocks it) rather than
 * at the lamp it shines out of
 */
export const lightBeamAppearance: ItemAppearance<
  "lightBeam",
  LightBeamRenderProps
> = ({
  renderContext: {
    isReflection,
    item: {
      aabb,
      config: { direction },
      state: { end },
    },
    room: { roomTime },
    general: { paused, spritesheetVariants },
  },
  currentRendering,
}) => {
  const axis = tangentAxis(direction);
  const lengthPx = aabb[axis];

  const previous = currentRendering?.renderProps;
  if (
    previous !== undefined &&
    direction === previous.direction &&
    end === previous.end &&
    lengthPx === previous.lengthPx
  ) {
    return "no-update";
  }

  const spritesheet = spritesheetVariants.currentMainSpritesheet(
    false,
    false,
    isReflection,
  );
  const sign = unitVectors[direction][axis];
  const tileCount = Math.max(1, Math.round(lengthPx / beamTilePx));

  // the y-axis beam is the x-axis beam flipped in x (swapping x/y axes is a
  // horizontal flip in this projection), so only the x art exists:
  const animationId = "lightBeam.x";
  const flipX = axis === "y";
  const { animationSpeed, length: frameCount } =
    spritesheet.data.animations[animationId];
  const frameDurationMs = originalGameFrameDuration / animationSpeed;
  const startFrame = Math.floor(roomTime / frameDurationMs) % frameCount;

  // tiles can only be reused while the beam's orientation is unchanged - a
  // different direction means different positions, flip and play direction, so
  // a new rendering is started (the caller drops the old one) in that case:
  const reused =
    (
      currentRendering !== undefined &&
      currentRendering.renderProps.direction === direction
    ) ?
      currentRendering
    : undefined;
  const rendering = reused?.output ?? new Container({ label: "lightBeam" });
  const tiles = reused?.renderProps.tiles ?? [];

  const seekTile = (tile: AnimatedSprite) => {
    if (paused) {
      tile.gotoAndStop(startFrame);
    } else {
      tile.gotoAndPlay(startFrame);
    }
  };

  for (let tileI = 0; tileI < tileCount; tileI++) {
    const alongAxis =
      sign > 0 ? tileI * beamTilePx : lengthPx - (tileI + 1) * beamTilePx;
    const screenXy = projectWorldXyzToScreenXy({ [axis]: alongAxis, z: 0 });

    let tile: AnimatedSprite;
    if (tileI < tiles.length) {
      tile = tiles[tileI];
      tile.x = screenXy.x;
      tile.y = screenXy.y;
    } else {
      tile = createSprite({
        animationId,
        flipX,
        // the art's frames travel in the positive direction along the axis;
        // play in reverse for beams going the negative way:
        reverse: sign < 0,
        paused,
        x: screenXy.x,
        y: screenXy.y,
        spritesheet,
      });
      tiles.push(tile);
      rendering.addChild(tile);
    }
    seekTile(tile);
  }

  // trim the tiles past the new tip (when the beam has shortened):
  for (let tileI = tiles.length - 1; tileI >= tileCount; tileI--) {
    const tile = tiles[tileI];
    rendering.removeChild(tile);
    tile.destroy({ texture: false });
  }
  tiles.length = tileCount;

  let terminus = reused?.renderProps.terminus;
  if (end === "terminus") {
    // the glow of the beam's energy dissipating against whatever blocks it,
    // centred on the beam's cross-section at its tip:
    const tipScreenXy = projectWorldXyzToScreenXy({
      [axis]: sign > 0 ? lengthPx : 0,
      [perpendicularAxisXy(axis)]: lightBeamCrossSectionPx / 2,
      z: lightBeamCrossSectionPx / 2,
    });
    if (terminus === undefined) {
      terminus = createSprite({
        animationId: "lightBeam.terminus",
        flipX: axis === "y",
        anchor: { x: 0.5, y: 0.5 },
        x: tipScreenXy.x,
        y: tipScreenXy.y,
        spritesheet,
      });
      rendering.addChild(terminus);
    } else {
      terminus.x = tipScreenXy.x;
      terminus.y = tipScreenXy.y;
      // keep the glow drawn last (on top): tip tiles grown this render were
      // appended after it, so move it back to the end of the container:
      rendering.addChild(terminus);
    }
  } else if (terminus !== undefined) {
    rendering.removeChild(terminus);
    terminus.destroy({ texture: false });
    terminus = undefined;
  }

  return {
    output: rendering,
    renderProps: { direction, lengthPx, end, tiles, terminus },
  };
};
