import { vi } from "vitest";

import type { GameState } from "../game/gameState/GameState";
import type { BooleanAction } from "../game/input/actions";
import type { HudInputState } from "../game/input/hudInputState";
import type {
  InputStateTrackerInterface,
  PressStatus,
} from "../game/input/InputStateTracker";
import type { DirectionXy4 } from "../utils/vectors/vectors";
import type { TestRoomId } from "./basicRoom";

import { type InputPress } from "../game/input/InputAssignment";
import { unitVectors } from "../utils/vectors/unitVectors";
import { originXyz } from "../utils/vectors/vectors";

export class MockInputStateTracker implements InputStateTrackerInterface {
  /** returns any new taps since the last frame */
  inputTap = vi.fn<() => InputPress | undefined>();

  directionVector = originXyz;
  lookVector = originXyz;

  startTicking = vi.fn<() => void>();
  stopTicking = vi.fn<() => void>();

  // assign these to change the input
  mockActionsPressed: { [a in BooleanAction]?: true } = {};
  mockActionsPressedLastFrame: { [a in BooleanAction]?: true } = {};

  #actionsHandled: Set<BooleanAction> = new Set();

  mockTick = () => {
    this.mockActionsPressedLastFrame = { ...this.mockActionsPressed };

    // clear the latches for input that was handled, but now no longer is being input:
    for (const action of this.#actionsHandled) {
      if (!this.mockActionsPressed[action]) {
        this.#actionsHandled.delete(action);
      }
    }
  };

  set mockDirectionPressed(direction: DirectionXy4 | undefined) {
    if (direction === undefined) {
      this.directionVector = originXyz;
      delete this.mockActionsPressed.left;
      delete this.mockActionsPressed.right;
      delete this.mockActionsPressed.away;
      delete this.mockActionsPressed.towards;
    } else {
      this.mockActionsPressed[direction] = true;
      this.directionVector = unitVectors[direction];
    }
  }

  mockPressing(action: BooleanAction) {
    this.mockActionsPressed[action] = true;
  }
  mockNotPressing(action: BooleanAction) {
    delete this.mockActionsPressed[action];
  }
  setMockPressing(action: BooleanAction, pressing: boolean) {
    if (pressing) {
      this.mockPressing(action);
    } else {
      this.mockNotPressing(action);
    }
  }

  inputWasHandled(action: BooleanAction): void;
  inputWasHandled(action: BooleanAction, keepFor: number): void;
  inputWasHandled(action: BooleanAction, _keepFor?: number): void {
    // we don't do timing in this mock, we just clear after every tick
    // so keepFor is ignored completely
    this.#actionsHandled.add(action);
  }

  currentActionPress = vi
    .fn<(action: BooleanAction) => PressStatus>()
    .mockImplementation((action) => {
      if (this.#actionsHandled.has(action)) {
        return "released"; // treat as released if was already handled
      }

      if (this.mockActionsPressed[action]) {
        if (!this.mockActionsPressedLastFrame[action]) {
          return "tap";
        }
        return "hold";
      }

      return "released";
    });

  get hudInputState() {
    return {} as HudInputState;
  }
}
export type GameStateWithMockInput = Omit<
  GameState<TestRoomId>,
  "inputStateTracker"
> & {
  inputStateTracker: MockInputStateTracker;
};

/*
export const setInputDirection = (
  mockInputStateTracker: MockInputStateTracker,
  direction?: DirectionXy4,
  actions?: BooleanAction[],
) => {
  mockInputStateTracker.directionVector =
    direction ? unitVectors[direction] : originXyz;

  const calledAtLeastOnceWithAction: { [a in BooleanAction]?: true } = {};

  mockInputStateTracker.currentActionPress.mockImplementation((action) => {
    if (actions?.includes(action)) {
      const result = calledAtLeastOnceWithAction[action] ? "hold" : "tap";
      calledAtLeastOnceWithAction[action] = true;
      return result;
    }

    // press the action/direction:
    if (action === direction) {
      const result = calledAtLeastOnceWithAction[direction] ? "hold" : "tap";
      calledAtLeastOnceWithAction[direction] = true;
      return result;
    }

    return "released";
  });
};
*/
