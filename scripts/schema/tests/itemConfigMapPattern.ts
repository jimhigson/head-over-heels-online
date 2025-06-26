/* eslint-disable @typescript-eslint/no-unused-vars */
import type { EmptyObject } from "type-fest";

// Simplified version of the actual ItemConfigMap
type ItemConfigMap<RoomId extends string> = {
  door: {
    toRoom: RoomId;
    direction: "left" | "right" | "up" | "down";
  };
  wall: {
    direction: "left" | "right" | "up" | "down";
    tiles?: string[];
  };
  conveyor: {
    direction: "left" | "right" | "up" | "down";
    disappearing?: { on: "stand" };
  };
  block: EmptyObject;
};

// This is the pattern that should handle missing items
type ItemConfig<T extends string> =
  T extends keyof ItemConfigMap<string> ? ItemConfigMap<string>[T]
  : EmptyObject;

// These should resolve to the specific configs
type DoorConfig = ItemConfig<"door">;
type WallConfig = ItemConfig<"wall">;
type ConveyorConfig = ItemConfig<"conveyor">;
type BlockConfig = ItemConfig<"block">;
type MissingConfig = ItemConfig<"foo">; // Should resolve to EmptyObject
