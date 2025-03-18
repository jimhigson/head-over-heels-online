import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "yellow", shade: "basic" },
  floor: "bookworld",
  id: "bookworld10",
  items: {
    "door@0,3,1": {
      config: { direction: "right", toRoom: "bookworld11" },
      position: { x: 0, y: 3, z: 1 },
      type: "door",
    },
    "door@6,3,1": {
      config: { direction: "left", toRoom: "bookworld9" },
      position: { x: 6, y: 3, z: 1 },
      type: "door",
    },
    "monster@2,4,0": {
      config: {
        activated: "on",
        movement: "towards-on-shortest-axis-xy4",
        which: "monkey",
      },
      position: { x: 2, y: 4, z: 0 },
      type: "monster",
    },
    "wall@0,0,0:2scjwz": {
      config: { direction: "right", tiles: [], times: { y: 3 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@0,0,0:Z1XoDXu": {
      config: { direction: "towards", tiles: [], times: { x: 6 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@0,5,0": {
      config: { direction: "right", tiles: [], times: { y: 3 } },
      position: { x: 0, y: 5, z: 0 },
      type: "wall",
    },
    "wall@0,8,0": {
      config: {
        direction: "away",
        tiles: ["book", "cowboy", "book", "book", "cowboy", "book"],
        times: { x: 6 },
      },
      position: { x: 0, y: 8, z: 0 },
      type: "wall",
    },
    "wall@6,0,0": {
      config: {
        direction: "left",
        tiles: ["book", "book", "cowboy"],
        times: { y: 3 },
      },
      position: { x: 6, y: 0, z: 0 },
      type: "wall",
    },
    "wall@6,5,0": {
      config: {
        direction: "left",
        tiles: ["cowboy", "book", "book"],
        times: { y: 3 },
      },
      position: { x: 6, y: 5, z: 0 },
      type: "wall",
    },
  },
  planet: "bookworld",
  size: { x: 6, y: 8 },
}) satisfies RoomJson<OriginalCampaignRoomId, string, "bookworld">;
