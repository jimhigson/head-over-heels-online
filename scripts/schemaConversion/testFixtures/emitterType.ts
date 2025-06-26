/* eslint-disable @typescript-eslint/no-unused-vars */

// Simplified types for testing emitter pattern

type PickupConfig = {
  gives: "shield" | "extra-life";
};

type SpringConfig = Record<string, never>;

type BlockConfig = {
  style: "organic" | "artificial";
};

// Free item types that can be emitted
type FreeItemType = "pickup" | "spring" | "block";

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
  maximum: number | null;
};

// Test type
type TestEmitter = {
  type: "emitter";
  position: { x: number; y: number; z: number };
  config: EmitterConfig;
};
