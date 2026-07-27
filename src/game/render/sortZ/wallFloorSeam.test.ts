import { expect, test } from "vitest";

import { nearestQuarterAngle } from "../../../utils/vectors/cameraAngleVectors";
import { type Xy } from "../../../utils/vectors/vectors";
import { roomZGraphAt } from "./__test__/roomZGraphAt";
import { wallFloorSeamRoom } from "./__test__/wallFloorSeamRoom";

/**
 * The whole draw-order graph of the minimal wall/floor room ({@link
 * wallFloorSeamRoom}: a floor, a single "away" wall on its far edge, one head),
 * built exactly as the room renderer does mid-transition: participation +
 * masking at the settled quarter angle, geometry at the continuous angle θ.
 */
const seamGraphAt = (degrees: number) => {
  const rad = (degrees * Math.PI) / 180;
  const geometryAngle: Xy = { x: Math.cos(rad), y: Math.sin(rad) };
  const quarterAngle = nearestQuarterAngle(geometryAngle);

  return roomZGraphAt(wallFloorSeamRoom, quarterAngle, geometryAngle);
};

/** the whole graph as stable text (sorted edges + toposort order), for a full-graph assertion */
const describeSeamGraph = (degrees: number): string => {
  const { graph, byId } = seamGraphAt(degrees);
  const edges: string[] = [];
  for (const [id, item] of byId) {
    graph.forEachEdgeFrom(item, (front, broken) => {
      edges.push(`${id} -> ${front.id}${broken ? " (broken)" : ""}`);
    });
  }
  edges.sort();
  const order = graph
    .toposort()
    .map((item) => item.id)
    .join(", ");
  return `order: ${order}\n${edges.join("\n")}`;
};

/**
 * The away-wall's base sits on the floor's far edge, so geometrically the wall
 * must ALWAYS draw in front of the floor (floor behind wall) - at every camera
 * angle, settled or mid-transition. The regression: the continuous-angle
 * comparator flips this around -20 deg of a clockwise turn, drawing the floor
 * over the wall's base (the thin seam line Jim spotted).
 */
test.for([0, -5, -10, -15, -20, -25])(
  "floor stays behind the away-wall at %s deg of a clockwise turn",
  (degrees) => {
    const { graph, byId } = seamGraphAt(degrees);
    expect(
      graph.hasEdge(byId.get("floor")!, byId.get("wallAway")!),
      `at ${degrees}deg the floor must be behind wallAway (edge floor -> wallAway)`,
    ).toBe(true);
  },
);

// settled and mid-transition give the same whole graph - the seam decision
// does not shift as the camera turns away from the quarter:
test.for([0, -20])("whole graph at %d deg", (degrees) => {
  expect(describeSeamGraph(degrees)).toMatchInlineSnapshot(`
    "order: floor, wallAway, outOfBounds
    floor -> wallAway"
  `);
});
