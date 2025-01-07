import { expect, test } from "vitest";
import { loadItemFromJson } from "../gameState/loadRoom/loadItem";
import { findStandingOnWithHighestPriorityAndMostOverlap } from "./checkStandingOn";
import { first } from "iter-tools";
import type { FreeItem } from "../physics/itemPredicates";
import type { SceneryName } from "@/sprites/planets";

test("prefers blocks over conveyors even if the conveyor has more overlap", () => {
  const result = findStandingOnWithHighestPriorityAndMostOverlap(
    first(
      loadItemFromJson(
        "movable",
        {
          type: "movableBlock",
          config: {
            style: "anvil",
            movement: "free",
          },
          position: { x: 2.1, y: 0, z: 1 },
        },
        {},
      ),
    ) as FreeItem<SceneryName, string>,
    [
      ...loadItemFromJson(
        "conv",
        {
          type: "conveyor",
          config: {
            direction: "right",
          },
          position: { x: 2, y: 0, z: 0 },
        },
        {},
      ),

      ...loadItemFromJson(
        "block",
        {
          type: "block",
          config: {
            style: "organic",
            disappearing: false,
          },
          position: { x: 3, y: 0, z: 0 },
        },
        {},
      ),
    ],
  );

  expect(result?.id).toBe("block");
});

test("given two blocks, choses one with most overlap", () => {
  const result = findStandingOnWithHighestPriorityAndMostOverlap(
    first(
      loadItemFromJson(
        "movable",
        {
          type: "movableBlock",
          config: {
            style: "anvil",
            movement: "free",
          },
          position: { x: 2.2, y: 0, z: 1 },
        },
        {},
      ),
    ) as FreeItem<SceneryName, string>,
    [
      ...loadItemFromJson(
        "block1",
        {
          type: "block",
          config: {
            style: "organic",
            disappearing: false,
          },
          position: { x: 2, y: 0, z: 0 },
        },
        {},
      ),

      ...loadItemFromJson(
        "block2",
        {
          type: "block",
          config: {
            style: "organic",
            disappearing: false,
          },
          position: { x: 3, y: 0, z: 0 },
        },
        {},
      ),
    ],
  );

  expect(result?.id).toBe("block1");
});
