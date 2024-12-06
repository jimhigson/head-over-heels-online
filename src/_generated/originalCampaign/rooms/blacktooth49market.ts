import type { RoomJson } from "../../../model/modelTypes.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = {
  color: { hue: "white", shade: "basic" },
  floor: "market",
  floorSkip: [],
  id: "blacktooth49market",
  items: {
    "deadlyBlock@3,0,0:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 3, y: 0, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@3,0,1:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 3, y: 0, z: 1 },
      type: "deadlyBlock",
    },
    "deadlyBlock@3,1,1:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 3, y: 1, z: 1 },
      type: "deadlyBlock",
    },
    "deadlyBlock@4,0,0:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 4, y: 0, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@4,0,1:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 4, y: 0, z: 1 },
      type: "deadlyBlock",
    },
    "deadlyBlock@4,1,1:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 4, y: 1, z: 1 },
      type: "deadlyBlock",
    },
    "door@0,0,0:1pRITA": {
      config: { direction: "right", toRoom: "blacktooth48market" },
      position: { x: 0, y: 0, z: 0 },
      type: "door",
    },
    "door@8,0,0:4EyaM": {
      config: { direction: "left", toRoom: "blacktooth50market" },
      position: { x: 8, y: 0, z: 0 },
      type: "door",
    },
  },
  planet: "market",
  size: { x: 8, y: 2 },
  walls: {
    away: [
      "more-fruits",
      "fruits",
      "passage",
      "more-fruits",
      "fruits",
      "passage",
      "more-fruits",
      "fruits",
    ],
    left: ["none", "none"],
  },
} satisfies RoomJson<"market", OriginalCampaignRoomId>;
