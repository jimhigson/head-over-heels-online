import { inferRoomJson, type RoomJson } from "@/model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "dimmed" },
  floor: "safari",
  floorSkip: [],
  id: "safari11",
  items: {
    "baddie@0,0,0:Z2qiM0z": {
      config: { activated: true, which: "elephant" },
      position: { x: 0, y: 0, z: 0 },
      type: "baddie",
    },
    "baddie@2,3,0:gzuaR": {
      config: { activated: true, which: "elephant-head" },
      position: { x: 2, y: 3, z: 0 },
      type: "baddie",
    },
    "baddie@3,1,0:gzuaR": {
      config: { activated: true, which: "elephant-head" },
      position: { x: 3, y: 1, z: 0 },
      type: "baddie",
    },
    "baddie@3,5,0:gzuaR": {
      config: { activated: true, which: "elephant-head" },
      position: { x: 3, y: 5, z: 0 },
      type: "baddie",
    },
    "door@0,2,0:Z2p4JSm": {
      config: { direction: "right", toRoom: "safari10" },
      position: { x: 0, y: 2, z: 0 },
      type: "door",
    },
    "door@6,2,0:Z140OgI": {
      config: { direction: "left", toRoom: "safari12" },
      position: { x: 6, y: 2, z: 0 },
      type: "door",
    },
  },
  planet: "safari",
  size: { x: 6, y: 6 },
  walls: {
    away: ["shield", "wall", "window", "window", "wall", "shield"],
    left: ["wall", "shield", "none", "none", "shield", "wall"],
  },
}) satisfies RoomJson<"safari", OriginalCampaignRoomId>;
