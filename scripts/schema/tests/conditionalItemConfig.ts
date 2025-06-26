/* eslint-disable @typescript-eslint/no-unused-vars */
import type { EmptyObject } from "type-fest";

// Pattern similar to JsonItemConfig
type JsonItemConfig<T extends string> =
  T extends "door" ? { toRoom: string; direction: string }
  : T extends "wall" ? { tiles: string[] }
  : T extends "conveyor" ? { direction: string; speed?: number }
  : EmptyObject;

type DoorConfig = JsonItemConfig<"door">;
type ConveyorConfig = JsonItemConfig<"conveyor">;
type UnknownConfig = JsonItemConfig<"unknown">;
