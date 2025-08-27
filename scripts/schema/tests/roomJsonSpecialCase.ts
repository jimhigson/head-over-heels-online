/* eslint-disable @typescript-eslint/no-unused-vars */

// Simplified version of JsonItemType
type JsonItemType = "block" | "conveyor" | "door" | "wall";

// Simplified ItemConfigMap
type ItemConfigMap = {
  door: { toRoom: string; direction: string };
  wall: { tiles?: string[] };
  conveyor: { direction: string; speed?: number };
  block: { style: string };
};

// Simplified JsonItemConfig
type JsonItemConfig<T extends JsonItemType> =
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type -- this is ok because when we convert to json schema, {} does convert to an empty object
  T extends keyof ItemConfigMap ? ItemConfigMap[T] : {};

// Simplified JsonItem
type JsonItem<T extends JsonItemType> = {
  type: T;
  position: { x: number; y: number; z: number };
  config: JsonItemConfig<T>;
};

// JsonItemUnion using mapped type pattern
type JsonItemUnion = {
  [IT in JsonItemType]: JsonItem<IT>;
}[JsonItemType];

// RoomJsonItems - this becomes Record<string, any> due to compiler limitation
type RoomJsonItems<ItemId extends string> = Record<ItemId, JsonItemUnion>;

// Simplified RoomJson
type RoomJson<ItemId extends string> = {
  id: string;
  size: { x: number; y: number; z?: number };
  items: RoomJsonItems<ItemId>;
  color: string;
};

// Test type
type TestRoomJson = RoomJson<string>;
