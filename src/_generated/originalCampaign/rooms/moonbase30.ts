import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "yellow", shade: "basic" },
  floor: "moonbase",
  id: "moonbase30",
  items: {
    "door@2,6,0": {
      config: { direction: "away", toRoom: "moonbase27" },
      position: { x: 2, y: 6, z: 0 },
      type: "door",
    },
    "door@6,2,0": {
      config: { direction: "left", toRoom: "moonbase31" },
      position: { x: 6, y: 2, z: 0 },
      type: "door",
    },
    "wall@0,0,0:2sckiP": {
      config: { direction: "right", tiles: [], times: { y: 6 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@0,0,0:Z1XoDXu": {
      config: { direction: "towards", tiles: [], times: { x: 6 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@0,6,0": {
      config: {
        direction: "away",
        tiles: ["window2", "window3"],
        times: { x: 2 },
      },
      position: { x: 0, y: 6, z: 0 },
      type: "wall",
    },
    "wall@4,6,0": {
      config: {
        direction: "away",
        tiles: ["window3", "window1"],
        times: { x: 2 },
      },
      position: { x: 4, y: 6, z: 0 },
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
}) satisfies RoomJson<"moonbase", OriginalCampaignRoomId>;
