import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "cyan", shade: "basic" },
  id: "blacktooth33",
  items: {
    d: {
      config: { direction: "towards", toRoom: "blacktooth32" },
      position: { x: 3, y: 0, z: 0 },
      type: "door",
    },
    f: {
      config: {
        floorType: "standable",
        scenery: "blacktooth",
        times: { x: 8, y: 8 },
      },
      position: { x: 0, y: 0, z: 0 },
      type: "floor",
    },
    l: {
      config: { bottom: 0, top: 11 },
      position: { x: 7, y: 7, z: 0 },
      type: "lift",
    },
    m: {
      config: {
        activated: "on",
        movement: "towards-on-shortest-axis-xy4",
        startDirection: "towards",
        which: "cyberman",
      },
      position: { x: 0, y: 3, z: 0 },
      type: "monster",
    },
    m1: {
      config: {
        activated: "on",
        movement: "patrol-randomly-diagonal",
        which: "dalek",
      },
      position: { x: 7, y: 4, z: 0 },
      type: "monster",
    },
    pi: {
      config: { gives: "jumps" },
      position: { x: 0, y: 7, z: 0 },
      type: "pickup",
    },
    w: {
      config: { direction: "right", times: { y: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    w1: {
      config: { direction: "towards", times: { x: 3 } },
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
      config: { direction: "towards", times: { x: 3 } },
      position: { x: 5, y: 0, z: 0 },
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
      position: { x: 8, y: 0, z: 0 },
      type: "wall",
    },
  },
  planet: "blacktooth",
  roomAbove: "blacktooth34",
}) satisfies RoomJson<OriginalCampaignRoomId, string, "blacktooth">;
