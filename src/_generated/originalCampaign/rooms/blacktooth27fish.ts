import type { RoomJson } from "../../../model/modelTypes.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = {
  color: { hue: "yellow", shade: "dimmed" },
  floor: "blacktooth",
  floorSkip: [],
  id: "blacktooth27fish",
  items: {
    "door@0,3,0:uMBGP": {
      config: { direction: "right", toRoom: "blacktooth28" },
      position: { x: 0, y: 3, z: 0 },
      type: "door",
    },
    "door@1,0,0:Z1V82CQ": {
      config: { direction: "towards", toRoom: "blacktooth26" },
      position: { x: 1, y: 0, z: 0 },
      type: "door",
    },
    "door@1,8,3:xRpdj": {
      config: { direction: "away", toRoom: "blacktooth29" },
      position: { x: 1, y: 8, z: 3 },
      type: "door",
    },
    "movableBlock@2,3,0:Z15GVb5": {
      config: { style: "anvil" },
      position: { x: 2, y: 3, z: 0 },
      type: "movableBlock",
    },
    "pickup@2,3,1:ZPJAGD": {
      config: { gives: "reincarnation" },
      position: { x: 2, y: 3, z: 1 },
      type: "pickup",
    },
    "portableBlock@0,0,0:Z1SKpmn": {
      config: { style: "drum" },
      position: { x: 0, y: 0, z: 0 },
      type: "portableBlock",
    },
  },
  planet: "blacktooth",
  size: { x: 4, y: 8 },
  walls: {
    away: ["shield", "none", "none", "shield"],
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
} satisfies RoomJson<"blacktooth", OriginalCampaignRoomId>;
