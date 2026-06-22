import { expect, test } from "vitest";

import { redundantTeleporterItemVerifier } from "./redundantTeleporterItemVerifier";
import { addItem, campaignOf, newRoom, runCheck } from "./testUtils";
import { type VerificationRoomId } from "./verificationTypes";

const teleporter = (toRoom: string, toItemId?: string) => ({
  type: "teleporter" as const,
  config: {
    toRoom: toRoom as VerificationRoomId,
    ...(toItemId !== undefined ? { toItemId } : {}),
  },
  position: { x: 1, y: 1, z: 0 },
});

test("flags a toItemId that just names the destination's lone teleporter", () => {
  const roomA = newRoom("roomA");
  const roomB = newRoom("roomB");
  addItem(roomB, "tele", teleporter("roomA"));
  addItem(roomA, "tp", teleporter("roomB", "tele"));
  const campaign = campaignOf({ roomA, roomB });

  const [issue] = runCheck(redundantTeleporterItemVerifier, campaign);

  expect(issue.fixable).toBe(true);
});

test("the fix drops the redundant toItemId, clearing the issue", () => {
  const roomA = newRoom("roomA");
  const roomB = newRoom("roomB");
  addItem(roomB, "tele", teleporter("roomA"));
  addItem(roomA, "tp", teleporter("roomB", "tele"));
  const campaign = campaignOf({ roomA, roomB });

  const [issue] = runCheck(redundantTeleporterItemVerifier, campaign);
  const fixed = issue.verifier.fix(campaign, issue.issueData);

  expect(runCheck(redundantTeleporterItemVerifier, fixed)).toEqual([]);
});

test("accepts a teleporter with no toItemId", () => {
  const roomA = newRoom("roomA");
  const roomB = newRoom("roomB");
  addItem(roomB, "tele", teleporter("roomA"));
  addItem(roomA, "tp", teleporter("roomB"));

  expect(
    runCheck(redundantTeleporterItemVerifier, campaignOf({ roomA, roomB })),
  ).toEqual([]);
});
