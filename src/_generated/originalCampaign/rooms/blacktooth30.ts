import { inferRoomJson, type RoomJson } from "@/model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "dimmed" },
  floor: "none",
  id: "blacktooth30",
  items: {
    "block@0,0,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 0, y: 0, z: 0 },
      type: "block",
    },
    "block@0,1,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 0, y: 1, z: 0 },
      type: "block",
    },
    "block@0,2,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 0, y: 2, z: 0 },
      type: "block",
    },
    "block@0,3,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 0, y: 3, z: 0 },
      type: "block",
    },
    "block@0,4,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 0, y: 4, z: 0 },
      type: "block",
    },
    "block@0,5,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 0, y: 5, z: 0 },
      type: "block",
    },
    "block@0,6,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 0, y: 6, z: 0 },
      type: "block",
    },
    "block@0,7,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 0, y: 7, z: 0 },
      type: "block",
    },
    "door@0,3,1:uMHSV": {
      config: { direction: "right", toRoom: "blacktooth31" },
      position: { x: 0, y: 3, z: 1 },
      type: "door",
    },
  },
  planet: "jail",
  roomBelow: "blacktooth29",
  size: { x: 6, y: 8 },
  walls: {
    away: ["bars", "bars", "bars", "bars", "bars", "bars"],
    left: ["bars", "bars", "bars", "bars", "bars", "bars", "bars", "bars"],
  },
}) satisfies RoomJson<"jail", OriginalCampaignRoomId>;
