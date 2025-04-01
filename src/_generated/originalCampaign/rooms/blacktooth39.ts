import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "magenta", shade: "basic" },
  floor: "blacktooth",
  id: "blacktooth39",
  items: {
    "door@2,6,5": {
      config: {
        direction: "away",
        meta: { toSubRoom: "left" },
        toRoom: "blacktooth40fish",
      },
      position: { x: 2, y: 6, z: 5 },
      type: "door",
    },
    "door@6,2,5": {
      config: { direction: "left", toRoom: "blacktooth41" },
      position: { x: 6, y: 2, z: 5 },
      type: "door",
    },
    "lift@2,0,0": {
      config: { bottom: 0, top: 11 },
      position: { x: 2, y: 0, z: 0 },
      type: "lift",
    },
    "monster@3,3,0": {
      config: {
        activated: "on",
        movement: "patrol-randomly-diagonal",
        which: "dalek",
      },
      position: { x: 5, y: 5, z: 11 },
      type: "monster",
    },
    "portableBlock@1,1,0": {
      config: { style: "cube" },
      position: { x: 1, y: 1, z: 0 },
      type: "portableBlock",
    },
    "portableBlock@1,4,0": {
      config: { style: "cube" },
      position: { x: 1, y: 4, z: 0 },
      type: "portableBlock",
    },
    "portableBlock@4,1,0": {
      config: { style: "cube" },
      position: { x: 4, y: 1, z: 0 },
      type: "portableBlock",
    },
    "portableBlock@4,4,0": {
      config: { style: "cube" },
      position: { x: 4, y: 4, z: 0 },
      type: "portableBlock",
    },
    "wall@0,0,0:2sckiP": {
      config: { direction: "right", tiles: [], times: { y: 6 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@0,0,0:Z1XoDXu": {
      config: { direction: "towards", tiles: [], times: { x: 6 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@0,6,0": {
      config: {
        direction: "away",
        tiles: ["plain", "shield"],
        times: { x: 2 },
      },
      position: { x: 0, y: 6, z: 0 },
      type: "wall",
    },
    "wall@4,6,0": {
      config: {
        direction: "away",
        tiles: ["shield", "plain"],
        times: { x: 2 },
      },
      position: { x: 4, y: 6, z: 0 },
      type: "wall",
    },
    "wall@6,0,0": {
      config: {
        direction: "left",
        tiles: ["plain", "shield"],
        times: { y: 2 },
      },
      position: { x: 6, y: 0, z: 0 },
      type: "wall",
    },
    "wall@6,4,0": {
      config: {
        direction: "left",
        tiles: ["shield", "plain"],
        times: { y: 2 },
      },
      position: { x: 6, y: 4, z: 0 },
      type: "wall",
    },
  },
  planet: "blacktooth",
  roomAbove: "blacktooth38",
  size: { x: 6, y: 6 },
}) satisfies RoomJson<OriginalCampaignRoomId, string, "blacktooth">;
