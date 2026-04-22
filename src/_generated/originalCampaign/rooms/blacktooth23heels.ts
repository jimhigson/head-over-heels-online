import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "cyan", shade: "basic" },
  id: "blacktooth23heels",
  items: {
    br: {
      config: { axis: "y", times: { y: 8, z: 3 } },
      position: { x: 4, y: 0, z: 0 },
      type: "barrier",
    },
    co: {
      config: { direction: "away", times: { y: 6 } },
      position: { x: 0, y: 1, z: 0 },
      type: "conveyor",
    },
    d: {
      config: { direction: "left", toRoom: "blacktooth1head" },
      position: { x: 8, y: 3, z: 0 },
      type: "door",
    },
    db: {
      config: { style: "volcano" },
      position: { x: 0, y: 7, z: 0 },
      type: "deadlyBlock",
    },
    f: {
      config: {
        floorType: "standable",
        scenery: "jail",
        times: { x: 8, y: 8 },
      },
      position: { x: 0, y: 0, z: 0 },
      type: "floor",
    },
    heels: {
      config: { which: "heels" },
      position: { x: 3, y: 3.5, z: 0 },
      type: "player",
    },
    pi: {
      config: { gives: "scroll", page: "head", source: "manual" },
      position: { x: 7, y: 1, z: 0 },
      type: "pickup",
    },
    pi1: {
      config: { gives: "scroll", page: "heels", source: "manual" },
      position: { x: 3, y: 7, z: 0 },
      type: "pickup",
    },
    t: {
      config: { toRoom: "blacktooth24" },
      position: { x: 0, y: 0, z: 0 },
      type: "teleporter",
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
        tiles: ["bars", "bars", "bars", "bars", "bars", "bars", "bars", "bars"],
      },
      position: { x: 0, y: 8, z: 0 },
      type: "wall",
    },
    w3: {
      config: { direction: "left", tiles: ["bars", "bars", "bars"] },
      position: { x: 8, y: 0, z: 0 },
      type: "wall",
    },
    w4: {
      config: { direction: "left", tiles: ["bars", "bars", "bars"] },
      position: { x: 8, y: 5, z: 0 },
      type: "wall",
    },
  },
  planet: "jail",
}) satisfies RoomJson<OriginalCampaignRoomId, string, "jail">;
