import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  ceilingRelativePoint: { x: 4, y: 4 },
  color: { hue: "white", shade: "basic" },
  id: "bookworld28",
  items: {
    b: {
      config: { style: "organic", times: { x: 3 } },
      position: { x: 0, y: 0, z: 0 },
      type: "block",
    },
    b1: {
      config: { style: "organic", times: { y: 2 } },
      position: { x: 0, y: 1, z: 0 },
      type: "block",
    },
    b10: {
      config: { style: "artificial" },
      position: { x: 3, y: 0, z: 0 },
      type: "block",
    },
    b2: {
      config: { style: "organic", times: { x: 7 } },
      position: { x: 1, y: 7, z: 0 },
      type: "block",
    },
    b3: {
      config: { style: "organic", times: { x: 2, y: 8 } },
      position: { x: 3, y: 8, z: 0 },
      type: "block",
    },
    b4: {
      config: { style: "organic", times: { y: 6 } },
      position: { x: 7, y: 1, z: 0 },
      type: "block",
    },
    b5: {
      config: { style: "organic", times: { y: 4 } },
      position: { x: 0, y: 4, z: 0 },
      type: "block",
    },
    b6: {
      config: { style: "organic", times: { x: 4 } },
      position: { x: 4, y: 0, z: 0 },
      type: "block",
    },
    b7: {
      config: { style: "organic", times: { x: 2, z: 2 } },
      position: { x: 3, y: 15, z: 1 },
      type: "block",
    },
    b8: {
      config: { style: "organic", times: { x: 2 } },
      position: { x: 3, y: 14, z: 1 },
      type: "block",
    },
    b9: {
      config: { style: "artificial" },
      position: { x: 0, y: 3, z: 0 },
      type: "block",
    },
    br: {
      config: { axis: "y", times: { y: 6 } },
      position: { x: 2.375, y: 8, z: 1 },
      type: "barrier",
    },
    br1: {
      config: { axis: "y", times: { y: 6 } },
      position: { x: 4.625, y: 8, z: 1 },
      type: "barrier",
    },
    br2: {
      config: { axis: "y", times: { y: 2 } },
      position: { x: 4.625, y: 13, z: 2 },
      type: "barrier",
    },
    br3: {
      config: { axis: "y", times: { y: 2 } },
      position: { x: 4.625, y: 14, z: 3 },
      type: "barrier",
    },
    br4: {
      config: { axis: "y", times: { y: 2 } },
      position: { x: 2.375, y: 13, z: 2 },
      type: "barrier",
    },
    br5: {
      config: { axis: "y", times: { y: 2 } },
      position: { x: 2.375, y: 14, z: 3 },
      type: "barrier",
    },
    br6: {
      config: { axis: "x", times: { x: 3 } },
      position: { x: 0, y: 7.375, z: 1 },
      type: "barrier",
    },
    br7: {
      config: { axis: "x", times: { x: 3 } },
      position: { x: 5, y: 7.375, z: 1 },
      type: "barrier",
    },
    d: {
      config: { direction: "away", toRoom: "bookworld27" },
      position: { x: 3, y: 16, z: 3 },
      type: "door",
    },
    db: {
      config: { style: "toaster", times: { z: 2 } },
      position: { x: 2, y: 3, z: 0 },
      type: "deadlyBlock",
    },
    db1: {
      config: { style: "toaster", times: { z: 2 } },
      position: { x: 3, y: 2, z: 0 },
      type: "deadlyBlock",
    },
    db2: {
      config: { style: "toaster", times: { z: 2 } },
      position: { x: 3, y: 4, z: 0 },
      type: "deadlyBlock",
    },
    db3: {
      config: { style: "toaster", times: { z: 2 } },
      position: { x: 4, y: 3, z: 0 },
      type: "deadlyBlock",
    },
    f: {
      config: { floorType: "deadly", times: { x: 8, y: 16 } },
      position: { x: 0, y: 0, z: 0 },
      type: "floor",
    },
    l: {
      config: { bottom: 0, top: 16 },
      position: { x: 3, y: 3, z: 3 },
      type: "lift",
    },
    m: {
      config: {
        activated: "on",
        movement: "clockwise",
        startDirection: "away",
        which: "turtle",
      },
      position: { x: 7, y: 0, z: 1 },
      type: "monster",
    },
    m1: {
      config: {
        activated: "on",
        movement: "clockwise",
        startDirection: "towards",
        which: "turtle",
      },
      position: { x: 0, y: 6.875, z: 1 },
      type: "monster",
    },
    w: {
      config: { direction: "right", times: { y: 16 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    w1: {
      config: { direction: "towards", times: { x: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    w2: {
      config: { direction: "away", tiles: ["book", "book", "cowboy"] },
      position: { x: 0, y: 16, z: 0 },
      type: "wall",
    },
    w3: {
      config: { direction: "away", tiles: ["cowboy", "book", "book"] },
      position: { x: 5, y: 16, z: 0 },
      type: "wall",
    },
    w4: {
      config: {
        direction: "left",
        tiles: [
          "book",
          "cowboy",
          "book",
          "book",
          "book",
          "book",
          "cowboy",
          "book",
          "book",
          "cowboy",
          "book",
          "book",
          "book",
          "book",
          "cowboy",
          "book",
        ],
      },
      position: { x: 8, y: 0, z: 0 },
      type: "wall",
    },
  },
  meta: {
    subRooms: {
      left: {
        gridPosition: { x: 0, y: 0 },
        physicalPosition: { from: { x: 0, y: 0 }, to: { x: 8, y: 8 } },
      },
      right: {
        gridPosition: { x: 0, y: 1 },
        physicalPosition: { from: { x: 0, y: 8 }, to: { x: 8, y: 16 } },
      },
    },
  },
  planet: "bookworld",
  roomAbove: "bookworld29",
}) satisfies RoomJson<OriginalCampaignRoomId, string, "bookworld">;
