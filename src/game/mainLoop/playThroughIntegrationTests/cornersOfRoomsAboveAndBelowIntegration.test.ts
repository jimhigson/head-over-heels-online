import { beforeEach, expect, test } from "vitest";

import {
  basicCampaign,
  firstRoomId,
  type ItemsInTestRoomJson,
  secondRoomId,
  setupGameForCampaign,
  type TestRoomId,
} from "../../../_testUtils/basicRoom";
import { headState, item } from "../../../_testUtils/characterState";
import { resetStore } from "../../../_testUtils/initStoreForTests";
import type { GameStateWithMockInput } from "../../../_testUtils/MockInputStateTracker";
import { playGameThrough } from "../../../_testUtils/playGameThrough";
import { currentRoomIs } from "../../../_testUtils/playThroughUntilHelpers";
import type { JsonItem } from "../../../model/json/JsonItem";
import { roomItemsIterable } from "../../../model/roomItemsInPlayIterators";
import { unitVectors } from "../../../utils/vectors/unitVectors";
import {
  type DirectionXy4,
  type Xy,
  type Xyz,
  xyzEqual,
} from "../../../utils/vectors/vectors";
import { selectCurrentRoomState } from "../../gameState/gameStateSelectors/selectCurrentRoomState";
import { blockSizePx } from "../../physics/mechanicsConstants";

beforeEach(() => {
  resetStore();
});

type Corner = { x: "max" | "min"; y: "max" | "min" };

const corners: Corner[] = [
  { x: "min", y: "min" },
  { x: "max", y: "min" },
  { x: "min", y: "max" },
  { x: "max", y: "max" },
];

type Passing = "falling" | "rising";

type PassingCase = {
  corner: Corner;
  passing: Passing;
};

const passingAtCorners: PassingCase[] = corners.flatMap((corner) =>
  (["falling", "rising"] as const).map((passing) => ({ corner, passing })),
);

/**
 * the corner's block, in a square room of the given size
 */
const cornerBlock = (corner: Corner, roomSize: number): Xy => ({
  x: corner.x === "min" ? 0 : roomSize - 1,
  y: corner.y === "min" ? 0 : roomSize - 1,
});

/**
 * a lift in every corner of a square room of the given size, each rising
 * into the room above
 */
const liftsInCorners = (roomSize: number): ItemsInTestRoomJson =>
  Object.fromEntries(
    corners.map((liftCorner): [string, JsonItem<"lift", TestRoomId>] => [
      `lift/${liftCorner.x}X/${liftCorner.y}Y`,
      {
        type: "lift",
        // up into the room above, as the original game's lifts do:
        config: { bottom: 0, top: 11 },
        position: { ...cornerBlock(liftCorner, roomSize), z: 0 },
      },
    ]),
  );

export type RoomsAboveAndBelowCampaignOptions = {
  /**
   * blocks along each side of the square room above, which has no floor
   */
  roomAboveSize: number;
  /**
   * blocks along each side of the square room below, which has a lift in
   * every corner
   */
  roomBelowSize: number;
  /**
   * head starts in the corner of the room above to fall, or on the corner's
   * lift in the room below to rise
   */
  passing: Passing;
  corner: Corner;
};

/**
 * two square rooms, first above second
 */
const roomsAboveAndBelowCampaign = ({
  roomAboveSize,
  roomBelowSize,
  passing,
  corner,
}: RoomsAboveAndBelowCampaignOptions) => {
  const head = (
    roomSize: number,
    z: number,
  ): JsonItem<"player", TestRoomId> => ({
    type: "player",
    config: { which: "head" },
    position: { ...cornerBlock(corner, roomSize), z },
  });

  return basicCampaign({
    firstRoomItems: {
      floor: {
        type: "floor",
        config: {
          floorType: "none",
          times: { x: roomAboveSize, y: roomAboveSize },
        },
        position: { x: 0, y: 0, z: 0 },
      },
      ...(passing === "falling" && { head: head(roomAboveSize, 0) }),
    },
    firstRoomProps: {
      meta: { subRooms: { "*": { below: { room: secondRoomId } } } },
    },
    secondRoomItems: {
      floor: {
        type: "floor",
        config: {
          floorType: "standable",
          scenery: "blacktooth",
          times: { x: roomBelowSize, y: roomBelowSize },
        },
        position: { x: 0, y: 0, z: 0 },
      },
      ...liftsInCorners(roomBelowSize),
      // a block up, to drop onto the lift:
      ...(passing === "rising" && { head: head(roomBelowSize, 1) }),
    },
    secondRoomProps: {
      meta: { subRooms: { "*": { above: { room: firstRoomId } } } },
    },
  });
};

/**
 * head's gaps, in px, from the two walls of his room meeting at the corner -
 * negative when he is beyond them
 */
const headGapsFromCornerWalls = (
  gameState: GameStateWithMockInput,
  corner: Corner,
): Xy => {
  const roomItems = selectCurrentRoomState(gameState)!.items;
  const wallBox = (direction: DirectionXy4) =>
    roomItemsIterable(roomItems)
      .filter((roomItem) => roomItem.type === "wall")
      .find((wall) => xyzEqual(wall.config.direction, unitVectors[direction]))!
      .state.box;
  const { x, y, xd, yd } = headState(gameState).box;
  const xWall = wallBox(corner.x === "min" ? "right" : "left");
  const yWall = wallBox(corner.y === "min" ? "towards" : "away");

  return {
    x: corner.x === "min" ? x - (xWall.x + xWall.xd) : xWall.x - (x + xd),
    y: corner.y === "min" ? y - (yWall.y + yWall.yd) : yWall.y - (y + yd),
  };
};

test.for<PassingCase>(passingAtCorners)(
  "a 6×6 room above an 8×8 room: $passing at the $corner.x x, $corner.y y corner",
  ({ corner, passing }) => {
    const gameState = setupGameForCampaign(
      roomsAboveAndBelowCampaign({
        roomAboveSize: 6,
        roomBelowSize: 8,
        passing,
        corner,
      }),
    );
    const gapsBefore = headGapsFromCornerWalls(gameState, corner);

    playGameThrough(gameState, {
      until: currentRoomIs(passing === "falling" ? secondRoomId : firstRoomId),
      failAfter: 10_000,
    });

    const { position: floorPosition, aabb: floorAabb } = item<"floor">(
      gameState,
      "floor",
    )!.config.naturalFootprint;
    const { x, y, xd, yd } = headState(gameState).box;
    // over the floor, not out of bounds:
    expect.soft(x).toBeGreaterThanOrEqual(floorPosition.x);
    expect.soft(x + xd).toBeLessThanOrEqual(floorPosition.x + floorAabb.x);
    expect.soft(y).toBeGreaterThanOrEqual(floorPosition.y);
    expect.soft(y + yd).toBeLessThanOrEqual(floorPosition.y + floorAabb.y);
    expect(headGapsFromCornerWalls(gameState, corner)).toEqual<Xy>(
      passing === "falling" ?
        // into the larger room, a block further in from its walls:
        { x: gapsBefore.x + blockSizePx.x, y: gapsBefore.y + blockSizePx.y }
        // into the smaller room, against its walls:
      : { x: 0, y: 0 },
    );
  },
);

test.for<PassingCase>(passingAtCorners)(
  "an 8×8 room above a 6×6 room: $passing at the $corner.x x, $corner.y y corner",
  ({ corner, passing }) => {
    const gameState = setupGameForCampaign(
      roomsAboveAndBelowCampaign({
        roomAboveSize: 8,
        roomBelowSize: 6,
        passing,
        corner,
      }),
    );
    const gapsBefore = headGapsFromCornerWalls(gameState, corner);

    playGameThrough(gameState, {
      until: currentRoomIs(passing === "falling" ? secondRoomId : firstRoomId),
      failAfter: 10_000,
    });

    const { position: floorPosition, aabb: floorAabb } = item<"floor">(
      gameState,
      "floor",
    )!.config.naturalFootprint;
    const { x, y, xd, yd } = headState(gameState).box;
    // over the floor, not out of bounds:
    expect.soft(x).toBeGreaterThanOrEqual(floorPosition.x);
    expect.soft(x + xd).toBeLessThanOrEqual(floorPosition.x + floorAabb.x);
    expect.soft(y).toBeGreaterThanOrEqual(floorPosition.y);
    expect.soft(y + yd).toBeLessThanOrEqual(floorPosition.y + floorAabb.y);
    expect(headGapsFromCornerWalls(gameState, corner)).toEqual<Xy>(
      passing === "falling" ?
        // into the smaller room, against its walls:
        { x: 0, y: 0 }
        // into the larger room, a block further in from its walls:
      : { x: gapsBefore.x + blockSizePx.x, y: gapsBefore.y + blockSizePx.y },
    );
  },
);

test.for<PassingCase>(passingAtCorners)(
  "an 8×8 room above an 8×8 room: $passing at the $corner.x x, $corner.y y corner",
  ({ corner, passing }) => {
    const gameState = setupGameForCampaign(
      roomsAboveAndBelowCampaign({
        roomAboveSize: 8,
        roomBelowSize: 8,
        passing,
        corner,
      }),
    );
    const gapsBefore = headGapsFromCornerWalls(gameState, corner);

    playGameThrough(gameState, {
      until: currentRoomIs(passing === "falling" ? secondRoomId : firstRoomId),
      failAfter: 10_000,
    });

    const { position: floorPosition, aabb: floorAabb } = item<"floor">(
      gameState,
      "floor",
    )!.config.naturalFootprint;
    const { x, y, xd, yd } = headState(gameState).box;
    // over the floor, not out of bounds:
    expect.soft(x).toBeGreaterThanOrEqual(floorPosition.x);
    expect.soft(x + xd).toBeLessThanOrEqual(floorPosition.x + floorAabb.x);
    expect.soft(y).toBeGreaterThanOrEqual(floorPosition.y);
    expect.soft(y + yd).toBeLessThanOrEqual(floorPosition.y + floorAabb.y);
    // the same distance from the walls:
    expect(headGapsFromCornerWalls(gameState, corner)).toEqual<Xy>(gapsBefore);
  },
);

test.for<PassingCase>(passingAtCorners)(
  "a 6×6 room above a 6×6 room: $passing at the $corner.x x, $corner.y y corner",
  ({ corner, passing }) => {
    const gameState = setupGameForCampaign(
      roomsAboveAndBelowCampaign({
        roomAboveSize: 6,
        roomBelowSize: 6,
        passing,
        corner,
      }),
    );
    const gapsBefore = headGapsFromCornerWalls(gameState, corner);

    playGameThrough(gameState, {
      until: currentRoomIs(passing === "falling" ? secondRoomId : firstRoomId),
      failAfter: 10_000,
    });

    const { position: floorPosition, aabb: floorAabb } = item<"floor">(
      gameState,
      "floor",
    )!.config.naturalFootprint;
    const { x, y, xd, yd } = headState(gameState).box;
    // over the floor, not out of bounds:
    expect.soft(x).toBeGreaterThanOrEqual(floorPosition.x);
    expect.soft(x + xd).toBeLessThanOrEqual(floorPosition.x + floorAabb.x);
    expect.soft(y).toBeGreaterThanOrEqual(floorPosition.y);
    expect.soft(y + yd).toBeLessThanOrEqual(floorPosition.y + floorAabb.y);
    // the same distance from the walls:
    expect(headGapsFromCornerWalls(gameState, corner)).toEqual<Xy>(gapsBefore);
  },
);

const standableFloor = (
  position: Xy,
  times: Xy,
): JsonItem<"floor", TestRoomId> => ({
  type: "floor",
  config: { floorType: "standable", scenery: "blacktooth", times },
  position: { ...position, z: 0 },
});

/**
 * a 2×2 floor with no floor, to fall through
 */
const holeFloor = (position: Xy): JsonItem<"floor", TestRoomId> => ({
  type: "floor",
  config: { floorType: "none", times: { x: 2, y: 2 } },
  position: { ...position, z: 0 },
});

/**
 * an 8×8 room with a hole in its floor, above a 6×6 room with a lift in every
 * corner
 */
const roomWithHoleAboveCampaign = (
  /**
   * the floors of the room above: a "hole", and "floor" (in place of the
   * basic room's) with any others filling in the rest
   */
  roomAboveFloors: ItemsInTestRoomJson,
  /**
   * where head starts, in the room above or below
   */
  head: { room: TestRoomId; position: Xyz },
) => {
  const headItem: ItemsInTestRoomJson = {
    head: {
      type: "player",
      config: { which: "head" },
      position: head.position,
    },
  };

  return basicCampaign({
    firstRoomItems: {
      ...roomAboveFloors,
      ...(head.room === firstRoomId && headItem),
    },
    firstRoomProps: {
      meta: { subRooms: { "*": { below: { room: secondRoomId } } } },
    },
    secondRoomItems: {
      floor: standableFloor({ x: 0, y: 0 }, { x: 6, y: 6 }),
      ...liftsInCorners(6),
      ...(head.room === secondRoomId && headItem),
    },
    secondRoomProps: {
      meta: { subRooms: { "*": { above: { room: firstRoomId } } } },
    },
  });
};

test.for<Corner>(corners)(
  "an 8×8 room with a 2×2 hole in the middle of its floor, above a 6×6 room: falling from the hole's $x x, $y y corner lands in the middle of the room below",
  (corner) => {
    const gameState = setupGameForCampaign(
      roomWithHoleAboveCampaign(
        {
          // four floors around the hole:
          floor: standableFloor({ x: 0, y: 0 }, { x: 8, y: 3 }),
          "floor/maxY": standableFloor({ x: 0, y: 5 }, { x: 8, y: 3 }),
          "floor/minX": standableFloor({ x: 0, y: 3 }, { x: 3, y: 2 }),
          "floor/maxX": standableFloor({ x: 5, y: 3 }, { x: 3, y: 2 }),
          hole: holeFloor({ x: 3, y: 3 }),
        },
        {
          room: firstRoomId,
          position: {
            x: corner.x === "min" ? 3 : 4,
            y: corner.y === "min" ? 3 : 4,
            z: 0,
          },
        },
      ),
    );
    const { x: departedX, y: departedY } = headState(gameState).box;
    const { position: holePosition } = item<"floor">(gameState, "hole")!.config
      .naturalFootprint;

    playGameThrough(gameState, {
      until: currentRoomIs(secondRoomId),
      failAfter: 10_000,
    });

    const { position: floorPosition, aabb: floorAabb } = item<"floor">(
      gameState,
      "floor",
    )!.config.naturalFootprint;
    // the 2×2 square in the middle of the room below:
    const middleSquarePosition: Xy = {
      x: floorPosition.x + floorAabb.x / 2 - blockSizePx.x,
      y: floorPosition.y + floorAabb.y / 2 - blockSizePx.y,
    };
    const { x, y } = headState(gameState).box;
    // in the middle square, where he was in the hole:
    expect<Xy>({
      x: x - middleSquarePosition.x,
      y: y - middleSquarePosition.y,
    }).toEqual<Xy>({
      x: departedX - holePosition.x,
      y: departedY - holePosition.y,
    });
  },
);

test.for<Corner>(corners)(
  "an 8×8 room with a 2×2 hole in the middle of its floor, above a 6×6 room: rising from the room below's $x x, $y y corner arrives in the hole's corner",
  (corner) => {
    const gameState = setupGameForCampaign(
      roomWithHoleAboveCampaign(
        {
          // four floors around the hole:
          floor: standableFloor({ x: 0, y: 0 }, { x: 8, y: 3 }),
          "floor/maxY": standableFloor({ x: 0, y: 5 }, { x: 8, y: 3 }),
          "floor/minX": standableFloor({ x: 0, y: 3 }, { x: 3, y: 2 }),
          "floor/maxX": standableFloor({ x: 5, y: 3 }, { x: 3, y: 2 }),
          hole: holeFloor({ x: 3, y: 3 }),
        },
        {
          room: secondRoomId,
          // a block up, to drop onto the lift:
          position: { ...cornerBlock(corner, 6), z: 1 },
        },
      ),
    );

    playGameThrough(gameState, {
      until: currentRoomIs(firstRoomId),
      failAfter: 10_000,
    });

    const { position: holePosition, aabb: holeAabb } = item<"floor">(
      gameState,
      "hole",
    )!.config.naturalFootprint;
    const { x, y, xd, yd } = headState(gameState).box;
    // against the hole's edges at the corner:
    expect<Xy>({
      x:
        corner.x === "min" ?
          x - holePosition.x
        : holePosition.x + holeAabb.x - (x + xd),
      y:
        corner.y === "min" ?
          y - holePosition.y
        : holePosition.y + holeAabb.y - (y + yd),
    }).toEqual<Xy>({ x: 0, y: 0 });
  },
);

test.for<Corner>(corners)(
  "an 8×8 room with a 2×2 hole in the max x, max y corner of its floor, above a 6×6 room: falling from the hole's $x x, $y y corner lands in the middle of the room below",
  (corner) => {
    const gameState = setupGameForCampaign(
      roomWithHoleAboveCampaign(
        {
          // two floors around the hole:
          floor: standableFloor({ x: 0, y: 0 }, { x: 8, y: 6 }),
          "floor/maxY": standableFloor({ x: 0, y: 6 }, { x: 6, y: 2 }),
          hole: holeFloor({ x: 6, y: 6 }),
        },
        {
          room: firstRoomId,
          position: {
            x: corner.x === "min" ? 6 : 7,
            y: corner.y === "min" ? 6 : 7,
            z: 0,
          },
        },
      ),
    );
    const { x: departedX, y: departedY } = headState(gameState).box;
    const { position: holePosition } = item<"floor">(gameState, "hole")!.config
      .naturalFootprint;

    playGameThrough(gameState, {
      until: currentRoomIs(secondRoomId),
      failAfter: 10_000,
    });

    const { position: floorPosition, aabb: floorAabb } = item<"floor">(
      gameState,
      "floor",
    )!.config.naturalFootprint;
    // the 2×2 square in the middle of the room below:
    const middleSquarePosition: Xy = {
      x: floorPosition.x + floorAabb.x / 2 - blockSizePx.x,
      y: floorPosition.y + floorAabb.y / 2 - blockSizePx.y,
    };
    const { x, y } = headState(gameState).box;
    // in the middle square, where he was in the hole:
    expect<Xy>({
      x: x - middleSquarePosition.x,
      y: y - middleSquarePosition.y,
    }).toEqual<Xy>({
      x: departedX - holePosition.x,
      y: departedY - holePosition.y,
    });
  },
);

test.for<Corner>(corners)(
  "an 8×8 room with a 2×2 hole in the max x, max y corner of its floor, above a 6×6 room: rising from the room below's $x x, $y y corner arrives in the hole's corner",
  (corner) => {
    const gameState = setupGameForCampaign(
      roomWithHoleAboveCampaign(
        {
          // two floors around the hole:
          floor: standableFloor({ x: 0, y: 0 }, { x: 8, y: 6 }),
          "floor/maxY": standableFloor({ x: 0, y: 6 }, { x: 6, y: 2 }),
          hole: holeFloor({ x: 6, y: 6 }),
        },
        {
          room: secondRoomId,
          // a block up, to drop onto the lift:
          position: { ...cornerBlock(corner, 6), z: 1 },
        },
      ),
    );

    playGameThrough(gameState, {
      until: currentRoomIs(firstRoomId),
      failAfter: 10_000,
    });

    const { position: holePosition, aabb: holeAabb } = item<"floor">(
      gameState,
      "hole",
    )!.config.naturalFootprint;
    const { x, y, xd, yd } = headState(gameState).box;
    // against the hole's edges at the corner:
    expect<Xy>({
      x:
        corner.x === "min" ?
          x - holePosition.x
        : holePosition.x + holeAabb.x - (x + xd),
      y:
        corner.y === "min" ?
          y - holePosition.y
        : holePosition.y + holeAabb.y - (y + yd),
    }).toEqual<Xy>({ x: 0, y: 0 });
  },
);
