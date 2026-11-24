import { areOverlappingSolids } from "./areOverlappingSolids";
import type { LoadedItem } from "./LoadedItem";

export type OverlapQuery = {
  /**
   * the item the spatial index is being asked about
   */
  subject: LoadedItem;
  /**
   * the top of the room, in fine (px) z
   */
  roomTopZ: number;
};

/**
 * as a spatial index predicate: whether a candidate in the box overlaps the
 * querying item, solid to each other
 */
export const overlapsAsSolid = (
  candidate: LoadedItem,
  _box: unknown,
  { subject, roomTopZ }: OverlapQuery,
): boolean => areOverlappingSolids(subject, candidate, roomTopZ);
