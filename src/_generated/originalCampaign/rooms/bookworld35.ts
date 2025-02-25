import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "cyan", shade: "basic" },
  floor: "bookworld",
  id: "bookworld35",
  items: {
    "block@1,7,3": {
      config: { style: "book", times: { x: 3 } },
      position: { x: 1, y: 7, z: 3 },
      type: "block",
    },
    "block@5,1,0": {
      config: { style: "organic", times: { x: 3 } },
      position: { x: 5, y: 1, z: 0 },
      type: "block",
    },
    "block@5,7,4": {
      config: { style: "book" },
      position: { x: 5, y: 7, z: 4 },
      type: "block",
    },
    "block@6,0,0": {
      config: { style: "organic" },
      position: { x: 6, y: 0, z: 0 },
      type: "block",
    },
    "block@6,2,0": {
      config: { style: "organic" },
      position: { x: 6, y: 2, z: 0 },
      type: "block",
    },
    "charles@5,7,5": {
      config: {},
      position: { x: 5, y: 7, z: 5 },
      type: "charles",
    },
    "door@0,3,5": {
      config: { direction: "right", toRoom: "bookworld36" },
      position: { x: 0, y: 3, z: 5 },
      type: "door",
    },
    "door@8,3,0": {
      config: { direction: "left", toRoom: "bookworld33" },
      position: { x: 8, y: 3, z: 0 },
      type: "door",
    },
    "joystick@5,1,1": {
      config: { controls: ["charles@5,7,5"] },
      position: { x: 5, y: 1, z: 1 },
      type: "joystick",
    },
    "joystick@6,0,1": {
      config: { controls: ["charles@5,7,5"] },
      position: { x: 6, y: 0, z: 1 },
      type: "joystick",
    },
    "joystick@6,2,1": {
      config: { controls: ["charles@5,7,5"] },
      position: { x: 6, y: 2, z: 1 },
      type: "joystick",
    },
    "joystick@7,1,1": {
      config: { controls: ["charles@5,7,5"] },
      position: { x: 7, y: 1, z: 1 },
      type: "joystick",
    },
    "spring@1,7,4": {
      config: {},
      position: { x: 1, y: 7, z: 4 },
      type: "spring",
    },
    "wall@0,0,0:2scjwz": {
      config: { direction: "right", tiles: [], times: { y: 3 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@0,0,0:Z1XoDrY": {
      config: { direction: "towards", tiles: [], times: { x: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@0,5,0": {
      config: { direction: "right", tiles: [], times: { y: 3 } },
      position: { x: 0, y: 5, z: 0 },
      type: "wall",
    },
    "wall@0,8,0": {
      config: {
        direction: "away",
        tiles: [
          "book",
          "book",
          "cowboy",
          "book",
          "book",
          "cowboy",
          "book",
          "book",
        ],
        times: { x: 8 },
      },
      position: { x: 0, y: 8, z: 0 },
      type: "wall",
    },
    "wall@8,0,0": {
      config: {
        direction: "left",
        tiles: ["book", "book", "cowboy"],
        times: { y: 3 },
      },
      position: { x: 8, y: 0, z: 0 },
      type: "wall",
    },
    "wall@8,5,0": {
      config: {
        direction: "left",
        tiles: ["cowboy", "book", "book"],
        times: { y: 3 },
      },
      position: { x: 8, y: 5, z: 0 },
      type: "wall",
    },
  },
  planet: "bookworld",
  size: { x: 8, y: 8 },
}) satisfies RoomJson<"bookworld", OriginalCampaignRoomId>;
