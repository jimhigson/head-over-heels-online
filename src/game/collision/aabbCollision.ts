import type { UnionOfAllItemInPlayTypes } from "../../model/ItemInPlay";
import type { Xyz } from "../../utils/vectors/vectors";
import type { GridSpatialIndex } from "../physics/gridSpace/GridSpatialIndex";

export type CollideableItem = Pick<UnionOfAllItemInPlayTypes, "aabb" | "id"> & {
  state: { position: Xyz };
};

/**
 * Collision between two items. Version that takes positions and bounding boxes.
 *
 * if items are *just* touching (bounding box max equal to other item's bb min)
 * it is considered a collision
 */
export const collisionPosAndBb = (posA: Xyz, bbA: Xyz, posB: Xyz, bbB: Xyz) => {
  return (
    !(posA.x + bbA.x <= posB.x || posA.x >= posB.x + bbB.x) &&
    !(posA.y + bbA.y <= posB.y || posA.y >= posB.y + bbB.y) &&
    !(posA.z + bbA.z <= posB.z || posA.z >= posB.z + bbB.z)
  );
};

/**
 * Collision between two items. Version that takes items.
 *
 * if items are *just* touching (bounding box max equal to other item's bb min)
 * it is considered a collision
 */
export const collision2Items = (
  { aabb: bbA, state: { position: posA } }: CollideableItem,
  { aabb: bbB, state: { position: posB } }: CollideableItem,
) => {
  return collisionPosAndBb(posA, bbA, posB, bbB);
};

/**
 * Check for collisions between a single item and multiple others.
 *
 * Like collision1toMany but an iterator
 *
 * @deprecated - does not use the spatial index
 */
export function* collision1toManyIter<C extends CollideableItem>(
  subject: CollideableItem,
  items: Iterable<C>,
): Generator<C> {
  for (const candidateItem of items) {
    if (
      // prevent self- collision
      subject.id !== candidateItem.id &&
      collision2Items(subject, candidateItem)
    ) {
      yield candidateItem;
    }
  }
}

const alwaysUseForCollision = <C extends CollideableItem, G extends C = C>(
  item: C,
): item is G => true;

/**
 * Check for collisions between a single item and multiple others, using the spatial index
 * so that the function scales well as number of items grows
 */
export function collisionItemWithIndex<C extends CollideableItem>(
  subject: CollideableItem,
  index: GridSpatialIndex<string, string, C>,
): Generator<C>;
export function collisionItemWithIndex<
  C extends CollideableItem,
  GuardedType extends C,
>(
  subject: CollideableItem,
  index: GridSpatialIndex<string, string, C>,
  considerItem: (item: C) => item is GuardedType,
): Generator<GuardedType>;
export function collisionItemWithIndex<C extends CollideableItem>(
  subject: CollideableItem,
  index: GridSpatialIndex<string, string, C>,
  considerItem: (item: C) => boolean,
): Generator<C>;
export function* collisionItemWithIndex<
  C extends CollideableItem,
  GuardedType extends C = C,
>(
  subject: CollideableItem,
  index: GridSpatialIndex<string, string, C>,
  considerItem: (item: C) => boolean = alwaysUseForCollision,
): Generator<C | GuardedType> {
  const neighbours = index.getItemCuboidNeighbourhood(subject);
  for (const candidateItem of neighbours) {
    if (
      considerItem(candidateItem) &&
      // preventing  self- collision not needed because the neighbourhood
      // knows not to return the item itself
      //subject.id !== candidateItem.id &&
      collision2Items(subject, candidateItem)
    ) {
      yield candidateItem as GuardedType & C;
    }
  }
}
