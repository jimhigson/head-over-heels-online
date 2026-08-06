import { type UnionOfAllItemInPlayTypes } from "../../model/ItemInPlay";
import { type XyzBox } from "../../utils/vectors/vectors";
import { type SpatialIndex } from "../physics/gridSpace/SpatialIndex";

export type CollideableItem = Pick<UnionOfAllItemInPlayTypes, "id"> & {
  state: { box: Readonly<XyzBox> };
};

/**
 * Collision between two boxes.
 *
 * boxes that are *just* touching (one box's max equal to the other's min) do
 * not collide - they have to overlap by some amount
 */
export const collisionBoxes = (a: Readonly<XyzBox>, b: Readonly<XyzBox>) => {
  return (
    !(a.x + a.xd <= b.x || a.x >= b.x + b.xd) &&
    !(a.y + a.yd <= b.y || a.y >= b.y + b.yd) &&
    !(a.z + a.zd <= b.z || a.z >= b.z + b.zd)
  );
};

/**
 * Collision between two items. Version that takes items.
 *
 * items that are *just* touching (one box's max equal to the other's min) do
 * not collide - they have to overlap by some amount
 */
export const collision2Items = (
  { state: { box: boxA } }: CollideableItem,
  { state: { box: boxB } }: CollideableItem,
) => {
  return collisionBoxes(boxA, boxB);
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
  // oxlint's no-unused-vars does not count usage inside the `item is G` type
  // predicate below, unlike typescript-eslint, so it is flagged without this
  // eslint-disable-next-line no-unused-vars
  item: C,
): item is G => true;

/**
 * Check for collisions between a single item and multiple others, using the spatial index
 * so that the function scales well as number of items grows
 */
export function collisionItemWithIndex<C extends CollideableItem>(
  subject: CollideableItem,
  index: SpatialIndex<string, string, C>,
): Generator<C>;
export function collisionItemWithIndex<
  C extends CollideableItem,
  GuardedType extends C,
>(
  subject: CollideableItem,
  index: SpatialIndex<string, string, C>,
  considerItem: (item: C) => item is GuardedType,
): Generator<GuardedType>;
export function collisionItemWithIndex<C extends CollideableItem>(
  subject: CollideableItem,
  index: SpatialIndex<string, string, C>,
  considerItem: (item: C) => boolean,
): Generator<C>;
export function* collisionItemWithIndex<
  C extends CollideableItem,
  GuardedType extends C = C,
>(
  subject: CollideableItem,
  index: SpatialIndex<string, string, C>,
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

/**
 * Check for collisions between a single item and multiple others - similar to
 * @see collisionItemWithIndex, except for when the caller doesn't need to know
 * what the collided items are, only that they exist.
 *
 * equivalent to, but more efficient than:
 *
 * ```ts
 *    isEmpty(collisionItemWithIndex(...))
 * ```
 */
export const hasCollisionItemWithIndex = <C extends CollideableItem>(
  subject: CollideableItem,
  index: SpatialIndex<string, string, C>,
  considerItem: (item: C) => boolean = alwaysUseForCollision,
): boolean => {
  const neighbours = index.getItemCuboidNeighbourhood(subject);
  for (const candidateItem of neighbours) {
    if (
      considerItem(candidateItem) &&
      // preventing  self- collision not needed because the neighbourhood
      // knows not to return the item itself
      //subject.id !== candidateItem.id &&
      collision2Items(subject, candidateItem)
    ) {
      return true;
    }
  }
  return false;
};
