import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "yellow", shade: "basic" },
  id: "moonbase10",
  items: {
    b: {
      config: { style: "artificial", times: { y: 4 } },
      position: { x: 0, y: 0, z: 3 },
      type: "block",
    },
    b1: {
      config: { style: "artificial" },
      position: { x: 0, y: 7, z: 3 },
      type: "block",
    },
    b2: {
      config: { style: "artificial" },
      position: { x: 0, y: 7, z: 5 },
      type: "block",
    },
    b3: {
      config: { style: "artificial", times: { x: 2 } },
      position: { x: 4, y: 7, z: 3 },
      type: "block",
    },
    b4: {
      config: { style: "tower", times: { y: 4, z: 3 } },
      position: { x: 0, y: 0, z: 0 },
      type: "block",
    },
    b5: {
      config: { style: "tower", times: { z: 3 } },
      position: { x: 0, y: 7, z: 0 },
      type: "block",
    },
    b6: {
      config: { style: "tower", times: { x: 2, z: 3 } },
      position: { x: 4, y: 7, z: 0 },
      type: "block",
    },
    d: {
      config: { direction: "right", toRoom: "moonbase9" },
      position: { x: 0, y: 0, z: 4 },
      type: "door",
    },
    d1: {
      config: { direction: "away", toRoom: "moonbase11" },
      position: { x: 4, y: 8, z: 4 },
      type: "door",
    },
    db: {
      config: { style: "toaster" },
      position: { x: 0, y: 7, z: 6 },
      type: "deadlyBlock",
    },
    f: {
      config: { floorType: "deadly", times: { x: 8, y: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "floor",
    },
    w: {
      config: { direction: "towards", times: { x: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    w1: {
      config: { direction: "right", times: { y: 6 } },
      position: { x: 0, y: 2, z: 0 },
      type: "wall",
    },
    w2: {
      config: {
        direction: "away",
        tiles: ["window3", "window2", "window1", "coil"],
      },
      position: { x: 0, y: 8, z: 0 },
      type: "wall",
    },
    w3: {
      config: { direction: "away", tiles: ["window2", "window1"] },
      position: { x: 6, y: 8, z: 0 },
      type: "wall",
    },
    w4: {
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
