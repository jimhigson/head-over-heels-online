import { type ItemInPlayType } from "../../../../model/ItemInPlay";

/**
 * Item types whose footprint sprite is not anchored at the camera-nearest corner: walls,
 * floors and doors span or align differently and floating text is centred, so they are
 * exempt from the near-corner offset that every other item's graphics receive.
 */
export const itemTypesExemptFromNearCornerOffset: ReadonlySet<ItemInPlayType> =
  new Set<ItemInPlayType>([
    "floor",
    "wall",
    "doorFrame",
    "doorLegs",
    "floatingText",
    // light beams lay out their tile sprites at world offsets themselves, and
    // their aabb changes length in-life as the beam recasts - a once-applied
    // container offset would go stale. They receive no shadows, so lose
    // nothing by being outside the offset container:
    "lightBeam",
  ]);
