import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "basic" },
  floor: "bookworld",
  id: "bookworld41crown",
  items: {
    "barrier@3,4,0": {
      config: { axis: "y" },
      position: { x: 3, y: 4, z: 0 },
      type: "barrier",
    },
    "block@3,4,1": {
      config: { style: "book", times: { z: 5 } },
      position: { x: 3, y: 4, z: 1 },
      type: "block",
    },
    "door@2,0,0": {
      config: { direction: "towards", toRoom: "bookworld40" },
      position: { x: 2, y: 0, z: 0 },
      type: "door",
    },
    "monster@0,4,0": {
      config: {
        activated: "on",
        movement: "patrol-randomly-diagonal",
        which: "dalek",
      },
      position: { x: 0, y: 4, z: 0 },
      type: "monster",
    },
    "monster@4,4,0": {
      config: {
        activated: "on",
        movement: "patrol-randomly-diagonal",
        which: "dalek",
      },
      position: { x: 4, y: 4, z: 0 },
      type: "monster",
    },
    "pickup@3,4,6": {
      config: { gives: "crown", planet: "bookworld" },
      position: { x: 3, y: 4, z: 6 },
      type: "pickup",
    },
    "portableBlock@0,0,0": {
      config: { style: "sticks" },
      position: { x: 0, y: 0, z: 0 },
      type: "portableBlock",
    },
    "portableBlock@0,7,0": {
      config: { style: "sticks" },
      position: { x: 0, y: 7, z: 0 },
      type: "portableBlock",
    },
    "slidingBlock@2,4,0": {
      config: { style: "book" },
      position: { x: 2, y: 4, z: 0 },
      type: "slidingBlock",
    },
    "wall(right)@0,0,0": {
      config: { direction: "right", times: { y: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall(towards)@0,0,0": {
      config: { direction: "towards", times: { x: 2 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@0,8,0": {
      config: {
        direction: "away",
        tiles: ["book", "cowboy", "book", "book", "cowboy", "book"],
        times: { x: 6 },
      },
      position: { x: 0, y: 8, z: 0 },
      type: "wall",
    },
    "wall@4,0,0": {
      config: { direction: "towards", times: { x: 2 } },
      position: { x: 4, y: 0, z: 0 },
      type: "wall",
    },
    "wall@6,0,0": {
      config: {
        direction: "left",
        tiles: [
          "book",
          "book",
          "cowboy",
          "book",
          "book",
          "cowboy",
          "book",
          "book",
        ],
        times: { y: 8 },
      },
      position: { x: 6, y: 0, z: 0 },
      type: "wall",
    },
  },
  planet: "bookworld",
  size: { x: 6, y: 8 },
}) satisfies RoomJson<OriginalCampaignRoomId, string, "bookworld">;
