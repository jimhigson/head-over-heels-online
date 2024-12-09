import { inferRoomJson, type RoomJson } from "@/model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "green", shade: "basic" },
  floor: "egyptus",
  floorSkip: [],
  id: "egyptus5",
  items: {
    "deadlyBlock@0,1,0:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 0, y: 1, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@0,4,0:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 0, y: 4, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@1,0,0:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 1, y: 0, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@1,5,0:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 1, y: 5, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@4,0,0:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 4, y: 0, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@4,5,0:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 4, y: 5, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@5,1,0:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 5, y: 1, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@5,4,0:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 5, y: 4, z: 0 },
      type: "deadlyBlock",
    },
    "door@2,0,0:97h0D": {
      config: { direction: "towards", toRoom: "egyptus4" },
      position: { x: 2, y: 0, z: 0 },
      type: "door",
    },
    "door@2,6,0:2p0x1I": {
      config: { direction: "away", toRoom: "egyptus7" },
      position: { x: 2, y: 6, z: 0 },
      type: "door",
    },
    "door@6,2,0:Z1mcWVR": {
      config: { direction: "left", toRoom: "egyptus6" },
      position: { x: 6, y: 2, z: 0 },
      type: "door",
    },
  },
  planet: "egyptus",
  size: { x: 6, y: 6 },
  walls: {
    away: [
      "hieroglyphics",
      "hieroglyphics",
      "none",
      "none",
      "hieroglyphics",
      "hieroglyphics",
    ],
    left: [
      "hieroglyphics",
      "hieroglyphics",
      "none",
      "none",
      "hieroglyphics",
      "hieroglyphics",
    ],
  },
}) satisfies RoomJson<"egyptus", OriginalCampaignRoomId>;
