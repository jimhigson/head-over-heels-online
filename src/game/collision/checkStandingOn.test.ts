import { expect, test } from "vitest";
import { loadItemFromJson } from "../gameState/loadRoom/loadItemFromJson";
import { findStandingOnWithHighestPriorityAndMostOverlap } from "./checkStandingOn";
import { first } from "iter-tools";
import type { FreeItem } from "../physics/itemPredicates";
import { basicEmptyRoom } from "../../_testUtils/basicRoom";

test("prefers blocks over conveyors even if the conveyor has more overlap", () => {
  const result = findStandingOnWithHighestPriorityAndMostOverlap(
    first(
      loadItemFromJson(
        "movable",
        {
          type: "pushableBlock",
          config: {},
          position: { x: 2.1, y: 0, z: 1 },
        },
        basicEmptyRoom("firstRoom"),
        {},
      ),
    ) as FreeItem<string, string>,
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
        basicEmptyRoom("firstRoom"),
        {},
      ),

      ...loadItemFromJson(
        "block",
        {
          type: "block",
          config: {
            style: "organic",
          },
          position: { x: 3, y: 0, z: 0 },
        },
        basicEmptyRoom("firstRoom"),
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
          type: "pushableBlock",
          config: {},
          position: { x: 2.2, y: 0, z: 1 },
        },
        basicEmptyRoom("firstRoom"),
        {},
      ),
    ) as FreeItem<string, string>,
    [
      ...loadItemFromJson(
        "block1",
        {
          type: "block",
          config: {
            style: "organic",
          },
          position: { x: 2, y: 0, z: 0 },
        },
        basicEmptyRoom("firstRoom"),
        {},
      ),

      ...loadItemFromJson(
        "block2",
        {
          type: "block",
          config: {
            style: "organic",
          },
          position: { x: 3, y: 0, z: 0 },
        },
        basicEmptyRoom("firstRoom"),
        {},
      ),
    ],
  );

  expect(result?.id).toBe("block1");
});
