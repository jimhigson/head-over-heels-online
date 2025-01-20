import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "magenta", shade: "basic" },
  floor: "blacktooth",
  id: "blacktooth39",
  items: {
    "door@2,6,5": {
      config: { direction: "away", toRoom: "blacktooth40fish" },
      position: { x: 2, y: 6, z: 5 },
      type: "door",
    },
    "door@6,2,5": {
      config: { direction: "left", toRoom: "blacktooth41" },
      position: { x: 6, y: 2, z: 5 },
      type: "door",
    },
    "lift@2,0,0": {
      config: { bottom: 0, top: 11 },
      position: { x: 2, y: 0, z: 0 },
      type: "lift",
    },
    "monster@3,3,0": {
      config: {
        activated: true,
        movement: "patrol-randomly-diagonal",
        which: "dalek",
      },
      position: { x: 3, y: 3, z: 0 },
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
    "portableBlock@4,1,0": {
      config: { style: "cube" },
      position: { x: 4, y: 1, z: 0 },
      type: "portableBlock",
    },
    "portableBlock@4,4,0": {
      config: { style: "cube" },
      position: { x: 4, y: 4, z: 0 },
      type: "portableBlock",
    },
  },
  planet: "blacktooth",
  roomAbove: "blacktooth38",
  size: { x: 6, y: 6 },
  walls: {
    away: ["plain", "shield", "none", "none", "shield", "plain"],
    left: ["plain", "shield", "none", "none", "shield", "plain"],
  },
}) satisfies RoomJson<"blacktooth", OriginalCampaignRoomId>;
