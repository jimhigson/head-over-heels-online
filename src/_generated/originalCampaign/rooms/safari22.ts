import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "dimmed" },
  floor: "safari",
  id: "safari22",
  items: {
    "deadlyBlock@1,1,0": {
      config: { style: "volcano", times: { y: 6 } },
      position: { x: 1, y: 1, z: 0 },
      type: "deadlyBlock",
    },
    "door@0,0,0": {
      config: { direction: "towards", toRoom: "safari20" },
      position: { x: 0, y: 0, z: 0 },
      type: "door",
    },
    "door@0,8,0": {
      config: { direction: "away", toRoom: "safari23" },
      position: { x: 0, y: 8, z: 0 },
      type: "door",
    },
    "monster@0,4,0": {
      config: {
        activated: true,
        movement: "patrol-randomly-diagonal",
        which: "dalek",
      },
      position: { x: 0, y: 4, z: 0 },
      type: "monster",
    },
  },
  planet: "safari",
  size: { x: 2, y: 8 },
  walls: {
    away: ["none", "none"],
    left: [
      "wall",
      "window",
      "wall",
      "shield",
      "shield",
      "wall",
      "window",
      "wall",
    ],
  },
}) satisfies RoomJson<"safari", OriginalCampaignRoomId>;
