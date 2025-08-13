/* eslint-disable @typescript-eslint/no-unused-vars */
import type { NonEmptyRecord } from "../../src/utils/types/NonEmptyRecord";

type SubRoomData = {
  gridPosition: { x: number; y: number };
  physicalPosition: {
    from: { x: number; y: number };
    to: { x: number; y: number };
  };
};

// Using our simpler NonEmptyRecord instead of type-fest's RequireAtLeastOne
type TestRequireAtLeastOne = NonEmptyRecord<SubRoomData>;
