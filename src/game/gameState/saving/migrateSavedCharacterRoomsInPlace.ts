import {
  type LegacyWallConfig,
  migrateWallConfigInPlace,
  migrateWallTilesInPlace,
} from "../../../model/inPlaceMutators/migrateWallTilesInPlace";
import { type ItemInPlayConfig } from "../../../model/ItemInPlay";
import { roomItemsIterable } from "../../../model/RoomState";
import { valuesIter } from "../../../utils/entries";
import {
  type DirectionXy4,
  doorAlongAxis,
  type Xyz,
} from "../../../utils/vectors/vectors";
import { fineXyzToBlockXyz } from "../../render/projections";
import { type SavedCharacterRooms } from "./SavedGameState";

type LegacyFloorConfig = Omit<
  ItemInPlayConfig<"floor", string, string>,
  "doorExpandedSides"
> & {
  /** saves from before floors carried this field omit it; derived on load */
  doorExpandedSides?: Array<DirectionXy4>;
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
    return;
  }

  const { naturalFootprint } = config;
  const doorExpandedSides: Array<DirectionXy4> = [];

  const shiftX = naturalFootprint.position.x - position.x;
  if (shiftX > 0) {
    doorExpandedSides.push("right");
  }
  if (aabb.x - naturalFootprint.aabb.x > shiftX) {
    doorExpandedSides.push("left");
  }

  const shiftY = naturalFootprint.position.y - position.y;
  if (shiftY > 0) {
    doorExpandedSides.push("towards");
  }
  if (aabb.y - naturalFootprint.aabb.y > shiftY) {
    doorExpandedSides.push("away");
  }

  config.doorExpandedSides = doorExpandedSides;
};

/**
 * migrate the rooms embedded in a saved game to the current format. Saves
 * embed both the room json and the loaded (in-play) items exactly as the
 * version that wrote them loaded them, so a save from an old version can
 * carry formats the current code no longer loads - eg walls without tiles
 * (pre-v25); this normalises them before the save is brought into play.
 */
export const migrateSavedCharacterRoomsInPlace = <RoomId extends string>(
  savedCharacterRooms: SavedCharacterRooms<RoomId>,
): void => {
  // head and heels can be in the same room (the same object twice):
  for (const room of new Set(valuesIter(savedCharacterRooms))) {
    migrateWallTilesInPlace(room.roomJson);

    for (const item of roomItemsIterable(room.items)) {
      if (item.type === "wall") {
        const config = item.config as LegacyWallConfig;
        const alongAxis = doorAlongAxis(config.direction);
        migrateWallConfigInPlace(
          config,
          room.planet,
          fineXyzToBlockXyz(item.state.position)[alongAxis],
        );
      } else if (item.type === "floor") {
        migrateFloorConfigInPlace(
          item.config as LegacyFloorConfig,
          item.state.position,
          item.aabb,
        );
      }
    }
  }
};
