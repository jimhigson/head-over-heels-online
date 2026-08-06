import { type AnimatedSprite, Container } from "pixi.js";

import { type LightBeamEnd } from "../../../model/ItemStateMap";
import { originalGameFrameDuration } from "../../../originalGame";
import { nearestQuarterAngle } from "../../../utils/vectors/cameraAngleVectors";
import { octantIndexOfDirection } from "../../../utils/vectors/octantIndexOfDirection" with { type: "macro" };
import { axisProjectsReversed } from "../../../utils/vectors/resolveCameraRelativeVector";
import {
  dominantAxisXy,
  perpendicularAxisXy,
  rotateAxisXyByCameraAngle,
  type Xy,
  xyEqual,
  type Xyz,
} from "../../../utils/vectors/vectors";
import { lightBeamCrossSectionPx } from "../../physics/mechanics/lightBeams";
import { createSprite } from "../createSprite";
import { projectWorldXyzToScreenXy } from "../projections";
import { type ItemAppearance } from "./ItemAppearance";

type LightBeamRenderProps = {
  direction: Xyz;
  lengthPx: number;
  end: LightBeamEnd;
  /** the beam's rendered axis and tiling resolve per camera angle */
  cameraQuarterAngle: Xy;
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
    item: {
      aabb,
      config: { direction },
      state: { end },
    },
    room: { roomTime },
    general: { paused, spritesheets, cameraAngle },
  },
  currentRendering,
}) => {
  const cameraQuarterAngle = nearestQuarterAngle(cameraAngle);
  const axis = dominantAxisXy(direction);
  const crossAxis = perpendicularAxisXy(axis);
  // the beam runs along its world axis, but on screen it appears along the axis
  // the camera rotation has turned that into - which is what the sprite flip and
  // the tile projection below follow:
  const renderedAxis = rotateAxisXyByCameraAngle(axis, cameraQuarterAngle);
  const lengthPx = aabb[axis];

  // each tile's art extends from its anchor in the rendered axis's base screen
  // direction; when an axis of the beam projects reversed on screen the art
  // hangs on the other side of its anchor, so anchors move one tile along the
  // beam / one cross-section across it to keep the art over the beam's box:
  const alongReversed = axisProjectsReversed(axis, cameraQuarterAngle);
  const crossReversed = axisProjectsReversed(crossAxis, cameraQuarterAngle);
  const alongAnchorAdjust = alongReversed ? beamTilePx : 0;
  const crossAnchorAdjust = crossReversed ? lightBeamCrossSectionPx : 0;

  const previous = currentRendering?.renderProps;
  if (
    previous !== undefined &&
    xyEqual(direction, previous.direction) &&
    end === previous.end &&
    lengthPx === previous.lengthPx &&
    xyEqual(cameraQuarterAngle, previous.cameraQuarterAngle)
  ) {
    return "no-update";
  }

  // light beams are an unreflected item type, so never take the
  // mirror-reflection suffix:
  const { spritesheetForCurrentRoom: spritesheet } = spritesheets;
  const dominantOrdinal = direction[axis];
  const tileCount = Math.max(1, Math.round(lengthPx / beamTilePx));

  // the y-axis beam is the x-axis beam flipped in x (swapping x/y axes is a
  // horizontal flip in this projection), so only the x art exists:
  const animationId = `lightBeam.d${octantIndexOfDirection("left")}` as const;
  const flipX = renderedAxis === "y";
  const { animationSpeed, length: frameCount } =
    spritesheet.data.animations[animationId];
  const frameDurationMs = originalGameFrameDuration / animationSpeed;
  const startFrame = Math.floor(roomTime / frameDurationMs) % frameCount;

  // tiles can only be reused while the beam's apparent orientation is
  // unchanged - a different world direction OR a different camera quarter
  // means different positions, flip and play direction (those are baked into
  // the tiles at creation), so a new rendering is started (the caller drops
  // the old one) in that case:
  const reused =
    (
      currentRendering !== undefined &&
      xyEqual(currentRendering.renderProps.direction, direction) &&
      xyEqual(
        currentRendering.renderProps.cameraQuarterAngle,
        cameraQuarterAngle,
      )
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
      dominantOrdinal > 0 ?
        tileI * beamTilePx
      : lengthPx - (tileI + 1) * beamTilePx;
    const screenXy = projectWorldXyzToScreenXy(
      {
        [axis]: alongAxis + alongAnchorAdjust,
        [crossAxis]: crossAnchorAdjust,
        z: 0,
      },
      cameraQuarterAngle,
    );

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
        // play in reverse for beams going the negative way. When the axis
        // projects reversed on screen the art's travel appears mirrored, so
        // the play direction swaps with it:
        reverse: dominantOrdinal < 0 !== alongReversed,
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
    // the terminus sprite is centre-anchored, so takes the tip's physical
    // centre with no anchor-side adjustments:
    const tipScreenXy = projectWorldXyzToScreenXy(
      {
        [axis]: dominantOrdinal > 0 ? lengthPx : 0,
        [crossAxis]: lightBeamCrossSectionPx / 2,
        z: lightBeamCrossSectionPx / 2,
      },
      cameraQuarterAngle,
    );
    if (terminus === undefined) {
      terminus = createSprite({
        animationId: "lightBeam.terminus",
        flipX: renderedAxis === "y",
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
    renderProps: {
      direction,
      lengthPx,
      end,
      tiles,
      terminus,
      cameraQuarterAngle,
    },
  };
};
