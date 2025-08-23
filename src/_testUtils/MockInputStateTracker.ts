import { type InputPress } from "../game/input/InputAssignment";
import type {
  InputStateTrackerInterface,
  PressStatus,
} from "../game/input/InputStateTracker";
import { vi } from "vitest";
import type { DirectionXy4 } from "../utils/vectors/vectors";
import { originXyz } from "../utils/vectors/vectors";
import type { GameState } from "../game/gameState/GameState";
import type { TestRoomId } from "./basicRoom";
import { unitVectors } from "../utils/vectors/unitVectors";
import type { HudInputState } from "../game/input/hudInputState";
import type { BooleanAction } from "../game/input/actions";

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

  actionsHandled: Set<BooleanAction> = new Set();

  mockTick = () => {
    this.mockActionsPressedLastFrame = { ...this.mockActionsPressed };
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

  currentActionPress = vi
    .fn<(action: BooleanAction) => PressStatus>()
    .mockImplementation((action) => {
      if (this.mockActionsPressed[action]) {
        if (!this.mockActionsPressedLastFrame[action]) {
          return "tap";
        }
        return "hold"; // TODO: support tap as needed - if needed
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
