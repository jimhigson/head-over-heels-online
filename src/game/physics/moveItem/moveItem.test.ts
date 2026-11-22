import { beforeEach, expect, test } from "vitest";

import { setUpBasicGame } from "../../../_testUtils/basicRoom";
import { item, itemState } from "../../../_testUtils/characterState";
import { resetStore } from "../../../_testUtils/initStoreForTests";
import { selectCurrentRoomState } from "../../gameState/gameStateSelectors/selectCurrentRoomState";
import { moveItem } from "./moveItem";

beforeEach(() => {
  resetStore();
});

test("falling to exactly the top of an item lands on it", () => {
  const gameState = setUpBasicGame({
    firstRoomItems: {
      heels: {
        type: "player",
        // in the air, above the floor:
        position: { x: 2, y: 2, z: 0.5 },
        config: { which: "heels" },
      },
    },
  });
  const heelsBox = itemState<"heels">(gameState, "heels").box;
  const floorBox = itemState<"floor">(gameState, "floor").box;

  moveItem({
    subjectItem: item<"heels">(gameState, "heels")!,
    // down to exactly the top of the floor:
    posDelta: { x: 0, y: 0, z: floorBox.z + floorBox.zd - heelsBox.z },
    gameState,
    room: selectCurrentRoomState(gameState)!,
    deltaMS: 10,
    handleTouches: true,
  });

  const { standingOnItemId, collidedWith } = itemState<"heels">(
    gameState,
    "heels",
  );
  expect({
    standingOnItemId,
    collidedWithFloor: collidedWith.by.floor,
  }).toEqual({ standingOnItemId: "floor", collidedWithFloor: true });
});

test("walking to exactly against an item collides with it, without standing on it", () => {
  const gameState = setUpBasicGame({
    firstRoomItems: {
      heels: {
        type: "player",
        position: { x: 2, y: 2, z: 0 },
        config: { which: "heels" },
      },
      block: {
        type: "block",
        position: { x: 4, y: 2, z: 0 },
        config: { style: "organic" },
      },
    },
  });
  const heelsBox = itemState<"heels">(gameState, "heels").box;
  const blockBox = itemState<"block">(gameState, "block").box;

  moveItem({
    subjectItem: item<"heels">(gameState, "heels")!,
    // to exactly against the block:
    posDelta: { x: blockBox.x - (heelsBox.x + heelsBox.xd), y: 0, z: 0 },
    gameState,
    room: selectCurrentRoomState(gameState)!,
    deltaMS: 10,
    handleTouches: true,
  });

  const { standingOnItemId, collidedWith } = itemState<"heels">(
    gameState,
    "heels",
  );
  expect({
    standingOnItemId,
    collidedWithBlock: collidedWith.by.block,
  }).toEqual({ standingOnItemId: "floor", collidedWithBlock: true });
});
