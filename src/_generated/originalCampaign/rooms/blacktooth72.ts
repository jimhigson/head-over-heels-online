import { inferRoomJson, type RoomJson } from "@/model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "basic" },
  floor: "blacktooth",
  id: "blacktooth72",
  items: {
    "block@7,3,2": {
      config: { style: "organic" },
      position: { x: 7, y: 3, z: 2 },
      type: "block",
    },
    "block@7,4,1": {
      config: { style: "organic" },
      position: { x: 7, y: 4, z: 1 },
      type: "block",
    },
    "block@7,5,0": {
      config: { style: "organic" },
      position: { x: 7, y: 5, z: 0 },
      type: "block",
    },
    "door@0,2,0": {
      config: { direction: "right", toRoom: "blacktooth78" },
      position: { x: 0, y: 2, z: 0 },
      type: "door",
    },
    "door@3,0,0": {
      config: { direction: "towards", toRoom: "blacktooth71" },
      position: { x: 3, y: 0, z: 0 },
      type: "door",
    },
    "door@8,2,4": {
      config: { direction: "left", toRoom: "blacktooth73" },
      position: { x: 8, y: 2, z: 4 },
      type: "door",
    },
    "monster@0,5,0": {
      config: {
        activated: true,
        movement: "patrol-randomly-diagonal",
        which: "dalek",
      },
      position: { x: 0, y: 5, z: 0 },
      type: "monster",
    },
    "monster@7,4,0": {
      config: {
        activated: true,
        movement: "patrol-randomly-diagonal",
        which: "dalek",
      },
      position: { x: 7, y: 4, z: 0 },
      type: "monster",
    },
    tower0: {
      config: { style: "tower" },
      position: { x: 7, y: 3, z: 0 },
      type: "block",
    },
    tower1: {
      config: { style: "tower" },
      position: { x: 7, y: 3, z: 1 },
      type: "block",
    },
  },
  planet: "blacktooth",
  size: { x: 8, y: 6 },
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
    left: ["plain", "shield", "none", "none", "shield", "plain"],
  },
}) satisfies RoomJson<"blacktooth", OriginalCampaignRoomId>;
