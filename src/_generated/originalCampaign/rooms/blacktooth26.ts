import { inferRoomJson, type RoomJson } from "@/model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "cyan", shade: "basic" },
  floor: "none",
  floorSkip: [],
  id: "blacktooth26",
  items: {
    "conveyor@2,5,0:cVr4l": {
      config: { direction: "right" },
      position: { x: 2, y: 5, z: 0 },
      type: "conveyor",
    },
    "conveyor@3,5,0:cVr4l": {
      config: { direction: "right" },
      position: { x: 3, y: 5, z: 0 },
      type: "conveyor",
    },
    "conveyor@4,5,0:cVr4l": {
      config: { direction: "right" },
      position: { x: 4, y: 5, z: 0 },
      type: "conveyor",
    },
    "conveyor@5,2,0:24hKaE": {
      config: { direction: "away" },
      position: { x: 5, y: 2, z: 0 },
      type: "conveyor",
    },
    "conveyor@5,3,0:24hKaE": {
      config: { direction: "away" },
      position: { x: 5, y: 3, z: 0 },
      type: "conveyor",
    },
    "conveyor@5,4,0:24hKaE": {
      config: { direction: "away" },
      position: { x: 5, y: 4, z: 0 },
      type: "conveyor",
    },
    "conveyor@5,5,0:cVr4l": {
      config: { direction: "right" },
      position: { x: 5, y: 5, z: 0 },
      type: "conveyor",
    },
    "door@2,6,2:LBLtR": {
      config: { direction: "away", toRoom: "blacktooth27fish" },
      position: { x: 2, y: 6, z: 2 },
      type: "door",
    },
    "lift@5,0,0:ZTwqow": {
      config: { bottom: 0, top: 7 },
      position: { x: 5, y: 0, z: 0 },
      type: "lift",
    },
  },
  planet: "jail",
  roomBelow: "blacktooth25",
  size: { x: 6, y: 6 },
  walls: {
    away: ["bars", "bars", "none", "none", "bars", "bars"],
    left: ["bars", "bars", "bars", "bars", "bars", "bars"],
  },
}) satisfies RoomJson<"jail", OriginalCampaignRoomId>;
