/* eslint-disable @typescript-eslint/no-unused-vars */

// Test Omit on union types

type UnionWithPosition =
  | {
      type: "a";
      position: number;
      data: string;
    }
  | {
      type: "b";
      position: number;
      data: boolean;
    };

// This should distribute over the union
type UnionWithoutPosition = Omit<UnionWithPosition, "position">;

// Test type
type TestOmitUnion = {
  value: UnionWithoutPosition;
};
