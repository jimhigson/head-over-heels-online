/* eslint-disable @typescript-eslint/no-explicit-any -- `any` is required in conditional type inference positions */
import type { EnhancedStore } from "@reduxjs/toolkit";

export type StoreActionOf<S extends EnhancedStore> =
  S extends EnhancedStore<any, infer A, any> ? A : never;

export type StoreEnhancersOf<S extends EnhancedStore> =
  S extends EnhancedStore<any, any, infer E> ? E : never;
