import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "dimmed" },
  id: "blacktooth83tofreedom",
  items: {
    b: {
      config: { style: "organic", times: { y: 4 } },
      position: { x: 0, y: 2, z: 0 },
      type: "block",
    },
    b1: {
      config: { style: "organic", times: { z: 2 } },
      position: { x: 0, y: 7, z: 0 },
      type: "block",
    },
    b2: {
      config: { style: "organic" },
      position: { x: 0, y: 7, z: 3 },
      type: "block",
    },
    b3: {
      config: {
        disappearing: { on: "stand" },
        style: "organic",
        times: { z: 3 },
      },
      position: { x: 5, y: 3, z: 0 },
      type: "block",
    },
    b4: {
      config: {
        disappearing: { on: "stand" },
        style: "organic",
        times: { z: 3 },
      },
      position: { x: 5, y: 7, z: 0 },
      type: "block",
    },
    b5: {
      config: { style: "artificial" },
      position: { x: 6, y: 2, z: 2 },
      type: "block",
    },
    b6: {
      config: { style: "artificial" },
      position: { x: 7, y: 1, z: 2 },
      type: "block",
    },
    b7: {
      config: { style: "organic" },
      position: { x: 7, y: 2, z: 0 },
      type: "block",
    },
    b8: {
      config: { style: "artificial" },
      position: { x: 7, y: 3, z: 2 },
      type: "block",
    },
    d: {
      config: { direction: "right", toRoom: "blacktooth82" },
      position: { x: 0, y: 3, z: 1 },
      type: "door",
    },
    f: {
      config: { floorType: "deadly", times: { x: 8, y: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "floor",
    },
    h: { config: {}, position: { x: 0, y: 0, z: 0 }, type: "hushPuppy" },
    h1: { config: {}, position: { x: 3, y: 0, z: 0 }, type: "hushPuppy" },
    h2: {
      config: { times: { x: 2 } },
      position: { x: 6, y: 0, z: 0 },
      type: "hushPuppy",
    },
    h3: { config: {}, position: { x: 7, y: 0, z: 1 }, type: "hushPuppy" },
    t: {
      config: { toItemId: "b3", toRoom: "finalroom" },
      position: { x: 7, y: 2, z: 1 },
      type: "teleporter",
    },
    w: {
      config: { direction: "right", times: { y: 3 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    w1: {
      config: { direction: "towards", times: { x: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    w2: {
      config: { direction: "right", times: { y: 3 } },
      position: { x: 0, y: 5, z: 0 },
      type: "wall",
    },
    w3: {
      config: {
        direction: "away",
        tiles: [
          "plain",
          "armour",
          "plain",
          "shield",
          "shield",
          "plain",
          "armour",
          "plain",
        ],
      },
      position: { x: 0, y: 8, z: 0 },
      type: "wall",
    },
    w4: {
      config: {
        direction: "left",
        tiles: [
          "plain",
          "armour",
          "plain",
          "shield",
          "shield",
          "plain",
          "armour",
          "plain",
        ],
      },
      position: { x: 8, y: 0, z: 0 },
      type: "wall",
    },
  },
  meta: {
    nonContiguousRelationship: {
      gridOffset: { x: 7, y: 5, z: 0 },
      with: { room: "finalroom" },
    },
  },
  planet: "blacktooth",
}) satisfies RoomJson<OriginalCampaignRoomId, string, "blacktooth">;
