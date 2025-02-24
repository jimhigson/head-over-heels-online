import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "yellow", shade: "dimmed" },
  floor: "safari",
  id: "safari12",
  items: {
    "barrier@4,0,1": {
      config: { axis: "y", times: { y: 6, z: 2 } },
      position: { x: 4, y: 0, z: 1 },
      type: "barrier",
    },
    "barrier@4,1,0": {
      config: { axis: "y", times: { y: 5 } },
      position: { x: 4, y: 1, z: 0 },
      type: "barrier",
    },
    "deadlyBlock@2,1,0": {
      config: { style: "volcano", times: { x: 2 } },
      position: { x: 2, y: 1, z: 0 },
      type: "deadlyBlock",
    },
    "door@0,2,0": {
      config: { direction: "right", toRoom: "safari11" },
      position: { x: 0, y: 2, z: 0 },
      type: "door",
    },
    "lift@7,5,0": {
      config: { bottom: 0, top: 11 },
      position: { x: 7, y: 5, z: 0 },
      type: "lift",
    },
    "monster@5,5,0": {
      config: {
        activated: true,
        movement: "patrol-randomly-diagonal",
        which: "dalek",
      },
      position: { x: 5, y: 5, z: 0 },
      type: "monster",
    },
    "portableBlock@3,5,0": {
      config: { style: "drum" },
      position: { x: 3, y: 5, z: 0 },
      type: "portableBlock",
    },
    "slidingDeadly@4,0,0": {
      config: { style: "puck" },
      position: { x: 4, y: 0, z: 0 },
      type: "slidingDeadly",
    },
    "wall@0,0,0:2scjgO": {
      config: { direction: "right", tiles: [], times: { y: 2 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@0,0,0:Z1XoDrY": {
      config: { direction: "towards", tiles: [], times: { x: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@0,4,0": {
      config: { direction: "right", tiles: [], times: { y: 2 } },
      position: { x: 0, y: 4, z: 0 },
      type: "wall",
    },
    "wall@0,6,0": {
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
        times: { x: 8 },
      },
      position: { x: 0, y: 6, z: 0 },
      type: "wall",
    },
    "wall@8,0,0": {
      config: {
        direction: "left",
        tiles: ["shield", "wall", "window", "window", "wall", "shield"],
        times: { y: 6 },
      },
      position: { x: 8, y: 0, z: 0 },
      type: "wall",
    },
  },
  planet: "safari",
  roomAbove: "safari13",
  size: { x: 8, y: 6 },
}) satisfies RoomJson<"safari", OriginalCampaignRoomId>;
