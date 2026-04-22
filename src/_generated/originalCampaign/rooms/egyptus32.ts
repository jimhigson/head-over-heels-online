import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "green", shade: "basic" },
  id: "egyptus32",
  items: {
    b: {
      config: { style: "organic", times: { y: 2 } },
      position: { x: 7, y: 0, z: 3 },
      type: "block",
    },
    d: {
      config: { direction: "left", toRoom: "egyptus31" },
      position: { x: 8, y: 0, z: 5 },
      type: "door",
    },
    f: {
      config: { floorType: "none", times: { x: 8, y: 2 } },
      position: { x: 0, y: 0, z: 0 },
      type: "floor",
    },
    w: {
      config: { direction: "right", times: { y: 2 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    w1: {
      config: { direction: "towards", times: { x: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    w2: {
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
      },
      position: { x: 0, y: 2, z: 0 },
      type: "wall",
    },
  },
  planet: "egyptus",
  roomBelow: "egyptus33",
}) satisfies RoomJson<OriginalCampaignRoomId, string, "egyptus">;
