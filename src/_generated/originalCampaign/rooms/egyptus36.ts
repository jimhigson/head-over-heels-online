import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "yellow", shade: "basic" },
  id: "egyptus36",
  items: {
    b: {
      config: { style: "organic", times: { y: 8 } },
      position: { x: 1, y: 0, z: 0 },
      type: "block",
    },
    f: {
      config: { floorType: "none", times: { x: 2, y: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "floor",
    },
    l: {
      config: { bottom: 0, top: 11 },
      position: { x: 0, y: 0, z: 0 },
      type: "lift",
    },
    w: {
      config: { direction: "right", times: { y: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    w1: {
      config: { direction: "towards", times: { x: 2 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    w2: {
      config: { direction: "away", tiles: ["hieroglyphics", "hieroglyphics"] },
      position: { x: 0, y: 8, z: 0 },
      type: "wall",
    },
    w3: {
      config: {
        direction: "left",
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
      position: { x: 2, y: 0, z: 0 },
      type: "wall",
    },
  },
  planet: "egyptus",
  roomAbove: "egyptus37",
  roomBelow: "egyptus35",
}) satisfies RoomJson<OriginalCampaignRoomId, string, "egyptus">;
