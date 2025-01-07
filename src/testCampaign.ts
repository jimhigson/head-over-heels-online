import type { Campaign } from "./model/modelTypes.ts";
import { type RoomWalls } from "./model/modelTypes.ts";
import { type RoomJson } from "./model/RoomJson.ts";
import type { SceneryName, Wall } from "./sprites/planets.ts";
import { sceneryNames, scenery } from "./sprites/planets.ts";
import type { ZxSpectrumShade, ZxSpectrumRoomHue } from "./originalGame.ts";
import { zxSpectrumRoomHue, zxSpectrumShades } from "./originalGame.ts";
import { keyItems } from "./utils/keyItems.ts";
import type { UnknownJsonItem } from "./model/json/JsonItem.ts";
import type { AxisXy, Xy } from "./utils/vectors/vectors.ts";

const generateWalls = <P extends SceneryName>(
  roomSize: Xy,
  planet: P,
  skip?: Record<AxisXy, number[]>,
): RoomWalls<P> => {
  const { walls } = scenery[planet];

  function* gen(axis: AxisXy): Generator<Wall<P>> {
    const n = walls.length;

    for (let i = 0; ; i++) {
      if (skip?.[axis]?.includes(i)) yield "none";
      else yield walls[i % n];
    }
  }

  return {
    away: [...gen("x").take(roomSize.x)],
    left: [...gen("y").take(roomSize.y)],
  };
};

type ColorRoomIds = `${SceneryName}-${ZxSpectrumRoomHue}-${ZxSpectrumShade}`;

export type TestCampaignRoomId =
  | "laboratory"
  | "renderEverything"
  | "lift"
  | ColorRoomIds;

// create matrix of rooms - one in each world/colour combination
const colourRooms = () => {
  type Entry<P extends SceneryName> = [
    ColorRoomIds,
    RoomJson<P, TestCampaignRoomId, string>,
  ];

  const sampleItems: UnknownJsonItem<TestCampaignRoomId>[] = [
    {
      type: "deadlyBlock",
      config: { style: "volcano" },
      position: { x: 6, y: 6, z: 0 },
    },
    {
      type: "block",
      config: { style: "organic", disappearing: false },
      position: { x: 4, y: 6, z: 0 },
    },
    {
      type: "baddie",
      config: {
        which: "cyberman",
        movement: "towards-on-shortest-axis-xy4",
        activated: false,
        wakes: false,
        startDirection: "away",
      },
      position: { x: 6, y: 0, z: 0 },
    },
  ];

  function* room(): Generator<Entry<SceneryName>> {
    for (let iPlanet = 0; iPlanet < sceneryNames.length; iPlanet++) {
      const p = sceneryNames[iPlanet];
      for (let iHue = 0; iHue < zxSpectrumRoomHue.length; iHue++) {
        const hue = zxSpectrumRoomHue[iHue];
        for (let iShade = 0; iShade < zxSpectrumShades.length; iShade++) {
          const shade = zxSpectrumShades[iShade];
          yield [
            `${p}-${hue}-${shade}`,
            {
              size: { x: 8, y: 8 },
              walls: generateWalls({ x: 8, y: 8 }, p, {
                x: [4, 5],
                y: [1, 2, 4, 5],
              }),
              color: { hue, shade },
              floor: p,
              planet: p,
              items: keyItems([
                {
                  type: "teleporter",
                  position: {
                    x: 2,
                    y: 2,
                    z: 0,
                  },
                  config: { toRoom: "laboratory" },
                },
                {
                  type: "door",
                  position: { x: 0, y: 0, z: 3 },
                  config: {
                    direction: "towards",
                    toRoom: `${p}-${zxSpectrumRoomHue[(zxSpectrumRoomHue.length + iHue - 1) % zxSpectrumRoomHue.length]}-${shade}`,
                  },
                },
                {
                  type: "door",
                  position: { x: 4, y: 8, z: 3 },
                  config: {
                    direction: "away",
                    toRoom: `${p}-${zxSpectrumRoomHue[(iHue + 1) % zxSpectrumRoomHue.length]}-${shade}`,
                  },
                },
                {
                  type: "door",
                  position: { x: 0, y: 4, z: 3 },
                  config: {
                    direction: "right",
                    toRoom: `${sceneryNames[(sceneryNames.length + iPlanet - 1) % sceneryNames.length]}-${hue}-${shade}`,
                  },
                },
                {
                  type: "door",
                  position: { x: 8, y: 4, z: 4 },
                  config: {
                    direction: "left",
                    toRoom: `${sceneryNames[(sceneryNames.length + iPlanet + 1) % sceneryNames.length]}-${hue}-${shade}`,
                  },
                },
                {
                  type: "door",
                  position: { x: 8, y: 1, z: 0 },
                  config: {
                    direction: "left",
                    toRoom: `${p}-${hue}-${shade === "basic" ? "dimmed" : "basic"}`,
                  },
                },
                ...sampleItems,
              ]),
              id: `${p}-${hue}-${shade}`,
            },
          ];
        }
      }
    }
  }
  return Object.fromEntries(room()) as Record<
    ColorRoomIds,
    RoomJson<SceneryName, ColorRoomIds, string>
  >;
};

const rooms = {
  lift: {
    size: { x: 4, y: 4 },
    planet: "safari",
    color: { hue: "yellow", shade: "dimmed" },
    walls: generateWalls({ x: 4, y: 4 }, "safari"),
    floor: "safari",

    id: "lift",
    items: keyItems([
      // {
      //   type: "lift",
      //   config: { bottom: 0, top: 4 },
      //   position: { x: 1, y: 1, z: 3 },
      // },
      // {
      //   type: "portableBlock",
      //   config: { style: "cube" },
      //   position: { x: 0, y: 3, z: 0 },
      // },
      {
        type: "block",
        config: { style: "organic", disappearing: false },
        position: { x: 0, y: 2, z: 0 },
      },
      {
        type: "block",
        config: { style: "organic", disappearing: false },
        position: { x: 0, y: 2, z: 2 },
      },
      // {
      //   type: "pickup",
      //   config: { gives: "bag" },
      //   position: { x: 0, y: 3, z: 1 },
      // },
      {
        type: "door",
        config: { toRoom: "laboratory", direction: "towards" },
        position: { x: 0, y: 0, z: 1 },
      },
    ]),
  } satisfies RoomJson<"safari", TestCampaignRoomId>,

  laboratory: {
    size: { x: 18, y: 14 },
    planet: "egyptus",
    color: { hue: "yellow", shade: "dimmed" },
    walls: generateWalls({ x: 18, y: 14 }, "egyptus", { x: [5, 6], y: [] }),
    floor: "egyptus",

    id: "laboratory",
    items: keyItems([
      {
        type: "teleporter",
        config: { toRoom: "blacktooth-cyan-dimmed" },
        position: {
          x: 1,
          y: 0,
          z: 0,
        },
      },
      {
        type: "door",
        config: { toRoom: "renderEverything", direction: "towards" },
        position: { x: 5, y: 0, z: 2 },
      },
      {
        type: "door",
        config: { toRoom: "lift", direction: "away" },
        position: { x: 5, y: 14, z: 2 },
      },
      {
        type: "block",
        config: { style: "organic", disappearing: false },
        position: { x: 5, y: 0, z: 0 },
      },

      //small conveyor experiment:
      {
        type: "portableBlock",
        position: { x: 0, y: 0, z: 7 },
        config: {
          style: "cube",
        },
      },
      {
        type: "portableBlock",
        position: { x: 0, y: 0, z: 2 },
        config: {
          style: "cube",
        },
      },
      {
        type: "conveyor",
        position: { x: 0, y: 0, z: 0 },
        config: { direction: "away" },
      },
      {
        type: "conveyor",
        position: { x: 0, y: 1, z: 0 },
        config: { direction: "away" },
      },

      // stack of items to test pushing stacks:
      {
        type: "movableBlock",
        config: { style: "anvil", movement: "free" },
        position: { x: 10, y: 7, z: 0 },
      },
      {
        type: "movableBlock",
        config: { style: "anvil", movement: "free" },
        position: { x: 10, y: 7, z: 1 },
      },
      {
        type: "movableBlock",
        config: { style: "anvil", movement: "free" },
        position: { x: 10, y: 7, z: 2 },
      },
      {
        type: "movableBlock",
        config: { style: "anvil", movement: "free" },
        position: { x: 10, y: 7, z: 3 },
      },
      {
        type: "movableBlock",
        config: { style: "anvil", movement: "free" },
        position: { x: 10, y: 7, z: 4 },
      },
      {
        type: "movableBlock",
        config: { style: "anvil", movement: "free" },
        position: { x: 10, y: 7, z: 5 },
      },
      // to test disappearing barriers:
      {
        type: "barrier",
        config: { axis: "x", disappearing: false },
        position: { x: 10, y: 6, z: 0 },
      },
      {
        type: "barrier",
        config: { axis: "x", disappearing: true },
        position: { x: 10, y: 6, z: 1 },
      },
      {
        type: "barrier",
        config: { axis: "x", disappearing: false },
        position: { x: 10, y: 8, z: 0 },
      },
      {
        type: "barrier",
        config: { axis: "x", disappearing: true },
        position: { x: 10, y: 8, z: 1 },
      },
      // tests for lifts:
      {
        type: "lift",
        config: { bottom: 0, top: 11 },
        position: { x: 0, y: 4, z: 3 },
      },
      {
        type: "baddie",
        config: {
          which: "american-football-head",
          movement: "back-forth",
          activated: true,
          startDirection: "left",
          style: "starsAndStripes",
        },
        position: { x: 0, y: 4, z: 1 },
      },
      {
        type: "block",
        config: {
          disappearing: true,
          style: "organic",
        },
        position: { x: 0, y: 4, z: 0 },
      },
      {
        type: "pickup",
        config: { gives: "donuts" },
        position: { x: 0, y: 4, z: 9 },
      },
      {
        type: "lift",
        config: { bottom: 0, top: 11 },
        position: { x: 1, y: 4, z: 2 },
      },
      {
        type: "pickup",
        config: { gives: "hooter" },
        position: { x: 1, y: 4, z: 9 },
      },
      {
        type: "lift",
        config: { bottom: 0, top: 11 },
        position: { x: 2, y: 4, z: 1 },
      },
      {
        type: "lift",
        config: { bottom: 0, top: 11 },
        position: { x: 3, y: 4, z: 0 },
      },
      // blocks provide a lift lobby:
      {
        type: "block",
        config: { style: "organic", disappearing: false },
        position: { x: 3, y: 5, z: 8 },
      },
      {
        type: "block",
        config: { style: "organic", disappearing: false },
        position: { x: 3, y: 3, z: 8 },
      },
      // charles and joystick tests
      {
        type: "charles",
        id: "ch1",
        config: {},
        position: { x: 3, y: 3, z: 9 },
      },
      {
        type: "charles",
        id: "ch2",
        config: {},
        position: { x: 3, y: 5, z: 9 },
      },
      {
        type: "pickup",
        // a coronation!
        config: { gives: "crown", planet: "penitentiary" },
        position: { x: 3, y: 5, z: 11 },
      },
      {
        type: "joystick",
        config: { controls: ["ch2"] },
        position: { x: 5, y: 3, z: 0 },
      },
      {
        type: "block",
        config: { style: "artificial", disappearing: false },
        position: { x: 4, y: 3, z: 0 },
      },
      // baddies that push the joysticks!
      {
        type: "baddie",
        config: {
          which: "american-football-head",
          movement: "back-forth",
          startDirection: "away",
          style: "greenAndPink",
          activated: true,
        },
        position: { x: 4, y: 2, z: 0 },
      },
      {
        type: "baddie",
        config: {
          which: "american-football-head",
          movement: "back-forth",
          startDirection: "away",
          style: "greenAndPink",
          activated: true,
        },
        position: { x: 4, y: 0, z: 0 },
      },
      {
        type: "joystick",
        config: { controls: ["ch1"] },
        position: { x: 4, y: 1, z: 0 },
      },
      // circle of conveyors
      {
        type: "conveyor",
        config: { direction: "away" },
        position: { x: 3, y: 6, z: 0 },
      },
      {
        type: "conveyor",
        config: { direction: "away" },
        position: { x: 3, y: 7, z: 0 },
      },
      {
        type: "conveyor",
        config: { direction: "away" },
        position: { x: 3, y: 8, z: 0 },
      },
      {
        type: "conveyor",
        config: { direction: "left" },
        position: { x: 3, y: 9, z: 0 },
      },
      {
        type: "conveyor",
        config: { direction: "left" },
        position: { x: 4, y: 9, z: 0 },
      },
      {
        type: "conveyor",
        config: { direction: "left" },
        position: { x: 5, y: 9, z: 0 },
      },
      {
        type: "conveyor",
        config: { direction: "towards" },
        position: { x: 6, y: 9, z: 0 },
      },
      {
        type: "conveyor",
        config: { direction: "towards" },
        position: { x: 6, y: 8, z: 0 },
      },
      {
        type: "conveyor",
        config: { direction: "towards" },
        position: { x: 6, y: 7, z: 0 },
      },
      {
        type: "conveyor",
        config: { direction: "right" },
        position: { x: 6, y: 6, z: 0 },
      },
      {
        type: "conveyor",
        config: { direction: "right" },
        position: { x: 5, y: 6, z: 0 },
      },
      {
        type: "conveyor",
        config: { direction: "right" },
        position: { x: 4, y: 6, z: 0 },
      },
      {
        type: "conveyor",
        config: { direction: "right" },
        position: { x: 4, y: 6, z: 5 },
      },
      {
        type: "baddie",
        config: {
          which: "cyberman",
          movement: "towards-on-shortest-axis-xy4",
          activated: true,
          startDirection: "away",
        },
        position: { x: 4, y: 8, z: 5 },
      },
      {
        type: "pickup",
        config: { gives: "extra-life" },
        position: { x: 4, y: 6, z: 9 },
      },
      {
        type: "pickup",
        config: { gives: "bag" },
        position: { x: 4, y: 6, z: 10 },
      },
      {
        type: "pickup",
        config: { gives: "reincarnation" },
        position: { x: 4, y: 6, z: 13 },
      },
      {
        type: "pickup",
        config: { gives: "crown", planet: "egyptus" },
        position: { x: 4, y: 6, z: 1 },
      },
      {
        type: "portableBlock",
        config: { style: "drum" },
        position: { x: 4, y: 6, z: 2 },
      },
      {
        type: "portableBlock",
        config: { style: "cube" },
        position: { x: 5, y: 6, z: 10 },
      },
      {
        type: "block",
        config: { style: "organic", disappearing: false },
        position: { x: 6, y: 6, z: 2 },
      },
      // run of disappearing blocks:
      {
        type: "block",
        config: { style: "organic", disappearing: false },
        position: { x: 8, y: 0, z: 0 },
      },
      {
        type: "block",
        config: { style: "organic", disappearing: true },
        position: { x: 9, y: 0, z: 0 },
      },
      {
        type: "block",
        config: { style: "organic", disappearing: true },
        position: { x: 9, y: 0, z: 1 },
      },
      {
        type: "block",
        config: { style: "organic", disappearing: true },
        position: { x: 9, y: 0, z: 3 },
      },
      {
        type: "block",
        config: { style: "organic", disappearing: true },
        position: { x: 10, y: 0, z: 0 },
      },
      {
        type: "block",
        config: { style: "organic", disappearing: true },
        position: { x: 11, y: 0, z: 0 },
      },

      {
        type: "baddie",
        config: {
          which: "american-football-head",
          movement: "back-forth",
          startDirection: "right",
          style: "starsAndStripes",
          activated: true,
        },
        position: { x: 1, y: 7, z: 0 },
      },
      {
        type: "baddie",
        config: {
          which: "american-football-head",
          movement: "back-forth",
          startDirection: "right",
          style: "greenAndPink",
          activated: true,
        },
        position: { x: 2, y: 8, z: 0 },
      },
      {
        type: "baddie",
        config: {
          which: "american-football-head",
          movement: "back-forth",
          startDirection: "away",
          style: "starsAndStripes",
          activated: true,
        },
        position: { x: 1, y: 8, z: 0 },
      },
      {
        type: "movableBlock",
        config: {
          style: "anvil",
          movement: "free",
        },
        position: { x: 2, y: 6, z: 0 },
      },
      {
        type: "movableBlock",
        config: {
          style: "anvil",
          movement: "free",
        },
        position: { x: 2, y: 9, z: 0 },
      },
      {
        type: "movableBlock",
        config: {
          style: "anvil",
          movement: "free",
        },
        position: { x: 1, y: 6, z: 0 },
      },
      {
        type: "movableBlock",
        config: {
          style: "sandwich",
          movement: "free",
        },
        position: { x: 1, y: 6, z: 1 },
      },
      {
        type: "movableBlock",
        config: {
          style: "sandwich",
          movement: "free",
        },
        position: { x: 1, y: 6, z: 2 },
      },
      {
        type: "movableBlock",
        config: {
          style: "sandwich",
          movement: "free",
        },
        position: { x: 2, y: 6, z: 1 },
      },
      {
        type: "movableBlock",
        config: {
          style: "sandwich",
          movement: "free",
        },
        position: { x: 2, y: 6, z: 2 },
      },

      // some blocks for Heels to test stacking up, and ceilings to test the colliding when putting down behaviour:
      {
        type: "portableBlock",
        config: {
          style: "cube",
        },
        position: { x: 13, y: 1, z: 0 },
      },
      {
        type: "portableBlock",
        config: {
          style: "cube",
        },
        position: { x: 13, y: 1, z: 1 },
      },
      {
        type: "portableBlock",
        config: {
          style: "cube",
        },
        position: { x: 13, y: 1, z: 2 },
      },
      {
        type: "spring",
        config: {},
        position: { x: 13, y: 0, z: 0 },
      },
      {
        type: "spring",
        config: {},
        position: { x: 14, y: 0, z: 0 },
      },
      {
        type: "portableBlock",
        config: {
          style: "sticks",
        },
        position: { x: 13, y: 2, z: 0 },
      },
      {
        type: "portableBlock",
        config: {
          style: "drum",
        },
        position: { x: 13, y: 3, z: 0 },
      },
      {
        type: "pickup",
        config: {
          gives: "bag",
        },
        position: { x: 12, y: 0, z: 0 },
      },
      {
        type: "portableBlock",
        config: {
          style: "cube",
        },
        position: { x: 13, y: 4, z: 0 },
      },
      {
        type: "block",
        config: {
          style: "tower",
          disappearing: false,
        },
        position: { x: 14, y: 3, z: 0 },
      },
      {
        type: "block",
        config: {
          style: "tower",
          disappearing: false,
        },
        position: { x: 14, y: 3, z: 1 },
      },
      {
        type: "portableBlock",
        config: {
          style: "drum",
        },
        position: { x: 13.5, y: 3, z: 2 },
      },
      {
        type: "block",
        config: {
          style: "tower",
          disappearing: false,
        },
        position: { x: 13, y: 5, z: 0 },
      },
      {
        type: "lift",
        config: {
          top: 2,
          bottom: 1,
        },
        position: { x: 13, y: 6, z: 1 },
      },
      {
        type: "block",
        config: {
          style: "tower",
          disappearing: false,
        },
        position: { x: 13, y: 7, z: 0 },
      },
      {
        type: "block",
        config: {
          style: "tower",
          disappearing: false,
        },
        position: { x: 13, y: 5, z: 1 },
      },
      {
        type: "block",
        config: {
          style: "organic",
          disappearing: false,
        },
        position: { x: 13, y: 5, z: 2 },
      },
      {
        type: "block",
        config: {
          style: "organic",
          disappearing: false,
        },
        position: { x: 13, y: 4, z: 2 },
      },
      {
        type: "block",
        config: {
          style: "organic",
          disappearing: false,
        },
        position: { x: 13, y: 4, z: 3 },
      },
      {
        type: "block",
        config: {
          style: "organic",
          disappearing: false,
        },
        position: { x: 13, y: 3, z: 3 },
      },
      {
        type: "portableBlock",
        config: {
          style: "cube",
        },
        position: { x: 13, y: 3, z: 4 },
      },

      // test sliding physics
      {
        type: "ball",
        config: {},
        position: { x: 7, y: 4, z: 0 },
      },
      {
        type: "ball",
        config: {},
        position: { x: 7, y: 2, z: 0 },
      },
      {
        type: "ball",
        config: {},
        position: { x: 9, y: 4, z: 0 },
      },
      {
        type: "ball",
        config: {},
        position: { x: 10, y: 4, z: 0 },
      },
      {
        type: "baddie",
        id: "t2",
        config: {
          which: "turtle",
          movement: "clockwise",
          startDirection: "left",
          activated: true,
        },
        position: { x: 12, y: 12, z: 0 },
      },
      {
        type: "baddie",
        id: "t1",
        config: {
          which: "turtle",
          movement: "clockwise",
          startDirection: "towards",
          activated: false,
        },
        position: { x: 16, y: 13, z: 1 },
      },
      // the turtle should eventually deactivate himself!
      {
        type: "switch",
        config: {
          activates: {
            t1: {
              left: { activated: false },
              right: { activated: true },
            },
          },
        },
        position: { x: 17, y: 12, z: 0 },
      },

      // these three blocks have a cyclic rendering dependency - there is no way to arrange them using painter's algorithm:
      // what's more, they all have substantial overlap that looks bad if not rendered correctly!
      {
        type: "block",
        config: { style: "artificial", disappearing: false },
        position: { x: 15.5, y: 8, z: 0 },
      },
      {
        type: "block",
        config: { style: "artificial", disappearing: false },
        position: { x: 15, y: 9, z: 0.5 },
      },
      {
        type: "block",
        config: { style: "artificial", disappearing: false },
        position: { x: 16, y: 8.5, z: 1 },
      },
      // some deadly step to check shields on:
      {
        type: "pickup",
        config: { gives: "shield" },
        position: { x: 17, y: 1, z: 0 },
      },
      {
        type: "deadlyBlock",
        config: { style: "volcano" },
        position: { x: 17, y: 2, z: 0 },
      },
      {
        type: "deadlyBlock",
        config: { style: "volcano" },
        position: { x: 17, y: 3, z: 1 },
      },
      {
        type: "deadlyBlock",
        config: { style: "volcano" },
        position: { x: 17, y: 4, z: 2 },
      },
      {
        type: "deadlyBlock",
        config: { style: "volcano" },
        position: { x: 17, y: 5, z: 3 },
      },
    ]),
  } satisfies RoomJson<"egyptus", TestCampaignRoomId, string>,

  renderEverything: {
    size: { x: 18, y: 18 },
    walls: generateWalls({ x: 18, y: 18 }, "bookworld"),
    floor: "bookworld",

    id: "renderEverything",
    items: keyItems([
      {
        type: "door",
        config: { toRoom: "laboratory", direction: "away" },
        position: { x: 1, y: 11, z: 4 },
      },
      {
        type: "block",
        config: { style: "organic", disappearing: false },
        position: { x: 1, y: 10, z: 3 },
      },
      {
        type: "block",
        config: { style: "organic", disappearing: false },
        position: { x: 0, y: 10, z: 3 },
      },
      {
        type: "block",
        config: { style: "organic", disappearing: false },
        position: { x: 2, y: 10, z: 3 },
      },
      {
        type: "baddie",
        config: {
          activated: true,
          which: "dalek",
          movement: "patrol-randomly-diagonal",
        },
        position: { x: 1, y: 1, z: 0 },
      },
      {
        type: "baddie",
        config: {
          activated: true,
          which: "bubble-robot",
          movement: "patrol-randomly-xy8",
        },
        position: { x: 1, y: 10, z: 0 },
      },

      {
        type: "baddie",
        config: {
          activated: true,
          which: "american-football-head",
          movement: "back-forth",
          style: "greenAndPink",
          startDirection: "away",
        },
        position: { x: 1, y: 3, z: 0 },
      },
      {
        type: "baddie",
        config: {
          activated: true,
          which: "american-football-head",
          movement: "back-forth",
          style: "starsAndStripes",
          startDirection: "right",
        },
        position: { x: 1, y: 5, z: 0 },
      },
      {
        type: "baddie",
        config: {
          activated: true,
          which: "american-football-head",
          movement: "back-forth",
          style: "greenAndPink",
          startDirection: "left",
        },
        position: { x: 3, y: 5, z: 0 },
      },
      {
        type: "baddie",
        config: {
          activated: true,
          which: "american-football-head",
          movement: "back-forth",

          style: "starsAndStripes",
          startDirection: "towards",
        },
        position: { x: 3, y: 7, z: 0 },
      },
      {
        type: "baddie",
        config: {
          activated: true,
          which: "cyberman",
          movement: "towards-on-shortest-axis-xy4",
          startDirection: "towards",
        },
        position: { x: 6, y: 7, z: 0 },
      },
      {
        type: "deadlyBlock",
        config: { style: "toaster" },
        position: { x: 4, y: 10, z: 0 },
      },
      {
        type: "deadlyBlock",
        config: { style: "spikes" },
        position: { x: 2, y: 10, z: 0 },
      },
      {
        type: "baddie",
        config: {
          activated: false,
          wakes: false,
          which: "cyberman",
          movement: "towards-on-shortest-axis-xy4",
          startDirection: "towards",
        },
        position: { x: 4, y: 10, z: 1 },
      },
      {
        type: "baddie",
        config: {
          activated: true,
          which: "turtle",
          movement: "clockwise",
          startDirection: "away",
        },
        position: { x: 0, y: 8, z: 0 },
      },
      {
        type: "baddie",
        config: {
          activated: true,
          which: "turtle",
          movement: "clockwise",
          startDirection: "towards",
        },
        position: { x: 0, y: 6, z: 0 },
      },
      {
        type: "baddie",
        config: {
          activated: true,
          which: "turtle",
          movement: "clockwise",
          startDirection: "left",
        },
        position: { x: 0, y: 4, z: 0 },
      },
      {
        type: "baddie",
        config: {
          activated: true,
          which: "helicopter-bug",
          movement: "patrol-randomly-xy8",
        },
        position: { x: 0, y: 1, z: 0 },
      },
      {
        type: "baddie",
        config: {
          activated: true,
          which: "headless-base",
          movement: "towards-tripped-on-axis-xy4",
        },
        position: { x: 10, y: 4, z: 0 },
      },
      {
        type: "baddie",
        config: {
          activated: true,
          which: "monkey",
          movement: "patrol-randomly-xy4",
        },
        position: { x: 9, y: 2, z: 0 },
      },
      {
        type: "baddie",
        config: {
          activated: true,
          which: "elephant",
          movement: "patrol-randomly-xy4",
        },
        position: { x: 9, y: 10, z: 0 },
      },
      {
        type: "baddie",
        config: {
          activated: true,
          which: "flying-ball",
          movement: "towards-when-in-square-xy8",
        },
        position: { x: 0, y: 10, z: 0 },
      },
      {
        type: "baddie",
        config: {
          activated: true,
          which: "emperor",
          movement: "towards-when-in-square-xy8",
        },
        position: { x: 0, y: 14, z: 4 },
      },
      {
        type: "baddie",
        config: {
          activated: true,
          which: "computer-bot",
          movement: "patrol-randomly-xy4",
        },
        position: { x: 6, y: 0, z: 0 },
      },
      {
        type: "charles",
        config: {},
        position: { x: 10, y: 6, z: 0 },
      },
      {
        type: "block",
        config: { style: "artificial", disappearing: false },
        position: { x: 3, y: 3, z: 0 },
      },
      {
        type: "book",
        config: { slider: true },
        position: { x: 4, y: 2, z: 0 },
      },
      {
        type: "book",
        config: {},
        position: { x: 4, y: 2, z: 1 },
      },
      {
        type: "block",
        config: { style: "organic", disappearing: false },
        position: { x: 5, y: 5, z: 0 },
      },
      {
        type: "block",
        config: { style: "tower", disappearing: false },
        position: { x: 7, y: 7, z: 0 },
      },
      {
        type: "block",
        config: { style: "tower", disappearing: false },
        position: { x: 7, y: 7, z: 1 },
      },
      {
        type: "movableBlock",
        config: { style: "anvil", movement: "free" },
        position: { x: 9, y: 7, z: 0 },
      },
      {
        type: "conveyor",
        config: { direction: "away" },
        position: { x: 10, y: 7, z: 2 },
      },
      {
        type: "conveyor",
        config: { direction: "left" },
        position: { x: 10, y: 4, z: 2 },
      },
      {
        type: "movableBlock",
        config: { style: "sandwich", movement: "free" },
        position: { x: 10, y: 9, z: 0 },
      },
      {
        type: "slidingDeadly",
        config: { style: "puck" },
        position: { x: 1, y: 0, z: 0 },
      },
      {
        type: "slidingDeadly",
        config: { style: "puck" },
        position: { x: 7, y: 0, z: 0 },
      },
      {
        type: "pickup",
        config: { gives: "extra-life" },
        position: { x: 9, y: 5, z: 0 },
      },
      {
        type: "pickup",
        config: { gives: "bag" },
        position: { x: 9, y: 3, z: 0 },
      },
      {
        type: "pickup",
        config: { gives: "donuts" },
        position: { x: 7, y: 3, z: 0 },
      },
      {
        type: "pickup",
        config: { gives: "hooter" },
        position: { x: 7, y: 5, z: 0 },
      },
      {
        type: "pickup",
        config: { gives: "reincarnation" },
        position: { x: 7, y: 4, z: 0 },
      },
      {
        type: "moveableDeadly",
        config: { style: "deadFish" },
        position: { x: 5, y: 4, z: 0 },
      },
      // {
      //   type: "joystick",
      //   config: {},
      //   position: { x: 7, y: 9, z: 0 },
      // },
      {
        type: "portableBlock",
        config: { style: "cube" },
        position: { x: 5, y: 9, z: 0 },
      },
      {
        type: "portableBlock",
        config: { style: "cube" },
        position: { x: 5, y: 9, z: 1 },
      },
      {
        type: "portableBlock",
        config: { style: "drum" },
        position: { x: 3, y: 9, z: 0 },
      },
      {
        type: "portableBlock",
        config: { style: "sticks" },
        position: { x: 1, y: 9, z: 0 },
      },
      {
        type: "lift",
        config: { top: 9, bottom: 0 },
        position: { x: 1, y: 7, z: 0 },
      },
      {
        type: "barrier",
        config: { axis: "y", disappearing: false },
        position: { x: 6, y: 1, z: 0 },
      },
      {
        type: "barrier",
        config: { axis: "x", disappearing: false },
        position: { x: 8, y: 1, z: 0 },
      },
      {
        type: "sceneryPlayer",
        config: { which: "head" },
        position: { x: 3, y: 1, z: 0 },
      },
      {
        type: "sceneryPlayer",
        config: { which: "heels" },
        position: { x: 5, y: 1, z: 0 },
      },
    ]),
    planet: "bookworld",
    color: { hue: "magenta", shade: "basic" },
  },
  ...colourRooms(),
} as Campaign<TestCampaignRoomId>["rooms"];

export const testCampaign = {
  rooms,
} as Campaign<TestCampaignRoomId>;
