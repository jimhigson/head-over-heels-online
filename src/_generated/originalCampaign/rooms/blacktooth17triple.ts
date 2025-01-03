import { inferRoomJson, type RoomJson } from "@/model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "yellow", shade: "basic" },
  floor: "blacktooth",
  id: "blacktooth17triple",
  items: {
    "baddie@3,0,0:ZVblgD": {
      config: { activated: true, which: "helicopter-bug" },
      position: { x: 3, y: 0, z: 0 },
      type: "baddie",
    },
    "deadlyBlock@1,2,0:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 1, y: 2, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@1,3,0:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 1, y: 3, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@1,8,0:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 1, y: 8, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@1,9,0:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 1, y: 9, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@10,2,0:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 10, y: 2, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@10,3,0:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 10, y: 3, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@2,1,0:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 2, y: 1, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@2,10,0:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 2, y: 10, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@2,4,0:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 2, y: 4, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@2,7,0:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 2, y: 7, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@3,1,0:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 3, y: 1, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@3,10,0:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 3, y: 10, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@3,4,0:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 3, y: 4, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@3,7,0:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 3, y: 7, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@4,2,0:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 4, y: 2, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@4,3,0:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 4, y: 3, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@4,8,0:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 4, y: 8, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@4,9,0:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 4, y: 9, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@7,2,0:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 7, y: 2, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@7,3,0:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 7, y: 3, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@8,1,0:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 8, y: 1, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@8,4,0:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 8, y: 4, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@9,1,0:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 9, y: 1, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@9,4,0:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 9, y: 4, z: 0 },
      type: "deadlyBlock",
    },
    "door@0,2,0:uMtaW": {
      config: { direction: "right", toRoom: "blacktooth16" },
      position: { x: 0, y: 2, z: 0 },
      type: "door",
    },
    "door@12,2,0:ZUD2Qe": {
      config: { direction: "left", toRoom: "blacktooth19" },
      position: { x: 12, y: 2, z: 0 },
      type: "door",
    },
    "door@6,8,0:ZUD36Y": {
      config: { direction: "left", toRoom: "blacktooth18" },
      position: { x: 6, y: 8, z: 0 },
      type: "door",
    },
    "pickup@3,9,0:DHWsf": {
      config: { gives: "shield" },
      position: { x: 3, y: 9, z: 0 },
      type: "pickup",
    },
    "wall@10,6,0:2lbb8x": {
      config: { side: "away", style: "armour" },
      position: { x: 10, y: 6, z: 0 },
      type: "wall",
    },
    "wall@11,6,0:Z7IKOn": {
      config: { side: "away", style: "plain" },
      position: { x: 11, y: 6, z: 0 },
      type: "wall",
    },
    "wall@6,10,0:BKGHK": {
      config: { side: "left", style: "shield" },
      position: { x: 6, y: 10, z: 0 },
      type: "wall",
    },
    "wall@6,11,0:1TQrOi": {
      config: { side: "left", style: "plain" },
      position: { x: 6, y: 11, z: 0 },
      type: "wall",
    },
    "wall@6,6,0:1TQrOi": {
      config: { side: "left", style: "plain" },
      position: { x: 6, y: 6, z: 0 },
      type: "wall",
    },
    "wall@6,6,0:Z7IKOn": {
      config: { side: "away", style: "plain" },
      position: { x: 6, y: 6, z: 0 },
      type: "wall",
    },
    "wall@6,7,0:BKGHK": {
      config: { side: "left", style: "shield" },
      position: { x: 6, y: 7, z: 0 },
      type: "wall",
    },
    "wall@7,6,0:2lbb8x": {
      config: { side: "away", style: "armour" },
      position: { x: 7, y: 6, z: 0 },
      type: "wall",
    },
    "wall@8,6,0:Z1FfuBR": {
      config: { side: "away", style: "shield" },
      position: { x: 8, y: 6, z: 0 },
      type: "wall",
    },
    "wall@9,6,0:Z1FfuBR": {
      config: { side: "away", style: "shield" },
      position: { x: 9, y: 6, z: 0 },
      type: "wall",
    },
  },
  planet: "blacktooth",
  size: { x: 12, y: 12 },
  walls: {
    away: [
      "plain",
      "armour",
      "shield",
      "shield",
      "armour",
      "plain",
      "none",
      "none",
      "none",
      "none",
      "none",
      "none",
    ],
    left: [
      "plain",
      "shield",
      "none",
      "none",
      "shield",
      "plain",
      "none",
      "none",
      "none",
      "none",
      "none",
      "none",
    ],
  },
}) satisfies RoomJson<"blacktooth", OriginalCampaignRoomId>;
