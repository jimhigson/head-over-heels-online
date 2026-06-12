#!/usr/bin/env -S pnpm tsx
/**
 * builds the lamps/mirrors/light-beams playtest campaign and prints a
 * playtest url for it (as produced by the editor's playtest button), for
 * pasting onto a deploy preview or running against a local build.
 *
 * The room's lamp shines into a square of four mirrors, looping the beam
 * around all four sides before it exits and terminates.
 *
 * usage:
 *   pnpm tsx scripts/genLightPlaytestCampaign.ts [baseUrl]
 */
import { compressObject } from "../src/db/compressObject";
import { type Campaign } from "../src/model/modelTypes";
import { inferRoomJson } from "../src/model/RoomJson";

type RoomId = "lightLab";

const room = inferRoomJson({
  color: { hue: "cyan", shade: "basic" },
  id: "lightLab",
  items: {
    f: {
      config: {
        floorType: "standable",
        scenery: "moonbase",
        times: { x: 10, y: 10 },
      },
      position: { x: 0, y: 0, z: 0 },
      type: "floor",
    },
    wAway: {
      config: {
        direction: "away",
        tiles: Array.from({ length: 10 }, () => "window1" as "window1"),
      },
      position: { x: 0, y: 10, z: 0 },
      type: "wall",
    },
    wLeft: {
      config: {
        direction: "left",
        tiles: Array.from({ length: 10 }, () => "coil" as "coil"),
      },
      position: { x: 10, y: 0, z: 0 },
      type: "wall",
    },
    wTowards: {
      config: { direction: "towards", times: { x: 10 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },
    wRight: {
      config: { direction: "right", times: { y: 10 } },
      position: { x: 0, y: 0, z: 0 },
      type: "wall",
    },

    /*
     * the lamp shines right (-x) into a square of four mirrors: the beam
     * loops around all four sides, then exits the square at the first
     * mirror (already visited) and terminates against it
     */
    lamp1: {
      config: { direction: "right", activated: true },
      position: { x: 8, y: 2, z: 0 },
      type: "lamp",
    },
    // on top of the lamp - jump on it to toggle the light on/off:
    lampButton: {
      config: {
        type: "in-room",
        modifies: [{ expectType: "lamp", targets: ["lamp1"], activates: true }],
      },
      position: { x: 8, y: 2, z: 1 },
      type: "button",
    },
    m1: {
      config: { orientation: "awayRight" },
      position: { x: 6, y: 2, z: 0 },
      type: "mirror",
    },
    m2: {
      config: { orientation: "awayRight" },
      position: { x: 6, y: 6, z: 0 },
      type: "mirror",
    },
    m3: {
      config: { orientation: "awayLeft" },
      position: { x: 3, y: 6, z: 0 },
      type: "mirror",
    },
    m4: {
      config: { orientation: "awayRight" },
      position: { x: 3, y: 2, z: 0 },
      type: "mirror",
    },

    /*
     * the double-height kit, along the y=8 row: the tall lamp's beam is two
     * rows; the single mirror reflects only the lower row (away, to the
     * back wall) while the upper row carries on to the tall mirror, which
     * turns it towards the front of the room, sailing over the beam square
     */
    dblLamp: {
      config: { direction: "right", activated: true, times: { z: 2 } },
      position: { x: 8, y: 8, z: 0 },
      type: "lamp",
    },
    mSingle: {
      config: { orientation: "awayRight" },
      position: { x: 5, y: 8, z: 0 },
      type: "mirror",
    },
    mDouble: {
      config: { orientation: "awayLeft", times: { z: 2 } },
      position: { x: 3, y: 8, z: 0 },
      type: "mirror",
    },

    head: {
      config: { which: "head" },
      position: { x: 1, y: 8, z: 0 },
      type: "player",
    },
    heels: {
      config: { which: "heels" },
      position: { x: 9, y: 0, z: 0 },
      type: "player",
    },
    // patrols clockwise into the beam square's sides, repelled by the light:
    turtle: {
      config: {
        which: "turtle",
        movement: "clockwise",
        startDirection: "right",
        activated: "on",
      },
      position: { x: 8, y: 4, z: 0 },
      type: "monster",
    },
    hooter: {
      config: { gives: "hooter" },
      position: { x: 1, y: 9, z: 0 },
      type: "pickup",
    },
    doughnuts1: {
      config: { gives: "doughnuts" },
      position: { x: 2, y: 9, z: 0 },
      type: "pickup",
    },
    doughnuts2: {
      config: { gives: "doughnuts" },
      position: { x: 3, y: 9, z: 0 },
      type: "pickup",
    },
    doughnuts3: {
      config: { gives: "doughnuts" },
      position: { x: 2, y: 8, z: 0 },
      type: "pickup",
    },
    // a doughnut prize inside the beam square - hop the light to get it:
    doughnuts4: {
      config: { gives: "doughnuts" },
      position: { x: 4, y: 4, z: 0 },
      type: "pickup",
    },
    bag: {
      config: { gives: "bag" },
      position: { x: 9, y: 9, z: 0 },
      type: "pickup",
    },
    shieldRabbit1: {
      config: { gives: "shield" },
      position: { x: 9, y: 5, z: 0 },
      type: "pickup",
    },
    shieldRabbit2: {
      config: { gives: "shield" },
      position: { x: 5, y: 9, z: 0 },
      type: "pickup",
    },
    portable1: {
      config: { style: "cube" },
      position: { x: 1, y: 4, z: 0 },
      type: "portableBlock",
    },
    portable2: {
      config: { style: "drum" },
      position: { x: 7, y: 9, z: 0 },
      type: "portableBlock",
    },
    portable3: {
      config: { style: "sticks" },
      position: { x: 7, y: 0, z: 0 },
      type: "portableBlock",
    },
  },
  planet: "moonbase",
});

const campaign: Campaign<RoomId> = {
  locator: { userId: "editorUser", campaignName: "lightLab", version: 1 },
  rooms: { lightLab: room },
};

const [, , baseUrl = "http://localhost:5201"] = process.argv;
const encodedCampaign = await compressObject(campaign);
console.log(
  `${baseUrl}/?campaignName=data:${encodeURIComponent(encodedCampaign)}&campaignAuthorUserId=editorUser&cheats=1&track=0`,
);
