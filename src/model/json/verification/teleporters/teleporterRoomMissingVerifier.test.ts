import { expect, test } from "vitest";

import { exitGameRoomId } from "../../ItemConfigMap";
import { addItem, campaignOf, newRoom, runCheck } from "../testUtils";
import { type VerificationRoomId } from "../verificationTypes";
import { teleporterRoomMissingVerifier } from "./teleporterRoomMissingVerifier";

const teleporter = (toRoom?: string) => ({
  type: "teleporter" as const,
  config: toRoom === undefined ? {} : { toRoom: toRoom as VerificationRoomId },
  position: { x: 1, y: 1, z: 0 },
});

test("flags a teleporter whose toRoom isn't a room in the campaign", () => {
  const roomA = newRoom("roomA");
  addItem(roomA, "tp", teleporter("to?"));

  const issues = runCheck(teleporterRoomMissingVerifier, campaignOf({ roomA }));

  expect(issues.map((issue) => issue.itemId)).toEqual(["tp"]);
});

test("accepts a teleporter to a real room", () => {
  const roomA = newRoom("roomA");
  const roomB = newRoom("roomB");
  addItem(roomA, "tp", teleporter("roomB"));

  expect(
    runCheck(teleporterRoomMissingVerifier, campaignOf({ roomA, roomB })),
  ).toEqual([]);
});

test("accepts a teleporter that exits the game", () => {
  const roomA = newRoom("roomA");
  addItem(roomA, "tp", teleporter(exitGameRoomId));

  expect(
    runCheck(teleporterRoomMissingVerifier, campaignOf({ roomA })),
  ).toEqual([]);
});

test("accepts a same-room teleporter with no toRoom", () => {
  const roomA = newRoom("roomA");
  addItem(roomA, "tp", teleporter());

  expect(
    runCheck(teleporterRoomMissingVerifier, campaignOf({ roomA })),
  ).toEqual([]);
});

/** a campaign with a teleporter in roomA leading to a room that doesn't exist */
const fixedCampaign = (
  /** other teleporters already in roomA */
  otherTeleporterIds: string[] = [],
) => {
  const roomA = newRoom("roomA");
  addItem(roomA, "tp", {
    type: "teleporter" as const,
    config: { toRoom: "to?" as VerificationRoomId, times: { x: 2, y: 2 } },
    position: { x: 3, y: 4, z: 0 },
  });
  for (const id of otherTeleporterIds) {
    addItem(roomA, id, teleporter("roomA"));
  }
  const campaign = campaignOf({ roomA });
  const [issue] = runCheck(teleporterRoomMissingVerifier, campaign);
  return issue.verifier.fix(campaign, issue.issueData);
};

const newRoomTeleporters = (campaign: ReturnType<typeof fixedCampaign>) =>
  Object.values(campaign.rooms["to?"].items).filter(
    (item) => item.type === "teleporter",
  );

test("the fix clears the issue", () => {
  expect(runCheck(teleporterRoomMissingVerifier, fixedCampaign())).toEqual([]);
});

test("the fix points the teleporter at the new room", () => {
  expect(fixedCampaign().rooms.roomA.items.tp.config).toEqual({
    toRoom: "to?",
    times: { x: 2, y: 2 },
  });
});

test("the new room has one teleporter, the same size in the same place, leading back", () => {
  expect(newRoomTeleporters(fixedCampaign())).toEqual([
    {
      type: "teleporter",
      position: { x: 3, y: 4, z: 0 },
      config: { toRoom: "roomA", times: { x: 2, y: 2 } },
    },
  ]);
});

test("the way back names the teleporter when its room has more than one", () => {
  const [backTeleporter] = newRoomTeleporters(fixedCampaign(["other"]));

  expect(backTeleporter.config).toMatchObject({ toItemId: "tp" });
});

test("fixing every issue at once creates a shared missing room only once", () => {
  const roomA = newRoom("roomA");
  const roomB = newRoom("roomB");
  addItem(roomA, "tp", teleporter("to?"));
  addItem(roomB, "tp", teleporter("to?"));
  const campaign = campaignOf({ roomA, roomB });

  const fixed = runCheck(teleporterRoomMissingVerifier, campaign).reduce(
    (fixing, issue) => issue.verifier.fix(fixing, issue.issueData),
    campaign,
  );
  const createdRoom = fixed.rooms["to?" as VerificationRoomId];

  // still leads back to the first teleporter fixed, not overwritten by the second:
  expect(createdRoom.items["teleporter"]).toMatchObject({
    config: { toRoom: "roomA" },
  });
});
