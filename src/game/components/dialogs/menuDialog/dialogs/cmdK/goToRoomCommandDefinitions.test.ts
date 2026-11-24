import { expect, test } from "vitest";

import { goToRoomCommandDefinitions } from "./goToRoomCommandDefinitions";

test("makes a command to go to each room, keyed by the room", () => {
  expect(goToRoomCommandDefinitions(["blacktooth1", "moonbase2"])).toEqual({
    "room.blacktooth1": {
      type: "goToRoom",
      label: "Room: blacktooth1",
      roomId: "blacktooth1",
    },
    "room.moonbase2": {
      type: "goToRoom",
      label: "Room: moonbase2",
      roomId: "moonbase2",
    },
  });
});
