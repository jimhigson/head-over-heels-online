import { expect, test } from "vitest";

import { danglingDoorTargetVerifier } from "./danglingDoorTargetVerifier";
import { addDoor, campaignOf, newRoom, runCheck } from "./testUtils";
import {
  type VerificationRoomId,
  type VerificationRoomItemId,
} from "./verificationTypes";

test("flags a door whose toDoor names a door that does not exist in the destination", () => {
  const roomA = newRoom("roomA");
  const roomB = newRoom("roomB");
  const doorId = addDoor(roomA, "left", {
    toRoom: "roomB" as VerificationRoomId,
    toDoor: "nope",
  });
  addDoor(roomB, "right", { toRoom: "roomA" as VerificationRoomId });

  const issues = runCheck(
    danglingDoorTargetVerifier,
    campaignOf({ roomA, roomB }),
  );

  expect<VerificationRoomItemId[]>(
    issues.map((issue) => issue.issueData.doorId),
  ).toEqual([doorId]);
});

test("flags a toDoor that names an existing door which doesn't link back", () => {
  // mirrors sequel_23 room_6/door_2 -> timers: the named door (d2) really exists
  // in the destination, but it faces the wrong way and leads elsewhere, so the
  // game still can't resolve the partner even though the id is real
  const roomA = newRoom("roomA");
  const roomB = newRoom("roomB");
  // the genuine partner for a left door from A is a right door back to A:
  addDoor(roomB, "right", { toRoom: "roomA" as VerificationRoomId });
  // ...but this other door also exists and is what the source wrongly names:
  const wrongDoorId = addDoor(roomB, "away", {
    toRoom: "roomA" as VerificationRoomId,
  });
  const doorId = addDoor(roomA, "left", {
    toRoom: "roomB" as VerificationRoomId,
    toDoor: wrongDoorId,
  });

  const issues = runCheck(
    danglingDoorTargetVerifier,
    campaignOf({ roomA, roomB }),
  );

  expect<VerificationRoomItemId[]>(
    issues.map((issue) => issue.issueData.doorId),
  ).toEqual([doorId]);
});

test("accepts a door whose toDoor resolves to a real door", () => {
  const roomA = newRoom("roomA");
  const roomB = newRoom("roomB");
  const backDoorId = addDoor(roomB, "right", {
    toRoom: "roomA" as VerificationRoomId,
  });
  addDoor(roomA, "left", {
    toRoom: "roomB" as VerificationRoomId,
    toDoor: backDoorId,
  });

  const issues = runCheck(
    danglingDoorTargetVerifier,
    campaignOf({ roomA, roomB }),
  );

  expect(issues).toEqual([]);
});

test("offers an auto-fix when exactly one door comes back", () => {
  const roomA = newRoom("roomA");
  const roomB = newRoom("roomB");
  addDoor(roomA, "left", {
    toRoom: "roomB" as VerificationRoomId,
    toDoor: "nope",
  });
  addDoor(roomB, "right", { toRoom: "roomA" as VerificationRoomId });

  const [issue] = runCheck(
    danglingDoorTargetVerifier,
    campaignOf({ roomA, roomB }),
  );

  expect(issue.fixable).toBe(true);
});

test("offers an auto-fix when several doors come back but only one is unmatched", () => {
  const roomA = newRoom("roomA");
  const roomB = newRoom("roomB");
  const back1 = addDoor(roomB, "right", {
    toRoom: "roomA" as VerificationRoomId,
  });
  const back2 = addDoor(roomB, "right", {
    toRoom: "roomA" as VerificationRoomId,
  });
  // one door already correctly claims back1, leaving back2 as the only
  // unmatched partner for the broken door
  addDoor(roomA, "left", {
    toRoom: "roomB" as VerificationRoomId,
    toDoor: back1,
  });
  const danglingId = addDoor(roomA, "left", {
    toRoom: "roomB" as VerificationRoomId,
    toDoor: "nope",
  });
  const campaign = campaignOf({ roomA, roomB });

  const [issue] = runCheck(danglingDoorTargetVerifier, campaign);

  expect(issue.fixable).toBe(true);
  expect(issue.issueData.doorId).toBe(danglingId);
  expect(issue.fixText).toBe(
    `Link door ‘${danglingId}’ in ‘roomA’ to door ‘${back2}’ in ‘roomB’`,
  );
});

test("the fix points a broken link at the only unmatched door, clearing the issue", () => {
  const roomA = newRoom("roomA");
  const roomB = newRoom("roomB");
  const back1 = addDoor(roomB, "right", {
    toRoom: "roomA" as VerificationRoomId,
  });
  const back2 = addDoor(roomB, "right", {
    toRoom: "roomA" as VerificationRoomId,
  });
  addDoor(roomA, "left", {
    toRoom: "roomB" as VerificationRoomId,
    toDoor: back1,
  });
  const danglingId = addDoor(roomA, "left", {
    toRoom: "roomB" as VerificationRoomId,
    toDoor: "nope",
  });
  const campaign = campaignOf({ roomA, roomB });

  const [issue] = runCheck(danglingDoorTargetVerifier, campaign);
  const fixed = issue.verifier.fix(campaign, issue.issueData);

  const fixedDoor = fixed.rooms.roomA.items[danglingId];
  expect(fixedDoor.type === "door" && fixedDoor.config.toDoor).toBe(back2);
  expect(runCheck(danglingDoorTargetVerifier, fixed)).toEqual([]);
});

test("offers an auto-fix when the destination links back to the broken door", () => {
  // mirrors sequel_23's room_45 ↔ room_47: room_45's door is broken, but
  // room_47 has a door that links back to it - a mutual link is a strong signal
  // of the intended partner even when several doors come back
  const roomA = newRoom("roomA");
  const roomB = newRoom("roomB");
  const danglingId = addDoor(roomA, "left", {
    toRoom: "roomB" as VerificationRoomId,
    toDoor: "nope",
  });
  addDoor(roomB, "right", { toRoom: "roomA" as VerificationRoomId });
  const backLinker = addDoor(roomB, "right", {
    toRoom: "roomA" as VerificationRoomId,
    toDoor: danglingId,
  });
  const campaign = campaignOf({ roomA, roomB });

  const [issue] = runCheck(danglingDoorTargetVerifier, campaign);

  expect(issue.fixable).toBe(true);
  expect(issue.fixText).toBe(
    `Link door ‘${danglingId}’ in ‘roomA’ to door ‘${backLinker}’ in ‘roomB’`,
  );
});

test("the mutual-link fix points the broken door back, clearing the issue", () => {
  const roomA = newRoom("roomA");
  const roomB = newRoom("roomB");
  const danglingId = addDoor(roomA, "left", {
    toRoom: "roomB" as VerificationRoomId,
    toDoor: "nope",
  });
  addDoor(roomB, "right", { toRoom: "roomA" as VerificationRoomId });
  const backLinker = addDoor(roomB, "right", {
    toRoom: "roomA" as VerificationRoomId,
    toDoor: danglingId,
  });
  const campaign = campaignOf({ roomA, roomB });

  const [issue] = runCheck(danglingDoorTargetVerifier, campaign);
  const fixed = issue.verifier.fix(campaign, issue.issueData);

  const fixedDoor = fixed.rooms.roomA.items[danglingId];
  expect(fixedDoor.type === "door" && fixedDoor.config.toDoor).toBe(backLinker);
  expect(runCheck(danglingDoorTargetVerifier, fixed)).toEqual([]);
});

test("does not offer an auto-fix when several doors come back (ambiguous)", () => {
  const roomA = newRoom("roomA");
  const roomB = newRoom("roomB");
  addDoor(roomA, "left", {
    toRoom: "roomB" as VerificationRoomId,
    toDoor: "nope",
  });
  addDoor(roomB, "right", { toRoom: "roomA" as VerificationRoomId });
  addDoor(roomB, "right", { toRoom: "roomA" as VerificationRoomId });

  const [issue] = runCheck(
    danglingDoorTargetVerifier,
    campaignOf({ roomA, roomB }),
  );

  expect(issue.fixable).toBe(false);
});

test("the fix drops the broken toDoor, clearing the issue", () => {
  const roomA = newRoom("roomA");
  const roomB = newRoom("roomB");
  addDoor(roomA, "left", {
    toRoom: "roomB" as VerificationRoomId,
    toDoor: "nope",
  });
  addDoor(roomB, "right", { toRoom: "roomA" as VerificationRoomId });
  const campaign = campaignOf({ roomA, roomB });

  const [issue] = runCheck(danglingDoorTargetVerifier, campaign);
  const fixed = issue.verifier.fix(campaign, issue.issueData);

  expect(runCheck(danglingDoorTargetVerifier, fixed)).toEqual([]);
});

test("issue and fix messages for an unambiguous broken link", () => {
  const roomA = newRoom("roomA");
  const roomB = newRoom("roomB");
  const doorId = addDoor(roomA, "left", {
    toRoom: "roomB" as VerificationRoomId,
    toDoor: "nope",
  });
  addDoor(roomB, "right", { toRoom: "roomA" as VerificationRoomId });

  const [issue] = runCheck(
    danglingDoorTargetVerifier,
    campaignOf({ roomA, roomB }),
  );

  expect({
    severity: issue.severity,
    msg: issue.msg,
    itemId: issue.itemId,
    fixable: issue.fixable,
    fixText: issue.fixText,
  }).toEqual({
    severity: "error",
    msg: `Door ‘${doorId}’ in ‘roomA’ links to door ‘nope’ in ‘roomB’, which does not exist`,
    itemId: doorId,
    fixable: true,
    fixText: `Remove the broken link from door ‘${doorId}’ in ‘roomA’`,
  });
});

test("issue message names the ambiguity and offers no fix when several doors come back", () => {
  const roomA = newRoom("roomA");
  const roomB = newRoom("roomB");
  const doorId = addDoor(roomA, "left", {
    toRoom: "roomB" as VerificationRoomId,
    toDoor: "nope",
  });
  addDoor(roomB, "right", { toRoom: "roomA" as VerificationRoomId });
  addDoor(roomB, "right", { toRoom: "roomA" as VerificationRoomId });

  const [issue] = runCheck(
    danglingDoorTargetVerifier,
    campaignOf({ roomA, roomB }),
  );

  expect({
    severity: issue.severity,
    msg: issue.msg,
    itemId: issue.itemId,
    fixable: issue.fixable,
    fixText: issue.fixText,
  }).toEqual({
    severity: "error",
    msg: `Door ‘${doorId}’ in ‘roomA’ links to door ‘nope’ in ‘roomB’, which does not exist`,
    itemId: doorId,
    fixable: false,
    fixText: `‘roomB’ has 2 doors back to ‘roomA’ in this direction, so this can't be removed automatically and must be fixed by hand`,
  });
});

test("calling fix on an unfixable (ambiguous) issue throws", () => {
  const roomA = newRoom("roomA");
  const roomB = newRoom("roomB");
  addDoor(roomA, "left", {
    toRoom: "roomB" as VerificationRoomId,
    toDoor: "nope",
  });
  addDoor(roomB, "right", { toRoom: "roomA" as VerificationRoomId });
  addDoor(roomB, "right", { toRoom: "roomA" as VerificationRoomId });
  const campaign = campaignOf({ roomA, roomB });

  const [issue] = runCheck(danglingDoorTargetVerifier, campaign);

  expect(() => issue.verifier.fix(campaign, issue.issueData)).toThrow();
});
