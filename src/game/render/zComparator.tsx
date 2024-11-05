import { UnknownItemInPlay } from "@/model/ItemInPlay";
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
    A @ ${JSON.stringify(a.position)} size ${JSON.stringify(a.aabb)} and
    B @ ${JSON.stringify(b.position)} size ${JSON.stringify(b.aabb)}
  `);*/

  // for items that are never rendered, this doesn't matter:
  if (a.renders === false || b.renders === false) {
    return 0;
  }

  // TODO: change to use pixi bounding boxes (since we have them already from the 2d engine)
  // - at this point renderAabb can be removed from the code
  const bbA = a.renderAabb || a.aabb;
  const bbB = b.renderAabb || b.aabb;

  const screenBottomXyA = projectWorldXyzToScreenXy(a.position);
  const screenMinXA = screenBottomXyA.x - bbA.x;
  const screenMaxXA = screenBottomXyA.x + bbA.y;

  const screenBottomXyB = projectWorldXyzToScreenXy(b.position);
  const screenMinXB = screenBottomXyB.x - bbB.x;
  const screenMaxXB = screenBottomXyB.x + bbB.y;

  if (screenMinXA >= screenMaxXB || screenMinXB >= screenMaxXA) {
    return 0;
  }

  const screenMaxYA = projectWorldXyzToScreenY(addXyz(a.position, bbA));
  const screenMaxYB = projectWorldXyzToScreenY(addXyz(b.position, bbB));

  if (screenBottomXyA.y <= screenMaxYB || screenBottomXyB.y <= screenMaxYA) {
    return 0;
  }

  for (const axis of axesXyz) {
    const axisMinA = a.position[axis];
    const axisMaxA = axisMinA + bbA[axis];

    const axisMinB = b.position[axis];
    const axisMaxB = axisMinB + bbB[axis];

    // console.log(`check for <= in ${axis} :`, { axisMaxA, axisMinB });

    if (axisMaxA <= axisMinB) {
      const result = 1 * (axis === "z" ? -1 : 1);
      // a is entirely less than b in this axis (no overlap)
      // flip for z axis, because higher z is in front, whereas for x and y, lower is in front
      // console.log(
      //   "returning result",
      //   result,
      //   "ie",
      //   a.id,
      //   result > 0 ? "in front of" : "behind",
      //   b.id,
      // );
      return result;
    }

    // console.log(`check for >= in ${axis} :`, { axisMinA, axisMaxB });

    if (axisMinA >= axisMaxB) {
      const result = -1 * (axis === "z" ? -1 : 1);
      // a is entirely less than b in this axis (no overlap)
      // flip for z axis, because higher z is in front, whereas for x and y, lower is in front
      // console.log(
      //   "returning result",
      //   result,
      //   "ie",
      //   a.id,
      //   result > 0 ? "in front of" : "behind",
      //   b.id,
      // );
      return result;
    }

    // a and b overlap in this axis, so we need to check the next axis
  }

  const errorMsg = `could not compare two items for draw order A ${a.id} and B ${b.id} 
      A @ ${JSON.stringify(a.position)} size ${JSON.stringify(bbA)} and
      B @ ${JSON.stringify(b.position)} size ${JSON.stringify(bbB)} 
      - do these bounding boxes intersect?`;
  console.error(errorMsg);
  return 0; // give up and say we don't know the right order
  //throw new Error(errorMsg);
};
