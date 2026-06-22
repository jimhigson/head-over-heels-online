import { expect, test } from "vitest";

import { addItem, campaignOf, newRoom, runCheck } from "../testUtils";
import { type VerificationRoomId } from "../verificationTypes";
import { teleporterTargetInvalidVerifier } from "./teleporterTargetInvalidVerifier";

const teleporter = (toRoom: string, toItemId?: string) => ({
  type: "teleporter" as const,
  config: {
    toRoom: toRoom as VerificationRoomId,
    ...(toItemId !== undefined ? { toItemId } : {}),
  },
  position: { x: 1, y: 1, z: 0 },
});

test("flags a teleporter whose toItemId is missing in the destination", () => {
  const roomA = newRoom("roomA");
  const roomB = newRoom("roomB");
  addItem(roomB, "tele", teleporter("roomA"));
  addItem(roomA, "tp", teleporter("roomB", "ghost"));

  const [issue] = runCheck(
    teleporterTargetInvalidVerifier,
    campaignOf({ roomA, roomB }),
  );

  expect({ itemId: issue.itemId, fixable: issue.fixable }).toEqual({
    itemId: "tp",
    fixable: true,
  });
});

test("the fix drops the toItemId, clearing the issue", () => {
  const roomA = newRoom("roomA");
  const roomB = newRoom("roomB");
  addItem(roomB, "tele", teleporter("roomA"));
  addItem(roomA, "tp", teleporter("roomB", "ghost"));
  const campaign = campaignOf({ roomA, roomB });

  const [issue] = runCheck(teleporterTargetInvalidVerifier, campaign);
  const fixed = issue.verifier.fix(campaign, issue.issueData);

  expect(runCheck(teleporterTargetInvalidVerifier, fixed)).toEqual([]);
});

test("accepts a teleporter whose toItemId exists", () => {
  const roomA = newRoom("roomA");
  const roomB = newRoom("roomB");
  addItem(roomB, "tele", teleporter("roomA"));
  addItem(roomA, "tp", teleporter("roomB", "tele"));

  expect(
    runCheck(teleporterTargetInvalidVerifier, campaignOf({ roomA, roomB })),
  ).toEqual([]);
});
