import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "cyan", shade: "dimmed" },
  floor: "deadly",
  id: "bookworld2",
  items: {
    canary: {
      config: { style: "cube" },
      position: { x: 11, y: 1, z: 1 },
      type: "portableBlock",
    },
    canary2: {
      config: { style: "cube" },
      position: { x: 11, y: 1, z: 2 },
      type: "portableBlock",
    },
    "conveyor@0,0,0": {
      config: { direction: "away", times: { y: 3 } },
      position: { x: 0, y: 0, z: 0 },
      type: "conveyor",
    },
    "conveyor@1,0,0": {
      config: { direction: "right" },
      position: { x: 1, y: 0, z: 0 },
      type: "conveyor",
    },
    "conveyor@10,5,0": {
      config: { direction: "right", times: { x: 2 } },
      position: { x: 10, y: 5, z: 0 },
      type: "conveyor",
    },
    "conveyor@11,2,0": {
      config: { direction: "away", times: { y: 3 } },
      position: { x: 11, y: 2, z: 0 },
      type: "conveyor",
    },
    "conveyor@2,0,0": {
      config: { direction: "right", disappearing: "onStand" },
      position: { x: 2, y: 0, z: 0 },
      type: "conveyor",
    },
    "conveyor@3,0,0": {
      config: { direction: "right", times: { x: 2 } },
      position: { x: 3, y: 0, z: 0 },
      type: "conveyor",
    },
    "conveyor@4,1,0": {
      config: { direction: "towards", times: { y: 2 } },
      position: { x: 4, y: 1, z: 0 },
      type: "conveyor",
    },
    "conveyor@4,3,0": {
      config: { direction: "towards", disappearing: "onStand" },
      position: { x: 4, y: 3, z: 0 },
      type: "conveyor",
    },
    "conveyor@4,4,0": {
      config: { direction: "towards", times: { y: 2 } },
      position: { x: 4, y: 4, z: 0 },
      type: "conveyor",
    },
    "conveyor@5,5,0": {
      config: { direction: "right", times: { x: 4 } },
      position: { x: 5, y: 5, z: 0 },
      type: "conveyor",
    },
    "conveyor@9,5,0": {
      config: { direction: "right", disappearing: "onStand" },
      position: { x: 9, y: 5, z: 0 },
      type: "conveyor",
    },
    "deadlyBlock@0,0,2": {
      config: { style: "toaster" },
      position: { x: 0, y: 0, z: 2 },
      type: "deadlyBlock",
    },
    "deadlyBlock@11,4,2": {
      config: { style: "toaster", times: { y: 2 } },
      position: { x: 11, y: 4, z: 2 },
      type: "deadlyBlock",
    },
    "deadlyBlock@4,0,2": {
      config: { style: "toaster" },
      position: { x: 4, y: 0, z: 2 },
      type: "deadlyBlock",
    },
    "deadlyBlock@5,5,2": {
      config: { style: "toaster", times: { x: 3 } },
      position: { x: 5, y: 5, z: 2 },
      type: "deadlyBlock",
    },
    "door@0,2,3": {
      config: { direction: "right", toRoom: "bookworld3" },
      position: { x: 0, y: 2, z: 3 },
      type: "door",
    },
    "door@12,2,3": {
      config: { direction: "left", toRoom: "bookworld1" },
      position: { x: 12, y: 2, z: 3 },
      type: "door",
    },
    extraBlock: {
      config: { style: "organic" },
      position: { x: 11, y: 1, z: 0 },
      type: "block",
    },
    extraBlock2: {
      config: { style: "organic" },
      position: { x: 11, y: 0, z: 0 },
      type: "block",
    },
  },
  planet: "bookworld",
  size: { x: 12, y: 6 },
  walls: {
    away: [
      "book",
      "cowboy",
      "book",
      "book",
      "cowboy",
      "book",
      "book",
      "cowboy",
      "book",
      "book",
      "cowboy",
      "book",
    ],
    left: ["book", "book", "none", "none", "book", "book"],
  },
}) satisfies RoomJson<"bookworld", OriginalCampaignRoomId>;
