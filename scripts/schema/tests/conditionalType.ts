/* eslint-disable @typescript-eslint/no-unused-vars */
type IsString<T> = T extends string ? true : false;
type Test = IsString<"hello">;
