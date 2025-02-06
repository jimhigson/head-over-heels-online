import type { PickDeep } from "type-fest";

/**
 * a cut-down version of Gamepad with only the stuff we need to carry
 * forward a record of to the next frame, so that we can compare the
 * state between one frame and the next.
 *
 * In Chrome, navigator.getGamepads() return is immutable, so it can be stored
 * directly. Whereas in Safari, this fails because the object is live.
 */
export type GamepadState = PickDeep<
  Gamepad,
  `buttons.${number}.pressed` | "axes"
>;
export const extractGamepadsState = (
  gp: Array<Gamepad | null>,
): Array<GamepadState | null> => {
  return gp.map((gp) =>
    gp === null ? null : (
      {
        buttons: gp.buttons.map((b) => ({ pressed: b.pressed })),
        axes: gp.axes.map((a) => a),
      }
    ),
  );
};
