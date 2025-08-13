/* eslint-disable @typescript-eslint/no-unused-vars */
import type { NonEmptyRecord } from "../../src/utils/types/NonEmptyRecord";

type TestNonEmptyRecord = NonEmptyRecord<{
  name: string;
  value: number;
  nested: {
    x: number;
    y: number;
  };
}>;
