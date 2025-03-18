import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "green", shade: "basic" },
  floor: "moonbase",
  id: "moonbase5",
  items: {
    "door@1,0,0": {
      config: { direction: "towards", toRoom: "moonbase4" },
      position: { x: 1, y: 0, z: 0 },
      type: "door",
    },
    "door@1,8,0": {
      config: { direction: "away", toRoom: "moonbase6" },
      position: { x: 1, y: 8, z: 0 },
      type: "door",
    },
    "monster@0,4,0": {
      config: {
        activated: "on",
        movement: "towards-tripped-on-axis-xy4",
        which: "homingBot",
      },
      position: { x: 0, y: 4, z: 0 },
      type: "monster",
    },
    "monster@3,2,0": {
      config: {
        activated: "on",
        movement: "towards-tripped-on-axis-xy4",
        which: "homingBot",
      },
      position: { x: 3, y: 2, z: 0 },
      type: "monster",
    },
    "monster@3,6,0": {
      config: {
        activated: "on",
        movement: "towards-tripped-on-axis-xy4",
        which: "homingBot",
      },
      position: { x: 3, y: 6, z: 0 },
      type: "monster",
    },
    "wall@0,0,0:2sckOl": {
      config: { direction: "right", tiles: [], times: { y: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@0,0,0:Z1fRqC7": {
      config: { direction: "towards", tiles: [] },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@0,8,0": {
      config: { direction: "away", tiles: ["window2"] },
      position: { x: 0, y: 8, z: 0 },
      type: "wall",
    },
    "wall@3,0,0": {
      config: { direction: "towards", tiles: [] },
      position: { x: 3, y: 0, z: 0 },
      type: "wall",
    },
    "wall@3,8,0": {
      config: { direction: "away", tiles: ["window1"] },
      position: { x: 3, y: 8, z: 0 },
      type: "wall",
    },
    "wall@4,0,0": {
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
        times: { y: 8 },
      },
      position: { x: 4, y: 0, z: 0 },
      type: "wall",
    },
  },
  planet: "moonbase",
  size: { x: 4, y: 8 },
}) satisfies RoomJson<OriginalCampaignRoomId, string, "moonbase">;
