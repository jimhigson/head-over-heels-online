import { inferRoomJson, type RoomJson } from "@/model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "basic" },
  floor: "blacktooth",
  id: "blacktooth76",
  items: {
    "baddie@2,2,0:ZiWCzO": {
      config: {
        activated: true,
        startDirection: "right",
        style: "greenAndPink",
        which: "american-football-head",
      },
      position: { x: 2, y: 2, z: 0 },
      type: "baddie",
    },
    "baddie@2,7,0:Z8uA9O": {
      config: { activated: true, startDirection: "right", which: "turtle" },
      position: { x: 2, y: 7, z: 0 },
      type: "baddie",
    },
    "deadlyBlock@1,2,0:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 1, y: 2, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@2,1,0:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 2, y: 1, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@2,6,0:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 2, y: 6, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@2,6,1:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 2, y: 6, z: 1 },
      type: "deadlyBlock",
    },
    "deadlyBlock@2,7,1:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 2, y: 7, z: 1 },
      type: "deadlyBlock",
    },
    "deadlyBlock@3,4,0:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 3, y: 4, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@4,3,0:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 4, y: 3, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@5,1,0:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 5, y: 1, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@5,6,0:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 5, y: 6, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@6,2,0:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 6, y: 2, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@6,2,1:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 6, y: 2, z: 1 },
      type: "deadlyBlock",
    },
    "deadlyBlock@6,5,0:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 6, y: 5, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@7,2,1:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 7, y: 2, z: 1 },
      type: "deadlyBlock",
    },
    "door@0,3,0:uN8Il": {
      config: { direction: "right", toRoom: "blacktooth68" },
      position: { x: 0, y: 3, z: 0 },
      type: "door",
    },
    "door@3,8,0:xS3db": {
      config: { direction: "away", toRoom: "blacktooth75" },
      position: { x: 3, y: 8, z: 0 },
      type: "door",
    },
  },
  planet: "blacktooth",
  size: { x: 8, y: 8 },
  walls: {
    away: [
      "plain",
      "shield",
      "plain",
      "none",
      "none",
      "plain",
      "shield",
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
