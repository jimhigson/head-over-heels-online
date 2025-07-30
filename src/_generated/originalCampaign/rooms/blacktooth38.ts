import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "magenta", shade: "basic" },
  id: "blacktooth38",
  items: {
    "block@2,0,0": {
      config: { style: "organic", times: { x: 2 } },
      position: { x: 2, y: 0, z: 0 },
      type: "block",
    },
    "door@2,0,1": {
      config: { direction: "towards", toRoom: "blacktooth37" },
      position: { x: 2, y: 0, z: 1 },
      type: "door",
    },
    extraBarrier: {
      config: { axis: "x", times: { x: 5 } },
      position: { x: 0, y: 4.5, z: 1 },
      type: "barrier",
    },
    extraBlock: {
      config: { style: "artificial", times: { x: 5 } },
      position: { x: 0, y: 5, z: 0 },
      type: "block",
    },
    extraMonster: {
      config: {
        activated: "on",
        movement: "patrol-randomly-diagonal",
        which: "dalek",
      },
      position: { x: 0, y: 5, z: 10 },
      type: "monster",
    },
    "floor@0,0,0": {
      config: { floorType: "none", times: { x: 6, y: 6 } },
      position: { x: 0, y: 0, z: 0 },
      type: "floor",
    },
    "wall(right)@0,0,0": {
      config: { direction: "right", times: { y: 6 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall(towards)@0,0,0": {
      config: { direction: "towards", times: { x: 2 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@0,6,0": {
      config: {
        direction: "away",
        tiles: ["bars", "bars", "bars", "bars", "bars", "bars"],
      },
      position: { x: 0, y: 6, z: 0 },
      type: "wall",
    },
    "wall@4,0,0": {
      config: { direction: "towards", times: { x: 2 } },
      position: { x: 4, y: 0, z: 0 },
      type: "wall",
    },
    "wall@6,0,0": {
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
