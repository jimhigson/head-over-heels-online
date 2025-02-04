import { describe, test, expect } from "vitest";
import { isSolid } from "./itemPredicates";
import { loadPlayer } from "../gameState/loadRoom/loadPlayer";
import { first } from "iter-tools";
import type { AnyItemInPlay } from "../../model/ItemInPlay";
import { unitVectors } from "../../utils/vectors/unitVectors";
import { originXyz } from "../../utils/vectors/vectors";
import { loadItemFromJson } from "../gameState/loadRoom/loadItem";
import { defaultBaseState } from "../gameState/loadRoom/itemDefaultStates";

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
        activated: true,
      },
      position: originXyz,
    },
    {},
  ),
)!;

const movableBlock = first(
  loadItemFromJson(
    "mb",
    {
      type: "movableBlock",
      config: {
        style: "sandwich",
        movement: "free",
      },
      position: originXyz,
    },
    {},
  ),
)!;

const horizontalPortal: AnyItemInPlay = {
  id: "portal",
  aabb: originXyz,
  renders: true,
  type: "portal",
  config: { direction: unitVectors.towards },
  state: { position: originXyz, ...defaultBaseState() },
};

const portalToBelow: AnyItemInPlay = {
  id: "portal",
  aabb: originXyz,
  renders: true,
  type: "portal",
  config: { direction: unitVectors.down },
  state: { position: originXyz, ...defaultBaseState() },
};
const portalToAbove: AnyItemInPlay = {
  id: "portal",
  aabb: originXyz,
  renders: true,
  type: "portal",
  config: { direction: unitVectors.up },
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
      expect(isSolid(horizontalPortal, movableBlock)).toBe(true);
    });

    test("vertical portals are not solid for monsters", () => {
      expect(isSolid(portalToBelow, monster)).toBe(false);
    });

    test("vertical portals are not solid for movable blocks", () => {
      expect(isSolid(portalToBelow, movableBlock)).toBe(false);
      expect(isSolid(portalToAbove, movableBlock)).toBe(false);
    });

    /*
    test("floors of type 'none' are not solid", () => {
      const item: AnyItemInPlay = { type: "floor", config: { type: "none" } };
      expect(isSolid(item)).toBe(false);
    });

    test("floors of type 'solid' are solid", () => {
      const item: AnyItemInPlay = { type: "floor", config: { type: "solid" } };
      expect(isSolid(item)).toBe(true);
    });
    test("bubbles are never solid", () => {
      const item: AnyItemInPlay = { type: "bubbles" };
      expect(isSolid(item)).toBe(false);
    });

    test("stopAutowalk items are never solid", () => {
      const item: AnyItemInPlay = { type: "stopAutowalk" };
      expect(isSolid(item)).toBe(false);
    });

    test("firedDoughnut items are never solid", () => {
      const item: AnyItemInPlay = { type: "firedDoughnut" };
      expect(isSolid(item)).toBe(false);
    });*/
  });
});
