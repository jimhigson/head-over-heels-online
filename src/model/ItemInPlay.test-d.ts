import { expectTypeOf, test } from "vitest";

import type { ItemTypeUnion } from "../_generated/types/ItemInPlayUnion";
import type {
  ItemInPlay,
  ItemInPlayType,
  UnionOfAllItemInPlayTypes,
} from "./ItemInPlay";

type ItemId = "ball" | "bat";

test("portals to lead to room ids", () => {
  type A = ItemInPlay<
    "portal",
    "kitchen" | "livingRoom",
    ItemId
  >["config"]["toRoom"];

  expectTypeOf<A>().toEqualTypeOf<"kitchen" | "livingRoom">();
});

test("doorframes to lead to room ids", () => {
  type A = ItemInPlay<
    "doorFrame",
    "kitchen" | "livingRoom",
    ItemId
  >["config"]["toRoom"];

  expectTypeOf<A>().toEqualTypeOf<"kitchen" | "livingRoom">();
});

test("smaller unions are subsets of union of all items types", () => {
  type RoomId = "kitchen" | "livingRoom";

  type All = UnionOfAllItemInPlayTypes<RoomId, ItemId>;
  type Some = ItemTypeUnion<
    "ball" | "bubbles" | "doorFrame" | "portal",
    RoomId,
    ItemId
  >;

  function takesAll(_u: All) {}
  function takesSome(_u: Some) {}

  const all = {} as unknown as All;
  const some = {} as unknown as Some;

  // should be able to pass a smaller subset to a function expecting everything:
  takesAll(some);

  // should not work:
  // @ts-expect-error - this is a test that should fail
  takesSome(all);

  // -------------------------------------

  // now test if the same is true with generics:
  type GenericTypeWithExtendsAll<Test extends All> = { test: Test };

  // this should work but doesn't:
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  type GenericTypeNarrowsDown1<ItemType extends ItemInPlayType> =
    // this in only working because of the typegen'd ItemTypeUnion - it doesn't work if converted to a union inside ts itself
    GenericTypeWithExtendsAll<ItemTypeUnion<ItemType, RoomId, ItemId>>;

  // proof that it is possible:
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  type GenericTypeNarrowsDown2 = GenericTypeWithExtendsAll<Some>;

  // force ts to work by using an intermediate type:
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  type GenericsNarrowsDown3<
    ItemType extends ItemInPlayType,
    PartialUnion = ItemTypeUnion<ItemType, RoomId, ItemId>,
  > =
    // @ts-expect-error - this actually should work but ts isn't getting it - delete this if it starts working
    GenericTypeWithExtendsAll<PartialUnion>;

  // -------------------------------------

  // now, try the case where the completion of room and room id is delayed:
  type GenericTypeWithExtendsAllButWithLateCompletedRoom<
    TRoomId extends string,
    TRoomItemId extends string,
    TSubSet extends UnionOfAllItemInPlayTypes<TRoomId, TRoomItemId>,
  > = { test: TSubSet };

  // now test is the same is true with generics:
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  type NarrowDownWithLateCompletedRoom<
    // the only difference here from the test cases above is that
    // roomid and room item id are also generics
    TRoomId extends string,
    TRoomItemId extends string,
    // it doesn't work so long as this is a union - replace with an inline 'block'
    // (or any other single type) and it is fine
    ItemType extends ItemInPlayType,
    SubsetOfAllItemInPlayTypes extends ItemTypeUnion<
      ItemType,
      TRoomId,
      TRoomItemId
      // the ItemTypeUnion isn't being turned into a union until it knows the itemType
    > = ItemTypeUnion<ItemType, TRoomId, TRoomItemId>,
  > = GenericTypeWithExtendsAllButWithLateCompletedRoom<
    TRoomId,
    TRoomItemId,
    // this could work - see handlePlayerTouchingDeadly's use of PlayableItem - it works because
    // the generic is already a union. Could probably codegen something similar
    SubsetOfAllItemInPlayTypes
  >;
});
