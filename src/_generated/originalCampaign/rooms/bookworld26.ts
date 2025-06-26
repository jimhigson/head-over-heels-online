import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "magenta", shade: "basic" },
  id: "bookworld26",
  items: {
    "block@3,0,0": {
      config: { style: "book", times: { z: 3 } },
      position: { x: 3, y: 0, z: 0 },
      type: "block",
    },
    "block@3,0,4": {
      config: { style: "book" },
      position: { x: 3, y: 0, z: 4 },
      type: "block",
    },
    "door@0,3,0": {
      config: { direction: "right", toRoom: "bookworld20" },
      position: { x: 0, y: 3, z: 0 },
      type: "door",
    },
    "door@4,3,0": {
      config: { direction: "left", toRoom: "bookworld25" },
      position: { x: 4, y: 3, z: 0 },
      type: "door",
    },
    "floor@0,0,0": {
      config: {
        floorType: "standable",
        scenery: "bookworld",
        times: { x: 4, y: 8 },
      },
      position: { x: 0, y: 0, z: 0 },
      type: "floor",
    },
    "monster@3,7,0": {
      config: {
        activated: "on",
        movement: "patrol-randomly-diagonal",
        which: "dalek",
      },
      position: { x: 3, y: 7, z: 0 },
      type: "monster",
    },
    "pickup@3,0,5": {
      config: { gives: "doughnuts" },
      position: { x: 3, y: 0, z: 5 },
      type: "pickup",
    },
    "wall(right)@0,0,0": {
      config: { direction: "right", times: { y: 3 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall(towards)@0,0,0": {
      config: { direction: "towards", times: { x: 4 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@0,5,0": {
      config: { direction: "right", times: { y: 3 } },
      position: { x: 0, y: 5, z: 0 },
      type: "wall",
    },
    "wall@0,8,0": {
      config: { direction: "away", tiles: ["book", "book", "book", "book"] },
      position: { x: 0, y: 8, z: 0 },
      type: "wall",
    },
    "wall@4,0,0": {
      config: { direction: "left", tiles: ["book", "book", "cowboy"] },
      position: { x: 4, y: 0, z: 0 },
      type: "wall",
    },
    "wall@4,5,0": {
      config: { direction: "left", tiles: ["cowboy", "book", "book"] },
      position: { x: 4, y: 5, z: 0 },
      type: "wall",
    },
  },
  planet: "bookworld",
  size: { x: 4, y: 8 },
}) satisfies RoomJson<OriginalCampaignRoomId, string, "bookworld">;
