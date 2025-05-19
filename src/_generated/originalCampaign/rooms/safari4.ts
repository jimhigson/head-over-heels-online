import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "cyan", shade: "dimmed" },
  floor: "safari",
  id: "safari4",
  items: {
    "block@3,7,0": {
      config: { style: "organic", times: { z: 2 } },
      position: { x: 3, y: 7, z: 0 },
      type: "block",
    },
    "block@3,7,3": {
      config: { style: "organic" },
      position: { x: 3, y: 7, z: 3 },
      type: "block",
    },
    "block@7,3,0": {
      config: { style: "organic", times: { y: 2 } },
      position: { x: 7, y: 3, z: 0 },
      type: "block",
    },
    "block@7,3,1": {
      config: { style: "organic", times: { z: 2 } },
      position: { x: 7, y: 3, z: 1 },
      type: "block",
    },
    "door@3,0,0": {
      config: { direction: "towards", toRoom: "safari3" },
      position: { x: 3, y: 0, z: 0 },
      type: "door",
    },
    "door@3,8,5": {
      config: {
        direction: "away",
        meta: { toSubRoom: "left" },
        toRoom: "safari18",
      },
      position: { x: 3, y: 8, z: 5 },
      type: "door",
    },
    "door@8,3,5": {
      config: { direction: "left", toRoom: "safari5" },
      position: { x: 8, y: 3, z: 5 },
      type: "door",
    },
    "monster@7,4,1": {
      config: {
        activated: "on",
        movement: "patrol-randomly-diagonal",
        which: "dalek",
      },
      position: { x: 7, y: 4, z: 1 },
      type: "monster",
    },
    "wall(right)@0,0,0": {
      config: { direction: "right", times: { y: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall(towards)@0,0,0": {
      config: { direction: "towards", times: { x: 3 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@0,8,0": {
      config: {
        direction: "away",
        tiles: ["wall", "shield", "wall"],
        times: { x: 3 },
      },
      position: { x: 0, y: 8, z: 0 },
      type: "wall",
    },
    "wall@5,0,0": {
      config: { direction: "towards", times: { x: 3 } },
      position: { x: 5, y: 0, z: 0 },
      type: "wall",
    },
    "wall@5,8,0": {
      config: {
        direction: "away",
        tiles: ["wall", "window", "wall"],
        times: { x: 3 },
      },
      position: { x: 5, y: 8, z: 0 },
      type: "wall",
    },
    "wall@8,0,0": {
      config: {
        direction: "left",
        tiles: ["wall", "shield", "wall"],
        times: { y: 3 },
      },
      position: { x: 8, y: 0, z: 0 },
      type: "wall",
    },
    "wall@8,5,0": {
      config: {
        direction: "left",
        tiles: ["wall", "window", "wall"],
        times: { y: 3 },
      },
      position: { x: 8, y: 5, z: 0 },
      type: "wall",
    },
  },
  planet: "safari",
  size: { x: 8, y: 8 },
}) satisfies RoomJson<OriginalCampaignRoomId, string, "safari">;
