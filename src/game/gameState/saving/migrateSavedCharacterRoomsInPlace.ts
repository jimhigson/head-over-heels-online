import {
  type LegacyWallConfig,
  migrateWallConfigInPlace,
  migrateWallTilesInPlace,
} from "../../../model/inPlaceMutators/migrateWallTilesInPlace";
import { type ItemInPlayConfig } from "../../../model/ItemInPlay";
import { roomItemsIterable } from "../../../model/RoomState";
import { valuesIter } from "../../../utils/entries";
import { unitVectors } from "../../../utils/vectors/unitVectors";
import {
  alongAxisOfDirectionXy,
  type Direction8Xyz,
  doorAlongAxis,
  type Xyz,
} from "../../../utils/vectors/vectors";
import { fineXyzToBlockXyz } from "../../render/projections";
import { type SavedCharacterRooms } from "./SavedGameState";

/**
 * a direction as an old save could hold it (a friendly name) or as the in-play
 * model now holds it (a unit vector) - old saves are normalised to vectors
 */
type MaybeNamedDirection = Direction8Xyz | Xyz;

const asDirectionVector = (direction: MaybeNamedDirection): Xyz =>
  typeof direction === "string" ? unitVectors[direction] : direction;

/** in-place: convert a config/state's direction-ish field from name to vector */
const vectoriseInPlace = <F extends string>(
  holder: Partial<Record<F, MaybeNamedDirection>>,
  field: F,
): void => {
  const value: MaybeNamedDirection | undefined = holder[field];
  if (typeof value === "string") {
    holder[field] = unitVectors[value];
  }
};

type LegacyFloorConfig = Omit<
  ItemInPlayConfig<"floor", string, string>,
  "doorExpandedSides"
> & {
  /**
   * saves from before floors carried this field omit it (derived on load);
   * saves from before directions were vectorised carry side names
   */
  doorExpandedSides?: Array<MaybeNamedDirection>;
};

/**
 * saves from before floors carried `doorExpandedSides` omit it, but the
 * physical door expansion is already baked into the saved floor's
 * position/aabb, so the expanded sides are recovered by comparing against the
 * natural footprint: expanding towards/right shifts the position while
 * away/left only grows the aabb (mirroring how loadFloor expands)
 */
const migrateFloorConfigInPlace = (
  config: LegacyFloorConfig,
  /** the floor's (possibly door-expanded) baked position */
  position: Xyz,
  /** the floor's (possibly door-expanded) baked aabb */
  aabb: Xyz,
): void => {
  if (config.doorExpandedSides !== undefined) {
    // saves written when the sides were names normalise to vectors:
    config.doorExpandedSides = config.doorExpandedSides.map(asDirectionVector);
    return;
  }

  const { naturalFootprint } = config;
  const doorExpandedSides: Array<Xyz> = [];

  const shiftX = naturalFootprint.position.x - position.x;
  if (shiftX > 0) {
    doorExpandedSides.push(unitVectors.right);
  }
  if (aabb.x - naturalFootprint.aabb.x > shiftX) {
    doorExpandedSides.push(unitVectors.left);
  }

  const shiftY = naturalFootprint.position.y - position.y;
  if (shiftY > 0) {
    doorExpandedSides.push(unitVectors.towards);
  }
  if (aabb.y - naturalFootprint.aabb.y > shiftY) {
    doorExpandedSides.push(unitVectors.away);
  }

  config.doorExpandedSides = doorExpandedSides;
};

/**
 * migrate the rooms embedded in a saved game to the current format. Saves
 * embed both the room json and the loaded (in-play) items exactly as the
 * version that wrote them loaded them, so a save from an old version can
 * carry formats the current code no longer loads - eg walls without tiles
 * (pre-v25), or direction names where the in-play model now holds unit
 * vectors; this normalises them before the save is brought into play.
 */
export const migrateSavedCharacterRoomsInPlace = <RoomId extends string>(
  savedCharacterRooms: SavedCharacterRooms<RoomId>,
): void => {
  // head and heels can be in the same room (the same object twice):
  for (const room of new Set(valuesIter(savedCharacterRooms))) {
    migrateWallTilesInPlace(room.roomJson);

    for (const item of roomItemsIterable(room.items)) {
      if (item.hintShadowDirections !== undefined) {
        item.hintShadowDirections =
          item.hintShadowDirections.map(asDirectionVector);
      }

      switch (item.type) {
        case "wall": {
          const config = item.config as unknown as LegacyWallConfig;
          const alongAxis =
            typeof config.direction === "string" ?
              doorAlongAxis(config.direction)
            : alongAxisOfDirectionXy(config.direction);
          migrateWallConfigInPlace(
            config,
            room.planet,
            fineXyzToBlockXyz(item.state.position)[alongAxis],
          );
          vectoriseInPlace(config, "direction");
          break;
        }
        case "floor":
          migrateFloorConfigInPlace(
            item.config as LegacyFloorConfig,
            item.state.position,
            item.aabb,
          );
          break;
        case "doorFrame":
        case "doorLegs":
        case "lamp":
        case "firedDoughnut":
          vectoriseInPlace(
            item.config as { direction?: MaybeNamedDirection },
            "direction",
          );
          break;
        case "conveyor":
          vectoriseInPlace(
            item.config as { direction: MaybeNamedDirection },
            "direction",
          );
          vectoriseInPlace(
            item.state as { direction: MaybeNamedDirection },
            "direction",
          );
          break;
        case "monster":
        case "movingPlatform":
        case "sceneryPlayer":
          vectoriseInPlace(
            item.config as { startDirection?: MaybeNamedDirection },
            "startDirection",
          );
          break;
      }
    }
  }
};
