/* eslint-disable @typescript-eslint/no-unused-vars */

// Test real-world emitter type from the game

type CharacterName = "head" | "headOverHeels" | "heels";

type FreeItemTypes = "pickup" | "spring" | CharacterName;

type EmittableItemJson = Extract<
  JsonItemUnion,
  {
    type: "firedDoughnut" | FreeItemTypes;
  }
>;

type EmittableItemRecipe = Omit<EmittableItemJson, "position">;

type JsonItemUnion =
  | {
      type: "firedDoughnut";
      position: { x: number; y: number; z: number };
      config: {
        direction?: "away" | "left" | "right" | "towards";
      };
    }
  | {
      type: "head";
      position: { x: number; y: number; z: number };
      config: Record<string, never>;
    }
  | {
      type: "headOverHeels";
      position: { x: number; y: number; z: number };
      config: Record<string, never>;
    }
  | {
      type: "heels";
      position: { x: number; y: number; z: number };
      config: Record<string, never>;
    }
  | {
      type: "pickup";
      position: { x: number; y: number; z: number };
      config: {
        gives: "extra-life" | "fast" | "jumps" | "shield";
      };
    }
  | {
      type: "spring";
      position: { x: number; y: number; z: number };
      config: Record<string, never>;
    };

// Test type - emitter with emits property
type TestEmitter = {
  type: "emitter";
  position: { x: number; y: number; z: number };
  config: {
    emits: EmittableItemRecipe;
    period: number;
    maximum: null | number;
  };
};
