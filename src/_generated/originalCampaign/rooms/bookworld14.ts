import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "basic" },
  floor: "bookworld",
  id: "bookworld14",
  items: {
    "barrier@6,3,0": {
      config: { axis: "y", times: { y: 4, z: 3 } },
      position: { x: 6, y: 3, z: 0 },
      type: "barrier",
    },
    "barrier@7,2,0": {
      config: { axis: "x", times: { z: 3 } },
      position: { x: 7, y: 2, z: 0 },
      type: "barrier",
    },
    "deadlyBlock@3,4,0": {
      config: { style: "toaster" },
      position: { x: 3, y: 4, z: 0 },
      type: "deadlyBlock",
    },
    "deadlyBlock@4,3,0": {
      config: { style: "toaster" },
      position: { x: 4, y: 3, z: 0 },
      type: "deadlyBlock",
    },
    "door@3,0,0": {
      config: { direction: "towards", toRoom: "bookworld15" },
      position: { x: 3, y: 0, z: 0 },
      type: "door",
    },
    "door@8,3,0": {
      config: { direction: "left", toRoom: "bookworld13" },
      position: { x: 8, y: 3, z: 0 },
      type: "door",
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
    "monster@4,4,0": {
      config: {
        activated: true,
        movement: "patrol-randomly-diagonal",
        which: "dalek",
      },
      position: { x: 4, y: 4, z: 0 },
      type: "monster",
    },
  },
  planet: "bookworld",
  size: { x: 8, y: 8 },
  walls: {
    away: ["book", "book", "cowboy", "book", "book", "cowboy", "book", "book"],
    left: ["book", "book", "cowboy", "none", "none", "cowboy", "book", "book"],
  },
}) satisfies RoomJson<"bookworld", OriginalCampaignRoomId>;
