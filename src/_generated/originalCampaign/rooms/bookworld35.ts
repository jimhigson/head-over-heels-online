import { inferRoomJson, type RoomJson } from "@/model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "cyan", shade: "basic" },
  floor: "bookworld",
  floorSkip: [],
  id: "bookworld35",
  items: {
    "block@5,1,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 5, y: 1, z: 0 },
      type: "block",
    },
    "block@6,0,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 6, y: 0, z: 0 },
      type: "block",
    },
    "block@6,1,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 6, y: 1, z: 0 },
      type: "block",
    },
    "block@6,2,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 6, y: 2, z: 0 },
      type: "block",
    },
    "block@7,1,0:95uHj": {
      config: { disappearing: false, style: "organic" },
      position: { x: 7, y: 1, z: 0 },
      type: "block",
    },
    "book@1,7,3:Z213BvY": {
      config: { slider: false },
      position: { x: 1, y: 7, z: 3 },
      type: "book",
    },
    "book@2,7,3:Z213BvY": {
      config: { slider: false },
      position: { x: 2, y: 7, z: 3 },
      type: "book",
    },
    "book@3,7,3:Z213BvY": {
      config: { slider: false },
      position: { x: 3, y: 7, z: 3 },
      type: "book",
    },
    "book@5,7,4:Z213BvY": {
      config: { slider: false },
      position: { x: 5, y: 7, z: 4 },
      type: "book",
    },
    "charles@5,7,5:13y": {
      config: {},
      position: { x: 5, y: 7, z: 5 },
      type: "charles",
    },
    "door@0,3,5:286CzQ": {
      config: { direction: "right", toRoom: "bookworld36" },
      position: { x: 0, y: 3, z: 5 },
      type: "door",
    },
    "door@8,3,0:Z1lPE3x": {
      config: { direction: "left", toRoom: "bookworld33" },
      position: { x: 8, y: 3, z: 0 },
      type: "door",
    },
    "joystick@5,1,1:jsXbP": {
      config: { controls: ["charles@5,7,5:13y"] },
      position: { x: 5, y: 1, z: 1 },
      type: "joystick",
    },
    "joystick@6,0,1:jsXbP": {
      config: { controls: ["charles@5,7,5:13y"] },
      position: { x: 6, y: 0, z: 1 },
      type: "joystick",
    },
    "joystick@6,2,1:jsXbP": {
      config: { controls: ["charles@5,7,5:13y"] },
      position: { x: 6, y: 2, z: 1 },
      type: "joystick",
    },
    "joystick@7,1,1:jsXbP": {
      config: { controls: ["charles@5,7,5:13y"] },
      position: { x: 7, y: 1, z: 1 },
      type: "joystick",
    },
    "spring@1,7,4:13y": {
      config: {},
      position: { x: 1, y: 7, z: 4 },
      type: "spring",
    },
  },
  planet: "bookworld",
  size: { x: 8, y: 8 },
  walls: {
    away: ["book", "book", "person", "book", "book", "person", "book", "book"],
    left: ["book", "book", "person", "none", "none", "person", "book", "book"],
  },
}) satisfies RoomJson<"bookworld", OriginalCampaignRoomId>;
