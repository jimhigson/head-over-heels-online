import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "dimmed" },
  floor: "deadly",
  id: "blacktooth83tofreedom",
  items: {
    "block@0,2,0": {
      config: { style: "organic", times: { y: 4 } },
      position: { x: 0, y: 2, z: 0 },
      type: "block",
    },
    "block@0,7,0": {
      config: { style: "organic", times: { z: 2 } },
      position: { x: 0, y: 7, z: 0 },
      type: "block",
    },
    "block@0,7,3": {
      config: { style: "organic" },
      position: { x: 0, y: 7, z: 3 },
      type: "block",
    },
    "block@5,3,0": {
      config: { disappearing: "onStand", style: "organic" },
      position: { x: 5, y: 3, z: 0 },
      type: "block",
    },
    "block@5,3,1": {
      config: { disappearing: "onStand", style: "organic" },
      position: { x: 5, y: 3, z: 1 },
      type: "block",
    },
    "block@5,3,2": {
      config: { disappearing: "onStand", style: "organic" },
      position: { x: 5, y: 3, z: 2 },
      type: "block",
    },
    "block@5,7,0": {
      config: { disappearing: "onStand", style: "organic" },
      position: { x: 5, y: 7, z: 0 },
      type: "block",
    },
    "block@5,7,1": {
      config: { disappearing: "onStand", style: "organic" },
      position: { x: 5, y: 7, z: 1 },
      type: "block",
    },
    "block@5,7,2": {
      config: { disappearing: "onStand", style: "organic" },
      position: { x: 5, y: 7, z: 2 },
      type: "block",
    },
    "block@6,2,2": {
      config: { style: "artificial" },
      position: { x: 6, y: 2, z: 2 },
      type: "block",
    },
    "block@7,1,2": {
      config: { style: "artificial" },
      position: { x: 7, y: 1, z: 2 },
      type: "block",
    },
    "block@7,2,0": {
      config: { style: "organic" },
      position: { x: 7, y: 2, z: 0 },
      type: "block",
    },
    "block@7,3,2": {
      config: { style: "artificial" },
      position: { x: 7, y: 3, z: 2 },
      type: "block",
    },
    "door@0,3,1": {
      config: { direction: "right", toRoom: "blacktooth82" },
      position: { x: 0, y: 3, z: 1 },
      type: "door",
    },
    "hushPuppy@0,0,0": {
      config: {},
      position: { x: 0, y: 0, z: 0 },
      type: "hushPuppy",
    },
    "hushPuppy@3,0,0": {
      config: {},
      position: { x: 3, y: 0, z: 0 },
      type: "hushPuppy",
    },
    "hushPuppy@6,0,0": {
      config: { times: { x: 2 } },
      position: { x: 6, y: 0, z: 0 },
      type: "hushPuppy",
    },
    "hushPuppy@7,0,1": {
      config: {},
      position: { x: 7, y: 0, z: 1 },
      type: "hushPuppy",
    },
    "teleporter@7,2,1": {
      config: { toPosition: { x: 9, y: 2, z: 1 }, toRoom: "finalroom" },
      position: { x: 7, y: 2, z: 1 },
      type: "teleporter",
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
          "plain",
          "armour",
          "plain",
          "shield",
          "shield",
          "plain",
          "armour",
          "plain",
        ],
        times: { x: 8 },
      },
      position: { x: 0, y: 8, z: 0 },
      type: "wall",
    },
    "wall@8,0,0": {
      config: {
        direction: "left",
        tiles: [
          "plain",
          "armour",
          "plain",
          "shield",
          "shield",
          "plain",
          "armour",
          "plain",
        ],
        times: { y: 8 },
      },
      position: { x: 8, y: 0, z: 0 },
      type: "wall",
    },
  },
  meta: {
    nonContiguousRelationship: {
      gridOffset: { x: 2, y: 0, z: 0 },
      with: { room: "finalroom" },
    },
  },
  planet: "blacktooth",
  size: { x: 8, y: 8 },
}) satisfies RoomJson<OriginalCampaignRoomId, string, "blacktooth">;
