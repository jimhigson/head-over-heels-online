import { inferRoomJson, type RoomJson } from "@/model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "yellow", shade: "basic" },
  floor: "moonbase",
  id: "moonbase16",
  items: {
    "baddie@11,0,0:ZjbVd9": {
      config: { activated: true, which: "computer-bot" },
      position: { x: 11, y: 0, z: 0 },
      type: "baddie",
    },
    "deadlyBlock@2,0,0:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 2, y: 0, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@2,0,1:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 2, y: 0, z: 1 },
      type: "deadlyBlock",
    },
    "deadlyBlock@2,1,0:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 2, y: 1, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@2,1,1:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 2, y: 1, z: 1 },
      type: "deadlyBlock",
    },
    "deadlyBlock@2,2,0:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 2, y: 2, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@2,2,1:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 2, y: 2, z: 1 },
      type: "deadlyBlock",
    },
    "deadlyBlock@2,3,0:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 2, y: 3, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@2,3,1:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 2, y: 3, z: 1 },
      type: "deadlyBlock",
    },
    "deadlyBlock@2,4,0:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 2, y: 4, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@2,4,1:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 2, y: 4, z: 1 },
      type: "deadlyBlock",
    },
    "deadlyBlock@2,5,0:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 2, y: 5, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@2,5,1:ZWGEjo": {
      config: { style: "volcano" },
      position: { x: 2, y: 5, z: 1 },
      type: "deadlyBlock",
    },
    "door@0,2,1:Z1kG4Aw": {
      config: { direction: "right", toRoom: "moonbase13" },
      position: { x: 0, y: 2, z: 1 },
      type: "door",
    },
    "door@8,0,0:5Cu6G": {
      config: { direction: "towards", toRoom: "moonbase17" },
      position: { x: 8, y: 0, z: 0 },
      type: "door",
    },
    "pickup@11,5,0:DHWsf": {
      config: { gives: "shield" },
      position: { x: 11, y: 5, z: 0 },
      type: "pickup",
    },
    "portableBlock@0,0,0:Z1SKpmn": {
      config: { style: "drum" },
      position: { x: 0, y: 0, z: 0 },
      type: "portableBlock",
    },
    "portableBlock@0,1,0:Z1SKpmn": {
      config: { style: "drum" },
      position: { x: 0, y: 1, z: 0 },
      type: "portableBlock",
    },
    "portableBlock@3,0,0:Z1SKpmn": {
      config: { style: "drum" },
      position: { x: 3, y: 0, z: 0 },
      type: "portableBlock",
    },
    "portableBlock@4,0,0:Z1SKpmn": {
      config: { style: "drum" },
      position: { x: 4, y: 0, z: 0 },
      type: "portableBlock",
    },
  },
  planet: "moonbase",
  size: { x: 12, y: 6 },
  walls: {
    away: [
      "window1",
      "coil",
      "window3",
      "window2",
      "coil",
      "window1",
      "window1",
      "coil",
      "window3",
      "window2",
      "coil",
      "window1",
    ],
    left: ["window1", "coil", "window3", "window2", "coil", "window1"],
  },
}) satisfies RoomJson<"moonbase", OriginalCampaignRoomId>;
