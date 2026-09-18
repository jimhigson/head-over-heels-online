/**
 * how fast the camera swings once up to speed, in radians per real ms - twelve
 * degrees a second. Negative is clockwise
 */
const deathCameraSpinRate = (-12 * (Math.PI / 180)) / 1_000;

/** how long the swing takes to come up to speed, in real ms */
const deathCameraSpinEaseInMs = 1_000;

/** how long the room takes to settle on the dying character, in real ms */
const deathCameraCentringMs = 1_500;

/**
 * the swing's smoothstep ease-in, integrated: the fraction of a full-speed ms
 * travelled `fraction` of the way through the ease-in
 */
const easedInMsFraction = (fraction: number) =>
  fraction ** 3 - fraction ** 4 / 2;

/**
 * the ms of full-speed swing travelled by `realMs` - the ease-in spends its
 * first {@link deathCameraSpinEaseInMs} covering only half that much ground
 */
const swungMs = (realMs: number) =>
  realMs < deathCameraSpinEaseInMs ?
    deathCameraSpinEaseInMs *
    easedInMsFraction(realMs / deathCameraSpinEaseInMs)
  : realMs - deathCameraSpinEaseInMs / 2;

/** the effect a death has on where the camera is placed, while one plays */
export type DeathCameraEffect = {
  /** added to the angle the camera would otherwise be placed at */
  spinRadians: number;
  /**
   * how far to pull the room from where it would otherwise sit towards having
   * the dying character centred on screen, 0..1
   */
  centringFraction: number;
};

export const noDeathCameraEffect: DeathCameraEffect = {
  spinRadians: 0,
  centringFraction: 0,
};

/**
 * where to place the camera relative to wherever it already is, given how long
 * a character has been dying for.
 *
 * Measured in real time, not game time: the death slows the world to a halt and
 * then holds it there while the dialog is up, so a swing on the game clock would
 * stop with it. This one eases in and then turns at a steady rate for as long as
 * the death lasts, however long the player leaves the dialog open.
 *
 * Nothing at all when nobody is dying, so the played angle and scroll are never
 * touched - the effect unwinds itself the moment the death ends.
 */
export const deathCameraEffect = (
  /** real ms since the death began, not scaled by the game speed */
  realMsSinceDeathStarted: number,
): DeathCameraEffect => ({
  spinRadians: swungMs(realMsSinceDeathStarted) * deathCameraSpinRate,
  centringFraction: Math.min(
    1,
    realMsSinceDeathStarted / deathCameraCentringMs,
  ),
});
