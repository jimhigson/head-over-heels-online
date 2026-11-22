import { expect, test } from "vitest";

import { MockInputStateTracker } from "./MockInputStateTracker";

test("changing from a diagonal to one of its directions stops pressing the other", () => {
  const mockInputStateTracker = new MockInputStateTracker();

  mockInputStateTracker.mockDirectionPressed = "awayRight";
  mockInputStateTracker.mockDirectionPressed = "away";

  expect(mockInputStateTracker.currentActionPress("right")).toBe("released");
});
