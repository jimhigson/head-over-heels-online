import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "green", shade: "basic" },
  floor: "none",
  id: "penitentiary6",
  items: {
    "block@0,5,0": {
      config: { style: "artificial" },
      position: { x: 0, y: 5, z: 0 },
      type: "block",
    },
    "deadlyBlock@3,0,0": {
      config: { style: "volcano", times: { y: 6 } },
      position: { x: 3, y: 0, z: 0 },
      type: "deadlyBlock",
    },
    "door@6,2,3": {
      config: { direction: "left", toRoom: "penitentiary7" },
      position: { x: 6, y: 2, z: 3 },
      type: "door",
    },
    "movingPlatform@3,0,1": {
      config: {
        activated: "on",
        movement: "back-forth",
        startDirection: "towards",
        style: "stepStool",
      },
      position: { x: 3, y: 0, z: 1 },
      type: "movingPlatform",
    },
    "wall(right)@0,0,0": {
      config: { direction: "right", times: { y: 6 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall(towards)@0,0,0": {
      config: { direction: "towards", times: { x: 6 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@0,6,0": {
      config: {
        direction: "away",
        tiles: ["loop", "skeleton", "loop", "loop", "skeleton", "loop"],
        times: { x: 6 },
      },
      position: { x: 0, y: 6, z: 0 },
      type: "wall",
    },
    "wall@6,0,0": {
      config: { direction: "left", tiles: ["loop", "loop"], times: { y: 2 } },
      position: { x: 6, y: 0, z: 0 },
      type: "wall",
    },
    "wall@6,4,0": {
      config: { direction: "left", tiles: ["loop", "loop"], times: { y: 2 } },
      position: { x: 6, y: 4, z: 0 },
      type: "wall",
    },
  },
  planet: "penitentiary",
  roomBelow: "penitentiary5",
  size: { x: 6, y: 6 },
}) satisfies RoomJson<OriginalCampaignRoomId, string, "penitentiary">;
