import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "magenta", shade: "basic" },
  floor: "none",
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
      isExtra: true,
      position: { x: 0, y: 4.5, z: 1 },
      type: "barrier",
    },
    extraBlock: {
      config: { style: "artificial", times: { x: 5 } },
      isExtra: true,
      position: { x: 0, y: 5, z: 0 },
      type: "block",
    },
    extraMonster: {
      config: {
        activated: true,
        movement: "patrol-randomly-diagonal",
        which: "dalek",
      },
      isExtra: true,
      position: { x: 0, y: 5, z: 10 },
      type: "monster",
    },
    "wall@0,0,0:2sckiP": {
      config: { direction: "right", tiles: [], times: { y: 6 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@0,0,0:Z1XoF0v": {
      config: { direction: "towards", tiles: [], times: { x: 2 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@0,6,0": {
      config: {
        direction: "away",
        tiles: ["bars", "bars", "bars", "bars", "bars", "bars"],
        times: { x: 6 },
      },
      position: { x: 0, y: 6, z: 0 },
      type: "wall",
    },
    "wall@4,0,0": {
      config: { direction: "towards", tiles: [], times: { x: 2 } },
      position: { x: 4, y: 0, z: 0 },
      type: "wall",
    },
    "wall@6,0,0": {
      config: {
        direction: "left",
        tiles: ["bars", "bars", "bars", "bars", "bars", "bars"],
        times: { y: 6 },
      },
      position: { x: 6, y: 0, z: 0 },
      type: "wall",
    },
  },
  planet: "jail",
  roomBelow: "blacktooth39",
  size: { x: 6, y: 6 },
}) satisfies RoomJson<"jail", OriginalCampaignRoomId>;
