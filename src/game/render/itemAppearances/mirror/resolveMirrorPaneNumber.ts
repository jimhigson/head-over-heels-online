import { type MirrorOrientation } from "../../../../model/MirrorOrientation";
import { type Xy } from "../../../../utils/vectors/vectors";

/**
 * how long the 90° spin animates when an item knocks a mirror round, in ms -
 * long enough for the eye to catch the in-between pane
 */
export const mirrorFlipMs = 200;

/** the mirror pane direction number - four panes 1/8 turn apart */
export type MirrorPaneNumber = 0 | 1 | 2 | 3;

const quarterPi = Math.PI / 4;

/**
 * the mirror pane to show, as a direction number `d0..d3` - the four
 * orientations a 45° pane shows, each 1/8 turn apart, `d3` being the face-on
 * (reflective) pane. A pure function of the camera angle and the mirror's
 * facing: as either turns, `round()` steps through the numbers.
 *
 * A mirror plane runs along one of the two xy-diagonals (`awayLeft` = 1/8 turn,
 * `awayRight` = 3/8); the camera rotation adds to that (same `+θ` sense as the
 * reflection resolve). When an item has
 * just spun the mirror 90°, its facing is interpolated back from the pre-flip
 * orientation over {@link mirrorFlipMs} (in the {@link flipDirection} the item
 * knocked it), so `round()` passes through the in-between pane rather than
 * jumping - "the frame between the previous two".
 */
export const resolveMirrorPaneNumber = (
  cameraAngle: Xy,
  orientation: MirrorOrientation,
  roomTime: number,
  /** when the mirror was last spun by an item, or undefined if never */
  flippedAtRoomTime: number | undefined,
  /** which way that spin turned the mirror */
  flipDirection: "anticlockwise" | "clockwise" | undefined,
): { number: MirrorPaneNumber; faceOn: boolean } => {
  const cameraEighths = Math.atan2(cameraAngle.y, cameraAngle.x) / quarterPi;
  // the settled facing in 1/8 turns: awayLeft = 1, awayRight = 3:
  const facing = orientation === "awayLeft" ? 1 : 3;

  const flipProgress =
    flippedAtRoomTime === undefined ? 1 : (
      Math.min((roomTime - flippedAtRoomTime) / mirrorFlipMs, 1)
    );
  // interpolate back from the pre-flip facing (90° = 2 eighths away, spun in
  // the flipDirection) so the in-between pane shows mid-spin:
  const facingEighths =
    flipProgress >= 1 ? facing : (
      facing - (flipDirection === "clockwise" ? 1 : -1) * 2 * (1 - flipProgress)
    );

  // the mod-4 result is provably one of 0..3, which TS can't infer:
  const number = (((Math.round(facingEighths + cameraEighths) % 4) + 4) %
    4) as MirrorPaneNumber;
  return { number, faceOn: number === 3 };
};
