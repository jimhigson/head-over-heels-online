import { inferRoomJson, type RoomJson } from "@/model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "cyan", shade: "dimmed" },
  floor: "deadly",
  id: "bookworld2",
  items: {
    "conveyor@0,0,0": {
      config: { direction: "away" },
      position: { x: 0, y: 0, z: 0 },
      type: "conveyor",
    },
    "conveyor@0,1,0": {
      config: { direction: "away" },
      position: { x: 0, y: 1, z: 0 },
      type: "conveyor",
    },
    "conveyor@0,2,0": {
      config: { direction: "away" },
      position: { x: 0, y: 2, z: 0 },
      type: "conveyor",
    },
    "conveyor@1,0,0": {
      config: { direction: "right" },
      position: { x: 1, y: 0, z: 0 },
      type: "conveyor",
    },
    "conveyor@10,5,0": {
      config: { direction: "right" },
      position: { x: 10, y: 5, z: 0 },
      type: "conveyor",
    },
    "conveyor@11,2,0": {
      config: { direction: "away" },
      position: { x: 11, y: 2, z: 0 },
      type: "conveyor",
    },
    "conveyor@11,3,0": {
      config: { direction: "away" },
      position: { x: 11, y: 3, z: 0 },
      type: "conveyor",
    },
    "conveyor@11,4,0": {
      config: { direction: "away" },
      position: { x: 11, y: 4, z: 0 },
      type: "conveyor",
    },
    "conveyor@11,5,0": {
      config: { direction: "right" },
      position: { x: 11, y: 5, z: 0 },
      type: "conveyor",
    },
    "conveyor@2,0,0": {
      config: { direction: "right" },
      position: { x: 2, y: 0, z: 0 },
      type: "conveyor",
    },
    "conveyor@3,0,0": {
      config: { direction: "right" },
      position: { x: 3, y: 0, z: 0 },
      type: "conveyor",
    },
    "conveyor@4,0,0": {
      config: { direction: "right" },
      position: { x: 4, y: 0, z: 0 },
      type: "conveyor",
    },
    "conveyor@4,1,0": {
      config: { direction: "towards" },
      position: { x: 4, y: 1, z: 0 },
      type: "conveyor",
    },
    "conveyor@4,2,0": {
      config: { direction: "towards" },
      position: { x: 4, y: 2, z: 0 },
      type: "conveyor",
    },
    "conveyor@4,3,0": {
      config: { direction: "towards" },
      position: { x: 4, y: 3, z: 0 },
      type: "conveyor",
    },
    "conveyor@4,4,0": {
      config: { direction: "towards" },
      position: { x: 4, y: 4, z: 0 },
      type: "conveyor",
    },
    "conveyor@4,5,0": {
      config: { direction: "towards" },
      position: { x: 4, y: 5, z: 0 },
      type: "conveyor",
    },
    "conveyor@5,5,0": {
      config: { direction: "right" },
      position: { x: 5, y: 5, z: 0 },
      type: "conveyor",
    },
    "conveyor@6,5,0": {
      config: { direction: "right" },
      position: { x: 6, y: 5, z: 0 },
      type: "conveyor",
    },
    "conveyor@7,5,0": {
      config: { direction: "right" },
      position: { x: 7, y: 5, z: 0 },
      type: "conveyor",
    },
    "conveyor@8,5,0": {
      config: { direction: "right" },
      position: { x: 8, y: 5, z: 0 },
      type: "conveyor",
    },
    "conveyor@9,5,0": {
      config: { direction: "right" },
      position: { x: 9, y: 5, z: 0 },
      type: "conveyor",
    },
    "deadlyBlock@0,0,2": {
      config: { style: "toaster" },
      position: { x: 0, y: 0, z: 2 },
      type: "deadlyBlock",
    },
    "deadlyBlock@11,4,2": {
      config: { style: "toaster" },
      position: { x: 11, y: 4, z: 2 },
      type: "deadlyBlock",
    },
    "deadlyBlock@11,5,2": {
      config: { style: "toaster" },
      position: { x: 11, y: 5, z: 2 },
      type: "deadlyBlock",
    },
    "deadlyBlock@4,0,2": {
      config: { style: "toaster" },
      position: { x: 4, y: 0, z: 2 },
      type: "deadlyBlock",
    },
    "deadlyBlock@5,5,2": {
      config: { style: "toaster" },
      position: { x: 5, y: 5, z: 2 },
      type: "deadlyBlock",
    },
    "deadlyBlock@6,5,2": {
      config: { style: "toaster" },
      position: { x: 6, y: 5, z: 2 },
      type: "deadlyBlock",
    },
    "deadlyBlock@7,5,2": {
      config: { style: "toaster" },
      position: { x: 7, y: 5, z: 2 },
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
  },
  planet: "bookworld",
  size: { x: 12, y: 6 },
  walls: {
    away: [
      "book",
      "person",
      "book",
      "book",
      "person",
      "book",
      "book",
      "person",
      "book",
      "book",
      "person",
      "book",
    ],
    left: ["book", "book", "none", "none", "book", "book"],
  },
}) satisfies RoomJson<"bookworld", OriginalCampaignRoomId>;
