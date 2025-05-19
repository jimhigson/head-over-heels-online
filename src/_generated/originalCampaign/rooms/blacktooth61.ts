import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "magenta", shade: "basic" },
  floor: "bookworld",
  id: "blacktooth61",
  items: {
    "door@1,0,0": {
      config: { direction: "towards", toRoom: "blacktooth55" },
      position: { x: 1, y: 0, z: 0 },
      type: "door",
    },
    "door@1,8,5": {
      config: {
        direction: "away",
        meta: { toSubRoom: "left" },
        toRoom: "blacktooth62fish",
      },
      position: { x: 1, y: 8, z: 5 },
      type: "door",
    },
    "hushPuppy@0,7,0": {
      config: { times: { x: 3 } },
      position: { x: 0, y: 7, z: 0 },
      type: "hushPuppy",
    },
    "hushPuppy@1,7,1": {
      config: { times: { x: 2 } },
      position: { x: 1, y: 7, z: 1 },
      type: "hushPuppy",
    },
    "hushPuppy@2,7,2": {
      config: {},
      position: { x: 2, y: 7, z: 2 },
      type: "hushPuppy",
    },
    "monster@3,7,1": {
      config: {
        activated: "on",
        movement: "patrol-randomly-diagonal",
        which: "dalek",
      },
      position: { x: 3, y: 7, z: 1 },
      type: "monster",
    },
    "portableBlock@3,7,0": {
      config: { style: "drum" },
      position: { x: 3, y: 7, z: 0 },
      type: "portableBlock",
    },
    "wall(right)@0,0,0": {
      config: { direction: "right", times: { y: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall(towards)@0,0,0": {
      config: { direction: "towards" },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@0,8,0": {
      config: { direction: "away", tiles: ["bars"] },
      position: { x: 0, y: 8, z: 0 },
      type: "wall",
    },
    "wall@3,0,0": {
      config: { direction: "towards" },
      position: { x: 3, y: 0, z: 0 },
      type: "wall",
    },
    "wall@3,8,0": {
      config: { direction: "away", tiles: ["bars"] },
      position: { x: 3, y: 8, z: 0 },
      type: "wall",
    },
    "wall@4,0,0": {
      config: {
        direction: "left",
        tiles: ["bars", "bars", "bars", "bars", "bars", "bars", "bars", "bars"],
        times: { y: 8 },
      },
      position: { x: 4, y: 0, z: 0 },
      type: "wall",
    },
  },
  planet: "jail",
  size: { x: 4, y: 8 },
}) satisfies RoomJson<OriginalCampaignRoomId, string, "jail">;
