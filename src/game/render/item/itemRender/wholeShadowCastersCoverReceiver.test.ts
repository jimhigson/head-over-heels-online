import { expect, test } from "vitest";

import { epsilon } from "../../../../utils/epsilon";
import { type Xyz } from "../../../../utils/vectors/vectors";
import { type CollideableItem } from "../../../collision/aabbCollision";
import {
  type Caster,
  wholeShadowCastersCoverReceiver,
} from "./wholeShadowCastersCoverReceiver";

/** build a receiver footprint from a game-like position + size */
const footprint = (
  x: number,
  y: number,
  w: number,
  h: number,
): CollideableItem => ({
  id: "test",
  state: { box: { x, y, z: 0, xd: w, yd: h, zd: 0 } },
});

/**
 * build a caster footprint. castsWholeShadows defaults to true so the geometry cases stay
 * uncluttered; an optional shadowOffset exercises coverers whose shadow falls away from
 * their position.
 */
const caster = (
  x: number,
  y: number,
  w: number,
  h: number,
  opts?: { shadowOffset?: Partial<Xyz>; castsWholeShadows?: boolean },
): Caster => ({
  id: "test",
  state: { box: { x, y, z: 0, xd: w, yd: h, zd: 0 } },
  shadowOffset: opts?.shadowOffset,
  castsWholeShadows: opts?.castsWholeShadows ?? true,
});

type Case = {
  name: string;
  receiver: CollideableItem;
  casters: Caster[];
  expected: boolean;
};

const cases: Case[] = [
  // --- coverage geometry (all casters are whole-shadow casters) ---
  {
    name: "single block overhanging on every side",
    receiver: footprint(0, 0, 1, 1),
    casters: [caster(-1, -1, 3, 3)],
    expected: true,
  },
  {
    name: "single block of identical footprint (a wall/stack, no overhang)",
    receiver: footprint(0, 0, 1, 1),
    casters: [caster(0, 0, 1, 1)],
    expected: false,
  },
  {
    name: "single block bigger in x only, flush at one end (overhang on 1 side)",
    receiver: footprint(0, 0, 1, 1),
    casters: [caster(0, 0, 2, 1)],
    expected: false,
  },
  {
    name: "item straddles the seam between two adjacent blocks - neither covers it alone",
    receiver: footprint(0, 0, 2, 1),
    casters: [caster(-1, -1, 2, 3), caster(1, -1, 2, 3)],
    expected: true,
  },
  {
    name: "two blocks with a gap strip between them",
    receiver: footprint(0, 0, 3, 1),
    casters: [caster(-1, -1, 2, 3), caster(2, -1, 2, 3)],
    expected: false,
  },
  {
    name: "item over a 2x2 block junction (cross seam, four coverers)",
    receiver: footprint(0, 0, 2, 2),
    casters: [
      caster(-1, -1, 2, 2),
      caster(1, -1, 2, 2),
      caster(-1, 1, 2, 2),
      caster(1, 1, 2, 2),
    ],
    expected: true,
  },
  {
    name: "L-shape: three of four quadrants covered, one corner left open",
    receiver: footprint(0, 0, 2, 2),
    casters: [caster(-1, -1, 2, 2), caster(1, -1, 2, 2), caster(-1, 1, 2, 2)],
    expected: false,
  },
  {
    name: "two blocks exactly tile the item, flush outer edge (no overhang)",
    receiver: footprint(0, 0, 2, 1),
    casters: [caster(0, 0, 1, 1), caster(1, 0, 1, 1)],
    expected: false,
  },
  {
    name: "two blocks tile it in x but both taller - overhang on near+far y (2 sides)",
    receiver: footprint(0, 0, 2, 1),
    casters: [caster(0, -1, 1, 3), caster(1, -1, 1, 3)],
    expected: true,
  },
  {
    name: "redundant overlapping coverers fully covering",
    receiver: footprint(0, 0, 1, 1),
    casters: [caster(-1, -1, 3, 3), caster(-0.5, -0.5, 2, 2)],
    expected: true,
  },
  {
    name: "player at fractional position straddling a 2x2 floor junction (float coords)",
    receiver: footprint(0.5, 0.5, 1, 1),
    casters: [
      caster(0, 0, 1, 1),
      caster(1, 0, 1, 1),
      caster(0, 1, 1, 1),
      caster(1, 1, 1, 1),
    ],
    expected: true,
  },
  {
    name: "coverage falls a real (2*epsilon) sliver short of a far edge",
    receiver: footprint(0, 0, 2, 1),
    casters: [caster(-1, -1, 3 - 2 * epsilon, 3)],
    expected: false,
  },
  {
    name: "coverage within epsilon of a far edge is tolerated as covered",
    receiver: footprint(0, 0, 2, 1),
    casters: [caster(-1, -1, 3 - epsilon / 2, 3)],
    expected: true,
  },
  {
    name: "coverer entirely outside the target",
    receiver: footprint(0, 0, 1, 1),
    casters: [caster(5, 5, 1, 1)],
    expected: false,
  },
  {
    // raw position [2,5]x[-1,2] misses the receiver entirely; the shadowOffset shifts it
    // left onto [0,3]x[-1,2], covering and overhanging it
    name: "coverer's shadowOffset shifts its footprint onto the target",
    receiver: footprint(0, 0, 1, 1),
    casters: [caster(2, -1, 3, 3, { shadowOffset: { x: -2 } })],
    expected: true,
  },
  {
    name: "no casters at all",
    receiver: footprint(0, 0, 1, 1),
    casters: [],
    expected: false,
  },

  // --- castsWholeShadows filtering ---
  {
    name: "a covering caster that is not a whole-shadow caster is ignored",
    receiver: footprint(0, 0, 1, 1),
    casters: [caster(-1, -1, 3, 3, { castsWholeShadows: false })],
    expected: false,
  },
  {
    name: "seam straddle where one of the two casters is not a whole-shadow caster",
    receiver: footprint(0, 0, 2, 1),
    casters: [
      caster(-1, -1, 2, 3),
      caster(1, -1, 2, 3, { castsWholeShadows: false }),
    ],
    expected: false,
  },
  {
    name: "covered by a whole-shadow caster, with an ignored non-whole-shadow caster present",
    receiver: footprint(0, 0, 1, 1),
    casters: [
      caster(-1, -1, 3, 3),
      caster(0, 0, 5, 5, { castsWholeShadows: false }),
    ],
    expected: true,
  },
];

test.for(cases)("$name", ({ receiver, casters, expected }) => {
  expect<boolean>(wholeShadowCastersCoverReceiver(casters, receiver)).toBe(
    expected,
  );
});
