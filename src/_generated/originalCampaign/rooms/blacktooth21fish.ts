import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "yellow", shade: "dimmed" },
  floor: "deadly",
  id: "blacktooth21fish",
  items: {
    "block@0,0,0": {
      config: { style: "organic", times: { y: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "block",
    },
    "block@3,0,0": {
      config: { style: "organic", times: { x: 2 } },
      position: { x: 3, y: 0, z: 0 },
      type: "block",
    },
    "block@3,4,0": {
      config: { style: "organic" },
      position: { x: 3, y: 4, z: 0 },
      type: "block",
    },
    "block@3,7,0": {
      config: { style: "organic", times: { x: 2 } },
      position: { x: 3, y: 7, z: 0 },
      type: "block",
    },
    "block@6,4,0": {
      config: { disappearing: "onStand", style: "organic" },
      position: { x: 6, y: 4, z: 0 },
      type: "block",
    },
    "block@7,4,0": {
      config: { style: "tower", times: { z: 3 } },
      position: { x: 7, y: 4, z: 0 },
      type: "block",
    },
    "door@3,0,1": {
      config: { direction: "towards", toRoom: "blacktooth20" },
      position: { x: 3, y: 0, z: 1 },
      type: "door",
    },
    "door@3,8,1": {
      config: { direction: "away", toRoom: "blacktooth22" },
      position: { x: 3, y: 8, z: 2 },
      type: "door",
    },
    "pickup@7,4,3": {
      config: { gives: "reincarnation" },
      position: { x: 7, y: 4, z: 3 },
      type: "pickup",
    },
  },
  planet: "blacktooth",
  size: { x: 8, y: 8 },
  walls: {
    away: [
      "plain",
      "shield",
      "plain",
      "none",
      "none",
      "plain",
      "shield",
      "plain",
    ],
    left: [
      "plain",
      "armour",
      "plain",
      "shield",
      "shield",
      "plain",
      "armour",
      "plain",
    ],
  },
}) satisfies RoomJson<"blacktooth", OriginalCampaignRoomId>;
