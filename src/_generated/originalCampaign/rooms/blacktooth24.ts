import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "basic" },
  floor: "blacktooth",
  id: "blacktooth24",
  items: {
    "door@8,3,3": {
      config: { direction: "left", toRoom: "blacktooth25" },
      position: { x: 8, y: 3, z: 3 },
      type: "door",
    },
    map: {
      config: { gives: "extra-life" },
      isExtra: true,
      position: { x: 6, y: 7, z: 6 },
      type: "pickup",
    },
    mapStacka: {
      config: { style: "book", times: { z: 3 } },
      isExtra: true,
      position: { x: 4, y: 7, z: 0 },
      type: "block",
    },
    mapStackb: {
      config: { style: "book", times: { z: 6 } },
      isExtra: true,
      position: { x: 5, y: 7, z: 0 },
      type: "block",
    },
    mapStackc: {
      config: { style: "tower", times: { z: 6 } },
      isExtra: true,
      position: { x: 6, y: 7, z: 0 },
      type: "block",
    },
    "spring@4,4,0": {
      config: {},
      position: { x: 4, y: 4, z: 0 },
      type: "spring",
    },
    "teleporter@0,0,0": {
      config: { toPosition: { x: 0, y: 0, z: 0 }, toRoom: "blacktooth23heels" },
      position: { x: 0, y: 0, z: 0 },
      type: "teleporter",
    },
    "wall@0,0,0:2sckOl": {
      config: { direction: "right", tiles: [], times: { y: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@0,0,0:Z1XoDrY": {
      config: { direction: "towards", tiles: [], times: { x: 8 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@0,8,0": {
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
        times: { x: 8 },
      },
      position: { x: 0, y: 8, z: 0 },
      type: "wall",
    },
    "wall@8,0,0": {
      config: {
        direction: "left",
        tiles: ["plain", "shield", "plain"],
        times: { y: 3 },
      },
      position: { x: 8, y: 0, z: 0 },
      type: "wall",
    },
    "wall@8,5,0": {
      config: {
        direction: "left",
        tiles: ["plain", "shield", "plain"],
        times: { y: 3 },
      },
      position: { x: 8, y: 5, z: 0 },
      type: "wall",
    },
  },
  planet: "blacktooth",
  size: { x: 8, y: 8 },
}) satisfies RoomJson<"blacktooth", OriginalCampaignRoomId>;
