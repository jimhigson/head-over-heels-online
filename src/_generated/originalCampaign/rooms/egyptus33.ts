import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "green", shade: "basic" },
  floor: "egyptus",
  id: "egyptus33",
  items: {
    "door@3,2,0": {
      config: { direction: "away", toRoom: "egyptus34fish" },
      position: { x: 3, y: 2, z: 0 },
      type: "door",
    },
    "wall@0,0,0:2scjgO": {
      config: { direction: "right", tiles: [], times: { y: 2 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@0,0,0:Z1XoDrY": {
      config: { direction: "towards", tiles: [], times: { x: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@0,2,0": {
      config: {
        direction: "away",
        tiles: ["hieroglyphics", "sarcophagus", "hieroglyphics"],
        times: { x: 3 },
      },
      position: { x: 0, y: 2, z: 0 },
      type: "wall",
    },
    "wall@5,2,0": {
      config: {
        direction: "away",
        tiles: ["hieroglyphics", "sarcophagus", "hieroglyphics"],
        times: { x: 3 },
      },
      position: { x: 5, y: 2, z: 0 },
      type: "wall",
    },
    "wall@8,0,0": {
      config: {
        direction: "left",
        tiles: ["hieroglyphics", "hieroglyphics"],
        times: { y: 2 },
      },
      position: { x: 8, y: 0, z: 0 },
      type: "wall",
    },
  },
  planet: "egyptus",
  roomAbove: "egyptus32",
  size: { x: 8, y: 2 },
}) satisfies RoomJson<"egyptus", OriginalCampaignRoomId>;
