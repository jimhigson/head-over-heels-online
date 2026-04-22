import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "magenta", shade: "basic" },
  id: "moonbase23",
  items: {
    d: {
      config: { direction: "right", toRoom: "moonbase20" },
      position: { x: 0, y: 3, z: 0 },
      type: "door",
    },
    d1: {
      config: { direction: "towards", toRoom: "moonbase25tobookworld" },
      position: { x: 3, y: 0, z: 0 },
      type: "door",
    },
    d2: {
      config: { direction: "away", toRoom: "moonbase24toegyptus" },
      position: { x: 3, y: 8, z: 0 },
      type: "door",
    },
    d3: {
      config: { direction: "left", toRoom: "moonbase26" },
      position: { x: 8, y: 3, z: 0 },
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
    sb: {
      config: { style: "puck" },
      position: { x: 1, y: 3.5, z: 0 },
      type: "slidingBlock",
    },
    sb1: {
      config: { style: "puck" },
      position: { x: 2, y: 3.5, z: 0 },
      type: "slidingBlock",
    },
    sb2: {
      config: { style: "puck" },
      position: { x: 3, y: 3.5, z: 0 },
      type: "slidingBlock",
    },
    sb3: {
      config: { style: "puck" },
      position: { x: 4, y: 1.5, z: 0 },
      type: "slidingBlock",
    },
    sb4: {
      config: { style: "puck" },
      position: { x: 4, y: 3.5, z: 0 },
      type: "slidingBlock",
    },
    sb5: {
      config: { style: "puck" },
      position: { x: 4, y: 5.5, z: 0 },
      type: "slidingBlock",
    },
    sb6: {
      config: { style: "puck" },
      position: { x: 5, y: 2.5, z: 0 },
      type: "slidingBlock",
    },
    sb7: {
      config: { style: "puck" },
      position: { x: 5, y: 3.5, z: 0 },
      type: "slidingBlock",
    },
    sb8: {
      config: { style: "puck" },
      position: { x: 5, y: 4.5, z: 0 },
      type: "slidingBlock",
    },
    sb9: {
      config: { style: "puck" },
      position: { x: 6, y: 3.5, z: 0 },
      type: "slidingBlock",
    },
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
      config: { direction: "away", tiles: ["window3", "coil", "window2"] },
      position: { x: 0, y: 8, z: 0 },
      type: "wall",
    },
    w4: {
      config: { direction: "towards", times: { x: 3 } },
      position: { x: 5, y: 0, z: 0 },
      type: "wall",
    },
    w5: {
      config: { direction: "away", tiles: ["window2", "coil", "window1"] },
      position: { x: 5, y: 8, z: 0 },
      type: "wall",
    },
    w6: {
      config: { direction: "left", tiles: ["window3", "coil", "window2"] },
      position: { x: 8, y: 0, z: 0 },
      type: "wall",
    },
    w7: {
      config: { direction: "left", tiles: ["window2", "coil", "window1"] },
      position: { x: 8, y: 5, z: 0 },
      type: "wall",
    },
  },
  planet: "moonbase",
}) satisfies RoomJson<OriginalCampaignRoomId, string, "moonbase">;
