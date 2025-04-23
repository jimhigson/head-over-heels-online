import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "cyan", shade: "basic" },
  floor: "deadly",
  id: "penitentiary3",
  items: {
    "block@0,3,0": {
      config: { style: "artificial", times: { y: 2 } },
      position: { x: 0, y: 3, z: 0 },
      type: "block",
    },
    "block@4,7,0": {
      config: { style: "artificial" },
      position: { x: 4, y: 7, z: 0 },
      type: "block",
    },
    "block@7,3,0": {
      config: { style: "artificial", times: { y: 2 } },
      position: { x: 7, y: 3, z: 0 },
      type: "block",
    },
    "deadlyBlock@7,1,0": {
      config: { style: "toaster", times: { z: 2 } },
      position: { x: 7, y: 1, z: 0 },
      type: "deadlyBlock",
    },
    "door@0,3,1": {
      config: { direction: "right", toRoom: "penitentiary2" },
      position: { x: 0, y: 3, z: 1 },
      type: "door",
    },
    "door@8,3,2": {
      config: { direction: "left", toRoom: "penitentiary4" },
      position: { x: 8, y: 3, z: 2 },
      type: "door",
    },
    "movingPlatform@0,1,0": {
      config: {
        activated: "off",
        movement: "clockwise",
        startDirection: "left",
        style: "sandwich",
      },
      position: { x: 0, y: 1, z: 0 },
      type: "movingPlatform",
    },
    "switch@0,0,0": {
      config: {
        initialSetting: "right",
        modifies: [
          {
            expectType: "movingPlatform",
            key: "activated",
            left: true,
            right: false,
            target: "movingPlatform@0,1,0",
          },
          {
            expectType: "switch",
            key: "setting",
            left: "left",
            right: "right",
            target: "switch@7,7,0",
          },
        ],
        type: "in-room",
      },
      position: { x: 0, y: 0, z: 0 },
      type: "switch",
    },
    "switch@7,7,0": {
      config: {
        initialSetting: "right",
        modifies: [
          {
            expectType: "movingPlatform",
            key: "activated",
            left: true,
            right: false,
            target: "movingPlatform@0,1,0",
          },
          {
            expectType: "switch",
            key: "setting",
            left: "left",
            right: "right",
            target: "switch@0,0,0",
          },
        ],
        type: "in-room",
      },
      position: { x: 7, y: 7, z: 0 },
      type: "switch",
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
        times: { x: 8 },
      },
      position: { x: 0, y: 8, z: 0 },
      type: "wall",
    },
    "wall@8,0,0": {
      config: {
        direction: "left",
        tiles: ["loop", "skeleton", "loop"],
        times: { y: 3 },
      },
      position: { x: 8, y: 0, z: 0 },
      type: "wall",
    },
    "wall@8,5,0": {
      config: {
        direction: "left",
        tiles: ["loop", "skeleton", "loop"],
        times: { y: 3 },
      },
      position: { x: 8, y: 5, z: 0 },
      type: "wall",
    },
  },
  planet: "penitentiary",
  size: { x: 8, y: 8 },
}) satisfies RoomJson<OriginalCampaignRoomId, string, "penitentiary">;
