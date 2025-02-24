import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "dimmed" },
  floor: "bookworld",
  id: "bookworld22",
  items: {
    "block@0,0,2": {
      config: { disappearing: "onStand", style: "book" },
      position: { x: 0, y: 0, z: 2 },
      type: "block",
    },
    "block@0,1,0": {
      config: { style: "book", times: { x: 2, z: 2 } },
      position: { x: 0, y: 1, z: 0 },
      type: "block",
    },
    "block@1,0,3": {
      config: { style: "book" },
      position: { x: 1, y: 0, z: 3 },
      type: "block",
    },
    "block@1,1,2": {
      config: { style: "book" },
      position: { x: 1, y: 1, z: 2 },
      type: "block",
    },
    "deadlyBlock@0,0,0": {
      config: { style: "toaster" },
      position: { x: 0, y: 0, z: 0 },
      type: "deadlyBlock",
    },
    "door@0,3,0": {
      config: { direction: "right", toRoom: "bookworld23" },
      position: { x: 0, y: 3, z: 0 },
      type: "door",
    },
    "door@0,8,0": {
      config: { direction: "away", toRoom: "bookworld21" },
      position: { x: 0, y: 8, z: 0 },
      type: "door",
    },
    "pickup@1,0,0": {
      config: { gives: "shield" },
      position: { x: 1, y: 0, z: 0 },
      type: "pickup",
    },
    "portableBlock@0,5,0": {
      config: { style: "sticks" },
      position: { x: 0, y: 5, z: 0 },
      type: "portableBlock",
    },
  },
  planet: "bookworld",
  size: { x: 2, y: 8 },
  walls: {
    away: ["none", "none"],
    left: ["book", "book", "cowboy", "book", "book", "cowboy", "book", "book"],
  },
}) satisfies RoomJson<"bookworld", OriginalCampaignRoomId>;
