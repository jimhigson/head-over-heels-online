import { expect, test } from "vitest";

import { planets } from "../../../sprites/planets";
import { missingCrownVerifier } from "./missingCrownVerifier";
import { addCrown, campaignOf, newRoom, runCheck } from "./testUtils";

test("flags every planet whose crown is missing", () => {
  const roomA = newRoom("roomA");
  addCrown(roomA, "blacktooth");

  const issues = runCheck(missingCrownVerifier, campaignOf({ roomA }));

  expect(issues).toHaveLength(planets.length - 1);
});

test("accepts a campaign holding all five crowns", () => {
  const roomA = newRoom("roomA");
  for (const planet of planets) {
    addCrown(roomA, planet, { x: 1, y: 1, z: 0 });
  }

  expect(runCheck(missingCrownVerifier, campaignOf({ roomA }))).toEqual([]);
});

test("reports a missing crown as a warning", () => {
  const roomA = newRoom("roomA");

  const [issue] = runCheck(missingCrownVerifier, campaignOf({ roomA }));

  expect(issue.severity).toBe("warning");
});
