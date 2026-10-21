import { isRoomStructureItemType } from "../model/json/isRoomStructureItemType";
import { type JsonItemType } from "../model/json/JsonItem";
import { type GridResolution } from "./slice/levelEditorSlice";

/**
 * whether items of this type can only be placed or moved by whole blocks,
 * whatever the grid resolution - true of the room's structure, which is laid
 * out on whole blocks
 */
export const movesOnlyInWholeBlocks = isRoomStructureItemType;

/**
 * the grid that items of these types snap to as they are placed or moved
 * together: the editor's grid resolution, or whole blocks if any of them must
 */
export const snapGridResolution = (
  /**
   * the editor's grid resolution setting
   */
  gridResolution: GridResolution,
  itemTypes: Iterable<JsonItemType>,
): GridResolution =>
  Iterator.from(itemTypes).some(movesOnlyInWholeBlocks) ? 1 : gridResolution;
