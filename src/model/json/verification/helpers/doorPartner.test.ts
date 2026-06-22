import { expect, test } from "vitest";

import { exitGameRoomId } from "../../ItemConfigMap";
import { addDoor, campaignOf, newRoom } from "../testUtils";
import {
  type VerificationCampaign,
  type VerificationRoomId,
} from "../verificationTypes";
import {
  allDoors,
  candidatePartners,
  type DoorRef,
  resolveDoorPartner,
} from "./doorPartner";

const doorRef = (
  campaign: VerificationCampaign,
  roomId: string,
  doorId: string,
): DoorRef => {
  const [ref] = allDoors(campaign)
    .filter((d) => d.roomId === roomId && d.doorId === doorId)
    .toArray();
  return ref;
};

test("candidatePartners finds the one door coming back", () => {
  const roomA = newRoom("roomA");
  const roomB = newRoom("roomB");
  addDoor(roomA, "left", { toRoom: "roomB" as VerificationRoomId });
  const backDoorId = addDoor(roomB, "right", {
    toRoom: "roomA" as VerificationRoomId,
  });

  const partners = candidatePartners(
    campaignOf({ roomA, roomB }),
    "roomA" as VerificationRoomId,
    "roomB" as VerificationRoomId,
    "left",
  );

  expect(partners.map((p) => p.doorId)).toEqual([backDoorId]);
});

test("candidatePartners counts several doors coming back", () => {
  const roomA = newRoom("roomA");
  const roomB = newRoom("roomB");
  addDoor(roomA, "left", { toRoom: "roomB" as VerificationRoomId });
  addDoor(roomB, "right", { toRoom: "roomA" as VerificationRoomId });
  addDoor(roomB, "right", { toRoom: "roomA" as VerificationRoomId });

  const partners = candidatePartners(
    campaignOf({ roomA, roomB }),
    "roomA" as VerificationRoomId,
    "roomB" as VerificationRoomId,
    "left",
  );

  expect(partners).toHaveLength(2);
});

test("resolveDoorPartner: unambiguous single opposite-direction door back", () => {
  const roomA = newRoom("roomA");
  const roomB = newRoom("roomB");
  const aDoor = addDoor(roomA, "left", {
    toRoom: "roomB" as VerificationRoomId,
  });
  const backDoorId = addDoor(roomB, "right", {
    toRoom: "roomA" as VerificationRoomId,
  });
  const campaign = campaignOf({ roomA, roomB });

  const result = resolveDoorPartner(
    campaign,
    doorRef(campaign, "roomA", aDoor),
  );

  expect(result).toEqual({
    kind: "unambiguous",
    partner: expect.objectContaining({ doorId: backDoorId }),
  });
});

test("resolveDoorPartner: ambiguous when two doors come back and no toDoor", () => {
  const roomA = newRoom("roomA");
  const roomB = newRoom("roomB");
  const aDoor = addDoor(roomA, "left", {
    toRoom: "roomB" as VerificationRoomId,
  });
  addDoor(roomB, "right", { toRoom: "roomA" as VerificationRoomId });
  addDoor(roomB, "right", { toRoom: "roomA" as VerificationRoomId });
  const campaign = campaignOf({ roomA, roomB });

  const result = resolveDoorPartner(
    campaign,
    doorRef(campaign, "roomA", aDoor),
  );

  expect(result).toEqual({ kind: "ambiguous", count: 2 });
});

test("resolveDoorPartner: toDoor picks the named partner", () => {
  const roomA = newRoom("roomA");
  const roomB = newRoom("roomB");
  addDoor(roomB, "right", { toRoom: "roomA" as VerificationRoomId });
  const backDoorId = addDoor(roomB, "right", {
    toRoom: "roomA" as VerificationRoomId,
  });
  const aDoor = addDoor(roomA, "left", {
    toRoom: "roomB" as VerificationRoomId,
    toDoor: backDoorId,
  });
  const campaign = campaignOf({ roomA, roomB });

  const result = resolveDoorPartner(
    campaign,
    doorRef(campaign, "roomA", aDoor),
  );

  expect(result).toEqual({
    kind: "unambiguous",
    partner: expect.objectContaining({ doorId: backDoorId }),
  });
});

test("resolveDoorPartner: toDoor naming a non-existent door is 'none'", () => {
  const roomA = newRoom("roomA");
  const roomB = newRoom("roomB");
  addDoor(roomB, "right", { toRoom: "roomA" as VerificationRoomId });
  const aDoor = addDoor(roomA, "left", {
    toRoom: "roomB" as VerificationRoomId,
    toDoor: "nope",
  });
  const campaign = campaignOf({ roomA, roomB });

  const result = resolveDoorPartner(
    campaign,
    doorRef(campaign, "roomA", aDoor),
  );

  expect(result).toEqual({ kind: "none" });
});

test("resolveDoorPartner: exit-game and missing-room links", () => {
  const roomA = newRoom("roomA");
  const exitDoor = addDoor(roomA, "left", { toRoom: exitGameRoomId });
  const ghostDoor = addDoor(roomA, "right", {
    toRoom: "ghost" as VerificationRoomId,
  });
  const campaign = campaignOf({ roomA });

  expect({
    exit: resolveDoorPartner(campaign, doorRef(campaign, "roomA", exitDoor))
      .kind,
    ghost: resolveDoorPartner(campaign, doorRef(campaign, "roomA", ghostDoor))
      .kind,
  }).toEqual({ exit: "exitGame", ghost: "missingRoom" });
});
