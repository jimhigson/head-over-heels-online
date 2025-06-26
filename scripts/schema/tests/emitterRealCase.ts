/* eslint-disable @typescript-eslint/no-unused-vars */

// More accurate representation of the actual emitter case

type JsonItemUnion =
  | {
      type: "pickup";
      position: { x: number; y: number; z: number };
      config: {
        gives: "shield" | "extra-life";
      };
    }
  | {
      type: "spring";
      position: { x: number; y: number; z: number };
      config: Record<string, never>;
    }
  | {
      type: "block";
      position: { x: number; y: number; z: number };
      config: {
        style: "organic" | "artificial";
      };
    }
  | {
      type: "wall";
      position: { x: number; y: number; z: number };
      config: {
        direction: "left" | "right";
      };
    };

// Extract free item types
type FreeItemTypes = "pickup" | "spring" | "block";

// EmittableItemJson - items that can be emitted
type EmittableItemJson = Extract<
  JsonItemUnion,
  {
    type: FreeItemTypes;
  }
>;

// Recipe is the item without position
type EmittableItemRecipe = Omit<EmittableItemJson, "position">;

// Emitter config
type EmitterConfig = {
  emits: EmittableItemRecipe;
  period: number;
  maximum: number | null;
};

// Test type
type TestEmitterReal = {
  type: "emitter";
  position: { x: number; y: number; z: number };
  config: EmitterConfig;
};
