/* eslint-disable @typescript-eslint/no-unused-vars */
type ConsolidatableConfig = {
  times?: { x?: number; y?: number; z?: number };
};

type ConveyorConfig = ConsolidatableConfig & {
  direction: "down" | "left" | "right" | "up";
  disappearing?: { on: "stand" };
};

type TestItem = {
  type: "conveyor";
  config: ConveyorConfig;
};
