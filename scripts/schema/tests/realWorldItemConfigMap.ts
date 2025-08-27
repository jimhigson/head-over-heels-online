/* eslint-disable @typescript-eslint/no-unused-vars */
import type { EmptyObject } from "type-fest";

// Simplified SceneryName
type SceneryName = "blacktooth" | "bookworld" | "egyptus";

// Utility types
type ConsolidatableConfig = {
  times?: { x?: number; y?: number; z?: number };
};

type DirectionXy4 = "away" | "left" | "right" | "towards";

type Subset<T, U extends T> = U;
type Disappear = { on: "stand" | "touch" };

// ItemConfigMap following the exact pattern
type ItemConfigMap<
  RoomId extends string,
  RoomItemId extends string,
  ScN extends SceneryName = SceneryName,
> = {
  door: {
    toRoom: RoomId;
    direction: DirectionXy4;
  };
  conveyor: ConsolidatableConfig & {
    direction: DirectionXy4;
    disappearing?: Subset<Disappear, { on: "stand" }>;
  };
  wall: {
    direction: DirectionXy4;
    tiles?: string[];
  };
  block: ConsolidatableConfig & {
    style: "artificial" | "book" | "organic" | "tower";
    disappearing?: Subset<Disappear, { on: "stand" }>;
  };
  ball: ConsolidatableConfig;
  hushPuppy: ConsolidatableConfig;
  spikes: ConsolidatableConfig;
};

// JsonItemType
type JsonItemType =
  | "ball"
  | "block"
  | "conveyor"
  | "door"
  | "hushPuppy"
  | "spikes"
  | "wall";

// JsonItemConfig following exact pattern
type JsonItemConfig<
  T extends JsonItemType,
  RoomId extends string,
  RoomItemId extends string = string,
  ScN extends SceneryName = SceneryName,
> =
  T extends keyof ItemConfigMap<RoomId, RoomItemId, ScN> ?
    ItemConfigMap<RoomId, RoomItemId, ScN>[T]
  : EmptyObject;

// JsonItem type
type JsonItem<
  T extends JsonItemType,
  RoomId extends string = string,
  RoomItemId extends string = string,
  ScN extends SceneryName = SceneryName,
> = {
  type: T;
  position: { x: number; y: number; z: number };
  config: JsonItemConfig<T, RoomId, RoomItemId, ScN>;
  isExtra?: true;
};

// JsonItemUnion using mapped type
type JsonItemUnion<
  RoomId extends string = string,
  RoomItemId extends string = string,
> = {
  [IT in JsonItemType]: JsonItem<IT, RoomId, RoomItemId, SceneryName>;
}[JsonItemType];

// The actual test type
type TestUnion = JsonItemUnion<string, string>;
