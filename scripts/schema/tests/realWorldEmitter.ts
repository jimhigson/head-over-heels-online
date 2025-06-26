/* eslint-disable @typescript-eslint/no-unused-vars */

// Test real-world emitter type from the game

type CharacterName = "head" | "heels" | "headOverHeels";

type FreeItemTypes = CharacterName | "pickup" | "spring";

type EmittableItemJson = Extract<
  JsonItemUnion,
  {
    type: FreeItemTypes | "firedDoughnut";
  }
>;

type EmittableItemRecipe = Omit<EmittableItemJson, "position">;

type JsonItemUnion =
  | {
      type: "head";
      position: { x: number; y: number; z: number };
      config: Record<string, never>;
    }
  | {
      type: "heels";
      position: { x: number; y: number; z: number };
      config: Record<string, never>;
    }
  | {
      type: "headOverHeels";
      position: { x: number; y: number; z: number };
      config: Record<string, never>;
    }
  | {
      type: "pickup";
      position: { x: number; y: number; z: number };
      config: {
        gives: "shield" | "extra-life" | "fast" | "jumps";
      };
    }
  | {
      type: "spring";
      position: { x: number; y: number; z: number };
      config: Record<string, never>;
    }
  | {
      type: "firedDoughnut";
      position: { x: number; y: number; z: number };
      config: {
        direction?: "towards" | "right" | "away" | "left";
      };
    };

// Test type - emitter with emits property
type TestEmitter = {
  type: "emitter";
  position: { x: number; y: number; z: number };
  config: {
    emits: EmittableItemRecipe;
    period: number;
    maximum: number | null;
  };
};
