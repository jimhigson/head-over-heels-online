import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "yellow", shade: "dimmed" },
  id: "moonbase12",
  items: {
    b: {
      config: { style: "organic", times: { x: 8 } },
      position: { x: 0, y: 0, z: 3 },
      type: "block",
    },
    b1: {
      config: { style: "organic", times: { y: 3 } },
      position: { x: 0, y: 2, z: 3 },
      type: "block",
    },
    b2: {
      config: { style: "tower", times: { z: 3 } },
      position: { x: 0, y: 0, z: 0 },
      type: "block",
    },
    b3: {
      config: { style: "tower", times: { z: 3 } },
      position: { x: 0, y: 2, z: 0 },
      type: "block",
    },
    b4: {
      config: { style: "tower", times: { z: 3 } },
      position: { x: 0, y: 4, z: 0 },
      type: "block",
    },
    b5: {
      config: { style: "tower", times: { z: 3 } },
      position: { x: 7, y: 0, z: 0 },
      type: "block",
    },
    b6: {
      config: { style: "organic", times: { y: 6 } },
      position: { x: 7, y: 2, z: 3 },
      type: "block",
    },
    b7: {
      config: { style: "tower", times: { z: 3 } },
      position: { x: 7, y: 7, z: 0 },
      type: "block",
    },
    b8: {
      config: { style: "tower", times: { z: 3 } },
      position: { x: 7, y: 2, z: 0 },
      type: "block",
    },
    d: {
      config: { direction: "right", toRoom: "moonbase18" },
      position: { x: 0, y: 3, z: 4 },
      type: "door",
    },
    d1: {
      config: { direction: "towards", toRoom: "moonbase11" },
      position: { x: 3, y: 0, z: 0 },
      type: "door",
    },
    f: {
      config: {
        floorType: "standable",
        scenery: "moonbase",
        times: { x: 8, y: 8 },
      },
      position: { x: 0, y: 0, z: 0 },
      type: "floor",
    },
    h: { config: {}, position: { x: 6, y: 5, z: 0 }, type: "hushPuppy" },
    h1: { config: {}, position: { x: 6, y: 6, z: 1 }, type: "hushPuppy" },
    h2: { config: {}, position: { x: 6, y: 7, z: 2 }, type: "hushPuppy" },
    w: {
      config: { direction: "right", times: { y: 3 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    w1: {
      config: { direction: "towards", times: { x: 3 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    w2: {
      config: { direction: "right", times: { y: 3 } },
      position: { x: 0, y: 5, z: 0 },
      type: "wall",
    },
    w3: {
      config: {
        direction: "away",
        tiles: [
          "window3",
          "window1",
          "coil",
          "window2",
          "window3",
          "coil",
          "window3",
          "window1",
        ],
      },
      position: { x: 0, y: 8, z: 0 },
      type: "wall",
    },
    w4: {
      config: { direction: "towards", times: { x: 3 } },
      position: { x: 5, y: 0, z: 0 },
      type: "wall",
    },
    w5: {
      config: {
        direction: "left",
        tiles: [
          "window3",
          "window1",
          "coil",
          "window2",
          "window3",
          "coil",
          "window3",
          "window1",
        ],
      },
      position: { x: 8, y: 0, z: 0 },
      type: "wall",
    },
  },
  planet: "moonbase",
}) satisfies RoomJson<OriginalCampaignRoomId, string, "moonbase">;
