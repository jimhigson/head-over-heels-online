import { inferRoomJson, type RoomJson } from "@/model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "basic" },
  floor: "blacktooth",
  id: "blacktooth87crown",
  items: {
    "baddie@3,3,0:Z2awALk": {
      config: {
        activated: true,
        movement: "patrol-randomly-diagonal",
        which: "dalek",
      },
      position: { x: 3, y: 3, z: 0 },
      type: "baddie",
    },
    "baddie@6,3,1:1EyDjH": {
      config: {
        activated: true,
        movement: "towards-when-in-square-xy8",
        which: "emperor",
      },
      position: { x: 6, y: 3, z: 1 },
      type: "baddie",
    },
    "deadlyBlock@6,1,0:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 6, y: 1, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@6,2,1:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 6, y: 2, z: 1 },
      type: "deadlyBlock",
    },
    "deadlyBlock@6,3,0:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 6, y: 3, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@6,4,1:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 6, y: 4, z: 1 },
      type: "deadlyBlock",
    },
    "deadlyBlock@6,5,0:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 6, y: 5, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@7,1,0:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 7, y: 1, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@7,2,1:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 7, y: 2, z: 1 },
      type: "deadlyBlock",
    },
    "deadlyBlock@7,3,1:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 7, y: 3, z: 1 },
      type: "deadlyBlock",
    },
    "deadlyBlock@7,3,2:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 7, y: 3, z: 2 },
      type: "deadlyBlock",
    },
    "deadlyBlock@7,4,1:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 7, y: 4, z: 1 },
      type: "deadlyBlock",
    },
    "deadlyBlock@7,5,0:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 7, y: 5, z: 0 },
      type: "deadlyBlock",
    },
    "door@3,8,1:xSbtj": {
      config: { direction: "away", toRoom: "blacktooth86" },
      position: { x: 3, y: 8, z: 1 },
      type: "door",
    },
    "pickup@7,3,0:CMCYe": {
      config: { gives: "crown", planet: "blacktooth" },
      position: { x: 7, y: 3, z: 0 },
      type: "pickup",
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
