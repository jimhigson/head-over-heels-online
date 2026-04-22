import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "yellow", shade: "basic" },
  id: "blacktooth1head",
  items: {
    br: {
      config: { axis: "y" },
      position: { x: 5, y: 0, z: 0 },
      type: "barrier",
    },
    br1: {
      config: { axis: "y" },
      position: { x: 5, y: 0, z: 2 },
      type: "barrier",
    },
    br2: {
      config: { axis: "y" },
      position: { x: 5, y: 0, z: 4 },
      type: "barrier",
    },
    br3: {
      config: { axis: "y" },
      position: { x: 5, y: 0, z: 6 },
      type: "barrier",
    },
    d: {
      config: { direction: "right", toRoom: "blacktooth23heels" },
      position: { x: 0, y: 3, z: 0 },
      type: "door",
    },
    d1: {
      config: { direction: "left", toRoom: "blacktooth0switches" },
      position: { x: 6, y: 3, z: 0 },
      type: "door",
    },
    f: {
      config: {
        floorType: "standable",
        scenery: "jail",
        times: { x: 6, y: 8 },
      },
      position: { x: 0, y: 0, z: 0 },
      type: "floor",
    },
    head: {
      config: { which: "head" },
      position: { x: 2.5, y: 2.5, z: 0 },
      type: "player",
    },
    pi: {
      config: { gives: "extra-life" },
      position: { x: 5, y: 0, z: 7 },
      type: "pickup",
    },
    pi1: {
      config: {
        gives: "scroll",
        page: "cuddlyStuffedWhiteRabbits",
        source: "manual",
      },
      position: { x: 3, y: 0, z: 0 },
      type: "pickup",
    },
    pi2: {
      config: { gives: "scroll", page: "theGame", source: "manual" },
      position: { x: 3, y: 7, z: 0 },
      type: "pickup",
    },
    t: {
      config: { toRoom: "blacktooth2" },
      position: { x: 5, y: 7, z: 0 },
      type: "teleporter",
    },
    w: {
      config: { direction: "right", times: { y: 3 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    w1: {
      config: { direction: "towards", times: { x: 6 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    w2: {
      config: { direction: "right", times: { y: 3 } },
      position: { x: 0, y: 5, z: 0 },
      type: "wall",
    },
    w3: {
      config: {
        direction: "away",
        tiles: ["bars", "bars", "bars", "bars", "bars", "bars"],
      },
      position: { x: 0, y: 8, z: 0 },
      type: "wall",
    },
    w4: {
      config: { direction: "left", tiles: ["bars", "bars", "bars"] },
      position: { x: 6, y: 5, z: 0 },
      type: "wall",
    },
    w5: {
      config: { direction: "left", tiles: ["bars", "bars", "bars"] },
      position: { x: 6, y: 0, z: 0 },
      type: "wall",
    },
  },
  meta: {
    nonContiguousRelationship: {
      gridOffset: { x: 4, y: 7, z: 0 },
      with: { room: "blacktooth9" },
    },
  },
  planet: "jail",
}) satisfies RoomJson<OriginalCampaignRoomId, string, "jail">;
