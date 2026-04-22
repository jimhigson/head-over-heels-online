import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "magenta", shade: "basic" },
  id: "blacktooth38",
  items: {
    b: {
      config: { style: "organic", times: { x: 2 } },
      position: { x: 2, y: 0, z: 0 },
      type: "block",
    },
    b1: {
      config: { style: "artificial", times: { x: 5 } },
      position: { x: 0, y: 5, z: 0 },
      type: "block",
    },
    br: {
      config: { axis: "x", times: { x: 5 } },
      position: { x: 0, y: 4.5, z: 1 },
      type: "barrier",
    },
    d: {
      config: { direction: "towards", toRoom: "blacktooth37" },
      position: { x: 2, y: 0, z: 1 },
      type: "door",
    },
    f: {
      config: { floorType: "none", times: { x: 6, y: 6 } },
      position: { x: 0, y: 0, z: 0 },
      type: "floor",
    },
    m: {
      config: {
        activated: "on",
        movement: "patrol-randomly-diagonal",
        which: "dalek",
      },
      position: { x: 0, y: 5, z: 10 },
      type: "monster",
    },
    w: {
      config: { direction: "right", times: { y: 6 } },
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
        tiles: ["bars", "bars", "bars", "bars", "bars", "bars"],
      },
      position: { x: 0, y: 6, z: 0 },
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
        tiles: ["bars", "bars", "bars", "bars", "bars", "bars"],
      },
      position: { x: 6, y: 0, z: 0 },
      type: "wall",
    },
  },
  planet: "jail",
  roomBelow: "blacktooth39",
}) satisfies RoomJson<OriginalCampaignRoomId, string, "jail">;
