import { expect, test } from "vitest";

import { exitGameRoomId } from "../../ItemConfigMap";
import { addDoor, campaignOf, newRoom, runCheck } from "../testUtils";
import { type VerificationRoomId } from "../verificationTypes";
import { missingExitVerifier } from "./missingExitVerifier";

test("flags a campaign with no door to the end of the game", () => {
  const roomA = newRoom("roomA");
  const roomB = newRoom("roomB");
  addDoor(roomA, "left", { toRoom: "roomB" as VerificationRoomId });
  addDoor(roomB, "right", { toRoom: "roomA" as VerificationRoomId });

  expect(
    runCheck(missingExitVerifier, campaignOf({ roomA, roomB })).map(
      ({ severity }) => severity,
    ),
  ).toEqual(["error"]);
});

test("accepts a campaign with a door to the end of the game", () => {
  const roomA = newRoom("roomA");
  addDoor(roomA, "left", { toRoom: exitGameRoomId });

  expect(runCheck(missingExitVerifier, campaignOf({ roomA }))).toEqual([]);
});
