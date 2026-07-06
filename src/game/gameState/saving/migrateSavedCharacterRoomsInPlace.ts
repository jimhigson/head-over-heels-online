import {
  type LegacyWallConfig,
  migrateWallConfigInPlace,
  migrateWallTilesInPlace,
} from "../../../model/inPlaceMutators/migrateWallTilesInPlace";
import { roomItemsIterable } from "../../../model/RoomState";
import { valuesIter } from "../../../utils/entries";
import { doorAlongAxis } from "../../../utils/vectors/vectors";
import { fineXyzToBlockXyz } from "../../render/projections";
import { type SavedCharacterRooms } from "./SavedGameState";

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
      if (item.type !== "wall") {
        continue;
      }
      const config = item.config as LegacyWallConfig;
      const alongAxis = doorAlongAxis(config.direction);
      migrateWallConfigInPlace(
        config,
        room.planet,
        fineXyzToBlockXyz(item.state.position)[alongAxis],
      );
    }
  }
};
