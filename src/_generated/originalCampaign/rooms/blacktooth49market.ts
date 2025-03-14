import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "basic" },
  floor: "market",
  id: "blacktooth49market",
  items: {
    "deadlyBlock@3,0,0": {
      config: { style: "volcano", times: { x: 2, z: 2 } },
      position: { x: 3, y: 0, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@3,1,1": {
      config: { style: "volcano", times: { x: 2 } },
      position: { x: 3, y: 1, z: 1 },
      type: "deadlyBlock",
    },
    "door@0,0,0": {
      config: { direction: "right", toRoom: "blacktooth48market" },
      position: { x: 0, y: 0, z: 0 },
      type: "door",
    },
    "door@8,0,0": {
      config: { direction: "left", toRoom: "blacktooth50market" },
      position: { x: 8, y: 0, z: 0 },
      type: "door",
    },
    "wall@0,0,0": {
      config: { direction: "towards", tiles: [], times: { x: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@0,2,0": {
      config: {
        direction: "away",
        tiles: [
          "more-fruits",
          "fruits",
          "passage",
          "more-fruits",
          "fruits",
          "passage",
          "more-fruits",
          "fruits",
        ],
        times: { x: 8 },
      },
      position: { x: 0, y: 2, z: 0 },
      type: "wall",
    },
  },
  planet: "market",
  size: { x: 8, y: 2 },
}) satisfies RoomJson<OriginalCampaignRoomId, string, "market">;
