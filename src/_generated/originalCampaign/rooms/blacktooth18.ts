import { inferRoomJson, type RoomJson } from "@/model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "cyan", shade: "dimmed" },
  floor: "blacktooth",
  floorSkip: [],
  id: "blacktooth18",
  items: {
    "baddie@4,3,0:1eMnEb": {
      config: {
        activated: true,
        startDirection: "towards",
        style: "greenAndPink",
        which: "american-football-head",
      },
      position: { x: 4, y: 3, z: 0 },
      type: "baddie",
    },
    "book@3,3,0:Z213BvY": {
      config: { slider: false },
      position: { x: 3, y: 3, z: 0 },
      type: "book",
    },
    "book@3,3,1:Z213BvY": {
      config: { slider: false },
      position: { x: 3, y: 3, z: 1 },
      type: "book",
    },
    "door@0,2,0:F8e3o": {
      config: { direction: "right", toRoom: "blacktooth17triple" },
      position: { x: 0, y: 2, z: 0 },
      type: "door",
    },
    "door@8,2,4:ZUCWaD": {
      config: { direction: "left", toRoom: "blacktooth20" },
      position: { x: 8, y: 2, z: 4 },
      type: "door",
    },
    "portableBlock@3,3,2:Z1UEQTQ": {
      config: { style: "cube" },
      position: { x: 3, y: 3, z: 2 },
      type: "portableBlock",
    },
  },
  planet: "blacktooth",
  size: { x: 8, y: 6 },
  walls: {
    away: [
      "plain",
      "armour",
      "plain",
      "shield",
      "shield",
      "plain",
      "armour",
      "plain",
    ],
    left: ["plain", "shield", "none", "none", "shield", "plain"],
  },
}) satisfies RoomJson<"blacktooth", OriginalCampaignRoomId>;
