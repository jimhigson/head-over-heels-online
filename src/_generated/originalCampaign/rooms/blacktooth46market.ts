import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "yellow", shade: "dimmed" },
  id: "blacktooth46market",
  items: {
    d: {
      config: { direction: "towards", toRoom: "blacktooth45market" },
      position: { x: 2, y: 0, z: 0 },
      type: "door",
    },
    d1: {
      config: { direction: "away", toRoom: "blacktooth47market" },
      position: { x: 2, y: 6, z: 3 },
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
    pr: {
      config: { style: "cube" },
      position: { x: 0, y: 0, z: 0 },
      type: "portableBlock",
    },
    w: {
      config: { direction: "right", times: { y: 6 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    w1: {
      config: { direction: "towards", times: { x: 2 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    w2: {
      config: { direction: "away", tiles: ["more-fruits", "fruits"] },
      position: { x: 0, y: 6, z: 0 },
      type: "wall",
    },
    w3: {
      config: { direction: "towards", times: { x: 2 } },
      position: { x: 4, y: 0, z: 0 },
      type: "wall",
    },
    w4: {
      config: { direction: "away", tiles: ["more-fruits", "fruits"] },
      position: { x: 4, y: 6, z: 0 },
      type: "wall",
    },
    w5: {
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
  roomAbove: "blacktooth43",
}) satisfies RoomJson<OriginalCampaignRoomId, string, "market">;
