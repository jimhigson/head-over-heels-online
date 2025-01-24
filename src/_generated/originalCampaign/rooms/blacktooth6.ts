import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "cyan", shade: "dimmed" },
  floor: "deadly",
  id: "blacktooth6",
  items: {
    "block@0,0,0": {
      config: { style: "organic" },
      position: { x: 0, y: 0, z: 0 },
      type: "block",
    },
    "block@0,3,0": {
      config: { style: "organic" },
      position: { x: 0, y: 3, z: 0 },
      type: "block",
    },
    "block@0,4,0": {
      config: { style: "organic" },
      position: { x: 0, y: 4, z: 0 },
      type: "block",
    },
    "block@0,7,0": {
      config: { disappearing: "onStand", style: "organic" },
      position: { x: 0, y: 7, z: 0 },
      type: "block",
    },
    "block@3,0,0": {
      config: { style: "organic" },
      position: { x: 3, y: 0, z: 0 },
      type: "block",
    },
    "block@3,7,0": {
      config: { disappearing: "onStand", style: "organic" },
      position: { x: 3, y: 7, z: 0 },
      type: "block",
    },
    "block@6,0,0": {
      config: { style: "organic" },
      position: { x: 6, y: 0, z: 0 },
      type: "block",
    },
    "block@7,7,0": {
      config: { style: "organic" },
      position: { x: 7, y: 7, z: 0 },
      type: "block",
    },
    "door@0,3,1": {
      config: { direction: "right", toRoom: "blacktooth5" },
      position: { x: 0, y: 3, z: 1 },
      type: "door",
    },
    "monster@3,0,1": {
      config: {
        activated: true,
        movement: "patrol-randomly-diagonal",
        which: "dalek",
      },
      position: { x: 3, y: 0, z: 1 },
      type: "monster",
    },
    "pickup@7,7,1": {
      config: { gives: "doughnuts" },
      position: { x: 7, y: 7, z: 1 },
      type: "pickup",
    },
    scroll: {
      config: { gives: "scroll", page: "doughnuts" },
      position: { x: 2, y: 3, z: 1 },
      type: "pickup",
    },
    scrollBlock: {
      config: { style: "organic" },
      position: { x: 2, y: 3, z: 0 },
      type: "block",
    },
    "switch@6,0,1": {
      config: {
        activates: {
          "block@0,7,0": {
            left: { disappear: "onStand" },
            right: { disappear: null },
          },
          "block@3,7,0": {
            left: { disappear: "onStand" },
            right: { disappear: null },
          },
          "monster@3,0,1": {
            left: { activated: true },
            right: { activated: false },
          },
        },
      },
      position: { x: 6, y: 0, z: 1 },
      type: "switch",
    },
  },
  planet: "blacktooth",
  size: { x: 8, y: 8 },
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
    left: [
      "plain",
      "armour",
      "plain",
      "shield",
      "shield",
      "plain",
      "armour",
      "plain",
    ],
  },
}) satisfies RoomJson<"blacktooth", OriginalCampaignRoomId>;
