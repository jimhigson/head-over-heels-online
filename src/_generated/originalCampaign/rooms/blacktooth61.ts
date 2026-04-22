import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "magenta", shade: "basic" },
  id: "blacktooth61",
  items: {
    d: {
      config: { direction: "towards", toRoom: "blacktooth55" },
      position: { x: 1, y: 0, z: 0 },
      type: "door",
    },
    d1: {
      config: {
        direction: "away",
        meta: { toSubRoom: "left" },
        toRoom: "blacktooth62fish",
      },
      position: { x: 1, y: 8, z: 5 },
      type: "door",
    },
    f: {
      config: {
        floorType: "standable",
        scenery: "bookworld",
        times: { x: 4, y: 8 },
      },
      position: { x: 0, y: 0, z: 0 },
      type: "floor",
    },
    h: {
      config: { times: { x: 3 } },
      position: { x: 0, y: 7, z: 0 },
      type: "hushPuppy",
    },
    h1: {
      config: { times: { x: 2 } },
      position: { x: 1, y: 7, z: 1 },
      type: "hushPuppy",
    },
    h2: { config: {}, position: { x: 2, y: 7, z: 2 }, type: "hushPuppy" },
    m: {
      config: {
        activated: "on",
        movement: "patrol-randomly-diagonal",
        which: "dalek",
      },
      position: { x: 3, y: 7, z: 1 },
      type: "monster",
    },
    pr: {
      config: { style: "drum" },
      position: { x: 3, y: 7, z: 0 },
      type: "portableBlock",
    },
    w: {
      config: { direction: "right", times: { y: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    w1: {
      config: { direction: "towards" },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    w2: {
      config: { direction: "away", tiles: ["bars"] },
      position: { x: 0, y: 8, z: 0 },
      type: "wall",
    },
    w3: {
      config: { direction: "towards" },
      position: { x: 3, y: 0, z: 0 },
      type: "wall",
    },
    w4: {
      config: { direction: "away", tiles: ["bars"] },
      position: { x: 3, y: 8, z: 0 },
      type: "wall",
    },
    w5: {
      config: {
        direction: "left",
        tiles: ["bars", "bars", "bars", "bars", "bars", "bars", "bars", "bars"],
      },
      position: { x: 4, y: 0, z: 0 },
      type: "wall",
    },
  },
  planet: "jail",
}) satisfies RoomJson<OriginalCampaignRoomId, string, "jail">;
