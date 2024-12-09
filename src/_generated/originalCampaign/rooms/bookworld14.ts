import { inferRoomJson, type RoomJson } from "@/model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "basic" },
  floor: "bookworld",
  floorSkip: [],
  id: "bookworld14",
  items: {
    "baddie@3,3,0:Z1rA6U9": {
      config: { activated: true, which: "dalek" },
      position: { x: 3, y: 3, z: 0 },
      type: "baddie",
    },
    "baddie@4,4,0:Z1rA6U9": {
      config: { activated: true, which: "dalek" },
      position: { x: 4, y: 4, z: 0 },
      type: "baddie",
    },
    "barrier@6,3,0:fbso8": {
      config: { axis: "y", disappearing: false },
      position: { x: 6, y: 3, z: 0 },
      type: "barrier",
    },
    "barrier@6,3,1:fbso8": {
      config: { axis: "y", disappearing: false },
      position: { x: 6, y: 3, z: 1 },
      type: "barrier",
    },
    "barrier@6,3,2:fbso8": {
      config: { axis: "y", disappearing: false },
      position: { x: 6, y: 3, z: 2 },
      type: "barrier",
    },
    "barrier@6,4,0:fbso8": {
      config: { axis: "y", disappearing: false },
      position: { x: 6, y: 4, z: 0 },
      type: "barrier",
    },
    "barrier@6,4,1:fbso8": {
      config: { axis: "y", disappearing: false },
      position: { x: 6, y: 4, z: 1 },
      type: "barrier",
    },
    "barrier@6,4,2:fbso8": {
      config: { axis: "y", disappearing: false },
      position: { x: 6, y: 4, z: 2 },
      type: "barrier",
    },
    "barrier@6,5,0:fbso8": {
      config: { axis: "y", disappearing: false },
      position: { x: 6, y: 5, z: 0 },
      type: "barrier",
    },
    "barrier@6,5,1:fbso8": {
      config: { axis: "y", disappearing: false },
      position: { x: 6, y: 5, z: 1 },
      type: "barrier",
    },
    "barrier@6,5,2:fbso8": {
      config: { axis: "y", disappearing: false },
      position: { x: 6, y: 5, z: 2 },
      type: "barrier",
    },
    "barrier@6,6,0:fbso8": {
      config: { axis: "y", disappearing: false },
      position: { x: 6, y: 6, z: 0 },
      type: "barrier",
    },
    "barrier@6,6,1:fbso8": {
      config: { axis: "y", disappearing: false },
      position: { x: 6, y: 6, z: 1 },
      type: "barrier",
    },
    "barrier@6,6,2:fbso8": {
      config: { axis: "y", disappearing: false },
      position: { x: 6, y: 6, z: 2 },
      type: "barrier",
    },
    "barrier@7,2,0:k1F7u": {
      config: { axis: "x", disappearing: false },
      position: { x: 7, y: 2, z: 0 },
      type: "barrier",
    },
    "barrier@7,2,1:k1F7u": {
      config: { axis: "x", disappearing: false },
      position: { x: 7, y: 2, z: 1 },
      type: "barrier",
    },
    "barrier@7,2,2:k1F7u": {
      config: { axis: "x", disappearing: false },
      position: { x: 7, y: 2, z: 2 },
      type: "barrier",
    },
    "deadlyBlock@3,4,0:2u1uHB": {
      config: { style: "toaster" },
      position: { x: 3, y: 4, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@4,3,0:2u1uHB": {
      config: { style: "toaster" },
      position: { x: 4, y: 3, z: 0 },
      type: "deadlyBlock",
    },
    "door@3,0,0:JfaS2": {
      config: { direction: "towards", toRoom: "bookworld15" },
      position: { x: 3, y: 0, z: 0 },
      type: "door",
    },
    "door@8,3,0:Z1lPU4i": {
      config: { direction: "left", toRoom: "bookworld13" },
      position: { x: 8, y: 3, z: 0 },
      type: "door",
    },
  },
  planet: "bookworld",
  size: { x: 8, y: 8 },
  walls: {
    away: ["book", "book", "person", "book", "book", "person", "book", "book"],
    left: ["book", "book", "person", "none", "none", "person", "book", "book"],
  },
}) satisfies RoomJson<"bookworld", OriginalCampaignRoomId>;
