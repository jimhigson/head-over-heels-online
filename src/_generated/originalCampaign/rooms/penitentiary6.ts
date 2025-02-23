import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "green", shade: "basic" },
  floor: "none",
  id: "penitentiary6",
  items: {
    "block@0,5,0": {
      config: { style: "artificial" },
      position: { x: 0, y: 5, z: 0 },
      type: "block",
    },
    "deadlyBlock@3,0,0": {
      config: { style: "volcano", times: { y: 6 } },
      position: { x: 3, y: 0, z: 0 },
      type: "deadlyBlock",
    },
    "door@6,2,3": {
      config: { direction: "left", toRoom: "penitentiary7" },
      position: { x: 6, y: 2, z: 3 },
      type: "door",
    },
    "movableBlock@3,0,1": {
      config: {
        activated: true,
        movement: "back-forth",
        startDirection: "towards",
        style: "stepStool",
      },
      position: { x: 3, y: 0, z: 1 },
      type: "movableBlock",
    },
  },
  planet: "penitentiary",
  roomBelow: "penitentiary5",
  size: { x: 6, y: 6 },
  walls: {
    away: ["loop", "skeleton", "loop", "loop", "skeleton", "loop"],
    left: ["loop", "loop", "none", "none", "loop", "loop"],
  },
}) satisfies RoomJson<"penitentiary", OriginalCampaignRoomId>;
