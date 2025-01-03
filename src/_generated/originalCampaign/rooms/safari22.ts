import { inferRoomJson, type RoomJson } from "@/model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "dimmed" },
  floor: "safari",
  id: "safari22",
  items: {
    "baddie@0,4,0:Z1rA6U9": {
      config: { activated: true, which: "dalek" },
      position: { x: 0, y: 4, z: 0 },
      type: "baddie",
    },
    "deadlyBlock@1,1,0:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 1, y: 1, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@1,2,0:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 1, y: 2, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@1,3,0:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 1, y: 3, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@1,4,0:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 1, y: 4, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@1,5,0:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 1, y: 5, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@1,6,0:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 1, y: 6, z: 0 },
      type: "deadlyBlock",
    },
    "door@0,0,0:rjxGa": {
      config: { direction: "towards", toRoom: "safari20" },
      position: { x: 0, y: 0, z: 0 },
      type: "door",
    },
    "door@0,8,0:Z2mYk6G": {
      config: { direction: "away", toRoom: "safari23" },
      position: { x: 0, y: 8, z: 0 },
      type: "door",
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
