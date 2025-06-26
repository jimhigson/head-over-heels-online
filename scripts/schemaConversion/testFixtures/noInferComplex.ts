/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
type NoInfer<T> = T;

type RoomItems<ItemId extends string> = Record<
  ItemId,
  {
    type: string;
    config: any;
  }
>;

// Pattern similar to the actual usage
type TestType = RoomItems<NoInfer<string>>;
