import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "cyan", shade: "dimmed" },
  floor: "penitentiary",
  id: "penitentiary33",
  items: {
    "ball@1,1,3": { config: {}, position: { x: 1, y: 1, z: 3 }, type: "ball" },
    "ball@1,6,3": { config: {}, position: { x: 1, y: 6, z: 3 }, type: "ball" },
    "ball@6,1,3": { config: {}, position: { x: 6, y: 1, z: 3 }, type: "ball" },
    "ball@6,6,3": { config: {}, position: { x: 6, y: 6, z: 3 }, type: "ball" },
    "block@1,1,0": {
      config: { style: "tower", times: { z: 3 } },
      position: { x: 1, y: 1, z: 0 },
      type: "block",
    },
    "block@1,6,0": {
      config: { style: "tower", times: { z: 3 } },
      position: { x: 1, y: 6, z: 0 },
      type: "block",
    },
    "block@6,1,0": {
      config: { style: "tower", times: { z: 3 } },
      position: { x: 6, y: 1, z: 0 },
      type: "block",
    },
    "block@6,6,0": {
      config: { style: "tower", times: { z: 3 } },
      position: { x: 6, y: 6, z: 0 },
      type: "block",
    },
    "door@3,0,0": {
      config: { direction: "towards", toRoom: "penitentiary34crown" },
      position: { x: 3, y: 0, z: 0 },
      type: "door",
    },
    "door@3,8,0": {
      config: { direction: "away", toRoom: "penitentiary32" },
      position: { x: 3, y: 8, z: 0 },
      type: "door",
    },
    scroll: {
      config: { gives: "scroll", page: "teleportBack" },
      position: { x: 5, y: 6, z: 2 },
      type: "pickup",
    },
    "teleporter@0,3,0": {
      config: {
        activatedOnStoreValue: "planetsLiberated.penitentiary",
        times: { x: 2, y: 2 },
        toPosition: { x: 0, y: 3, z: 0 },
        toRoom: "penitentiary2",
      },
      position: { x: 0, y: 3, z: 0 },
      type: "teleporter",
    },
    "wall@0,0,0:2sckOl": {
      config: { direction: "right", tiles: [], times: { y: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@0,0,0:Z1XoEJK": {
      config: { direction: "towards", tiles: [], times: { x: 3 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@0,8,0": {
      config: {
        direction: "away",
        tiles: ["loop", "skeleton", "loop"],
        times: { x: 3 },
      },
      position: { x: 0, y: 8, z: 0 },
      type: "wall",
    },
    "wall@5,0,0": {
      config: { direction: "towards", tiles: [], times: { x: 3 } },
      position: { x: 5, y: 0, z: 0 },
      type: "wall",
    },
    "wall@5,8,0": {
      config: {
        direction: "away",
        tiles: ["loop", "skeleton", "loop"],
        times: { x: 3 },
      },
      position: { x: 5, y: 8, z: 0 },
      type: "wall",
    },
    "wall@8,0,0": {
      config: {
        direction: "left",
        tiles: [
          "loop",
          "loop",
          "skeleton",
          "loop",
          "loop",
          "skeleton",
          "loop",
          "loop",
        ],
        times: { y: 8 },
      },
      position: { x: 8, y: 0, z: 0 },
      type: "wall",
    },
  },
  planet: "penitentiary",
  size: { x: 8, y: 8 },
}) satisfies RoomJson<OriginalCampaignRoomId, string, "penitentiary">;
