import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "green", shade: "basic" },
  height: 11,
  id: "penitentiary5",
  items: {
    b: {
      config: { style: "artificial" },
      position: { x: 0, y: 5, z: 7 },
      type: "block",
    },
    b1: {
      config: { disappearing: { on: "stand" }, style: "artificial" },
      position: { x: 2, y: 5, z: 5 },
      type: "block",
    },
    b10: {
      config: { disappearing: { on: "stand" }, style: "artificial" },
      position: { x: 2, y: 5, z: 0 },
      type: "block",
    },
    b2: {
      config: { style: "artificial" },
      position: { x: 5, y: 0, z: 0 },
      type: "block",
    },
    b3: {
      config: { style: "artificial" },
      position: { x: 5, y: 4, z: 0 },
      type: "block",
    },
    b4: {
      config: { style: "artificial", times: { z: 3 } },
      position: { x: 5, y: 5, z: 0 },
      type: "block",
    },
    b5: {
      config: { style: "artificial" },
      position: { x: 5, y: 5, z: 4 },
      type: "block",
    },
    b6: {
      config: { disappearing: { on: "stand" }, style: "artificial" },
      position: { x: 2, y: 5, z: 4 },
      type: "block",
    },
    b7: {
      config: { disappearing: { on: "stand" }, style: "artificial" },
      position: { x: 2, y: 5, z: 3 },
      type: "block",
    },
    b8: {
      config: { disappearing: { on: "stand" }, style: "artificial" },
      position: { x: 2, y: 5, z: 2 },
      type: "block",
    },
    b9: {
      config: { disappearing: { on: "stand" }, style: "artificial" },
      position: { x: 2, y: 5, z: 1 },
      type: "block",
    },
    f: {
      config: { floorType: "none", times: { x: 6, y: 6 } },
      position: { x: 0, y: 0, z: 0 },
      type: "floor",
    },
    w: {
      config: { direction: "right", times: { y: 6 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    w1: {
      config: { direction: "towards", times: { x: 6 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    w2: {
      config: {
        direction: "away",
        tiles: ["loop", "skeleton", "loop", "loop", "skeleton", "loop"],
      },
      position: { x: 0, y: 6, z: 0 },
      type: "wall",
    },
    w3: {
      config: {
        direction: "left",
        tiles: ["loop", "skeleton", "loop", "loop", "skeleton", "loop"],
      },
      position: { x: 6, y: 0, z: 0 },
      type: "wall",
    },
  },
  planet: "penitentiary",
  roomAbove: "penitentiary6",
  roomBelow: "penitentiary4",
}) satisfies RoomJson<OriginalCampaignRoomId, string, "penitentiary">;
