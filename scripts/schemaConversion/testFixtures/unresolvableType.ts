/* eslint-disable @typescript-eslint/no-unused-vars */
type ComplexGeneric<T> = T extends infer U ? U : never;
type Test = ComplexGeneric<unknown>;
