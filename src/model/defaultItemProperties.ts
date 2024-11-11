import type { UnknownItemInPlay } from "./ItemInPlay";

/**
 * to spread over items on instantiation and cut down on typing
 **/

export const defaultItemProperties = {
  renders: true,
  renderPositionDirty: false,
  renderingDirty: false,
  falls: false,
  onTouch: "nonIntersect",
} as const satisfies Partial<UnknownItemInPlay>;
