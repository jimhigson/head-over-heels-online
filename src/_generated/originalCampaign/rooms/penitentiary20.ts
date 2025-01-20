import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "dimmed" },
  floor: "penitentiary",
  id: "penitentiary20",
  items: {
    "monster@2,3,1": {
      config: {
        activated: true,
        movement: "patrol-randomly-diagonal",
        which: "dalek",
      },
      position: { x: 2, y: 3, z: 1 },
      type: "monster",
    },
    "portableBlock@1,1,0": {
      config: { style: "cube" },
      position: { x: 1, y: 1, z: 0 },
      type: "portableBlock",
    },
    "portableBlock@1,4,0": {
      config: { style: "cube" },
      position: { x: 1, y: 4, z: 0 },
      type: "portableBlock",
    },
    "portableBlock@2,2,0": {
      config: { style: "cube" },
      position: { x: 2, y: 2, z: 0 },
      type: "portableBlock",
    },
    "portableBlock@2,3,0": {
      config: { style: "cube" },
      position: { x: 2, y: 3, z: 0 },
      type: "portableBlock",
    },
    "portableBlock@3,2,0": {
      config: { style: "cube" },
      position: { x: 3, y: 2, z: 0 },
      type: "portableBlock",
    },
    "portableBlock@3,3,0": {
      config: { style: "cube" },
      position: { x: 3, y: 3, z: 0 },
      type: "portableBlock",
    },
    "portableBlock@4,1,0": {
      config: { style: "cube" },
      position: { x: 4, y: 1, z: 0 },
      type: "portableBlock",
    },
    "spring@3,2,1": {
      config: {},
      position: { x: 3, y: 2, z: 1 },
      type: "spring",
    },
  },
  planet: "penitentiary",
  roomAbove: "penitentiary21",
  size: { x: 6, y: 6 },
  walls: {
    away: ["loop", "skeleton", "loop", "loop", "skeleton", "loop"],
    left: ["loop", "skeleton", "loop", "loop", "skeleton", "loop"],
  },
}) satisfies RoomJson<"penitentiary", OriginalCampaignRoomId>;
