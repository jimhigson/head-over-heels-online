import { expect, test } from "vitest";

import { nearestQuarterAngle } from "../../../utils/vectors/cameraAngleVectors";
import { type Xy } from "../../../utils/vectors/vectors";
import { quarterMaskFaultRoom } from "./__test__/quarterMaskFaultRoom";
import { roomZGraphAt } from "./__test__/roomZGraphAt";

/**
 * pins the cycle bands of {@link quarterMaskFaultRoom} - the geometry the
 * cameraRotationSweep e2e scenario for this room relies on:
 *
 * - trio A's cycle (towerA→rowA broken) exists ONLY mid-transition, at
 *   neither bounding quarter
 * - trio B's cycle (towerB→rowB broken) exists settled at 0° and dissolves
 *   mid-transition
 *
 * Both towers are style "tower" (non-warp), so their carves can only come
 * from the art masking path - a masking scheme that froze cycle decisions to
 * the quarter angles would get these bands wrong.
 */
const brokenEdgesAt = (degrees: number): string[] => {
  const rad = (degrees * Math.PI) / 180;
  const geometryAngle: Xy = { x: Math.cos(rad), y: Math.sin(rad) };
  const quarterAngle = nearestQuarterAngle(geometryAngle);

  const { graph, byId } = roomZGraphAt(
    quarterMaskFaultRoom,
    quarterAngle,
    geometryAngle,
  );
  graph.toposort();

  const broken: string[] = [];
  for (const item of byId.values()) {
    graph.forEachEdgeFrom(item, (front, isBroken) => {
      if (isBroken) {
        broken.push(`${item.id}->${front.id}`);
      }
    });
  }
  return broken.sort();
};

test.for([0, 20, 40, 50, 70, 90] as const)(
  "trio A has no cycle at %s° (outside its mid-transition band)",
  (degrees) => {
    expect(brokenEdgesAt(degrees)).not.toContain("towerA->rowA");
  },
);

test.for([25.5, 30, 35, 37] as const)(
  "trio A's cycle exists only mid-transition: broken towerA->rowA at %s°",
  (degrees) => {
    expect(brokenEdgesAt(degrees)).toContain("towerA->rowA");
  },
);

test.for([0, 10, 20, 25] as const)(
  "trio B's settled cycle: broken towerB->rowB at %s°",
  (degrees) => {
    expect(brokenEdgesAt(degrees)).toContain("towerB->rowB");
  },
);

test.for([27, 30, 40, 50, 90] as const)(
  "trio B's cycle has dissolved by %s°",
  (degrees) => {
    expect(brokenEdgesAt(degrees)).not.toContain("towerB->rowB");
  },
);
