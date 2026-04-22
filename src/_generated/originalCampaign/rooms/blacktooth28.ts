import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "cyan", shade: "dimmed" },
  id: "blacktooth28",
  items: {
    b: {
      config: { style: "organic", times: { x: 3, y: 3 } },
      position: { x: 5, y: 0, z: 0 },
      type: "block",
    },
    b1: {
      config: { style: "organic", times: { y: 5 } },
      position: { x: 7, y: 3, z: 0 },
      type: "block",
    },
    b2: {
      config: { style: "organic" },
      position: { x: 3, y: 0, z: 0 },
      type: "block",
    },
    ch: { config: {}, position: { x: 3, y: 4, z: 0 }, type: "charles" },
    co: {
      config: { direction: "right", times: { x: 3 } },
      position: { x: 0, y: 7, z: 2 },
      type: "conveyor",
    },
    d: {
      config: { direction: "left", toRoom: "blacktooth27fish" },
      position: { x: 8, y: 3, z: 2 },
      type: "door",
    },
    f: {
      config: { floorType: "deadly", times: { x: 8, y: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "floor",
    },
    j: { config: {}, position: { x: 6, y: 1, z: 1 }, type: "joystick" },
    pi: {
      config: { gives: "bag" },
      position: { x: 2, y: 7, z: 7 },
      type: "pickup",
    },
    pi1: {
      config: { gives: "scroll", page: "bag", source: "manual" },
      position: { x: 3, y: 0, z: 1 },
      type: "pickup",
    },
    pr: {
      config: { style: "cube" },
      position: { x: 1, y: 7, z: 0 },
      type: "portableBlock",
    },
    w: {
      config: { direction: "right", times: { y: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    w1: {
      config: { direction: "towards", times: { x: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    w2: {
      config: {
        direction: "away",
        tiles: [
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
      position: { x: 0, y: 8, z: 0 },
      type: "wall",
    },
    w3: {
      config: { direction: "left", tiles: ["plain", "shield", "plain"] },
      position: { x: 8, y: 0, z: 0 },
      type: "wall",
    },
    w4: {
      config: { direction: "left", tiles: ["plain", "shield", "plain"] },
      position: { x: 8, y: 5, z: 0 },
      type: "wall",
    },
  },
  planet: "blacktooth",
}) satisfies RoomJson<OriginalCampaignRoomId, string, "blacktooth">;
