import { expect, test } from "vitest";

import { missingPlayerStartVerifier } from "./missingPlayerStartVerifier";
import { addPlayer, campaignOf, newRoom, runCheck } from "./testUtils";

test("flags a campaign with no heels start", () => {
  const roomA = newRoom("roomA");
  addPlayer(roomA, "head");

  const [issue] = runCheck(missingPlayerStartVerifier, campaignOf({ roomA }));

  expect({ severity: issue.severity, msg: issue.msg }).toEqual({
    severity: "error",
    msg: "There's no starting room for heels - the campaign can't begin without it",
  });
});

test("accepts head and heels in separate rooms", () => {
  const roomA = newRoom("roomA");
  const roomB = newRoom("roomB");
  addPlayer(roomA, "head");
  addPlayer(roomB, "heels");

  expect(
    runCheck(missingPlayerStartVerifier, campaignOf({ roomA, roomB })),
  ).toEqual([]);
});

test("accepts a single joined headOverHeels start for both", () => {
  const roomA = newRoom("roomA");
  addPlayer(roomA, "headOverHeels");

  expect(runCheck(missingPlayerStartVerifier, campaignOf({ roomA }))).toEqual(
    [],
  );
});

test("flags both characters when there's no player at all", () => {
  const roomA = newRoom("roomA");

  expect(
    runCheck(missingPlayerStartVerifier, campaignOf({ roomA })),
  ).toHaveLength(2);
});
