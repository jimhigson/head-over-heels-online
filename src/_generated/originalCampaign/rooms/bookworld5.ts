import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "basic" },
  floor: "bookworld",
  id: "bookworld5",
  items: {
    "door@1,0,0": {
      config: { direction: "towards", toRoom: "bookworld6" },
      position: { x: 1, y: 0, z: 0 },
      type: "door",
    },
    "door@1,8,0": {
      config: { direction: "away", toRoom: "bookworld4" },
      position: { x: 1, y: 8, z: 0 },
      type: "door",
    },
    "monster@1,3,0": {
      config: {
        activated: "on",
        movement: "patrol-randomly-xy8",
        which: "helicopterBug",
      },
      position: { x: 1, y: 3, z: 0 },
      type: "monster",
    },
    "monster@2,4,0": {
      config: {
        activated: "on",
        movement: "patrol-randomly-xy8",
        which: "helicopterBug",
      },
      position: { x: 2, y: 4, z: 0 },
      type: "monster",
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
      config: { direction: "away", tiles: ["book"] },
      position: { x: 0, y: 8, z: 0 },
      type: "wall",
    },
    "wall@3,0,0": {
      config: { direction: "towards" },
      position: { x: 3, y: 0, z: 0 },
      type: "wall",
    },
    "wall@3,8,0": {
      config: { direction: "away", tiles: ["book"] },
      position: { x: 3, y: 8, z: 0 },
      type: "wall",
    },
    "wall@4,0,0": {
      config: {
        direction: "left",
        tiles: [
          "book",
          "book",
          "cowboy",
          "book",
          "book",
          "cowboy",
          "book",
          "book",
        ],
        times: { y: 8 },
      },
      position: { x: 4, y: 0, z: 0 },
      type: "wall",
    },
  },
  planet: "bookworld",
  size: { x: 4, y: 8 },
}) satisfies RoomJson<OriginalCampaignRoomId, string, "bookworld">;
