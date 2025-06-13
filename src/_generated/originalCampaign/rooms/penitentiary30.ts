import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "green", shade: "basic" },
  id: "penitentiary30",
  items: {
    "block@0,3,3": {
      config: { style: "organic", times: { x: 6 } },
      position: { x: 0, y: 3, z: 3 },
      type: "block",
    },
    "door@3,4,0": {
      config: { direction: "away", toRoom: "penitentiary28" },
      position: { x: 3, y: 4, z: 0 },
      type: "door",
    },
    "floor@0,0,0": {
      config: {
        floorType: "standable",
        scenery: "penitentiary",
        times: { x: 8, y: 4 },
      },
      position: { x: 0, y: 0, z: 0 },
      type: "floor",
    },
    "portableBlock@0,3,0": {
      config: { style: "sticks" },
      position: { x: 0, y: 3, z: 0 },
      type: "portableBlock",
    },
    "portableBlock@7,0,0": {
      config: { style: "sticks" },
      position: { x: 7, y: 0, z: 0 },
      type: "portableBlock",
    },
    "portableBlock@7,3,0": {
      config: { style: "sticks" },
      position: { x: 7, y: 3, z: 0 },
      type: "portableBlock",
    },
    "teleporter@0,3,4": {
      config: {
        toPosition: { x: 0, y: 4, z: 4 },
        toRoom: "penitentiary18fish",
      },
      position: { x: 0, y: 3, z: 4 },
      type: "teleporter",
    },
    "wall(right)@0,0,0": {
      config: { direction: "right", times: { y: 4 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall(towards)@0,0,0": {
      config: { direction: "towards", times: { x: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@0,4,0": {
      config: {
        direction: "away",
        tiles: ["loop", "skeleton", "loop"],
        times: { x: 3 },
      },
      position: { x: 0, y: 4, z: 0 },
      type: "wall",
    },
    "wall@5,4,0": {
      config: {
        direction: "away",
        tiles: ["loop", "skeleton", "loop"],
        times: { x: 3 },
      },
      position: { x: 5, y: 4, z: 0 },
      type: "wall",
    },
    "wall@8,0,0": {
      config: {
        direction: "left",
        tiles: ["loop", "loop", "skeleton", "loop"],
        times: { y: 4 },
      },
      position: { x: 8, y: 0, z: 0 },
      type: "wall",
    },
  },
  planet: "penitentiary",
  size: { x: 8, y: 4 },
}) satisfies RoomJson<OriginalCampaignRoomId, string, "penitentiary">;
