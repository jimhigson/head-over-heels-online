import { itemBehaviourKey } from "../../../model/ItemInPlay";
import { type UnionOfAllItemInPlayTypes } from "../../../model/ItemInPlayNarrowedUnions";
import {
  type Progression,
  roomSpatialIndexKey,
  type RoomState,
} from "../../../model/RoomState";
import { boxAt, type Xyz } from "../../../utils/vectors/vectors";

export const addItemToRoom = <
  RoomId extends string,
  RoomItemId extends string,
>({
  room,
  item,
  atPosition,
}: {
  room: RoomState<RoomId, RoomItemId>;
  item: UnionOfAllItemInPlayTypes<RoomId, RoomItemId>;
  /**
   * optional extra argument, since items are often added while stating their position.
   * if not given, the position already in the item will be used. If given, the item's position
   * will be updated immediately before being added
   */
  atPosition?: Xyz;
}) => {
  room.items[item.id] = item;

  if (atPosition !== undefined) {
    item.state.box = boxAt(atPosition, item.state.box);
  }

  // entering the room is a progressing change - consumers comparing against
  // the progression they last handled must see fresh items:
  item.state.movedOrResizedOnProgression = ++room.progression as Progression;

  if (!item[itemBehaviourKey].isPositionless(item)) {
    const spatialIndex = room[roomSpatialIndexKey];
    spatialIndex.addItem(item);
  }

  return item;
};
