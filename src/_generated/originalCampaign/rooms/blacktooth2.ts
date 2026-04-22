import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "cyan", shade: "basic" },
  id: "blacktooth2",
  items: {
    d: {
      config: { direction: "towards", toRoom: "blacktooth3" },
      position: { x: 2, y: 0, z: 0 },
      type: "door",
    },
    f: {
      config: {
        floorType: "standable",
        scenery: "blacktooth",
        times: { x: 6, y: 8 },
      },
      position: { x: 0, y: 0, z: 0 },
      type: "floor",
    },
    pi: {
      config: {
        gives: "scroll",
        page: "historyOfTheBlacktoothEmpire",
        source: "manual",
      },
      position: { x: 1, y: 2.5, z: 4 },
      type: "pickup",
    },
    pu: { config: {}, position: { x: 1, y: 1, z: 0 }, type: "pushableBlock" },
    pu1: { config: {}, position: { x: 1, y: 4, z: 0 }, type: "pushableBlock" },
    pu2: {
      config: {},
      position: { x: 1, y: 3.5, z: 1 },
      type: "pushableBlock",
    },
    pu3: {
      config: {},
      position: { x: 1, y: 1.5, z: 1 },
      type: "pushableBlock",
    },
    pu4: { config: {}, position: { x: 1, y: 2, z: 2 }, type: "pushableBlock" },
    pu5: { config: {}, position: { x: 1, y: 3, z: 2 }, type: "pushableBlock" },
    pu6: {
      config: {},
      position: { x: 1, y: 2.5, z: 3 },
      type: "pushableBlock",
    },
    t: {
      config: { toRoom: "blacktooth1head" },
      position: { x: 5, y: 7, z: 0 },
      type: "teleporter",
    },
    w: {
      config: { direction: "right", times: { y: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    w1: {
      config: { direction: "towards", times: { x: 2 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    w2: {
      config: {
        direction: "away",
        tiles: ["plain", "armour", "shield", "shield", "armour", "plain"],
      },
      position: { x: 0, y: 8, z: 0 },
      type: "wall",
    },
    w3: {
      config: { direction: "towards", times: { x: 2 } },
      position: { x: 4, y: 0, z: 0 },
      type: "wall",
    },
    w4: {
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
      position: { x: 6, y: 0, z: 0 },
      type: "wall",
    },
  },
  planet: "blacktooth",
}) satisfies RoomJson<OriginalCampaignRoomId, string, "blacktooth">;
