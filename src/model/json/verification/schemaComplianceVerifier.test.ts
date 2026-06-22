import { expect, test } from "vitest";

import { schemaComplianceVerifier } from "./schemaComplianceVerifier";
import { campaignOf, newRoom, runCheck } from "./testUtils";
import { type VerificationRoomJson } from "./verificationTypes";

test("flags a room that doesn't match the schema", () => {
  const roomA = newRoom("roomA");
  // a real room always has a planet; removing it breaks schema compliance
  delete (roomA as Partial<VerificationRoomJson>).planet;

  const [issue] = runCheck(schemaComplianceVerifier, campaignOf({ roomA }));

  expect({ severity: issue.severity, roomId: issue.roomId }).toEqual({
    severity: "error",
    roomId: "roomA",
  });
});

test("accepts a well-formed room", () => {
  const roomA = newRoom("roomA");

  expect(runCheck(schemaComplianceVerifier, campaignOf({ roomA }))).toEqual([]);
});
