/* eslint-disable @typescript-eslint/no-unused-vars */

// Simplified types for testing emitter pattern

type PickupConfig = {
  gives: "extra-life" | "shield";
};

type SpringConfig = Record<string, never>;

type BlockConfig = {
  style: "artificial" | "organic";
};

// Free item types that can be emitted
type FreeItemType = "block" | "pickup" | "spring";

// Map of configs
type ItemConfigMap = {
  pickup: PickupConfig;
  spring: SpringConfig;
  block: BlockConfig;
};

// Generic free item
type FreeItem<T extends FreeItemType> = {
  type: T;
  config: ItemConfigMap[T];
};

// Union of all free items
type FreeItemUnion = {
  [T in FreeItemType]: FreeItem<T>;
}[FreeItemType];

// Emitter config
type EmitterConfig = {
  emits: FreeItemUnion;
  period: number;
  maximum: null | number;
};

// Test type
type TestEmitter = {
  type: "emitter";
  position: { x: number; y: number; z: number };
  config: EmitterConfig;
};
