import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "cyan", shade: "dimmed" },
  floor: "safari",
  id: "safari33",
  items: {
    "block@7,3,0": {
      config: { style: "organic", times: { z: 3 } },
      position: { x: 7, y: 3, z: 0 },
      type: "block",
    },
    "door@0,3,0": {
      config: { direction: "right", toRoom: "safari32" },
      position: { x: 0, y: 3, z: 0 },
      type: "door",
    },
    "door@3,8,5": {
      config: { direction: "away", toRoom: "safari37crown" },
      position: { x: 3, y: 8, z: 5 },
      type: "door",
    },
    "door@8,3,5": {
      config: { direction: "left", toRoom: "safari34" },
      position: { x: 8, y: 3, z: 5 },
      type: "door",
    },
    "monster@4,4,0": {
      config: {
        activated: "on",
        movement: "patrol-randomly-xy4",
        which: "elephant",
      },
      position: { x: 4, y: 4, z: 0 },
      type: "monster",
    },
    "pushableBlock@1,1,0": {
      config: { style: "stepStool" },
      position: { x: 1, y: 1, z: 0 },
      type: "pushableBlock",
    },
    "wall@0,0,0:2scjwz": {
      config: { direction: "right", tiles: [], times: { y: 3 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@0,0,0:Z1XoDrY": {
      config: { direction: "towards", tiles: [], times: { x: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@0,5,0": {
      config: { direction: "right", tiles: [], times: { y: 3 } },
      position: { x: 0, y: 5, z: 0 },
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
  roomAbove: "safari36",
  size: { x: 8, y: 8 },
}) satisfies RoomJson<OriginalCampaignRoomId, string, "safari">;
