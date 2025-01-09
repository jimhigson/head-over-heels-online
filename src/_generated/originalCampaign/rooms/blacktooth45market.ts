import { inferRoomJson, type RoomJson } from "@/model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "magenta", shade: "basic" },
  floor: "market",
  id: "blacktooth45market",
  items: {
    "block@0,0,1": {
      config: { disappearing: "onStand", style: "organic" },
      position: { x: 0, y: 0, z: 1 },
      type: "block",
    },
    "block@0,1,0": {
      config: { style: "organic" },
      position: { x: 0, y: 1, z: 0 },
      type: "block",
    },
    "block@1,0,0": {
      config: { style: "organic" },
      position: { x: 1, y: 0, z: 0 },
      type: "block",
    },
    "block@6,7,0": {
      config: { style: "organic" },
      position: { x: 6, y: 7, z: 0 },
      type: "block",
    },
    "block@7,6,0": {
      config: { style: "organic" },
      position: { x: 7, y: 6, z: 0 },
      type: "block",
    },
    "block@7,7,1": {
      config: { disappearing: "onStand", style: "organic" },
      position: { x: 7, y: 7, z: 1 },
      type: "block",
    },
    "deadlyBlock@7,7,0": {
      config: { style: "volcano" },
      position: { x: 7, y: 7, z: 0 },
      type: "deadlyBlock",
    },
    "door@3,8,0": {
      config: { direction: "away", toRoom: "blacktooth46market" },
      position: { x: 3, y: 8, z: 0 },
      type: "door",
    },
    "door@8,3,0": {
      config: { direction: "left", toRoom: "blacktooth44market" },
      position: { x: 8, y: 3, z: 0 },
      type: "door",
    },
    "pickup@0,0,0": {
      config: { gives: "extra-life" },
      position: { x: 0, y: 0, z: 0 },
      type: "pickup",
    },
  },
  planet: "market",
  size: { x: 8, y: 8 },
  walls: {
    away: [
      "passage",
      "more-fruits",
      "fruits",
      "none",
      "none",
      "more-fruits",
      "fruits",
      "passage",
    ],
    left: [
      "passage",
      "more-fruits",
      "fruits",
      "none",
      "none",
      "more-fruits",
      "fruits",
      "passage",
    ],
  },
}) satisfies RoomJson<"market", OriginalCampaignRoomId>;
