import { type JsonItemUnion } from "./JsonItem";

/** how an item references another item in its room */
export type ItemReferenceVia =
  | { kind: "joystickControls" }
  | { kind: "modifies"; modIndex: number; expectType: string };

export type ItemReference<RoomItemId extends string> = {
  /** the referenced item (always in the same room as the referencing item) */
  targetId: RoomItemId;
  via: ItemReferenceVia;
};

/**
 * every reference a switch / button / timer (`modifies[].targets`) or joystick
 * (`controls`) makes to another item in its room. Modifications with no
 * `targets` mean "all items of `expectType`" and yield nothing (no specific
 * reference).
 */
export function* getReferencedItems<
  RoomId extends string,
  RoomItemId extends string,
>(
  jsonItem: JsonItemUnion<RoomId, RoomItemId>,
): Generator<ItemReference<RoomItemId>> {
  if (jsonItem.type === "joystick") {
    for (const targetId of jsonItem.config.controls ?? []) {
      yield { targetId, via: { kind: "joystickControls" } };
    }
    return;
  }
  if (
    jsonItem.type !== "switch" &&
    jsonItem.type !== "button" &&
    jsonItem.type !== "timer"
  ) {
    return;
  }
  if (!("modifies" in jsonItem.config)) {
    return;
  }
  for (const [modIndex, mod] of jsonItem.config.modifies.entries()) {
    for (const targetId of mod.targets ?? []) {
      yield {
        targetId,
        via: { kind: "modifies", modIndex, expectType: mod.expectType },
      };
    }
  }
}
