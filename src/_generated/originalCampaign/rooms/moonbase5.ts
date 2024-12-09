import { inferRoomJson, type RoomJson } from "@/model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "green", shade: "basic" },
  floor: "moonbase",
  floorSkip: [],
  id: "moonbase5",
  items: {
    "baddie@0,4,0:2dbvGC": {
      config: { activated: true, which: "headless-base" },
      position: { x: 0, y: 4, z: 0 },
      type: "baddie",
    },
    "baddie@3,2,0:2dbvGC": {
      config: { activated: true, which: "headless-base" },
      position: { x: 3, y: 2, z: 0 },
      type: "baddie",
    },
    "baddie@3,6,0:2dbvGC": {
      config: { activated: true, which: "headless-base" },
      position: { x: 3, y: 6, z: 0 },
      type: "baddie",
    },
    "door@1,0,0:Z1iR2DA": {
      config: { direction: "towards", toRoom: "moonbase4" },
      position: { x: 1, y: 0, z: 0 },
      type: "door",
    },
    "door@1,8,0:Z2q5j3K": {
      config: { direction: "away", toRoom: "moonbase6" },
      position: { x: 1, y: 8, z: 0 },
      type: "door",
    },
  },
  planet: "moonbase",
  size: { x: 4, y: 8 },
  walls: {
    away: ["window3", "none", "none", "window1"],
    left: [
      "window2",
      "window1",
      "coil",
      "window3",
      "window2",
      "coil",
      "window2",
      "window1",
    ],
  },
}) satisfies RoomJson<"moonbase", OriginalCampaignRoomId>;
