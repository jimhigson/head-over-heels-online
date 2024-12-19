import { inferRoomJson, type RoomJson } from "@/model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "yellow", shade: "dimmed" },
  floor: "blacktooth",
  id: "blacktooth10",
  items: {
    "deadlyBlock@3,0,0:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 3, y: 0, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@3,1,0:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 3, y: 1, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@3,2,0:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 3, y: 2, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@3,3,0:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 3, y: 3, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@3,4,0:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 3, y: 4, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@3,5,0:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 3, y: 5, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@8,0,0:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 8, y: 0, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@8,1,0:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 8, y: 1, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@8,2,0:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 8, y: 2, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@8,3,0:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 8, y: 3, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@8,4,0:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 8, y: 4, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@8,5,0:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 8, y: 5, z: 0 },
      type: "deadlyBlock",
    },
    "door@0,2,0:b00Ew": {
      config: { direction: "right", toRoom: "blacktooth7" },
      position: { x: 0, y: 2, z: 0 },
      type: "door",
    },
    "door@12,2,0:ZUD4Ug": {
      config: { direction: "left", toRoom: "blacktooth11" },
      position: { x: 12, y: 2, z: 0 },
      type: "door",
    },
  },
  planet: "blacktooth",
  size: { x: 12, y: 6 },
  walls: {
    away: [
      "plain",
      "armour",
      "shield",
      "shield",
      "armour",
      "plain",
      "plain",
      "armour",
      "shield",
      "shield",
      "armour",
      "plain",
    ],
    left: ["plain", "shield", "none", "none", "shield", "plain"],
  },
}) satisfies RoomJson<"blacktooth", OriginalCampaignRoomId>;
