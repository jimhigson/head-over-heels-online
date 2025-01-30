import { store } from "../../store/store";
import { originXyz, type Xyz } from "../../utils/vectors/vectors";
import type { InputAssignment } from "./InputState";
import { booleanActions, type BooleanAction } from "./InputState";
import type { KeyboardState } from "./keyboardState";
import { nextOrder } from "./order";

type InterpretedActions = { readonly [a in BooleanAction]?: boolean };

export type InputStateInterpretation = {
  actions: InterpretedActions;
  underlying: {
    keyboardState: KeyboardState;
    // TODO: more properties as needed:
    //gamePadState: // ..
  };
  direction: Xyz;
  handled: (action: BooleanAction) => void;
};

/**
 * read from the given inputState (and anything else) to get the current interpretation
 * of the input, according to the
 */
export const interpretInputState = (
  keyboardState: KeyboardState,
  // this could be a parameter for easier testing (?)
  //gamepads: (Gamepad | null)[],
  /** a getter for the 'live' input assignment */
  getInputAssignment: () => InputAssignment = () =>
    store.getState().userSettings.inputAssignment,
): InputStateInterpretation => {
  const handledAt = new Map<BooleanAction, number>();

  const interpretationActions = new Proxy<InterpretedActions>(
    {},
    {
      /**
       * get the **live** version of if an action is currently
       * being pressed by looking at the input mappings and the
       * keyboard/gamepad state directly
       */
      get(_target, action: BooleanAction) {
        /*
         * we connect directly to the store *live* - this could be pluggable
         * if required, but for now we always have the store and always want to
         * be up to date with it.
         */
        const assignedInputsForAction = getInputAssignment()[action];

        for (const k of assignedInputsForAction.keys) {
          const pressedAt = keyboardState.keys[k];
          if (
            pressedAt !== undefined &&
            pressedAt > (handledAt.get(action) ?? 0)
          ) {
            return true;
          }
        }

        for (const buttonNumber of assignedInputsForAction.gamepadButtons) {
          for (const gp of navigator.getGamepads()) {
            if (gp === null || gp.buttons.length <= buttonNumber) {
              // gamepad may not be activated, or may not have this many buttons
              continue;
            }
            // note that buttons don't give the time/order of their press- may have to
            // work this in ourselves
            if (gp.buttons[buttonNumber].pressed) {
              return true;
            }
          }
        }

        return false;
      },
      ownKeys: () => booleanActions,
    },
  );

  return {
    actions: interpretationActions,
    // TODO
    underlying: { keyboardState },
    direction: originXyz,
    handled(action: BooleanAction) {
      handledAt.set(action, nextOrder());
    },
  };
};
