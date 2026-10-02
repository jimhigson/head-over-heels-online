import { type Xyz } from "../../utils/vectors/vectors";

/** why a teleporter has nowhere to land */
export type UnresolvableLandingReason =
  "ambiguous" | "missingItem" | "noTeleporter";

/** where in its destination room a teleporter lands */
export type TeleporterLanding<ItemId extends string> =
  | { type: "item"; itemId: ItemId }
  | { type: "position"; position: Xyz }
  | { type: "unresolvable"; reason: UnresolvableLandingReason };

/** the parts of a teleporter's config that say where to land */
export type TeleporterLandingConfig = { toPosition?: Xyz; toItemId?: string };

/**
 * where a teleporter lands: its `toPosition`, else its `toItemId`, else the
 * destination room's only teleporter
 */
export const resolveTeleporterLanding = <ItemId extends string>(
  { toPosition, toItemId }: TeleporterLandingConfig,
  /** the destination room's teleporters, fixed and portable */
  destinationTeleporterIds: Iterable<ItemId>,
  /** narrows an id to one of an item in the destination room */
  isDestinationItemId: (itemId: string) => itemId is ItemId,
  /** the teleporter being used, when it is in its own destination room */
  sourceItemIdInDestination: ItemId | undefined,
): TeleporterLanding<ItemId> => {
  if (toPosition !== undefined) {
    return { type: "position", position: toPosition };
  }

  if (toItemId !== undefined) {
    return isDestinationItemId(toItemId) ?
        { type: "item", itemId: toItemId }
      : { type: "unresolvable", reason: "missingItem" };
  }

  let loneTeleporterId: ItemId | undefined;
  for (const teleporterId of destinationTeleporterIds) {
    if (teleporterId === sourceItemIdInDestination) {
      continue;
    }
    if (loneTeleporterId !== undefined) {
      return { type: "unresolvable", reason: "ambiguous" };
    }
    loneTeleporterId = teleporterId;
  }
  return loneTeleporterId === undefined ?
      { type: "unresolvable", reason: "noTeleporter" }
    : { type: "item", itemId: loneTeleporterId };
};
