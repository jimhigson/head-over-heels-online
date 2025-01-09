import { inferRoomJson, type RoomJson } from "@/model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "magenta", shade: "basic" },
  floor: "deadly",
  id: "blacktooth12",
  items: {
    "block@0,0,3": {
      config: { style: "organic" },
      position: { x: 0, y: 0, z: 3 },
      type: "block",
    },
    "block@0,1,3": {
      config: { style: "organic" },
      position: { x: 0, y: 1, z: 3 },
      type: "block",
    },
    "block@4,0,3": {
      config: { disappearing: "onStand", style: "organic" },
      position: { x: 4, y: 0, z: 3 },
      type: "block",
    },
    "block@4,1,3": {
      config: { disappearing: "onStand", style: "organic" },
      position: { x: 4, y: 1, z: 3 },
      type: "block",
    },
    "block@7,0,3": {
      config: { style: "organic" },
      position: { x: 7, y: 0, z: 3 },
      type: "block",
    },
    "block@7,1,3": {
      config: { style: "organic" },
      position: { x: 7, y: 1, z: 3 },
      type: "block",
    },
    "door@0,0,5": {
      config: { direction: "right", toRoom: "blacktooth11" },
      position: { x: 0, y: 0, z: 5 },
      type: "door",
    },
    "door@8,0,5": {
      config: { direction: "left", toRoom: "blacktooth13" },
      position: { x: 8, y: 0, z: 5 },
      type: "door",
    },
  },
  planet: "blacktooth",
  size: { x: 8, y: 2 },
  walls: {
    away: [
      "plain",
      "armour",
      "plain",
      "shield",
      "shield",
      "plain",
      "armour",
      "plain",
    ],
    left: ["none", "none"],
  },
}) satisfies RoomJson<"blacktooth", OriginalCampaignRoomId>;
