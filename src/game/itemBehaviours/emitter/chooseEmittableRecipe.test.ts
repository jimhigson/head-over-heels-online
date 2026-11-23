import { expect, test } from "vitest";

import type { EmittableItemRecipe } from "../../../model/json/ItemConfigMap";
import { chooseEmittableRecipe } from "./chooseEmittableRecipe";

test("a plain recipe is chosen whatever the count and roll", () => {
  const plainRecipe = {
    type: "firedDoughnut",
    config: { direction: "left" },
  } as const satisfies EmittableItemRecipe;

  expect(chooseEmittableRecipe(plainRecipe, 5, 0.9)).toBe(plainRecipe);
});

test.for([
  { quantityEmitted: 0, expectedDirection: "left" },
  { quantityEmitted: 1, expectedDirection: "right" },
  { quantityEmitted: 2, expectedDirection: "away" },
  { quantityEmitted: 3, expectedDirection: "left" },
  { quantityEmitted: 7, expectedDirection: "right" },
] as const)(
  "a cycle at $quantityEmitted emitted chooses the $expectedDirection recipe",
  ({ quantityEmitted, expectedDirection }) => {
    expect(
      chooseEmittableRecipe(
        {
          type: "cyclic",
          cycle: [
            { type: "firedDoughnut", config: { direction: "left" } },
            { type: "firedDoughnut", config: { direction: "right" } },
            { type: "firedDoughnut", config: { direction: "away" } },
          ],
        },
        quantityEmitted,
        0.5,
      ),
    ).toEqual<EmittableItemRecipe>({
      type: "firedDoughnut",
      config: { direction: expectedDirection },
    });
  },
);

test.for([
  { roll: 0, expectedDirection: "left" },
  { roll: 0.49, expectedDirection: "left" },
  { roll: 0.5, expectedDirection: "right" },
  { roll: 0.99, expectedDirection: "right" },
] as const)(
  "choices without weights are equally likely: roll $roll chooses $expectedDirection",
  ({ roll, expectedDirection }) => {
    expect(
      chooseEmittableRecipe(
        {
          type: "probabilistic",
          choices: [
            { emits: { type: "firedDoughnut", config: { direction: "left" } } },
            {
              emits: { type: "firedDoughnut", config: { direction: "right" } },
            },
          ],
        },
        0,
        roll,
      ),
    ).toEqual<EmittableItemRecipe>({
      type: "firedDoughnut",
      config: { direction: expectedDirection },
    });
  },
);

test.for([
  { roll: 0, expectedDirection: "left" },
  { roll: 0.24, expectedDirection: "left" },
  { roll: 0.25, expectedDirection: "right" },
  { roll: 0.99, expectedDirection: "right" },
] as const)(
  "weights 1 and 3 split the roll at a quarter: roll $roll chooses $expectedDirection",
  ({ roll, expectedDirection }) => {
    expect(
      chooseEmittableRecipe(
        {
          type: "probabilistic",
          choices: [
            {
              emits: { type: "firedDoughnut", config: { direction: "left" } },
              probabilityWeight: 1,
            },
            {
              emits: { type: "firedDoughnut", config: { direction: "right" } },
              probabilityWeight: 3,
            },
          ],
        },
        0,
        roll,
      ),
    ).toEqual<EmittableItemRecipe>({
      type: "firedDoughnut",
      config: { direction: expectedDirection },
    });
  },
);

test.for([0, 0.5, 0.999_999])(
  "a choice with weight 0 is never chosen while another has weight (roll %s)",
  (roll) => {
    expect(
      chooseEmittableRecipe(
        {
          type: "probabilistic",
          choices: [
            {
              emits: { type: "firedDoughnut", config: { direction: "left" } },
              probabilityWeight: 0,
            },
            {
              emits: { type: "firedDoughnut", config: { direction: "right" } },
              probabilityWeight: 2,
            },
            {
              emits: { type: "firedDoughnut", config: { direction: "away" } },
              probabilityWeight: 0,
            },
          ],
        },
        0,
        roll,
      ),
    ).toEqual<EmittableItemRecipe>({
      type: "firedDoughnut",
      config: { direction: "right" },
    });
  },
);

test.for([
  { roll: 0.25, expectedDirection: "left" },
  { roll: 0.75, expectedDirection: "right" },
] as const)(
  "choices that all have weight 0 are equally likely: roll $roll chooses $expectedDirection",
  ({ roll, expectedDirection }) => {
    expect(
      chooseEmittableRecipe(
        {
          type: "probabilistic",
          choices: [
            {
              emits: { type: "firedDoughnut", config: { direction: "left" } },
              probabilityWeight: 0,
            },
            {
              emits: { type: "firedDoughnut", config: { direction: "right" } },
              probabilityWeight: 0,
            },
          ],
        },
        0,
        roll,
      ),
    ).toEqual<EmittableItemRecipe>({
      type: "firedDoughnut",
      config: { direction: expectedDirection },
    });
  },
);
