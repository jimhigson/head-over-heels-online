import { type SceneryName, type Wall } from "../../sprites/planets";
import { valuesIter } from "../../utils/entries";
import {
  alongAxisOfDirectionXy,
  type DirectionXy4,
  doorAlongAxis,
  type Xy,
  type Xyz,
} from "../../utils/vectors/vectors";
import { type AnyRoomJson } from "../RoomJson";
import { rotatingSceneryTiles } from "./rotatingSceneryTiles";

/**
 * the shape a wall's config could take before every wall was required to
 * carry tiles: near (towards/right) walls had no tiles and, if they were a
 * non-default length, encoded that length in a times property. The direction
 * is a name in json/old saves, or a unit vector for an in-play wall from a
 * newer save
 */
export type LegacyWallConfig = {
  direction: DirectionXy4 | Xyz;
  tiles?: Array<Wall<SceneryName>>;
  times?: Partial<Xy>;
};

const legacyWallAlongAxis = (direction: LegacyWallConfig["direction"]) =>
  typeof direction === "string" ?
    doorAlongAxis(direction)
  : alongAxisOfDirectionXy(direction);

/**
 * normalise a single wall's config so it carries tiles: tiles are generated
 * from the scenery, sized to the config's times (length) or one tile if no
 * length was given, and any times property is removed. No-op for walls that
 * already carry tiles.
 */
export const migrateWallConfigInPlace = (
  config: LegacyWallConfig,
  planet: SceneryName,
  /** the wall's position along its axis, in blocks - phases the tile pattern */
  positionAlongAxisBlocks: number,
): void => {
  if (config.times === undefined && config.tiles !== undefined) {
    return;
  }

  const alongAxis = legacyWallAlongAxis(config.direction);
  const length = config.times?.[alongAxis] ?? config.tiles?.length ?? 1;
  config.tiles = Array.from(
    rotatingSceneryTiles(planet, length, positionAlongAxisBlocks),
  );
  delete config.times;
};

/**
 * normalise a room's walls so every wall carries tiles.
 *
 * needed for json authored before tiles were universal (old saved community
 * rooms) and for the original-campaign patches, which resize a near wall by
 * adding a times property.
 */
export const migrateWallTilesInPlace = (room: AnyRoomJson): void => {
  for (const item of valuesIter(room.items)) {
    if (item.type !== "wall") {
      continue;
    }
    const config = item.config as LegacyWallConfig;
    const alongAxis = legacyWallAlongAxis(config.direction);
    migrateWallConfigInPlace(config, room.planet, item.position[alongAxis]);
  }
};
