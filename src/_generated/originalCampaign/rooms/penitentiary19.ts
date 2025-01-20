import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "dimmed" },
  floor: "penitentiary",
  id: "penitentiary19",
  items: {
    "door@1,0,0": {
      config: { direction: "towards", toRoom: "penitentiary12" },
      position: { x: 1, y: 0, z: 0 },
      type: "door",
    },
    "door@1,8,3": {
      config: { direction: "away", toRoom: "penitentiary21" },
      position: { x: 1, y: 8, z: 3 },
      type: "door",
    },
    "monster@1,3,0": {
      config: {
        activated: true,
        movement: "patrol-randomly-diagonal",
        which: "dalek",
      },
      position: { x: 1, y: 3, z: 0 },
      type: "monster",
    },
    "monster@2,4,0": {
      config: {
        activated: true,
        movement: "patrol-randomly-diagonal",
        which: "dalek",
      },
      position: { x: 2, y: 4, z: 0 },
      type: "monster",
    },
    "portableBlock@2,3,0": {
      config: { style: "drum" },
      position: { x: 2, y: 3, z: 0 },
      type: "portableBlock",
    },
  },
  planet: "penitentiary",
  size: { x: 4, y: 8 },
  walls: {
    away: ["loop", "none", "none", "loop"],
    left: [
      "loop",
      "loop",
      "skeleton",
      "loop",
      "loop",
      "skeleton",
      "loop",
      "loop",
    ],
  },
}) satisfies RoomJson<"penitentiary", OriginalCampaignRoomId>;
