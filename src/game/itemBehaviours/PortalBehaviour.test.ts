import { expect, test } from "vitest";

import { basicEmptyRoom } from "../../_testUtils/basicRoom";
import { itemBehaviourKey } from "../../model/ItemInPlay";
import { type UnionOfAllItemInPlayTypes } from "../../model/ItemInPlayNarrowedUnions";
import { unitVectors } from "../../utils/vectors/unitVectors";
import { boxWithSize, originXyz } from "../../utils/vectors/vectors";
import { emptyRoomJsonDirectionalIndex } from "../gameState/loadRoom/buildRoomJsonDirectionalIndex";
import { defaultBaseState } from "../gameState/loadRoom/itemDefaultStates";
import { loadItemFromJson } from "../gameState/loadRoom/loadItemFromJson";
import { loadPlayer } from "../gameState/loadRoom/loadPlayer";
import { attachBehaviourToItem } from "./attachBehaviourToItem";

const player = loadPlayer(
  {
    type: "player",
    config: { which: "head" },
    position: originXyz,
  },
  undefined,
);

const [monster] = loadItemFromJson(
  "monster",
  {
    type: "monster",
    config: {
      which: "dalek",
      movement: "patrol-randomly-diagonal",
      activated: "on",
    },
    position: originXyz,
  },
  basicEmptyRoom("firstRoom"),
  emptyRoomJsonDirectionalIndex,
);

const [pushableBlock] = loadItemFromJson(
  "mb",
  {
    type: "pushableBlock",
    config: {},
    position: originXyz,
  },
  basicEmptyRoom("firstRoom"),
  emptyRoomJsonDirectionalIndex,
);

const horizontalPortal: UnionOfAllItemInPlayTypes = attachBehaviourToItem({
  type: "portal",
  hash: 0,
  id: "portal",
  config: {
    direction: unitVectors.towards,
    toRoom: "anyRoom",
    relativePoint: originXyz,
  },
  state: { box: boxWithSize(originXyz, originXyz), ...defaultBaseState() },
});

const portalToBelow: UnionOfAllItemInPlayTypes = attachBehaviourToItem({
  type: "portal",
  hash: 0,
  id: "portal",
  config: {
    direction: unitVectors.down,
    toRoom: "anyRoom",
    relativePoint: originXyz,
  },
  state: { box: boxWithSize(originXyz, originXyz), ...defaultBaseState() },
});
const portalToAbove: UnionOfAllItemInPlayTypes = attachBehaviourToItem({
  type: "portal",
  hash: 0,
  id: "portal",
  config: {
    direction: unitVectors.up,
    toRoom: "anyRoom",
    relativePoint: originXyz,
  },
  state: { box: boxWithSize(originXyz, originXyz), ...defaultBaseState() },
});

const portalBehaviour = horizontalPortal[itemBehaviourKey];

test("horizontal portals are not solid for player", () => {
  expect(portalBehaviour.isNonSolid(horizontalPortal, player)).toBe(true);
});

test("horizontal portals are solid for monsters", () => {
  expect(portalBehaviour.isNonSolid(horizontalPortal, monster)).toBe(false);
});

test("horizontal portals are solid for movable blocks", () => {
  expect(portalBehaviour.isNonSolid(horizontalPortal, pushableBlock)).toBe(
    false,
  );
});

test("vertical portals are not solid for monsters", () => {
  expect(portalBehaviour.isNonSolid(portalToBelow, monster)).toBe(true);
});

test("portals to below are not solid for movable blocks", () => {
  expect(portalBehaviour.isNonSolid(portalToBelow, pushableBlock)).toBe(true);
});

test("portals to above are not solid for movable blocks", () => {
  expect(portalBehaviour.isNonSolid(portalToAbove, pushableBlock)).toBe(true);
});
