import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "dimmed" },
  id: "blacktooth44market",
  items: {
    d: {
      config: { direction: "right", toRoom: "blacktooth45market" },
      position: { x: 0, y: 2, z: 0 },
      type: "door",
    },
    f: {
      config: {
        floorType: "standable",
        scenery: "market",
        times: { x: 6, y: 6 },
      },
      position: { x: 0, y: 0, z: 0 },
      type: "floor",
    },
    w: {
      config: { direction: "right", times: { y: 2 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    w1: {
      config: { direction: "towards", times: { x: 6 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    w2: {
      config: { direction: "right", times: { y: 2 } },
      position: { x: 0, y: 4, z: 0 },
      type: "wall",
    },
    w3: {
      config: {
        direction: "away",
        tiles: [
          "passage",
          "more-fruits",
          "fruits",
          "more-fruits",
          "fruits",
          "passage",
        ],
      },
      position: { x: 0, y: 6, z: 0 },
      type: "wall",
    },
    w4: {
      config: {
        direction: "left",
        tiles: [
          "passage",
          "more-fruits",
          "fruits",
          "more-fruits",
          "fruits",
          "passage",
        ],
      },
      position: { x: 6, y: 0, z: 0 },
      type: "wall",
    },
  },
  planet: "market",
  roomAbove: "blacktooth22",
}) satisfies RoomJson<OriginalCampaignRoomId, string, "market">;
