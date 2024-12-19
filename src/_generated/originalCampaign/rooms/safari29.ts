import { inferRoomJson, type RoomJson } from "@/model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "dimmed" },
  floor: "safari",
  id: "safari29",
  items: {
    "baddie@7,7,0:zoxNb": {
      config: { activated: true, startDirection: "towards", which: "cyberman" },
      position: { x: 7, y: 7, z: 0 },
      type: "baddie",
    },
    "deadlyBlock@2,2,0:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 2, y: 2, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@3,0,0:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 3, y: 0, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@3,1,0:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 3, y: 1, z: 0 },
      type: "deadlyBlock",
    },
    "door@0,3,0:Z2p4zNW": {
      config: { direction: "right", toRoom: "safari28" },
      position: { x: 0, y: 3, z: 0 },
      type: "door",
    },
    "door@8,3,0:Z140yLt": {
      config: { direction: "left", toRoom: "safari30" },
      position: { x: 8, y: 3, z: 0 },
      type: "door",
    },
  },
  planet: "safari",
  size: { x: 8, y: 8 },
  walls: {
    away: [
      "wall",
      "window",
      "wall",
      "shield",
      "shield",
      "wall",
      "window",
      "wall",
    ],
    left: ["wall", "shield", "wall", "none", "none", "wall", "window", "wall"],
  },
}) satisfies RoomJson<"safari", OriginalCampaignRoomId>;
