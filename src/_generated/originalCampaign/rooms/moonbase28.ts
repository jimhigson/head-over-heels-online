import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "yellow", shade: "dimmed" },
  floor: "moonbase",
  id: "moonbase28",
  items: {
    "door@2,0,0": {
      config: { direction: "towards", toRoom: "moonbase27" },
      position: { x: 2, y: 0, z: 0 },
      type: "door",
    },
    "door@6,2,4": {
      config: { direction: "left", toRoom: "moonbase29" },
      position: { x: 6, y: 2, z: 4 },
      type: "door",
    },
    "hushPuppy@3,3,0": {
      config: {},
      position: { x: 3, y: 3, z: 0 },
      type: "hushPuppy",
    },
    "hushPuppy@4,3,1": {
      config: {},
      position: { x: 4, y: 3, z: 1 },
      type: "hushPuppy",
    },
    "hushPuppy@5,3,2": {
      config: {},
      position: { x: 5, y: 3, z: 2 },
      type: "hushPuppy",
    },
    "monster@0,5,0": {
      config: {
        activated: "on",
        movement: "towards-on-shortest-axis-xy4",
        startDirection: "towards",
        which: "cyberman",
      },
      position: { x: 0, y: 5, z: 0 },
      type: "monster",
    },
    "wall@0,0,0:2sckiP": {
      config: { direction: "right", tiles: [], times: { y: 6 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@0,0,0:Z1XoF0v": {
      config: { direction: "towards", tiles: [], times: { x: 2 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@0,6,0": {
      config: {
        direction: "away",
        tiles: ["window1", "coil", "window2", "window3", "coil", "window1"],
        times: { x: 6 },
      },
      position: { x: 0, y: 6, z: 0 },
      type: "wall",
    },
    "wall@4,0,0": {
      config: { direction: "towards", tiles: [], times: { x: 2 } },
      position: { x: 4, y: 0, z: 0 },
      type: "wall",
    },
    "wall@6,0,0": {
      config: {
        direction: "left",
        tiles: ["window2", "window3"],
        times: { y: 2 },
      },
      position: { x: 6, y: 0, z: 0 },
      type: "wall",
    },
    "wall@6,4,0": {
      config: {
        direction: "left",
        tiles: ["window3", "window1"],
        times: { y: 2 },
      },
      position: { x: 6, y: 4, z: 0 },
      type: "wall",
    },
  },
  planet: "moonbase",
  size: { x: 6, y: 6 },
}) satisfies RoomJson<OriginalCampaignRoomId, string, "moonbase">;
