import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "yellow", shade: "dimmed" },
  floor: "moonbase",
  id: "moonbase12",
  items: {
    "block@0,0,3": {
      config: { style: "organic", times: { x: 6 } },
      position: { x: 0, y: 0, z: 3 },
      type: "block",
    },
    "block@0,2,3": {
      config: { style: "organic", times: { y: 3 } },
      position: { x: 0, y: 2, z: 3 },
      type: "block",
    },
    "door@0,3,4": {
      config: { direction: "right", toRoom: "moonbase18" },
      position: { x: 0, y: 3, z: 4 },
      type: "door",
    },
    "door@3,0,0": {
      config: { direction: "towards", toRoom: "moonbase11" },
      position: { x: 3, y: 0, z: 0 },
      type: "door",
    },
    "hushPuppy@5,0,0": {
      config: {},
      position: { x: 5, y: 0, z: 0 },
      type: "hushPuppy",
    },
    "hushPuppy@6,0,1": {
      config: {},
      position: { x: 6, y: 0, z: 1 },
      type: "hushPuppy",
    },
    "hushPuppy@7,0,2": {
      config: {},
      position: { x: 7, y: 0, z: 2 },
      type: "hushPuppy",
    },
    "wall(right)@0,0,0": {
      config: { direction: "right", times: { y: 3 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall(towards)@0,0,0": {
      config: { direction: "towards", times: { x: 3 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@0,5,0": {
      config: { direction: "right", times: { y: 3 } },
      position: { x: 0, y: 5, z: 0 },
      type: "wall",
    },
    "wall@0,8,0": {
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
        times: { x: 8 },
      },
      position: { x: 0, y: 8, z: 0 },
      type: "wall",
    },
    "wall@5,0,0": {
      config: { direction: "towards", times: { x: 3 } },
      position: { x: 5, y: 0, z: 0 },
      type: "wall",
    },
    "wall@8,0,0": {
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
      position: { x: 8, y: 0, z: 0 },
      type: "wall",
    },
  },
  planet: "moonbase",
  size: { x: 8, y: 8 },
}) satisfies RoomJson<OriginalCampaignRoomId, string, "moonbase">;
