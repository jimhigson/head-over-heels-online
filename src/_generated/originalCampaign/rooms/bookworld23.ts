import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "cyan", shade: "dimmed" },
  id: "bookworld23",
  items: {
    "door@0,2,0": {
      config: { direction: "right", toRoom: "bookworld24" },
      position: { x: 0, y: 2, z: 0 },
      type: "door",
    },
    "door@2,0,0": {
      config: { direction: "towards", toRoom: "bookworld27" },
      position: { x: 2, y: 0, z: 0 },
      type: "door",
    },
    "door@6,2,5": {
      config: { direction: "left", toRoom: "bookworld22" },
      position: { x: 6, y: 2, z: 5 },
      type: "door",
    },
    extraBookStack: {
      config: { style: "book", times: { y: 2, z: 5 } },
      position: { x: 5, y: 2, z: 0 },
      type: "block",
    },
    "floor@0,0,0": {
      config: {
        floorType: "standable",
        scenery: "bookworld",
        times: { x: 6, y: 6 },
      },
      position: { x: 0, y: 0, z: 0 },
      type: "floor",
    },
    "wall(right)@0,0,0": {
      config: { direction: "right", times: { y: 2 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall(towards)@0,0,0": {
      config: { direction: "towards", times: { x: 2 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@0,4,0": {
      config: { direction: "right", times: { y: 2 } },
      position: { x: 0, y: 4, z: 0 },
      type: "wall",
    },
    "wall@0,6,0": {
      config: {
        direction: "away",
        tiles: ["book", "cowboy", "book", "book", "cowboy", "book"],
        times: { x: 6 },
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
      config: { direction: "left", tiles: ["book", "book"], times: { y: 2 } },
      position: { x: 6, y: 0, z: 0 },
      type: "wall",
    },
    "wall@6,4,0": {
      config: { direction: "left", tiles: ["book", "book"], times: { y: 2 } },
      position: { x: 6, y: 4, z: 0 },
      type: "wall",
    },
  },
  planet: "bookworld",
  size: { x: 6, y: 6 },
}) satisfies RoomJson<OriginalCampaignRoomId, string, "bookworld">;
