import type { UnionOfAllItemInPlayTypes } from "../../model/ItemInPlay";
import type { RoomState } from "../../model/RoomState";
import { isFreeItem, type FreeItem } from "./itemPredicates";

export const recordActedOnBy = <
  RoomId extends string,
  RoomItemId extends string,
>(
  /** the item pushing or otherwise controlling the other item */
  actingItem: UnionOfAllItemInPlayTypes<RoomId, RoomItemId> | undefined,
  subjectItem: FreeItem<RoomId, RoomItemId>,
  room: RoomState<RoomId, RoomItemId>,
) => {
  const { actedOnAt } = subjectItem.state;
  // it isn't clear why subjectItem would ever *not* be a freeItem
  if (actedOnAt.roomTime === room.roomTime) {
    if (actingItem) {
      actedOnAt.by[actingItem.id] = true;
    }
  } else {
    actedOnAt.by = (actingItem ? { [actingItem.id]: true } : {}) as Record<
      RoomItemId,
      true
    >;
    actedOnAt.roomTime = room.roomTime;
  }
};

export const recordCollision = <
  RoomId extends string,
  RoomItemId extends string,
>(
  colliderItem: FreeItem<RoomId, RoomItemId>,
  collidedWithItem: UnionOfAllItemInPlayTypes<RoomId, RoomItemId>,
  room: RoomState<RoomId, RoomItemId>,
) => {
  const add = (
    a: FreeItem<RoomId, RoomItemId>,
    b: UnionOfAllItemInPlayTypes<RoomId, RoomItemId>,
  ) => {
    const { collidedWith } = a.state;

    if (collidedWith.roomTime === room.roomTime) {
      // add to the collidedWith since it is recording the same time
      //if (pusher) { <- not sure why we needed this condition - this meant if subject item
      //  is not a first cause :-/
      collidedWith.by[b.id] = true;
      //}
    } else {
      // throw away collided with since it is for an older time which can now be
      // overwritten
      collidedWith.by = { [b.id]: true } as Record<RoomItemId, true>;
      collidedWith.roomTime = room.roomTime;
    }
  };

  add(colliderItem, collidedWithItem);
  if (isFreeItem(collidedWithItem)) {
    // if a collided with b, b also collided with a (assuming it is able to, ie is free)
    // TODO: it might also make sense to record for non-free items, for example running
    // into a static metal wall - clang!
    add(collidedWithItem, colliderItem);
  }
};
