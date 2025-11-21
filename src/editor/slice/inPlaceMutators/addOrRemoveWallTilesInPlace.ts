import type { SceneryName, Wall } from "../../../sprites/planets";

import { rotatingSceneryTiles } from "../rotatingSceneryTiles";

export const addOrRemoveWallTilesInPlace = <S extends SceneryName>(
  tiles: Array<Wall<S>>,
  scenery: S,
  newSize: number,
) => {
  const sizeDelta = newSize - tiles.length;
  if (sizeDelta > 0) {
    tiles.push(...rotatingSceneryTiles(scenery, sizeDelta, tiles.length));
  } else if (sizeDelta < 0) {
    tiles.splice(newSize);
  }
};
