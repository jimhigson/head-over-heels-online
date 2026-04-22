import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "cyan", shade: "basic" },
  id: "blacktooth8fish",
  items: {
    b: {
      config: { style: "tower", times: { z: 4 } },
      position: { x: 3, y: 0, z: 0 },
      type: "block",
    },
    d: {
      config: { direction: "right", toRoom: "blacktooth9" },
      position: { x: 0, y: 3, z: 0 },
      type: "door",
    },
    d1: {
      config: { direction: "away", toRoom: "blacktooth7" },
      position: { x: 1, y: 8, z: 2 },
      type: "door",
    },
    f: {
      config: {
        floorType: "standable",
        scenery: "blacktooth",
        times: { x: 4, y: 8 },
      },
      position: { x: 0, y: 0, z: 0 },
      type: "floor",
    },
    m: {
      config: {
        activated: "on",
        movement: "patrol-randomly-diagonal",
        which: "dalek",
      },
      position: { x: 3, y: 3, z: 1 },
      type: "monster",
    },
    pi: {
      config: { gives: "reincarnation" },
      position: { x: 3, y: 0, z: 4 },
      type: "pickup",
    },
    pi1: {
      config: { gives: "scroll", page: "reincarnationFish", source: "manual" },
      position: { x: 3, y: 7, z: 0 },
      type: "pickup",
    },
    sg: { config: {}, position: { x: 3, y: 3, z: 0 }, type: "spring" },
    w: {
      config: { direction: "right", times: { y: 3 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    w1: {
      config: { direction: "towards", times: { x: 4 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    w2: {
      config: { direction: "right", times: { y: 3 } },
      position: { x: 0, y: 5, z: 0 },
      type: "wall",
    },
    w3: {
      config: { direction: "away", tiles: ["shield"] },
      position: { x: 0, y: 8, z: 0 },
      type: "wall",
    },
    w4: {
      config: { direction: "away", tiles: ["shield"] },
      position: { x: 3, y: 8, z: 0 },
      type: "wall",
    },
    w5: {
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
      },
      position: { x: 4, y: 0, z: 0 },
      type: "wall",
    },
  },
  planet: "blacktooth",
}) satisfies RoomJson<OriginalCampaignRoomId, string, "blacktooth">;
