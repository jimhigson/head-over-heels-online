import { type SceneryName, type Wall } from "../../sprites/planets";
import { valuesIter } from "../../utils/entries";
import {
  type DirectionXy4,
  doorAlongAxis,
  type Xy,
} from "../../utils/vectors/vectors";
import { type AnyRoomJson } from "../RoomJson";
import { rotatingSceneryTiles } from "./rotatingSceneryTiles";

/**
 * the shape a wall's json config could take before every wall was required to
 * carry tiles: near (towards/right) walls had no tiles and, if they were a
 * non-default length, encoded that length in a times property
 */
type LegacyWallConfig = {
  direction: DirectionXy4;
  tiles?: Array<Wall<SceneryName>>;
  times?: Partial<Xy>;
};

/**
 * normalise a room's walls so every wall carries tiles.
 *
 * needed for json authored before tiles were universal (old saved community
 * rooms) and for the original-campaign patches, which resize a near wall by
 * adding a times property. Such a wall gets tiles generated from the scenery,
 * sized to its times (length) or one tile if no length was given, and any times
 * property is removed.
 */
export const migrateWallTilesInPlace = (room: AnyRoomJson): void => {
  for (const item of valuesIter(room.items)) {
    if (item.type !== "wall") {
      continue;
    }
    const config = item.config as LegacyWallConfig;

    if (config.times === undefined && config.tiles !== undefined) {
      continue;
    }

    const alongAxis = doorAlongAxis(config.direction);
    const length = config.times?.[alongAxis] ?? config.tiles?.length ?? 1;
    config.tiles = Array.from(
      rotatingSceneryTiles(room.planet, length, item.position[alongAxis]),
    );
    delete config.times;
  }
};
