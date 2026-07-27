import { expect, test } from "vitest";

import { campaign } from "../../../_generated/originalCampaign/campaign";
import { quarterTurnAnticlockwise } from "../../../utils/vectors/cameraAngleVectors";
import { type Xy } from "../../../utils/vectors/vectors";
import { roomZGraphAt } from "./__test__/roomZGraphAt";

/**
 * regression for the mid-turn ordering bug found by Jim in finalroom: the
 * "towards" bars wall (w1) and the sceneryPlayer standing just inside it
 * (sp5) are cleanly separated on world-y by their PHYSICAL boxes, so at
 * every angle of the second half of a base→anticlockwise turn the wall must
 * order BEHIND the player. The old camera-space-interval ladder lost this
 * separation at non-quarter angles (the long wall's rotated bounding
 * interval swallowed the player's) and fell through to the interpenetration
 * heuristic, which inverted the order for ~40° of the turn.
 */
const finalroomGraphAt = (theta: Xy) =>
  roomZGraphAt(campaign.rooms.finalroom, quarterTurnAnticlockwise, theta);

test.for([50, 55, 65, 75, 85, 89.9])(
  "finalroom bars wall w1 orders behind sp5 at %s deg of the turn",
  (degrees) => {
    const rad = (degrees * Math.PI) / 180;
    const { graph, byId } = finalroomGraphAt({
      x: Math.cos(rad),
      y: Math.sin(rad),
    });
    const sp5 = byId.get("sp5")!;
    const w1 = byId.get("w1")!;
    expect(
      graph.hasEdge(w1, sp5),
      `w1 must be behind sp5 at ${degrees}deg`,
    ).toBe(true);
  },
);

test("finalroom floor stays behind sp5 mid-turn", () => {
  const rad = (65 * Math.PI) / 180;
  const { graph, byId } = finalroomGraphAt({
    x: Math.cos(rad),
    y: Math.sin(rad),
  });
  expect(graph.hasEdge(byId.get("f")!, byId.get("sp5")!)).toBe(true);
});
