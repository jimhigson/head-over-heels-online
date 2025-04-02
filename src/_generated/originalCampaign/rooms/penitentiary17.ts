import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "yellow", shade: "basic" },
  floor: "none",
  id: "penitentiary17",
  items: {
    "block@3,0,0": {
      config: { style: "organic", times: { x: 2, y: 8 } },
      position: { x: 3, y: 0, z: 0 },
      type: "block",
    },
    "door@3,8,2": {
      config: {
        direction: "away",
        meta: { toSubRoom: "right" },
        toRoom: "penitentiary18fish",
      },
      position: { x: 3, y: 8, z: 2 },
      type: "door",
    },
    extraBarrier1: {
      config: { axis: "y", times: { y: 8 } },
      position: { x: 2.5, y: 0, z: 1 },
      type: "barrier",
    },
    extraBarrier2: {
      config: { axis: "y", times: { y: 8 } },
      position: { x: 4.5, y: 0, z: 1 },
      type: "barrier",
    },
    "wall@0,0,0:2sckOl": {
      config: { direction: "right", tiles: [], times: { y: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@0,0,0:Z1XoDrY": {
      config: { direction: "towards", tiles: [], times: { x: 8 } },
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
  roomBelow: "penitentiary16",
  size: { x: 8, y: 8 },
}) satisfies RoomJson<OriginalCampaignRoomId, string, "penitentiary">;
