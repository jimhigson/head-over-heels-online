/* eslint-disable @typescript-eslint/no-unused-vars */

// More accurate representation of the actual emitter case

type JsonItemUnion =
  | {
      type: "block";
      position: { x: number; y: number; z: number };
      config: {
        style: "artificial" | "organic";
      };
    }
  | {
      type: "pickup";
      position: { x: number; y: number; z: number };
      config: {
        gives: "extra-life" | "shield";
      };
    }
  | {
      type: "spring";
      position: { x: number; y: number; z: number };
      config: Record<string, never>;
    }
  | {
      type: "wall";
      position: { x: number; y: number; z: number };
      config: {
        direction: "left" | "right";
      };
    };

// Extract free item types
type FreeItemTypes = "block" | "pickup" | "spring";

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
  maximum: null | number;
};

// Test type
type TestEmitterReal = {
  type: "emitter";
  position: { x: number; y: number; z: number };
  config: EmitterConfig;
};
