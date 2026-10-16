import { type UnionOfAllItemInPlayTypes } from "../../model/ItemInPlayNarrowedUnions";
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
 * the spatial index predicate for every collision query - declared once (with
 * the caller's considerItem passed as the query context) so queries create no
 * closures
 */
const isConsideredAndColliding = <C extends CollideableItem>(
  candidateItem: C,
  box: Readonly<XyzBox>,
  considerItem: (item: C) => boolean,
): boolean =>
  considerItem(candidateItem) && collisionBoxes(box, candidateItem.state.box);

/**
 * Check for collisions between a box and items in the spatial index. Each
 * colliding item appears once, even if it occupies several of the cells searched
 */
export function collisionBoxWithIndex<C extends CollideableItem>(
  box: Readonly<XyzBox>,
  index: SpatialIndex<string, string, C>,
): ReadonlyArray<C>;
export function collisionBoxWithIndex<
  C extends CollideableItem,
  GuardedType extends C,
>(
  box: Readonly<XyzBox>,
  index: SpatialIndex<string, string, C>,
  considerItem: (item: C) => item is GuardedType,
  /** an item to leave out of the results, usually the one querying */
  excludeItem?: CollideableItem,
): ReadonlyArray<GuardedType>;
export function collisionBoxWithIndex<C extends CollideableItem>(
  box: Readonly<XyzBox>,
  index: SpatialIndex<string, string, C>,
  considerItem: (item: C) => boolean,
  /** an item to leave out of the results, usually the one querying */
  excludeItem?: CollideableItem,
): ReadonlyArray<C>;
export function collisionBoxWithIndex<C extends CollideableItem>(
  box: Readonly<XyzBox>,
  index: SpatialIndex<string, string, C>,
  considerItem: (item: C) => boolean = alwaysUseForCollision,
  excludeItem?: CollideableItem,
): ReadonlyArray<C> {
  return index.filterInBox(
    box,
    isConsideredAndColliding,
    considerItem,
    excludeItem,
  );
}

/**
 * Check for collisions between a single item and multiple others, using the spatial index
 * so that the function scales well as number of items grows
 */
export function collisionItemWithIndex<C extends CollideableItem>(
  subject: CollideableItem,
  index: SpatialIndex<string, string, C>,
): ReadonlyArray<C>;
export function collisionItemWithIndex<
  C extends CollideableItem,
  GuardedType extends C,
>(
  subject: CollideableItem,
  index: SpatialIndex<string, string, C>,
  considerItem: (item: C) => item is GuardedType,
): ReadonlyArray<GuardedType>;
export function collisionItemWithIndex<C extends CollideableItem>(
  subject: CollideableItem,
  index: SpatialIndex<string, string, C>,
  considerItem: (item: C) => boolean,
): ReadonlyArray<C>;
export function collisionItemWithIndex<C extends CollideableItem>(
  subject: CollideableItem,
  index: SpatialIndex<string, string, C>,
  considerItem: (item: C) => boolean = alwaysUseForCollision,
): ReadonlyArray<C> {
  return collisionBoxWithIndex(subject.state.box, index, considerItem, subject);
}

/**
 * The first item found colliding with a box, or undefined if there are none -
 * for callers that need only one collision, not all of them
 */
export function findCollisionBoxWithIndex<C extends CollideableItem>(
  box: Readonly<XyzBox>,
  index: SpatialIndex<string, string, C>,
): C | undefined;
export function findCollisionBoxWithIndex<
  C extends CollideableItem,
  GuardedType extends C,
>(
  box: Readonly<XyzBox>,
  index: SpatialIndex<string, string, C>,
  considerItem: (item: C) => item is GuardedType,
  /** an item to leave out of the results, usually the one querying */
  excludeItem?: CollideableItem,
): GuardedType | undefined;
export function findCollisionBoxWithIndex<C extends CollideableItem>(
  box: Readonly<XyzBox>,
  index: SpatialIndex<string, string, C>,
  considerItem: (item: C) => boolean,
  /** an item to leave out of the results, usually the one querying */
  excludeItem?: CollideableItem,
): C | undefined;
export function findCollisionBoxWithIndex<C extends CollideableItem>(
  box: Readonly<XyzBox>,
  index: SpatialIndex<string, string, C>,
  considerItem: (item: C) => boolean = alwaysUseForCollision,
  excludeItem?: CollideableItem,
): C | undefined {
  return index.findInBox(
    box,
    isConsideredAndColliding,
    considerItem,
    excludeItem,
  );
}

/**
 * Check for collisions between a box and the items in the spatial index - similar to
 * @see collisionBoxWithIndex, except for when the caller doesn't need to know
 * what the collided items are, only that they exist.
 */
export const hasCollisionBoxWithIndex = <C extends CollideableItem>(
  box: Readonly<XyzBox>,
  index: SpatialIndex<string, string, C>,
  considerItem: (item: C) => boolean = alwaysUseForCollision,
  /** an item to leave out of the results, usually the one querying */
  excludeItem?: CollideableItem,
): boolean =>
  findCollisionBoxWithIndex(box, index, considerItem, excludeItem) !==
  undefined;

/**
 * Check for collisions between a single item and multiple others - similar to
 * @see collisionItemWithIndex, except for when the caller doesn't need to know
 * what the collided items are, only that they exist.
 *
 * equivalent to, but more efficient than:
 *
 * ```ts
 *    collisionItemWithIndex(...).length > 0
 * ```
 */
export const hasCollisionItemWithIndex = <C extends CollideableItem>(
  subject: CollideableItem,
  index: SpatialIndex<string, string, C>,
  considerItem: (item: C) => boolean = alwaysUseForCollision,
): boolean =>
  hasCollisionBoxWithIndex(subject.state.box, index, considerItem, subject);
