import type { SceneryName, Wall } from "../../sprites/planets";
import type { WritableNonEmptyTuple } from "../../utils/types/WritableNonEmptyTuple";
import { rotatingSceneryTiles } from "./rotatingSceneryTiles";

/**
 * the tiles for a wall of the given length
 */
export const rotatingSceneryWallTiles = <S extends SceneryName>(
  sceneryName: S,
  /**
   * how many tiles the wall has. A wall always has at least one tile, so this
   * must be at least 1
   */
  numberOfTiles: number,
  startingAtOrdinal: number = 0,
): WritableNonEmptyTuple<Wall<S>> => {
  if (numberOfTiles < 1) {
    throw new Error(`a wall needs at least one tile, not ${numberOfTiles}`);
  }

  return rotatingSceneryTiles(
    sceneryName,
    numberOfTiles,
    startingAtOrdinal,
  ).toArray() as WritableNonEmptyTuple<Wall<S>>;
};
