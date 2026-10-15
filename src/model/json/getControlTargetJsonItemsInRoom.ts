import { type RoomJson } from "../RoomJson";
import { iterateRoomJsonItemIds } from "../RoomJsonItemIterators";
import { type JsonItemType, type JsonItemUnion } from "./JsonItem";

function* implicitTargets<RoomId extends string, RoomItemId extends string>(
  roomJson: RoomJson<RoomId, RoomItemId> | undefined,
  type: JsonItemType,
): Generator<RoomItemId> {
  if (roomJson === undefined) {
    return;
  }
  yield* iterateRoomJsonItemIds(roomJson.items, type);
}

/**
 * the target ids of items:
 *
 *    * switch / button / timer (`modifies[].targets`)
 *    * joystick (`controls`)
 *
 * If a room is given, also gets the implicit 'all of suitable type' relation
 * from the room's items, otherwise is only explictly linked items
 */
export function* getControlTargetJsonItemsInRoom<
  RoomId extends string,
  RoomItemId extends string,
>(
  jsonItem: JsonItemUnion<RoomId, RoomItemId>,
  /**
   * the controller's room, to resolve implicit targets; omit for only the
   * explicitly listed ones
   */
  roomJson?: RoomJson<RoomId, RoomItemId>,
): Generator<RoomItemId> {
  if (jsonItem.type === "joystick") {
    yield* jsonItem.config.controls ?? implicitTargets(roomJson, "charles");
    return;
  }
  if (
    (jsonItem.type !== "switch" &&
      jsonItem.type !== "button" &&
      jsonItem.type !== "timer") ||
    !("modifies" in jsonItem.config)
  ) {
    return;
  }
  for (const mod of jsonItem.config.modifies) {
    yield* mod.targets ?? implicitTargets(roomJson, mod.expectType);
  }
}
