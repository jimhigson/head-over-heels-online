import type { FederatedPointerEvent } from "pixi.js";

import type { Xy } from "../../../../../utils/vectors/vectors";

export const setPointerXyMaybeRotated = (
  e: FederatedPointerEvent,
  rot90: boolean,
  into: Xy,
) => {
  if (rot90) {
    into.x = e.y;
    into.y = e.x;
  } else {
    into.x = e.x;
    into.y = e.y;
  }
  return into;
};
