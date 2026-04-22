import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "cyan", shade: "basic" },
  id: "blacktooth63",
  items: {
    b: {
      config: { style: "artificial", times: { y: 2 } },
      position: { x: 7, y: 0, z: 3 },
      type: "block",
    },
    b1: {
      config: {
        disappearing: { on: "stand" },
        style: "artificial",
        times: { y: 2 },
      },
      position: { x: 6, y: 0, z: 3 },
      type: "block",
    },
    d: {
      config: { direction: "right", toRoom: "blacktooth59" },
      position: { x: 0, y: 0, z: 0 },
      type: "door",
    },
    d1: {
      config: {
        direction: "left",
        meta: { toSubRoom: "right" },
        toRoom: "blacktooth62fish",
      },
      position: { x: 8, y: 0, z: 5 },
      type: "door",
    },
    f: {
      config: {
        floorType: "standable",
        scenery: "bookworld",
        times: { x: 8, y: 2 },
      },
      position: { x: 0, y: 0, z: 0 },
      type: "floor",
    },
    h: {
      config: { times: { y: 2 } },
      position: { x: 3, y: 0, z: 0 },
      type: "hushPuppy",
    },
    h1: {
      config: { times: { y: 2 } },
      position: { x: 4, y: 0, z: 1 },
      type: "hushPuppy",
    },
    h2: {
      config: { times: { y: 2 } },
      position: { x: 5, y: 0, z: 2 },
      type: "hushPuppy",
    },
    m: {
      config: {
        activated: "on",
        movement: "towards-analogue",
        which: "helicopterBug",
      },
      position: { x: 4, y: 1, z: 0 },
      type: "monster",
    },
    pi: {
      config: { gives: "jumps" },
      position: { x: 5, y: 1, z: 3 },
      type: "pickup",
    },
    w: {
      config: { direction: "towards", times: { x: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    w1: {
      config: {
        direction: "away",
        tiles: ["bars", "bars", "bars", "bars", "bars", "bars", "bars", "bars"],
      },
      position: { x: 0, y: 2, z: 0 },
      type: "wall",
    },
  },
  planet: "jail",
}) satisfies RoomJson<OriginalCampaignRoomId, string, "jail">;
