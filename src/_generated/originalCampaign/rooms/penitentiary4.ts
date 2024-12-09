import { inferRoomJson, type RoomJson } from "@/model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "basic" },
  floor: "penitentiary",
  floorSkip: [],
  id: "penitentiary4",
  items: {
    "block@4,5,1:20S0Rw": {
      config: { disappearing: false, style: "artificial" },
      position: { x: 4, y: 5, z: 1 },
      type: "block",
    },
    "block@5,0,4:20S0Rw": {
      config: { disappearing: false, style: "artificial" },
      position: { x: 5, y: 0, z: 4 },
      type: "block",
    },
    "block@5,0,7:20S0Rw": {
      config: { disappearing: false, style: "artificial" },
      position: { x: 5, y: 0, z: 7 },
      type: "block",
    },
    "block@5,1,2:20S0Rw": {
      config: { disappearing: false, style: "artificial" },
      position: { x: 5, y: 1, z: 2 },
      type: "block",
    },
    "block@5,2,6:20S0Rw": {
      config: { disappearing: false, style: "artificial" },
      position: { x: 5, y: 2, z: 6 },
      type: "block",
    },
    "block@5,5,2:20S0Rw": {
      config: { disappearing: false, style: "artificial" },
      position: { x: 5, y: 5, z: 2 },
      type: "block",
    },
    "deadlyBlock@5,2,0:ZaRhUQ": {
      config: { style: "spikes" },
      position: { x: 5, y: 2, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@5,3,0:ZaRhUQ": {
      config: { style: "spikes" },
      position: { x: 5, y: 3, z: 0 },
      type: "deadlyBlock",
    },
    "door@0,2,0:RGMkn": {
      config: { direction: "right", toRoom: "penitentiary3" },
      position: { x: 0, y: 2, z: 0 },
      type: "door",
    },
  },
  planet: "penitentiary",
  roomAbove: "penitentiary5",
  size: { x: 6, y: 6 },
  walls: {
    away: ["loop", "skeleton", "loop", "loop", "skeleton", "loop"],
    left: ["loop", "skeleton", "loop", "loop", "skeleton", "loop"],
  },
}) satisfies RoomJson<"penitentiary", OriginalCampaignRoomId>;
