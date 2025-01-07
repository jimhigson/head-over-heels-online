import { inferRoomJson, type RoomJson } from "@/model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "cyan", shade: "dimmed" },
  floor: "egyptus",
  id: "egyptus26",
  items: {
    "deadlyBlock@5,0,0": {
      config: { style: "volcano" },
      position: { x: 5, y: 0, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@5,1,0": {
      config: { style: "volcano" },
      position: { x: 5, y: 1, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@5,2,0": {
      config: { style: "volcano" },
      position: { x: 5, y: 2, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@5,3,0": {
      config: { style: "volcano" },
      position: { x: 5, y: 3, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@5,4,0": {
      config: { style: "volcano" },
      position: { x: 5, y: 4, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@5,5,0": {
      config: { style: "volcano" },
      position: { x: 5, y: 5, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@6,0,0": {
      config: { style: "volcano" },
      position: { x: 6, y: 0, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@6,1,0": {
      config: { style: "volcano" },
      position: { x: 6, y: 1, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@6,2,0": {
      config: { style: "volcano" },
      position: { x: 6, y: 2, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@6,3,0": {
      config: { style: "volcano" },
      position: { x: 6, y: 3, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@6,4,0": {
      config: { style: "volcano" },
      position: { x: 6, y: 4, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@6,5,0": {
      config: { style: "volcano" },
      position: { x: 6, y: 5, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@7,0,0": {
      config: { style: "volcano" },
      position: { x: 7, y: 0, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@7,1,0": {
      config: { style: "volcano" },
      position: { x: 7, y: 1, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@7,2,0": {
      config: { style: "volcano" },
      position: { x: 7, y: 2, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@7,3,0": {
      config: { style: "volcano" },
      position: { x: 7, y: 3, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@7,4,0": {
      config: { style: "volcano" },
      position: { x: 7, y: 4, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@7,5,0": {
      config: { style: "volcano" },
      position: { x: 7, y: 5, z: 0 },
      type: "deadlyBlock",
    },
    "door@0,2,0": {
      config: { direction: "right", toRoom: "egyptus28" },
      position: { x: 0, y: 2, z: 0 },
      type: "door",
    },
    "door@3,0,0": {
      config: { direction: "towards", toRoom: "egyptus25" },
      position: { x: 3, y: 0, z: 0 },
      type: "door",
    },
    "monster@7,5,1": {
      config: {
        activated: true,
        movement: "patrol-randomly-diagonal",
        which: "dalek",
      },
      position: { x: 7, y: 5, z: 1 },
      type: "monster",
    },
    "pickup@7,3,1": {
      config: { gives: "extra-life" },
      position: { x: 7, y: 3, z: 1 },
      type: "pickup",
    },
  },
  planet: "egyptus",
  size: { x: 8, y: 6 },
  walls: {
    away: [
      "hieroglyphics",
      "hieroglyphics",
      "sarcophagus",
      "hieroglyphics",
      "hieroglyphics",
      "sarcophagus",
      "hieroglyphics",
      "hieroglyphics",
    ],
    left: [
      "hieroglyphics",
      "sarcophagus",
      "hieroglyphics",
      "hieroglyphics",
      "sarcophagus",
      "hieroglyphics",
    ],
  },
}) satisfies RoomJson<"egyptus", OriginalCampaignRoomId>;
