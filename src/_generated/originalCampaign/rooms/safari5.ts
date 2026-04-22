import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "yellow", shade: "dimmed" },
  id: "safari5",
  items: {
    d: {
      config: { direction: "right", toRoom: "safari4" },
      position: { x: 0, y: 1, z: 0 },
      type: "door",
    },
    d1: {
      config: {
        direction: "left",
        meta: { toSubRoom: "middle" },
        toRoom: "safari6triple",
      },
      position: { x: 8, y: 1, z: 4 },
      type: "door",
    },
    f: {
      config: {
        floorType: "standable",
        scenery: "safari",
        times: { x: 8, y: 4 },
      },
      position: { x: 0, y: 0, z: 0 },
      type: "floor",
    },
    h: {
      config: { times: { y: 2 } },
      position: { x: 5, y: 1, z: 0 },
      type: "hushPuppy",
    },
    h1: {
      config: { times: { y: 2 } },
      position: { x: 6, y: 1, z: 1 },
      type: "hushPuppy",
    },
    h2: {
      config: { times: { y: 2 } },
      position: { x: 7, y: 1, z: 2 },
      type: "hushPuppy",
    },
    w: {
      config: { direction: "right" },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    w1: {
      config: { direction: "towards", times: { x: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    w2: {
      config: { direction: "right" },
      position: { x: 0, y: 3, z: 0 },
      type: "wall",
    },
    w3: {
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
      position: { x: 0, y: 4, z: 0 },
      type: "wall",
    },
    w4: {
      config: { direction: "left", tiles: ["wall"] },
      position: { x: 8, y: 0, z: 0 },
      type: "wall",
    },
    w5: {
      config: { direction: "left", tiles: ["wall"] },
      position: { x: 8, y: 3, z: 0 },
      type: "wall",
    },
  },
  planet: "safari",
}) satisfies RoomJson<OriginalCampaignRoomId, string, "safari">;
