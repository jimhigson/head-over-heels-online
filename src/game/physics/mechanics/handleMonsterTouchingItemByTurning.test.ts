import { type PartialDeep } from "type-fest";
import { expect, test } from "vitest";

import { type ItemInPlay } from "../../../model/ItemInPlay";
import { type RoomState } from "../../../model/RoomState";
import { type GameState } from "../../gameState/GameState";
import { type ItemTouchEvent } from "../handleTouch/ItemTouchEvent";
import {
  handleItemWithMovementTouchingItem,
  type ItemWithMovement,
} from "./movement";

type TestMonster = ItemWithMovement<string, string>;

/**
 * a patrolling monster mid-walk, with a solid item overlapping it such that the
 * mtv separates on the given axis - so the test controls whether the touch is
 * head-on (mtv along the walk) or a side-scrape (mtv perpendicular to it)
 */
const touchEvent = (
  walking: { x: number; y: number },
  /** the monster's box; the obstacle sits at a fixed position */
  monsterBox: { x: number; y: number },
): ItemTouchEvent<string, string, TestMonster> => {
  const movingItem = {
    id: "testMonster",
    type: "monster",
    config: {
      which: "monkey",
      movement: "patrol-randomly-xy4",
      activated: "on",
    },
    state: {
      activated: true,
      durationOfTouch: Number.POSITIVE_INFINITY,
      facing: {
        x: Math.sign(walking.x),
        y: Math.sign(walking.y),
        z: 0,
      },
      vels: { walking: { ...walking, z: 0 } },
      box: { ...monsterBox, z: 0, xd: 16, yd: 16, zd: 16 },
    },
  } satisfies PartialDeep<TestMonster> as TestMonster;

  const touchedItem = {
    id: "testBlock",
    type: "block",
    config: { style: "organic" },
    state: {
      box: { x: 0, y: 0, z: 0, xd: 16, yd: 16, zd: 16 },
    },
  } satisfies PartialDeep<ItemInPlay<"block", string, string>> as ItemInPlay<
    "block",
    string,
    string
  >;

  return {
    movingItem,
    touchedItem,
    room: { roomTime: 1_000 } satisfies PartialDeep<
      RoomState<string, string>
    > as RoomState<string, string>,
    gameState: {} as GameState<string>,
    deltaMS: 16,
    // unused by the turning handler:
    movementVector: { x: 0, y: 0, z: 0 },
  } satisfies PartialDeep<
    ItemTouchEvent<string, string, TestMonster>
  > as ItemTouchEvent<string, string, TestMonster>;
};

test("a head-on touch turns the monster perpendicular to its walk", () => {
  // walking +x into the obstacle: monster's left edge overlaps the block's
  // right edge by 1px, so the mtv is along x - the walk axis
  const event = touchEvent({ x: 1, y: 0 }, { x: 15, y: 0 });

  handleItemWithMovementTouchingItem(event);

  const { facing } = event.movingItem.state;
  expect(facing.x).toBe(0);
  expect(Math.abs(facing.y)).toBe(1);
});

test("a side-scrape leaves walking and facing unchanged", () => {
  // walking +y while overlapping the obstacle by 1px in x: the mtv separates
  // on x, perpendicular to the walk. The perpendicular turn strategy maps the
  // walk's x component (zero) into its output, which would degenerate facing
  // to the zero vector - the renderers cannot resolve a sprite direction from
  // that, so the touch must change nothing
  const event = touchEvent({ x: 0, y: 1 }, { x: 15, y: 8 });

  handleItemWithMovementTouchingItem(event);

  const { facing, vels } = event.movingItem.state;
  expect(facing).toEqual({ x: 0, y: 1, z: 0 });
  expect(vels.walking).toEqual({ x: 0, y: 1, z: 0 });
});
