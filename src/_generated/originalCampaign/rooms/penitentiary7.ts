import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "yellow", shade: "dimmed" },
  id: "penitentiary7",
  items: {
    "block@4,5,0": {
      config: { style: "artificial", times: { z: 2 } },
      position: { x: 4, y: 5, z: 0 },
      type: "block",
    },
    "block@4,5,3": {
      config: { style: "artificial" },
      position: { x: 4, y: 5, z: 3 },
      type: "block",
    },
    "door@0,2,0": {
      config: { direction: "right", toRoom: "penitentiary6" },
      position: { x: 0, y: 2, z: 0 },
      type: "door",
    },
    "door@3,6,5": {
      config: { direction: "away", toRoom: "penitentiary8" },
      position: { x: 3, y: 6, z: 5 },
      type: "door",
    },
    "floor@0,0,0": {
      config: {
        floorType: "standable",
        scenery: "penitentiary",
        times: { x: 8, y: 6 },
      },
      position: { x: 0, y: 0, z: 0 },
      type: "floor",
    },
    "monster@3,5,0": {
      config: {
        activated: "on",
        movement: "patrol-randomly-xy8",
        which: "bubbleRobot",
      },
      position: { x: 3, y: 5, z: 0 },
      type: "monster",
    },
    "monster@5,5,0": {
      config: {
        activated: "on",
        movement: "patrol-randomly-xy8",
        which: "bubbleRobot",
      },
      position: { x: 5, y: 5, z: 0 },
      type: "monster",
    },
    "wall(right)@0,0,0": {
      config: { direction: "right", times: { y: 2 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall(towards)@0,0,0": {
      config: { direction: "towards", times: { x: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@0,4,0": {
      config: { direction: "right", times: { y: 2 } },
      position: { x: 0, y: 4, z: 0 },
      type: "wall",
    },
    "wall@0,6,0": {
      config: {
        direction: "away",
        tiles: ["loop", "skeleton", "loop"],
        times: { x: 3 },
      },
      position: { x: 0, y: 6, z: 0 },
      type: "wall",
    },
    "wall@5,6,0": {
      config: {
        direction: "away",
        tiles: ["loop", "skeleton", "loop"],
        times: { x: 3 },
      },
      position: { x: 5, y: 6, z: 0 },
      type: "wall",
    },
    "wall@8,0,0": {
      config: {
        direction: "left",
        tiles: ["loop", "skeleton", "loop", "loop", "skeleton", "loop"],
        times: { y: 6 },
      },
      position: { x: 8, y: 0, z: 0 },
      type: "wall",
    },
  },
  planet: "penitentiary",
  size: { x: 8, y: 6 },
}) satisfies RoomJson<OriginalCampaignRoomId, string, "penitentiary">;
