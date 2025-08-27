/* eslint-disable @typescript-eslint/no-unused-vars */
type ItemTypes = "conveyor" | "door" | "wall";

type ItemConfigMap = {
  door: { toRoom: string; direction: string };
  wall: { tiles: string[] };
  conveyor: { direction: string; speed: number };
};

type JsonItem<T extends ItemTypes> = {
  type: T;
  position: { x: number; y: number };
  config: ItemConfigMap[T];
};

// The mapped type pattern used in JsonItemUnion
type JsonItemUnion = {
  [K in ItemTypes]: JsonItem<K>;
}[ItemTypes];

// Test case: Record with a union value type
type ItemsRecord = Record<string, JsonItemUnion>;
