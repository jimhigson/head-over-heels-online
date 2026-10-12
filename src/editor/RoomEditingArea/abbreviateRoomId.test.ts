import { expect, test } from "vitest";

import { type EditorRoomId } from "../editorTypes";
import { abbreviateRoomId } from "./abbreviateRoomId";

test.for([
  ["room_31", "r31"],
  ["button_climb", "bc"],
  ["buttonClimb", "bc"],
])("%s → %s", ([roomId, abbreviation]) => {
  expect<string>(abbreviateRoomId(roomId as EditorRoomId)).toBe(abbreviation);
});
