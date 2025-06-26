import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "yellow", shade: "dimmed" },
  id: "penitentiary2",
  items: {
    "block@0,3,0": {
      config: { style: "artificial", times: { x: 2, y: 2 } },
      position: { x: 0, y: 3, z: 0 },
      type: "block",
    },
    "block@4,7,3": {
      config: { style: "artificial" },
      position: { x: 4, y: 9, z: 3 },
      type: "block",
    },
    "block@6,3,0": {
      config: { style: "artificial", times: { z: 2 } },
      position: { x: 6, y: 3, z: 0 },
      type: "block",
    },
    "block@6,3,3": {
      config: { style: "artificial", times: { x: 2 } },
      position: { x: 6, y: 3, z: 3 },
      type: "block",
    },
    "block@7,4,3": {
      config: { style: "artificial" },
      position: { x: 7, y: 4, z: 3 },
      type: "block",
    },
    "door@3,0,0": {
      config: { direction: "towards", toRoom: "penitentiary1" },
      position: { x: 3, y: 0, z: 0 },
      type: "door",
    },
    "door@3,8,5": {
      config: { direction: "away", toRoom: "penitentiary13" },
      position: { x: 3, y: 10, z: 5 },
      type: "door",
    },
    "door@8,3,5": {
      config: { direction: "left", toRoom: "penitentiary3" },
      position: { x: 8, y: 3, z: 5 },
      type: "door",
    },
    extra0: {
      config: { style: "artificial", times: { z: 3 } },
      position: { x: 4, y: 9, z: 0 },
      type: "block",
    },
    extraMonster: {
      config: {
        activated: "on",
        movement: "patrol-randomly-diagonal",
        which: "dalek",
      },
      position: { x: 3, y: 9, z: 3 },
      type: "monster",
    },
    "floor@0,0,0": {
      config: {
        floorType: "standable",
        scenery: "penitentiary",
        times: { x: 8, y: 10 },
      },
      position: { x: 0, y: 0, z: 0 },
      type: "floor",
    },
    "hushPuppy@1,7,0": {
      config: {},
      position: { x: 1, y: 9, z: 0 },
      type: "hushPuppy",
    },
    "hushPuppy@2,7,1": {
      config: {},
      position: { x: 2, y: 9, z: 1 },
      type: "hushPuppy",
    },
    "hushPuppy@3,7,2": {
      config: {},
      position: { x: 3, y: 9, z: 2 },
      type: "hushPuppy",
    },
    "monster@6,3,2": {
      config: {
        activated: "on",
        movement: "patrol-randomly-diagonal",
        which: "dalek",
      },
      position: { x: 6, y: 3, z: 2 },
      type: "monster",
    },
    "wall(right)@0,0,0": {
      config: { direction: "right", times: { y: 10 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall(towards)@0,0,0": {
      config: { direction: "towards", times: { x: 3 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@0,8,0": {
      config: { direction: "away", tiles: ["loop", "skeleton", "loop"] },
      position: { x: 0, y: 10, z: 0 },
      type: "wall",
    },
    "wall@5,0,0": {
      config: { direction: "towards", times: { x: 3 } },
      position: { x: 5, y: 0, z: 0 },
      type: "wall",
    },
    "wall@5,8,0": {
      config: { direction: "away", tiles: ["loop", "skeleton", "loop"] },
      position: { x: 5, y: 10, z: 0 },
      type: "wall",
    },
    "wall@8,0,0": {
      config: { direction: "left", tiles: ["loop", "skeleton", "loop"] },
      position: { x: 8, y: 0, z: 0 },
      type: "wall",
    },
    "wall@8,5,0": {
      config: {
        direction: "left",
        tiles: ["loop", "loop", "skeleton", "loop", "loop"],
      },
      position: { x: 8, y: 5, z: 0 },
      type: "wall",
    },
  },
  planet: "penitentiary",
  size: { x: 8, y: 10 },
}) satisfies RoomJson<OriginalCampaignRoomId, string, "penitentiary">;
