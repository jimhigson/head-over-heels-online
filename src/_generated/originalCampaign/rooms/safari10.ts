import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "green", shade: "basic" },
  id: "safari10",
  items: {
    br: {
      config: { axis: "y", times: { y: 6, z: 3 } },
      position: { x: 4, y: 0, z: 0 },
      type: "barrier",
    },
    d: {
      config: { direction: "left", toRoom: "safari11" },
      position: { x: 8, y: 2, z: 0 },
      type: "door",
    },
    f: {
      config: {
        floorType: "standable",
        scenery: "safari",
        times: { x: 8, y: 6 },
      },
      position: { x: 0, y: 0, z: 0 },
      type: "floor",
    },
    sg: { config: {}, position: { x: 0, y: 5, z: 0 }, type: "spring" },
    w: {
      config: { direction: "right", times: { y: 6 } },
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
          "wall",
          "window",
          "wall",
          "shield",
          "shield",
          "wall",
          "window",
          "wall",
        ],
      },
      position: { x: 0, y: 6, z: 0 },
      type: "wall",
    },
    w3: {
      config: { direction: "left", tiles: ["wall", "shield"] },
      position: { x: 8, y: 0, z: 0 },
      type: "wall",
    },
    w4: {
      config: { direction: "left", tiles: ["shield", "wall"] },
      position: { x: 8, y: 4, z: 0 },
      type: "wall",
    },
  },
  planet: "safari",
  roomAbove: "safari9",
}) satisfies RoomJson<OriginalCampaignRoomId, string, "safari">;
