import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "basic" },
  floor: "safari",
  id: "safari37crown",
  items: {
    "block@0,2,0": {
      config: { style: "organic", times: { x: 8 } },
      position: { x: 0, y: 2, z: 0 },
      type: "block",
    },
    "block@0,4,0": {
      config: { style: "organic" },
      position: { x: 0, y: 4, z: 0 },
      type: "block",
    },
    "block@0,7,0": {
      config: { style: "artificial", times: { z: 6 } },
      position: { x: 0, y: 7, z: 0 },
      type: "block",
    },
    "block@1,4,0": {
      config: { disappearing: "onStand", style: "organic" },
      position: { x: 1, y: 4, z: 0 },
      type: "block",
    },
    "block@2,4,0": {
      config: { style: "organic", times: { x: 6 } },
      position: { x: 2, y: 4, z: 0 },
      type: "block",
    },
    "block@6,3,0": {
      config: { style: "tower" },
      position: { x: 6, y: 3, z: 0 },
      type: "block",
    },
    "block@6,3,0-2": {
      config: { style: "tower", times: { z: 2 } },
      position: { x: 6, y: 3, z: 1 },
      type: "block",
    },
    "block@7,3,0": {
      config: { style: "organic" },
      position: { x: 7, y: 3, z: 0 },
      type: "block",
    },
    "door@3,0,0": {
      config: { direction: "towards", toRoom: "safari33" },
      position: { x: 3, y: 0, z: 0 },
      type: "door",
    },
    "monster@7,2,1": {
      config: {
        activated: "on",
        movement: "back-forth",
        startDirection: "right",
        style: "starsAndStripes",
        which: "skiHead",
      },
      position: { x: 7, y: 2, z: 1 },
      type: "monster",
    },
    "pickup@0,7,7": {
      config: { gives: "crown", planet: "safari" },
      position: { x: 0, y: 7, z: 7 },
      type: "pickup",
    },
    "portableBlock@7,3,1": {
      config: { style: "drum" },
      position: { x: 7, y: 3, z: 1 },
      type: "portableBlock",
    },
    "pushableBlock@0,7,6": {
      config: { style: "stepStool" },
      position: { x: 0, y: 7, z: 6 },
      type: "pushableBlock",
    },
    "pushableBlock@3,5,0": {
      config: { style: "stepStool" },
      position: { x: 3, y: 5, z: 0 },
      type: "pushableBlock",
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
      position: { x: 0, y: 8, z: 0 },
      type: "wall",
    },
    "wall@5,0,0": {
      config: { direction: "towards", times: { x: 3 } },
      position: { x: 5, y: 0, z: 0 },
      type: "wall",
    },
    "wall@8,0,0": {
      config: {
        direction: "left",
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
        times: { y: 8 },
      },
      position: { x: 8, y: 0, z: 0 },
      type: "wall",
    },
  },
  planet: "safari",
  size: { x: 8, y: 8 },
}) satisfies RoomJson<OriginalCampaignRoomId, string, "safari">;
