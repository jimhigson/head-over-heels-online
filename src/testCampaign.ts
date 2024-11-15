import type { Campaign } from "./model/modelTypes.ts";
import { type RoomJson, type RoomWalls } from "./model/modelTypes.ts";
import type { PlanetName, Wall } from "./sprites/planets.ts";
import { planetNames, planets } from "./sprites/planets.ts";
import type { ZxSpectrumRoomColour } from "./originalGame.ts";
import { zxSpectrumRoomColours } from "./originalGame.ts";
import { keyItems } from "./utils/keyItems.ts";
import type { UnknownJsonItem } from "./model/json/JsonItem.ts";
import type { AxisXy, Xy } from "./utils/vectors.ts";

const generateWalls = <P extends PlanetName>(
  roomSize: Xy,
  planet: P,
  skip?: Record<AxisXy, number[]>,
): RoomWalls<P> => {
  const { walls } = planets[planet];

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

type ColorRoomIds = `${PlanetName}-${ZxSpectrumRoomColour}`;

export type TestCampaignRoomId =
  | "doorsRoom"
  | "zRoom"
  | "wide"
  | "deep"
  | "big"
  | "tiny"
  | ColorRoomIds;

// create matrix of rooms - one in each world/colour combination
const colourRooms = () => {
  type Entry<P extends PlanetName> = [
    ColorRoomIds,
    RoomJson<P, TestCampaignRoomId>,
  ];

  const sampleItems: UnknownJsonItem<TestCampaignRoomId>[] = [
    {
      type: "deadly-block",
      config: { style: "volcano" },
      position: { x: 6, y: 6, z: 0 },
    },
    {
      type: "block",
      config: { style: "organic" },
      position: { x: 4, y: 6, z: 0 },
    },
    {
      type: "baddie",
      config: { which: "cyberman", charging: true, startDirection: "away" },
      position: { x: 6, y: 0, z: 0 },
    },
  ];

  function* room(): Generator<Entry<PlanetName>> {
    for (let ip = 0; ip < planetNames.length; ip++) {
      const p = planetNames[ip];
      for (let ic = 0; ic < planetNames.length; ic++) {
        const c = zxSpectrumRoomColours[ic];
        yield [
          `${p}-${c}`,
          {
            size: { x: 8, y: 8 },
            walls: generateWalls({ x: 8, y: 8 }, p, { x: [4, 5], y: [4, 5] }),
            color: c,
            floorSkip: [] as Xy[],
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
                config: { toRoom: "doorsRoom" },
              },
              {
                type: "door",
                position: { x: 0, y: 0, z: 3 },
                config: {
                  direction: "towards",
                  toRoom: `${p}-${zxSpectrumRoomColours[(zxSpectrumRoomColours.length + ic - 1) % zxSpectrumRoomColours.length]}`,
                },
              },
              {
                type: "door",
                position: { x: 4, y: 8, z: 3 },
                config: {
                  direction: "away",
                  toRoom: `${p}-${zxSpectrumRoomColours[(ic + 1) % zxSpectrumRoomColours.length]}`,
                },
              },
              {
                type: "door",
                position: { x: 0, y: 4, z: 3 },
                config: {
                  direction: "right",
                  toRoom: `${planetNames[(planetNames.length + ip - 1) % planetNames.length]}-${c}`,
                },
              },
              {
                type: "door",
                position: { x: 8, y: 4, z: 3 },
                config: {
                  direction: "left",
                  toRoom: `${planetNames[(planetNames.length + ip + 1) % planetNames.length]}-${c}`,
                },
              },
              ...sampleItems,
            ]),
            id: `${p}-${c}`,
          },
        ];
      }
    }
  }
  return Object.fromEntries(room()) as Record<
    `${PlanetName}-${ZxSpectrumRoomColour}`,
    RoomJson<PlanetName, `${PlanetName}-${ZxSpectrumRoomColour}`>
  >;
};

const rooms = {
  doorsRoom: {
    size: { x: 8, y: 5 },
    walls: generateWalls({ x: 8, y: 5 }, "blacktooth"),
    floor: "blacktooth",
    floorSkip: [] as Xy[],
    id: "doorsRoom",
    items: keyItems([
      {
        type: "teleporter",
        config: { toRoom: "blacktooth-cyan" },
        position: {
          x: 1,
          y: 0,
          z: 0,
        },
      },
      {
        type: "door",
        config: { toRoom: "deep", direction: "towards" },
        position: { x: 1, y: 0, z: 0 },
      },
      {
        type: "door",
        config: { toRoom: "wide", direction: "towards" },
        position: { x: 3, y: 0, z: 1 },
      },
      {
        type: "door",
        config: { toRoom: "big", direction: "towards" },
        position: { x: 5, y: 0, z: 2 },
      },
      {
        type: "door",
        config: { toRoom: "zRoom", direction: "towards" },
        position: { x: 7, y: 0, z: 3 },
      },
    ]),
    planet: "blacktooth",
    color: "cyan",
  } satisfies RoomJson<"blacktooth", TestCampaignRoomId>,
  zRoom: {
    size: { x: 13, y: 8 },
    walls: generateWalls({ x: 13, y: 8 }, "egyptus", { x: [8, 9], y: [] }),
    floor: "deadly",
    floorSkip: [] as Xy[],
    id: "zRoom",
    items: keyItems([
      {
        type: "door",
        config: { toRoom: "doorsRoom", direction: "towards" },
        position: { x: 1, y: 0, z: 1 },
      },
      {
        type: "sceneryPlayer",
        config: { which: "head" },
        position: { x: 1.5, y: -0.9, z: 1 },
      },
      {
        type: "door",
        config: { toRoom: "doorsRoom", direction: "towards" },
        position: { x: 3, y: 0, z: 1 },
      },
      {
        type: "sceneryPlayer",
        config: { which: "heels" },
        position: { x: 3.5, y: -0.4, z: 1 },
      },
      {
        type: "door",
        config: { toRoom: "doorsRoom", direction: "towards" },
        position: { x: 5, y: 0, z: 1 },
      },
      {
        type: "sceneryPlayer",
        config: { which: "heels" },
        position: { x: 6, y: 0, z: 1 },
      },
      {
        type: "door",
        config: { toRoom: "doorsRoom", direction: "away" },
        position: { x: 8, y: 8, z: 1 },
      },
      {
        type: "sceneryPlayer",
        config: { which: "head" },
        position: { x: 8.5, y: 7.5, z: 1 },
      },

      // this block should be behind...
      {
        type: "block",
        config: { style: "organic" },
        position: { x: 5, y: 5, z: 0 },
      },
      // ...this block (because this one is on top (only just) even though it is further back)
      {
        type: "block",
        config: { style: "organic" },
        position: { x: 5.8, y: 5.8, z: 1 },
      },

      {
        type: "block",
        config: { style: "organic" },
        position: { x: 5, y: 0, z: 9 },
      },
      {
        type: "block",
        config: { style: "organic" },
        position: { x: 5, y: 0, z: 8 },
      },
      {
        type: "block",
        config: { style: "organic" },
        position: { x: 5, y: 0, z: 7 },
      },
      {
        type: "block",
        config: { style: "organic" },
        position: { x: 5, y: 0, z: 6 },
      },
      {
        type: "block",
        config: { style: "organic" },
        position: { x: 5, y: 0, z: 5 },
      },
      {
        type: "block",
        config: { style: "organic" },
        position: { x: 5, y: 0, z: 4 },
      },
      {
        type: "block",
        config: { style: "organic" },
        position: { x: 5, y: 0, z: 3 },
      },
      {
        type: "block",
        config: { style: "organic" },
        position: { x: 5, y: 0, z: 2 },
      },
      {
        type: "block",
        config: { style: "organic" },
        position: { x: 5, y: 0, z: 1 },
      },
      {
        type: "block",
        config: { style: "organic" },
        position: { x: 5, y: 0, z: 0 },
      },

      {
        type: "block",
        config: { style: "organic" },
        position: { x: 10, y: 6, z: 5 },
      },
      {
        type: "block",
        config: { style: "organic" },
        position: { x: 10, y: 6, z: 4 },
      },
      {
        type: "block",
        config: { style: "organic" },
        position: { x: 10, y: 6, z: 3 },
      },
      {
        type: "block",
        config: { style: "organic" },
        position: { x: 10, y: 6, z: 2 },
      },
      {
        type: "block",
        config: { style: "organic" },
        position: { x: 10, y: 6, z: 1 },
      },
      {
        type: "block",
        config: { style: "organic" },
        position: { x: 10, y: 6, z: 0 },
      },

      {
        type: "block",
        config: { style: "organic" },
        position: { x: 2, y: 4, z: 0 },
      },
      {
        type: "charles",
        config: {},
        position: { x: 2, y: 4, z: 1 },
      },
      {
        type: "block",
        config: { style: "organic" },
        position: { x: 0, y: 4, z: 0 },
      },
      {
        type: "charles",
        config: {},
        position: { x: 0, y: 4, z: 1 },
      },
      {
        // comes after in the list but should be drawn behind in terms of z-index:
        type: "barrier",
        config: { axis: "y" },
        position: { x: 1, y: 1, z: 2 },
      },
      {
        // comes after in the list but should be drawn behind in terms of z-index:
        type: "barrier",
        config: { axis: "y" },
        position: { x: 1, y: 2, z: 2 },
      },
      {
        // comes after in the list but should be drawn behind in terms of z-index:
        type: "barrier",
        config: { axis: "y" },
        position: { x: 1, y: 2, z: 1 },
      },
      {
        // comes after in the list but should be drawn behind in terms of z-index:
        type: "barrier",
        config: { axis: "y" },
        position: { x: 1, y: 2, z: 0 },
      },
      {
        // comes after in the list but should be drawn behind in terms of z-index:
        type: "barrier",
        config: { axis: "y" },
        position: { x: 1, y: 3, z: 3 },
      },
      {
        // comes after in the list but should be drawn behind in terms of z-index:
        type: "barrier",
        config: { axis: "y" },
        position: { x: 1, y: 4, z: 3 },
      },
      {
        // comes after in the list but should be drawn behind in terms of z-index:
        type: "barrier",
        config: { axis: "y" },
        position: { x: 1, y: 3, z: 2 },
      },
      {
        // comes after in the list but should be drawn behind in terms of z-index:
        type: "barrier",
        config: { axis: "y" },
        position: { x: 1, y: 4, z: 2 },
      },
      {
        type: "teleporter",
        config: { toRoom: "doorsRoom" },
        position: { x: 0, y: 0, z: 0 },
      },
      {
        type: "teleporter",
        config: { toRoom: "doorsRoom" },
        // normally nothing in a room is at factional values, but this makes it easy to test:
        position: { x: 0, y: 1, z: 0.5 },
      },
      {
        // comes after in the list but should be drawn behind:
        type: "teleporter",
        config: { toRoom: "doorsRoom" },
        position: { x: 1, y: 1, z: 0 },
      },
      {
        // comes after in the list but should be drawn behind in terms of z-index:
        type: "teleporter",
        config: { toRoom: "doorsRoom" },
        position: { x: 2, y: 2, z: 0 },
      },
    ]),
    planet: "egyptus",
    color: "cyan",
  } satisfies RoomJson<"egyptus", TestCampaignRoomId>,
  wide: {
    size: { x: 10, y: 3 },
    walls: generateWalls({ x: 10, y: 3 }, "market"),
    floor: "deadly",
    floorSkip: [] as Xy[],
    id: "wide",
    items: keyItems([
      {
        type: "door",
        config: { toRoom: "doorsRoom", direction: "towards" },
        position: { x: 1, y: 0, z: 1 },
      },
    ]),
    planet: "market",
    color: "cyan",
  } satisfies RoomJson<"market", TestCampaignRoomId>,
  deep: {
    size: { x: 3, y: 10 },
    walls: generateWalls({ x: 3, y: 10 }, "moonbase"),

    floor: "deadly",
    floorSkip: [] as Xy[],
    id: "deep",
    items: keyItems([
      {
        type: "door",
        config: { toRoom: "doorsRoom", direction: "towards" },
        position: { x: 1, y: 0, z: 1 },
      },
    ]),
    planet: "moonbase",
    color: "cyan",
  } satisfies RoomJson<"moonbase", TestCampaignRoomId>,
  tiny: {
    size: { x: 3, y: 3 },
    walls: generateWalls({ x: 3, y: 3 }, "egyptus"),
    floor: "deadly",
    floorSkip: [] as Xy[],
    id: "tiny",
    items: keyItems([
      {
        type: "barrier",
        config: { axis: "y" },
        position: { x: 0, y: 0, z: 0 },
      },
      /*{
        config: { which: "head" },
        position: { x: 0, y: 0, z: 5 },
        type: "player",
      },*/
    ]),
    planet: "egyptus",
    color: "yellow",
  } satisfies RoomJson<"egyptus", TestCampaignRoomId>,
  big: {
    size: { x: 11, y: 11 },
    walls: generateWalls({ x: 11, y: 11 }, "bookworld"),
    floor: "bookworld",
    floorSkip: [] as Xy[],
    id: "big",
    items: keyItems([
      {
        type: "door",
        config: { toRoom: "doorsRoom", direction: "away" },
        position: { x: 1, y: 11, z: 4 },
      },
      {
        type: "baddie",
        config: { which: "dalek" },
        position: { x: 1, y: 1, z: 0 },
      },
      {
        type: "baddie",
        config: { which: "bubble-robot" },
        position: { x: 1, y: 10, z: 0 },
      },

      {
        type: "baddie",
        config: { which: "american-football-head", startDirection: "away" },
        position: { x: 1, y: 3, z: 0 },
      },
      {
        type: "baddie",
        config: {
          which: "american-football-head",
          startDirection: "right",
        },
        position: { x: 1, y: 5, z: 0 },
      },
      {
        type: "baddie",
        config: { which: "american-football-head", startDirection: "left" },
        position: { x: 3, y: 5, z: 0 },
      },
      {
        type: "baddie",
        config: {
          which: "american-football-head",
          startDirection: "towards",
        },
        position: { x: 3, y: 7, z: 0 },
      },
      {
        type: "baddie",
        config: { which: "cyberman", charging: false },
        position: { x: 6, y: 7, z: 0 },
      },
      {
        type: "deadly-block",
        config: { style: "toaster" },
        position: { x: 4, y: 10, z: 0 },
      },
      {
        type: "deadly-block",
        config: { style: "spikes" },
        position: { x: 2, y: 10, z: 0 },
      },
      {
        type: "baddie",
        config: {
          which: "cyberman",
          startDirection: "towards",
          charging: true,
        },
        position: { x: 4, y: 10, z: 1 },
      },
      {
        type: "baddie",
        config: { which: "turtle", startDirection: "away" },
        position: { x: 0, y: 8, z: 0 },
      },
      {
        type: "baddie",
        config: { which: "turtle", startDirection: "towards" },
        position: { x: 0, y: 6, z: 0 },
      },
      {
        type: "baddie",
        config: { which: "turtle", startDirection: "left" },
        position: { x: 0, y: 4, z: 0 },
      },
      {
        type: "baddie",
        config: { which: "helicopter-bug" },
        position: { x: 0, y: 1, z: 0 },
      },
      {
        type: "baddie",
        config: { which: "headless-base" },
        position: { x: 10, y: 4, z: 0 },
      },
      {
        type: "baddie",
        config: { which: "monkey" },
        position: { x: 9, y: 2, z: 0 },
      },
      {
        type: "baddie",
        config: { which: "elephant" },
        position: { x: 9, y: 10, z: 0 },
      },
      {
        type: "baddie",
        config: { which: "flying-ball" },
        position: { x: 0, y: 10, z: 0 },
      },
      {
        type: "baddie",
        config: { which: "computer-bot" },
        position: { x: 6, y: 0, z: 0 },
      },
      {
        type: "charles",
        config: {},
        position: { x: 10, y: 6, z: 0 },
      },
      {
        type: "block",
        config: { style: "artificial" },
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
        config: { style: "organic" },
        position: { x: 5, y: 5, z: 0 },
      },
      {
        type: "block",
        config: { style: "tower" },
        position: { x: 7, y: 7, z: 0 },
      },
      {
        type: "block",
        config: { style: "tower" },
        position: { x: 7, y: 7, z: 1 },
      },
      {
        type: "movable-block",
        config: { style: "anvil" },
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
        type: "movable-block",
        config: { style: "sandwich" },
        position: { x: 10, y: 9, z: 0 },
      },
      {
        type: "movable-block",
        config: { style: "puck" },
        position: { x: 1, y: 0, z: 0 },
      },
      {
        type: "deadly-block",
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
        type: "fish",
        config: { alive: true },
        position: { x: 7, y: 4, z: 0 },
      },
      {
        type: "fish",
        config: { alive: false },
        position: { x: 5, y: 4, z: 0 },
      },
      {
        type: "joystick",
        config: {},
        position: { x: 7, y: 9, z: 0 },
      },
      {
        type: "portable-block",
        config: { style: "cube" },
        position: { x: 5, y: 9, z: 0 },
      },
      {
        type: "portable-block",
        config: { style: "cube" },
        position: { x: 5, y: 9, z: 1 },
      },
      {
        type: "portable-block",
        config: { style: "drum" },
        position: { x: 3, y: 9, z: 0 },
      },
      {
        type: "portable-block",
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
        config: { axis: "y" },
        position: { x: 6, y: 1, z: 0 },
      },
      {
        type: "barrier",
        config: { axis: "x" },
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
    color: "magenta",
  },
  ...colourRooms(),
} as Campaign<TestCampaignRoomId>["rooms"];

export const testCampaign = {
  rooms,
} as Campaign<TestCampaignRoomId>;
