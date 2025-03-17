import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "basic" },
  floor: "blacktooth",
  id: "blacktooth87crown",
  items: {
    "deadlyBlock@6,1,0": {
      config: { style: "volcano", times: { x: 2 } },
      position: { x: 6, y: 1, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@6,2,1": {
      config: { style: "volcano" },
      position: { x: 6, y: 2, z: 1 },
      type: "deadlyBlock",
    },
    "deadlyBlock@6,3,0": {
      config: { style: "volcano" },
      position: { x: 6, y: 3, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@6,4,1": {
      config: { style: "volcano" },
      position: { x: 6, y: 4, z: 1 },
      type: "deadlyBlock",
    },
    "deadlyBlock@6,5,0": {
      config: { style: "volcano", times: { x: 2 } },
      position: { x: 6, y: 5, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@7,3,1": {
      config: { style: "volcano" },
      position: { x: 7, y: 3, z: 2 },
      type: "deadlyBlock",
    },
    "door@3,8,1": {
      config: { direction: "away", toRoom: "blacktooth86" },
      position: { x: 3, y: 8, z: 1 },
      type: "door",
    },
    "monster@3,3,0": {
      config: {
        activated: true,
        movement: "patrol-randomly-diagonal",
        which: "dalek",
      },
      position: { x: 3, y: 3, z: 0 },
      type: "monster",
    },
    "monster@6,3,1": {
      config: {
        activated: true,
        movement: "towards-when-in-square-xy8",
        which: "emperor",
      },
      position: { x: 6, y: 3, z: 1 },
      type: "monster",
    },
    "pickup@7,3,0": {
      config: { gives: "crown", planet: "blacktooth" },
      position: { x: 7, y: 3, z: 0 },
      type: "pickup",
    },
    "wall@0,0,0:2sckOl": {
      config: { direction: "right", tiles: [], times: { y: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@0,0,0:Z1XoDrY": {
      config: { direction: "towards", tiles: [], times: { x: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@0,8,0": {
      config: {
        direction: "away",
        tiles: ["plain", "shield", "plain"],
        times: { x: 3 },
      },
      position: { x: 0, y: 8, z: 0 },
      type: "wall",
    },
    "wall@5,8,0": {
      config: {
        direction: "away",
        tiles: ["plain", "shield", "plain"],
        times: { x: 3 },
      },
      position: { x: 5, y: 8, z: 0 },
      type: "wall",
    },
    "wall@8,0,0": {
      config: {
        direction: "left",
        tiles: [
          "plain",
          "shield",
          "armour",
          "plain",
          "armour",
          "shield",
          "plain",
          "plain",
        ],
        times: { y: 8 },
      },
      position: { x: 8, y: 0, z: 0 },
      type: "wall",
    },
  },
  planet: "blacktooth",
  size: { x: 8, y: 8 },
}) satisfies RoomJson<OriginalCampaignRoomId, string, "blacktooth">;
