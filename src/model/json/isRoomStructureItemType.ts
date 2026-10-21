import { type JsonItemType } from "./JsonItem";

/**
 * whether items of this type make up the room's structure - its floors, walls
 * and doors - rather than being things in the room
 */
export const isRoomStructureItemType = (itemType: JsonItemType): boolean =>
  itemType === "floor" || itemType === "wall" || itemType === "door";
