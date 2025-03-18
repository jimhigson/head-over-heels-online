import { inferRoomJson, type RoomJson } from "../../../model/RoomJson.ts";

import { type OriginalCampaignRoomId } from "../OriginalCampaignRoomId.ts";

export const room = inferRoomJson({
  color: { hue: "cyan", shade: "dimmed" },
  floor: "deadly",
  id: "blacktooth6",
  items: {
    "block@0,0,0": {
      config: { style: "organic" },
      position: { x: 0, y: 0, z: 0 },
      type: "block",
    },
    "block@0,3,0": {
      config: { style: "organic", times: { y: 2 } },
      position: { x: 0, y: 3, z: 0 },
      type: "block",
    },
    "block@0,7,0": {
      config: { disappearing: "onStand", style: "organic" },
      position: { x: 0, y: 7, z: 0 },
      type: "block",
    },
    "block@3,0,0": {
      config: { style: "organic" },
      position: { x: 3, y: 0, z: 0 },
      type: "block",
    },
    "block@3,7,0": {
      config: { disappearing: "onStand", style: "organic" },
      position: { x: 3, y: 7, z: 0 },
      type: "block",
    },
    "block@6,0,0": {
      config: { style: "organic" },
      position: { x: 6, y: 0, z: 0 },
      type: "block",
    },
    "block@7,7,0": {
      config: { style: "organic" },
      position: { x: 7, y: 7, z: 0 },
      type: "block",
    },
    "door@0,3,1": {
      config: { direction: "right", toRoom: "blacktooth5" },
      position: { x: 0, y: 3, z: 1 },
      type: "door",
    },
    extraMonster: {
      config: {
        activated: "on",
        movement: "patrol-randomly-diagonal",
        which: "dalek",
      },
      isExtra: true,
      position: { x: 0, y: 0, z: 1 },
      type: "monster",
    },
    extraMonster2: {
      config: {
        activated: "on",
        movement: "patrol-randomly-diagonal",
        which: "dalek",
      },
      isExtra: true,
      position: { x: 7, y: 7, z: 3 },
      type: "monster",
    },
    "monster@3,0,1": {
      config: {
        activated: "on",
        movement: "patrol-randomly-diagonal",
        which: "dalek",
      },
      position: { x: 3, y: 0, z: 1 },
      type: "monster",
    },
    "pickup@7,7,1": {
      config: { gives: "doughnuts" },
      position: { x: 7, y: 7, z: 1 },
      type: "pickup",
    },
    scroll: {
      config: { gives: "scroll", page: "doughnuts" },
      position: { x: 2, y: 3, z: 1 },
      type: "pickup",
    },
    scrollBlock: {
      config: { style: "organic" },
      position: { x: 2, y: 3, z: 0 },
      type: "block",
    },
    "switch@6,0,1": {
      config: {
        modifies: [
          {
            expectType: "block",
            key: "disappear",
            left: "onStand",
            right: null,
            target: "block@0,7,0",
          },
          {
            expectType: "block",
            key: "disappear",
            left: "onStand",
            right: null,
            target: "block@3,7,0",
          },
          {
            expectType: "monster",
            key: "activated",
            left: true,
            right: false,
            target: "monster@3,0,1",
          },
          {
            expectType: "monster",
            key: "activated",
            left: true,
            right: false,
            target: "extraMonster",
          },
          {
            expectType: "monster",
            key: "activated",
            left: true,
            right: false,
            target: "extraMonster2",
          },
        ],
        type: "in-room",
      },
      position: { x: 6, y: 0, z: 1 },
      type: "switch",
    },
    "wall@0,0,0:2scjwz": {
      config: { direction: "right", tiles: [], times: { y: 3 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    "wall@0,0,0:Z1XoDrY": {
      config: { direction: "towards", tiles: [], times: { x: 8 } },
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
  size: { x: 8, y: 8 },
}) satisfies RoomJson<OriginalCampaignRoomId, string, "blacktooth">;
