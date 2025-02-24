import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "cyan", shade: "dimmed" },
  floor: "deadly",
  id: "blacktooth28",
  items: {
    "block@5,0,0": {
      config: { style: "organic", times: { x: 3, y: 3 } },
      position: { x: 5, y: 0, z: 0 },
      type: "block",
    },
    "block@7,3,0": {
      config: { style: "organic", times: { y: 5 } },
      position: { x: 7, y: 3, z: 0 },
      type: "block",
    },
    "charles@3,4,0": {
      config: {},
      position: { x: 3, y: 4, z: 0 },
      type: "charles",
    },
    "conveyor@0,7,2": {
      config: { direction: "right", times: { x: 3 } },
      position: { x: 0, y: 7, z: 2 },
      type: "conveyor",
    },
    "door@8,3,2": {
      config: { direction: "left", toRoom: "blacktooth27fish" },
      position: { x: 8, y: 3, z: 2 },
      type: "door",
    },
    "joystick@6,1,1": {
      config: { controls: ["charles@3,4,0"] },
      position: { x: 6, y: 1, z: 1 },
      type: "joystick",
    },
    "pickup@2,7,7": {
      config: { gives: "bag" },
      position: { x: 2, y: 7, z: 7 },
      type: "pickup",
    },
    "portableBlock@1,7,0": {
      config: { style: "cube" },
      position: { x: 1, y: 7, z: 0 },
      type: "portableBlock",
    },
    scroll: {
      config: { gives: "scroll", page: "bag" },
      isExtra: true,
      position: { x: 3, y: 0, z: 1 },
      type: "pickup",
    },
    scrollBlock: {
      config: { style: "organic" },
      isExtra: true,
      position: { x: 3, y: 0, z: 0 },
      type: "block",
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
