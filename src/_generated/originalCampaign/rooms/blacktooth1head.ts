import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "yellow", shade: "basic" },
  floor: "jail",
  id: "blacktooth1head",
  items: {
    "barrier@5,0,0": {
      config: { axis: "y" },
      position: { x: 5, y: 0, z: 0 },
      type: "barrier",
    },
    "barrier@5,0,2": {
      config: { axis: "y" },
      position: { x: 5, y: 0, z: 2 },
      type: "barrier",
    },
    "barrier@5,0,4": {
      config: { axis: "y" },
      position: { x: 5, y: 0, z: 4 },
      type: "barrier",
    },
    "barrier@5,0,6": {
      config: { axis: "y" },
      position: { x: 5, y: 0, z: 6 },
      type: "barrier",
    },
    colouriseSwitch: {
      config: {
        store: {
          dispatches: "toggleColourise",
          selectsPath: "userSettings.displaySettings.colourise",
        },
      },
      isExtra: true,
      position: { x: 5, y: 3, z: 0 },
      type: "switch",
    },
    "door@0,3,0": {
      config: { direction: "right", toRoom: "blacktooth23heels" },
      position: { x: 0, y: 3, z: 0 },
      type: "door",
    },
    head: {
      config: { which: "head" },
      position: { x: 2.5, y: 2.5, z: 0 },
      type: "player",
    },
    "pickup@5,0,7": {
      config: { gives: "extra-life" },
      position: { x: 5, y: 0, z: 7 },
      type: "pickup",
    },
    scrollRabbit: {
      config: { gives: "scroll", page: "cuddlyStuffedWhiteRabbits" },
      position: { x: 3, y: 0, z: 0 },
      type: "pickup",
    },
    scrollTheGame: {
      config: { gives: "scroll", page: "theGame" },
      position: { x: 3, y: 7, z: 0 },
      type: "pickup",
    },
    "teleporter@5,7,0": {
      config: { toPosition: { x: 5, y: 7, z: 0 }, toRoom: "blacktooth2" },
      position: { x: 5, y: 7, z: 0 },
      type: "teleporter",
    },
  },
  planet: "jail",
  size: { x: 6, y: 8 },
  walls: {
    away: ["bars", "bars", "bars", "bars", "bars", "bars"],
    left: ["bars", "bars", "bars", "bars", "bars", "bars", "bars", "bars"],
  },
}) satisfies RoomJson<"jail", OriginalCampaignRoomId>;
