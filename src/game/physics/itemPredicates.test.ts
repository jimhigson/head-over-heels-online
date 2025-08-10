import { describe, test, expect } from "vitest";
import { isSolid } from "./itemPredicates";
import { loadPlayer } from "../gameState/loadRoom/loadPlayer";
import { first } from "iter-tools";
import { unitVectors } from "../../utils/vectors/unitVectors";
import { originXyz } from "../../utils/vectors/vectors";
import { loadItemFromJson } from "../gameState/loadRoom/loadItemFromJson";
import { defaultBaseState } from "../gameState/loadRoom/itemDefaultStates";
import { basicEmptyRoom } from "../../_testUtils/basicRoom";
import type { UnionOfAllItemInPlayTypes } from "../../model/ItemInPlay";
import { defaultItemProperties } from "../../model/defaultItemProperties";

const player = loadPlayer({
  type: "player",
  config: { which: "head" },
  position: originXyz,
});

const monster = first(
  loadItemFromJson(
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
    {},
  ),
)!;

const pushableBlock = first(
  loadItemFromJson(
    "mb",
    {
      type: "pushableBlock",
      config: {},
      position: originXyz,
    },
    basicEmptyRoom("firstRoom"),
    {},
  ),
)!;

const horizontalPortal: UnionOfAllItemInPlayTypes = {
  ...defaultItemProperties,
  type: "portal",
  id: "portal",
  aabb: originXyz,
  config: {
    direction: unitVectors.towards,
    toRoom: "anyRoom",
    relativePoint: originXyz,
  },
  state: { position: originXyz, ...defaultBaseState() },
};

const portalToBelow: UnionOfAllItemInPlayTypes = {
  ...defaultItemProperties,
  type: "portal",
  id: "portal",
  aabb: originXyz,
  config: {
    direction: unitVectors.down,
    toRoom: "anyRoom",
    relativePoint: originXyz,
  },
  state: { position: originXyz, ...defaultBaseState() },
};
const portalToAbove: UnionOfAllItemInPlayTypes = {
  ...defaultItemProperties,
  type: "portal",
  id: "portal",
  aabb: originXyz,
  config: {
    direction: unitVectors.up,
    toRoom: "anyRoom",
    relativePoint: originXyz,
  },
  state: { position: originXyz, ...defaultBaseState() },
};

describe("isSolid", () => {
  describe("isSolid", () => {
    test("horizontal portals are not solid for player", () => {
      expect(isSolid(horizontalPortal, player)).toBe(false);
    });

    test("horizontal portals are solid for monsters", () => {
      expect(isSolid(horizontalPortal, monster)).toBe(true);
    });

    test("horizontal portals are solid for movable blocks", () => {
      expect(isSolid(horizontalPortal, pushableBlock)).toBe(true);
    });

    test("vertical portals are not solid for monsters", () => {
      expect(isSolid(portalToBelow, monster)).toBe(false);
    });

    test("vertical portals are not solid for movable blocks", () => {
      expect(isSolid(portalToBelow, pushableBlock)).toBe(false);
      expect(isSolid(portalToAbove, pushableBlock)).toBe(false);
    });

    /*
    test("floors of type 'none' are not solid", () => {
      const item: UnionOfAllItemInPlayTypes = { type: "floor", config: { type: "none" } };
      expect(isSolid(item)).toBe(false);
    });

    test("floors of type 'solid' are solid", () => {
      const item: UnionOfAllItemInPlayTypes = { type: "floor", config: { type: "solid" } };
      expect(isSolid(item)).toBe(true);
    });
    test("bubbles are never solid", () => {
      const item: UnionOfAllItemInPlayTypes = { type: "bubbles" };
      expect(isSolid(item)).toBe(false);
    });

    test("stopAutowalk items are never solid", () => {
      const item: UnionOfAllItemInPlayTypes = { type: "stopAutowalk" };
      expect(isSolid(item)).toBe(false);
    });

    test("firedDoughnut items are never solid", () => {
      const item: UnionOfAllItemInPlayTypes = { type: "firedDoughnut" };
      expect(isSolid(item)).toBe(false);
    });*/
  });
});
