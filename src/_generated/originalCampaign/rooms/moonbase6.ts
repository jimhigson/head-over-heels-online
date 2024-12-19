import { inferRoomJson, type RoomJson } from "@/model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "magenta", shade: "basic" },
  floor: "moonbase",
  id: "moonbase6",
  items: {
    "baddie@0,4,0:2dbvGC": {
      config: { activated: true, which: "headless-base" },
      position: { x: 0, y: 4, z: 0 },
      type: "baddie",
    },
    "baddie@7,5,0:2dbvGC": {
      config: { activated: true, which: "headless-base" },
      position: { x: 7, y: 5, z: 0 },
      type: "baddie",
    },
    "deadlyBlock@0,3,0:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 0, y: 3, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@1,3,0:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 1, y: 3, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@1,5,0:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 1, y: 5, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@2,7,0:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 2, y: 7, z: 0 },
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
    "deadlyBlock@4,6,0:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 4, y: 6, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@5,4,0:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 5, y: 4, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@5,6,0:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 5, y: 6, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@7,4,0:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 7, y: 4, z: 0 },
      type: "deadlyBlock",
    },
    "door@3,0,0:Z1iR2nP": {
      config: { direction: "towards", toRoom: "moonbase5" },
      position: { x: 3, y: 0, z: 0 },
      type: "door",
    },
    "door@3,8,0:Z2q5iN0": {
      config: { direction: "away", toRoom: "moonbase7" },
      position: { x: 3, y: 8, z: 0 },
      type: "door",
    },
    "pickup@0,5,0:1MkQY2": {
      config: { gives: "extra-life" },
      position: { x: 0, y: 5, z: 0 },
      type: "pickup",
    },
  },
  planet: "moonbase",
  size: { x: 8, y: 8 },
  walls: {
    away: [
      "window2",
      "coil",
      "window3",
      "none",
      "none",
      "window3",
      "coil",
      "window1",
    ],
    left: [
      "window2",
      "window1",
      "coil",
      "window3",
      "window2",
      "coil",
      "window2",
      "window1",
    ],
  },
}) satisfies RoomJson<"moonbase", OriginalCampaignRoomId>;
