import { expect, test } from "vitest";

import {
  resolveTeleporterLanding,
  type TeleporterLanding,
  type TeleporterLandingConfig,
} from "./resolveTeleporterLanding";

const resolveIn = (
  config: TeleporterLandingConfig,
  roomItemIds: string[],
  teleporterIds: string[],
  sourceItemIdInDestination?: string,
) =>
  resolveTeleporterLanding(
    config,
    teleporterIds,
    (itemId): itemId is string => roomItemIds.includes(itemId),
    sourceItemIdInDestination,
  );

test("a toPosition is landed on, whatever the room holds", () => {
  expect<TeleporterLanding<string>>(
    resolveIn({ toPosition: { x: 1, y: 2, z: 0 } }, [], []),
  ).toEqual<TeleporterLanding<string>>({
    type: "position",
    position: { x: 1, y: 2, z: 0 },
  });
});

test("a toItemId in the room is landed on", () => {
  expect<TeleporterLanding<string>>(
    resolveIn({ toItemId: "a" }, ["a", "b"], ["a", "b"]),
  ).toEqual<TeleporterLanding<string>>({ type: "item", itemId: "a" });
});

test("a toItemId not in the room is a missing item", () => {
  expect<TeleporterLanding<string>>(
    resolveIn({ toItemId: "ghost" }, ["a"], ["a"]),
  ).toEqual<TeleporterLanding<string>>({
    type: "unresolvable",
    reason: "missingItem",
  });
});

test("with no target, the room's only teleporter is landed on", () => {
  expect<TeleporterLanding<string>>(resolveIn({}, ["a"], ["a"])).toEqual<
    TeleporterLanding<string>
  >({ type: "item", itemId: "a" });
});

test("with no target, a room without teleporters has nowhere to land", () => {
  expect<TeleporterLanding<string>>(resolveIn({}, ["block"], [])).toEqual<
    TeleporterLanding<string>
  >({ type: "unresolvable", reason: "noTeleporter" });
});

test("with no target, several teleporters are ambiguous", () => {
  expect<TeleporterLanding<string>>(
    resolveIn({}, ["a", "b"], ["a", "b"]),
  ).toEqual<TeleporterLanding<string>>({
    type: "unresolvable",
    reason: "ambiguous",
  });
});

test("the source teleporter is never its own landing", () => {
  expect<TeleporterLanding<string>>(
    resolveIn({}, ["source", "other"], ["source", "other"], "source"),
  ).toEqual<TeleporterLanding<string>>({ type: "item", itemId: "other" });
});
