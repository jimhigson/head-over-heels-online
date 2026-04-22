import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "magenta", shade: "basic" },
  id: "blacktooth39",
  items: {
    d: {
      config: {
        direction: "away",
        meta: { toSubRoom: "left" },
        toRoom: "blacktooth40fish",
      },
      position: { x: 2, y: 6, z: 5 },
      type: "door",
    },
    d1: {
      config: { direction: "left", toRoom: "blacktooth41" },
      position: { x: 6, y: 2, z: 5 },
      type: "door",
    },
    f: {
      config: {
        floorType: "standable",
        scenery: "blacktooth",
        times: { x: 6, y: 6 },
      },
      position: { x: 0, y: 0, z: 0 },
      type: "floor",
    },
    l: {
      config: { bottom: 0, top: 11 },
      position: { x: 2, y: 0, z: 0 },
      type: "lift",
    },
    m: {
      config: {
        activated: "on",
        movement: "patrol-randomly-diagonal",
        which: "dalek",
      },
      position: { x: 5, y: 5, z: 11 },
      type: "monster",
    },
    pr: {
      config: { style: "cube" },
      position: { x: 1, y: 1, z: 0 },
      type: "portableBlock",
    },
    pr1: {
      config: { style: "cube" },
      position: { x: 1, y: 4, z: 0 },
      type: "portableBlock",
    },
    pr2: {
      config: { style: "cube" },
      position: { x: 4, y: 1, z: 0 },
      type: "portableBlock",
    },
    pr3: {
      config: { style: "cube" },
      position: { x: 4, y: 4, z: 0 },
      type: "portableBlock",
    },
    w: {
      config: { direction: "right", times: { y: 6 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    w1: {
      config: { direction: "towards", times: { x: 6 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    w2: {
      config: { direction: "away", tiles: ["plain", "shield"] },
      position: { x: 0, y: 6, z: 0 },
      type: "wall",
    },
    w3: {
      config: { direction: "away", tiles: ["shield", "plain"] },
      position: { x: 4, y: 6, z: 0 },
      type: "wall",
    },
    w4: {
      config: { direction: "left", tiles: ["plain", "shield"] },
      position: { x: 6, y: 0, z: 0 },
      type: "wall",
    },
    w5: {
      config: { direction: "left", tiles: ["shield", "plain"] },
      position: { x: 6, y: 4, z: 0 },
      type: "wall",
    },
  },
  planet: "blacktooth",
  roomAbove: "blacktooth38",
}) satisfies RoomJson<OriginalCampaignRoomId, string, "blacktooth">;
