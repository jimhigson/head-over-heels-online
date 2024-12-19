import { inferRoomJson, type RoomJson } from "@/model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "dimmed" },
  floor: "bookworld",
  id: "bookworld31",
  items: {
    "baddie@11,0,0:Z2jz06D": {
      config: {
        activated: true,
        startDirection: "right",
        style: "starsAndStripes",
        which: "american-football-head",
      },
      position: { x: 11, y: 0, z: 0 },
      type: "baddie",
    },
    "deadlyBlock@12,0,0:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 12, y: 0, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@12,1,0:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 12, y: 1, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@12,2,0:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 12, y: 2, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@12,3,0:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 12, y: 3, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@12,4,0:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 12, y: 4, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@12,5,0:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 12, y: 5, z: 0 },
      type: "deadlyBlock",
    },
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
    "deadlyBlock@5,0,0:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 5, y: 0, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@5,1,0:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 5, y: 1, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@5,2,0:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 5, y: 2, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@5,3,0:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 5, y: 3, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@5,4,0:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 5, y: 4, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@5,5,0:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 5, y: 5, z: 0 },
      type: "deadlyBlock",
    },
    "door@0,2,0:286BxP": {
      config: { direction: "right", toRoom: "bookworld32" },
      position: { x: 0, y: 2, z: 0 },
      type: "door",
    },
    "door@16,2,0:Z1lPEON": {
      config: { direction: "left", toRoom: "bookworld30" },
      position: { x: 16, y: 2, z: 0 },
      type: "door",
    },
    "pickup@9,2,0:DHWsf": {
      config: { gives: "shield" },
      position: { x: 9, y: 2, z: 0 },
      type: "pickup",
    },
  },
  planet: "bookworld",
  size: { x: 16, y: 6 },
  walls: {
    away: [
      "book",
      "person",
      "book",
      "book",
      "book",
      "book",
      "person",
      "book",
      "book",
      "person",
      "book",
      "book",
      "book",
      "book",
      "person",
      "book",
    ],
    left: ["book", "book", "none", "none", "book", "book"],
  },
}) satisfies RoomJson<"bookworld", OriginalCampaignRoomId>;
