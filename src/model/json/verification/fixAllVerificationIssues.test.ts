import { expect, test } from "vitest";

import { planets } from "../../../sprites/planets";
import { keys } from "../../../utils/entries";
import { exitGameRoomId, nowhereRoomId } from "../ItemConfigMap";
import { fixAllVerificationIssues } from "./fixAllVerificationIssues";
import {
  addCrown,
  addDoor,
  addItem,
  addPlayer,
  campaignOf,
  newRoom,
} from "./testUtils";
import { type VerificationRoomId } from "./verificationTypes";
import { verifyCampaign } from "./verifyCampaign";

test("fixing a door to nowhere leaves no issues", () => {
  // a valid campaign, but for one door to nowhere:
  const start = newRoom("start");
  addPlayer(start, "head", { x: 1, y: 1, z: 0 });
  addPlayer(start, "heels", { x: 2, y: 1, z: 0 });
  for (const [index, planet] of planets.entries()) {
    addCrown(start, planet, { x: 1 + index, y: 4, z: 0 });
  }
  addDoor(start, "left", { toRoom: exitGameRoomId }, { x: 8, y: 3, z: 0 });
  addDoor(start, "away", { toRoom: nowhereRoomId }, { x: 3, y: 8, z: 0 });

  const { campaign } = fixAllVerificationIssues(campaignOf({ start }));

  expect(verifyCampaign(campaign).map(({ msg }) => msg)).toEqual([]);
});

test("fixing a teleporter to nowhere leaves no issues", () => {
  // a valid campaign, but for one teleporter to nowhere:
  const start = newRoom("start");
  addPlayer(start, "head", { x: 1, y: 1, z: 0 });
  addPlayer(start, "heels", { x: 2, y: 1, z: 0 });
  for (const [index, planet] of planets.entries()) {
    addCrown(start, planet, { x: 1 + index, y: 4, z: 0 });
  }
  addDoor(start, "left", { toRoom: exitGameRoomId }, { x: 8, y: 3, z: 0 });
  addItem(start, "tp", {
    type: "teleporter",
    config: { toRoom: nowhereRoomId },
    position: { x: 5, y: 6, z: 0 },
  });

  const { campaign } = fixAllVerificationIssues(campaignOf({ start }));

  expect(verifyCampaign(campaign).map(({ msg }) => msg)).toEqual([]);
});

test("fixing a door with no door back leaves no issues", () => {
  // a valid campaign, but for one door whose room has no door back:
  const start = newRoom("start");
  const other = newRoom("other");
  addPlayer(start, "head", { x: 1, y: 1, z: 0 });
  addPlayer(start, "heels", { x: 2, y: 1, z: 0 });
  for (const [index, planet] of planets.entries()) {
    addCrown(start, planet, { x: 1 + index, y: 4, z: 0 });
  }
  addDoor(start, "left", { toRoom: exitGameRoomId }, { x: 8, y: 3, z: 0 });
  addDoor(
    start,
    "away",
    { toRoom: "other" as VerificationRoomId },
    { x: 3, y: 8, z: 0 },
  );

  const { campaign } = fixAllVerificationIssues(campaignOf({ start, other }));

  expect(verifyCampaign(campaign).map(({ msg }) => msg)).toEqual([]);
});

test("fixing a room too big for one map cell leaves no issues", () => {
  // a valid campaign, but for its one room being undivided at 18×14:
  const start = newRoom("start", { size: { x: 18, y: 14 } });
  addPlayer(start, "head", { x: 1, y: 1, z: 0 });
  addPlayer(start, "heels", { x: 2, y: 1, z: 0 });
  for (const [index, planet] of planets.entries()) {
    addCrown(start, planet, { x: 1 + index, y: 4, z: 0 });
  }
  addDoor(start, "left", { toRoom: exitGameRoomId }, { x: 8, y: 3, z: 0 });

  const { campaign } = fixAllVerificationIssues(campaignOf({ start }));

  expect(verifyCampaign(campaign).map(({ msg }) => msg)).toEqual([]);
});

test.for<[string, string]>([
  ["nowhere", nowhereRoomId],
  ["a missing room", "ghost"],
])(
  "two doors to %s on the same wall lead into one new room, leaving no issues",
  ([, toRoom]) => {
    // a valid campaign, but for two doors side by side to the same place:
    const start = newRoom("start");
    addPlayer(start, "head", { x: 1, y: 1, z: 0 });
    addPlayer(start, "heels", { x: 2, y: 1, z: 0 });
    for (const [index, planet] of planets.entries()) {
      addCrown(start, planet, { x: 1 + index, y: 4, z: 0 });
    }
    addDoor(start, "left", { toRoom: exitGameRoomId }, { x: 8, y: 3, z: 0 });
    addDoor(
      start,
      "away",
      { toRoom: toRoom as VerificationRoomId },
      { x: 1, y: 8, z: 0 },
    );
    addDoor(
      start,
      "away",
      { toRoom: toRoom as VerificationRoomId },
      { x: 5, y: 8, z: 0 },
    );

    const { campaign } = fixAllVerificationIssues(campaignOf({ start }));

    expect({
      roomCount: keys(campaign.rooms).length,
      issues: verifyCampaign(campaign).map(({ msg }) => msg),
    }).toEqual({ roomCount: 2, issues: [] });
  },
);

test.for<[string, string]>([
  ["nowhere", nowhereRoomId],
  ["a missing room", "ghost"],
])(
  "two doors to %s on opposite walls lead into two new rooms, leaving no issues",
  ([, toRoom]) => {
    // a valid campaign, but for two doors on opposite walls to the same place:
    const start = newRoom("start");
    addPlayer(start, "head", { x: 1, y: 1, z: 0 });
    addPlayer(start, "heels", { x: 2, y: 1, z: 0 });
    for (const [index, planet] of planets.entries()) {
      addCrown(start, planet, { x: 1 + index, y: 4, z: 0 });
    }
    addDoor(start, "left", { toRoom: exitGameRoomId }, { x: 8, y: 3, z: 0 });
    addDoor(
      start,
      "away",
      { toRoom: toRoom as VerificationRoomId },
      { x: 3, y: 8, z: 0 },
    );
    addDoor(
      start,
      "towards",
      { toRoom: toRoom as VerificationRoomId },
      { x: 3, y: 0, z: 0 },
    );

    const { campaign } = fixAllVerificationIssues(campaignOf({ start }));

    expect({
      roomCount: keys(campaign.rooms).length,
      issues: verifyCampaign(campaign).map(({ msg }) => msg),
    }).toEqual({ roomCount: 3, issues: [] });
  },
);
