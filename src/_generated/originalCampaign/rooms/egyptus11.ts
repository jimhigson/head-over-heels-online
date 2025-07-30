import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "cyan", shade: "dimmed" },
  id: "egyptus11",
  items: {
    "door@0,0,0": {
      config: { direction: "right", toRoom: "egyptus10" },
      position: { x: 0, y: 0, z: 0 },
      type: "door",
    },
    "door@8,0,0": {
      config: { direction: "left", toRoom: "egyptus12" },
      position: { x: 8, y: 0, z: 0 },
      type: "door",
    },
    "floor@0,0,0": {
      config: {
        floorType: "standable",
        scenery: "egyptus",
        times: { x: 8, y: 2 },
      },
      position: { x: 0, y: 0, z: 0 },
      type: "floor",
    },
    "wall@0,0,0": {
      config: { direction: "towards", times: { x: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@0,2,0": {
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
}) satisfies RoomJson<OriginalCampaignRoomId, string, "egyptus">;
