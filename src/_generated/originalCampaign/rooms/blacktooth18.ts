import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "cyan", shade: "dimmed" },
  floor: "blacktooth",
  id: "blacktooth18",
  items: {
    "block@3,3,0": {
      config: { style: "book" },
      position: { x: 3, y: 3, z: 0 },
      type: "block",
    },
    "block@3,3,1": {
      config: { style: "book" },
      position: { x: 3, y: 3, z: 1 },
      type: "block",
    },
    "door@0,2,0": {
      config: { direction: "right", toRoom: "blacktooth17triple" },
      position: { x: 0, y: 2, z: 0 },
      type: "door",
    },
    "door@8,2,4": {
      config: { direction: "left", toRoom: "blacktooth20" },
      position: { x: 8, y: 2, z: 4 },
      type: "door",
    },
    "monster@4,3,0": {
      config: {
        activated: true,
        movement: "back-forth",
        startDirection: "towards",
        style: "greenAndPink",
        which: "skiHead",
      },
      position: { x: 4, y: 3, z: 0 },
      type: "monster",
    },
    "portableBlock@3,3,2": {
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
