import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "green", shade: "basic" },
  floor: "bookworld",
  id: "bookworld36",
  items: {
    "block@7,2,0": {
      config: { style: "book", times: { z: 3 } },
      position: { x: 7, y: 2, z: 0 },
      type: "block",
    },
    "door@3,6,5": {
      config: { direction: "away", toRoom: "bookworld37" },
      position: { x: 3, y: 6, z: 5 },
      type: "door",
    },
    "door@8,2,5": {
      config: { direction: "left", toRoom: "bookworld35" },
      position: { x: 8, y: 2, z: 5 },
      type: "door",
    },
    "monster@1,0,0": {
      config: {
        activated: "on",
        movement: "patrol-randomly-diagonal",
        which: "dalek",
      },
      position: { x: 1, y: 0, z: 0 },
      type: "monster",
    },
    "portableBlock@1,5,0": {
      config: { style: "sticks" },
      position: { x: 1, y: 5, z: 0 },
      type: "portableBlock",
    },
    "portableBlock@3,1,0": {
      config: { style: "sticks" },
      position: { x: 3, y: 1, z: 0 },
      type: "portableBlock",
    },
    "portableBlock@4,3,0": {
      config: { style: "sticks" },
      position: { x: 4, y: 3, z: 0 },
      type: "portableBlock",
    },
    "wall@0,0,0:2sckiP": {
      config: { direction: "right", tiles: [], times: { y: 6 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@0,0,0:Z1XoDrY": {
      config: { direction: "towards", tiles: [], times: { x: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@0,6,0": {
      config: {
        direction: "away",
        tiles: ["book", "book", "cowboy"],
        times: { x: 3 },
      },
      position: { x: 0, y: 6, z: 0 },
      type: "wall",
    },
    "wall@5,6,0": {
      config: {
        direction: "away",
        tiles: ["cowboy", "book", "book"],
        times: { x: 3 },
      },
      position: { x: 5, y: 6, z: 0 },
      type: "wall",
    },
    "wall@8,0,0": {
      config: { direction: "left", tiles: ["book", "book"], times: { y: 2 } },
      position: { x: 8, y: 0, z: 0 },
      type: "wall",
    },
    "wall@8,4,0": {
      config: { direction: "left", tiles: ["book", "book"], times: { y: 2 } },
      position: { x: 8, y: 4, z: 0 },
      type: "wall",
    },
  },
  planet: "bookworld",
  size: { x: 8, y: 6 },
}) satisfies RoomJson<OriginalCampaignRoomId, string, "bookworld">;
