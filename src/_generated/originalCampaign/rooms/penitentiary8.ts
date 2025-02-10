import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "dimmed" },
  floor: "penitentiary",
  id: "penitentiary8",
  items: {
    "block@0,4,7": {
      config: { style: "artificial" },
      position: { x: 0, y: 4, z: 7 },
      type: "block",
    },
    "block@0,5,6": {
      config: { style: "artificial" },
      position: { x: 0, y: 5, z: 6 },
      type: "block",
    },
    "block@0,6,4": {
      config: { style: "artificial" },
      position: { x: 0, y: 6, z: 4 },
      type: "block",
    },
    "block@0,7,4": {
      config: { style: "artificial" },
      position: { x: 0, y: 7, z: 4 },
      type: "block",
    },
    "block@1,2,2": {
      config: { style: "artificial" },
      position: { x: 1, y: 2, z: 2 },
      type: "block",
    },
    "door@0,0,0": {
      config: { direction: "towards", toRoom: "penitentiary7" },
      position: { x: 0, y: 0, z: 0 },
      type: "door",
    },
    extra1: {
      config: { style: "artificial" },
      isExtra: true,
      position: { x: 0, y: 5, z: 5 },
      type: "block",
    },
    extra2: {
      config: { style: "artificial" },
      isExtra: true,
      position: { x: 0, y: 5, z: 4 },
      type: "block",
    },
    extra3: {
      config: { style: "artificial" },
      isExtra: true,
      position: { x: 0, y: 4, z: 6 },
      type: "block",
    },
    "portableBlock@1,2,0": {
      config: { style: "drum" },
      position: { x: 1, y: 2, z: 0 },
      type: "portableBlock",
    },
    "portableBlock@1,2,1": {
      config: { style: "drum" },
      position: { x: 1, y: 2, z: 1 },
      type: "portableBlock",
    },
    "portableBlock@1,2,3": {
      config: { style: "drum" },
      position: { x: 1, y: 2, z: 3 },
      type: "portableBlock",
    },
  },
  planet: "penitentiary",
  roomAbove: "penitentiary9",
  size: { x: 2, y: 8, z: 12 },
  walls: {
    away: ["loop", "loop"],
    left: [
      "loop",
      "loop",
      "skeleton",
      "loop",
      "loop",
      "skeleton",
      "loop",
      "loop",
    ],
  },
}) satisfies RoomJson<"penitentiary", OriginalCampaignRoomId>;
