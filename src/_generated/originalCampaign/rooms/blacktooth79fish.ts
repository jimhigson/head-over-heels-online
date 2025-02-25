import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "white", shade: "basic" },
  floor: "none",
  id: "blacktooth79fish",
  items: {
    "block@1,0,0": {
      config: { style: "organic", times: { y: 8 } },
      position: { x: 1, y: 0, z: 0 },
      type: "block",
    },
    "block@6,0,0": {
      config: { disappearing: "onStand", style: "organic" },
      position: { x: 6, y: 0, z: 0 },
      type: "block",
    },
    "block@7,0,0": {
      config: { style: "organic" },
      position: { x: 7, y: 0, z: 0 },
      type: "block",
    },
    "pickup@7,0,1": {
      config: { gives: "reincarnation" },
      position: { x: 7, y: 0, z: 1 },
      type: "pickup",
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
        times: { y: 8 },
      },
      position: { x: 8, y: 0, z: 0 },
      type: "wall",
    },
  },
  planet: "blacktooth",
  roomBelow: "blacktooth78",
  size: { x: 8, y: 8 },
}) satisfies RoomJson<"blacktooth", OriginalCampaignRoomId>;
