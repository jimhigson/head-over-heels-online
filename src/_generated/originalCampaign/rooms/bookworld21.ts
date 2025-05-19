import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "yellow", shade: "dimmed" },
  floor: "bookworld",
  id: "bookworld21",
  items: {
    "block@1,5,0": {
      config: { style: "book", times: { y: 2 } },
      position: { x: 1, y: 5, z: 0 },
      type: "block",
    },
    "block@3,3,0": {
      config: { style: "book" },
      position: { x: 3, y: 3, z: 0 },
      type: "block",
    },
    "block@6,2,0": {
      config: { style: "book" },
      position: { x: 6, y: 2, z: 0 },
      type: "block",
    },
    "block@7,5,0": {
      config: { style: "book" },
      position: { x: 7, y: 5, z: 0 },
      type: "block",
    },
    "door@3,0,0": {
      config: { direction: "towards", toRoom: "bookworld22" },
      position: { x: 3, y: 0, z: 0 },
      type: "door",
    },
    "door@3,8,0": {
      config: { direction: "away", toRoom: "bookworld9" },
      position: { x: 3, y: 8, z: 0 },
      type: "door",
    },
    "monster@0,4,0": {
      config: {
        activated: "on",
        movement: "towards-tripped-on-axis-xy4",
        which: "homingBot",
      },
      position: { x: 0, y: 4, z: 0 },
      type: "monster",
    },
    "wall(right)@0,0,0": {
      config: { direction: "right", times: { y: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall(towards)@0,0,0": {
      config: { direction: "towards", times: { x: 3 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@0,8,0": {
      config: {
        direction: "away",
        tiles: ["book", "book", "cowboy"],
        times: { x: 3 },
      },
      position: { x: 0, y: 8, z: 0 },
      type: "wall",
    },
    "wall@5,0,0": {
      config: { direction: "towards", times: { x: 3 } },
      position: { x: 5, y: 0, z: 0 },
      type: "wall",
    },
    "wall@5,8,0": {
      config: {
        direction: "away",
        tiles: ["cowboy", "book", "book"],
        times: { x: 3 },
      },
      position: { x: 5, y: 8, z: 0 },
      type: "wall",
    },
    "wall@8,0,0": {
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
      position: { x: 8, y: 0, z: 0 },
      type: "wall",
    },
  },
  planet: "bookworld",
  size: { x: 8, y: 8 },
}) satisfies RoomJson<OriginalCampaignRoomId, string, "bookworld">;
