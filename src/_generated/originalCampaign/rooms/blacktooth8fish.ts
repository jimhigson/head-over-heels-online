import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "cyan", shade: "basic" },
  floor: "blacktooth",
  id: "blacktooth8fish",
  items: {
    "block@3,0,0": {
      config: { style: "tower", times: { z: 4 } },
      position: { x: 3, y: 0, z: 0 },
      type: "block",
    },
    "door@0,3,0": {
      config: { direction: "right", toRoom: "blacktooth9" },
      position: { x: 0, y: 3, z: 0 },
      type: "door",
    },
    "door@1,8,2": {
      config: { direction: "away", toRoom: "blacktooth7" },
      position: { x: 1, y: 8, z: 2 },
      type: "door",
    },
    "monster@3,3,1": {
      config: {
        activated: "on",
        movement: "patrol-randomly-diagonal",
        which: "dalek",
      },
      position: { x: 3, y: 3, z: 1 },
      type: "monster",
    },
    "pickup@3,0,3": {
      config: { gives: "reincarnation" },
      position: { x: 3, y: 0, z: 4 },
      type: "pickup",
    },
    scroll: {
      config: { gives: "scroll", page: "reincarnationFish" },
      position: { x: 3, y: 7, z: 0 },
      type: "pickup",
    },
    "spring@3,3,0": {
      config: {},
      position: { x: 3, y: 3, z: 0 },
      type: "spring",
    },
    "wall@0,0,0:2scjwz": {
      config: { direction: "right", tiles: [], times: { y: 3 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@0,0,0:Z1XoEu0": {
      config: { direction: "towards", tiles: [], times: { x: 4 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@0,5,0": {
      config: { direction: "right", tiles: [], times: { y: 3 } },
      position: { x: 0, y: 5, z: 0 },
      type: "wall",
    },
    "wall@0,8,0": {
      config: { direction: "away", tiles: ["shield"] },
      position: { x: 0, y: 8, z: 0 },
      type: "wall",
    },
    "wall@3,8,0": {
      config: { direction: "away", tiles: ["shield"] },
      position: { x: 3, y: 8, z: 0 },
      type: "wall",
    },
    "wall@4,0,0": {
      config: {
        direction: "left",
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
        times: { y: 8 },
      },
      position: { x: 4, y: 0, z: 0 },
      type: "wall",
    },
  },
  planet: "blacktooth",
  size: { x: 4, y: 8 },
}) satisfies RoomJson<OriginalCampaignRoomId, string, "blacktooth">;
