import type { UnknownItemInPlay } from "@/model/ItemInPlay";
import { addXyz, axesXyz } from "@/utils/vectors";
import {
  projectWorldXyzToScreenXy,
  projectWorldXyzToScreenY,
} from "./projectToScreen";

export const drawOrderComparator = (
  a: UnknownItemInPlay,
  b: UnknownItemInPlay,
) => {
  /*console.log(`comparing A ${a.id} and B ${b.id}
    A @ ${JSON.stringify(a.state.position)} size ${JSON.stringify(a.aabb)} and
    B @ ${JSON.stringify(b.state.position)} size ${JSON.stringify(b.aabb)}
  `);*/

  // for items that are never rendered, this doesn't matter:
  if (a.renders === false || b.renders === false) {
    return 0;
  }

  // TODO: change to use pixi bounding boxes (since we have them already from the 2d engine)
  // - at this point renderAabb can be removed from the code
  const bbA = a.renderAabb || a.aabb;
  const bbB = b.renderAabb || b.aabb;

  const screenBottomXyA = projectWorldXyzToScreenXy(a.state.position);
  const screenMinXA = screenBottomXyA.x - bbA.x;
  const screenMaxXA = screenBottomXyA.x + bbA.y;

  const screenBottomXyB = projectWorldXyzToScreenXy(b.state.position);
  const screenMinXB = screenBottomXyB.x - bbB.x;
  const screenMaxXB = screenBottomXyB.x + bbB.y;

  if (screenMinXA >= screenMaxXB || screenMinXB >= screenMaxXA) {
    return 0;
  }

  const screenMaxYA = projectWorldXyzToScreenY(addXyz(a.state.position, bbA));
  const screenMaxYB = projectWorldXyzToScreenY(addXyz(b.state.position, bbB));

  if (screenBottomXyA.y <= screenMaxYB || screenBottomXyB.y <= screenMaxYA) {
    return 0;
  }

  for (const axis of axesXyz) {
    const axisMinA = a.state.position[axis];
    const axisMaxA = axisMinA + bbA[axis];

    const axisMinB = b.state.position[axis];
    const axisMaxB = axisMinB + bbB[axis];

    // console.log(`check for <= in ${axis} :`, { axisMaxA, axisMinB });

    if (axisMaxA <= axisMinB) {
      // a is entirely less than b in this axis (no overlap)
      // flip for z axis, because higher z is in front, whereas for x and y, lower is in front
      return 1 * (axis === "z" ? -1 : 1);
    }

    // console.log(`check for >= in ${axis} :`, { axisMinA, axisMaxB });

    if (axisMinA >= axisMaxB) {
      // a is entirely less than b in this axis (no overlap)
      // flip for z axis, because higher z is in front, whereas for x and y, lower is in front
      return -1 * (axis === "z" ? -1 : 1);
    }

    // a and b overlap in this axis, so we need to check the next axis
  }

  // if we get here, two items are intersecting - this is very unusual, but can happen
  // for non-solid items - eg, the cloud left over after a pickup is collected can be
  // walked through. Return the difference of the isometric z-buffer depth for the two items.
  // since these intersecting items should be the same size, and this isn't critical, the bounding boxes
  // are not used to decide the order
  return zScore(b) - zScore(a);
};

const zScore = (item: UnknownItemInPlay) =>
  item.state.position.x + item.state.position.y - item.state.position.z;
