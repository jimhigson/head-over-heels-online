import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "dimmed" },
  floor: "egyptus",
  id: "egyptus28",
  items: {
    "door@0,2,0": {
      config: { direction: "right", toRoom: "egyptus29" },
      position: { x: 0, y: 2, z: 0 },
      type: "door",
    },
    "door@3,0,0": {
      config: { direction: "towards", toRoom: "egyptus27" },
      position: { x: 3, y: 0, z: 0 },
      type: "door",
    },
    "door@8,2,0": {
      config: { direction: "left", toRoom: "egyptus26" },
      position: { x: 8, y: 2, z: 0 },
      type: "door",
    },
    "moveableDeadly@4,3,0": {
      config: { style: "deadFish" },
      position: { x: 4, y: 3, z: 0 },
      type: "moveableDeadly",
    },
    "wall@0,0,0:2scjgO": {
      config: { direction: "right", tiles: [], times: { y: 2 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@0,0,0:Z1XoEJK": {
      config: { direction: "towards", tiles: [], times: { x: 3 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@0,4,0": {
      config: { direction: "right", tiles: [], times: { y: 2 } },
      position: { x: 0, y: 4, z: 0 },
      type: "wall",
    },
    "wall@0,6,0": {
      config: {
        direction: "away",
        tiles: [
          "hieroglyphics",
          "hieroglyphics",
          "sarcophagus",
          "hieroglyphics",
          "hieroglyphics",
          "sarcophagus",
          "hieroglyphics",
          "hieroglyphics",
        ],
        times: { x: 8 },
      },
      position: { x: 0, y: 6, z: 0 },
      type: "wall",
    },
    "wall@5,0,0": {
      config: { direction: "towards", tiles: [], times: { x: 3 } },
      position: { x: 5, y: 0, z: 0 },
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
    "wall@8,4,0": {
      config: {
        direction: "left",
        tiles: ["hieroglyphics", "hieroglyphics"],
        times: { y: 2 },
      },
      position: { x: 8, y: 4, z: 0 },
      type: "wall",
    },
  },
  planet: "egyptus",
  size: { x: 8, y: 6 },
}) satisfies RoomJson<"egyptus", OriginalCampaignRoomId>;
