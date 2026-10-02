import { type SortedObjectOfRoomGridPositionSpecs } from "../../../../../../model/map/sortRoomGridPositions";
import { type TeleporterLink } from "../../../../../../model/map/teleporterLinks";
import {
  type CharacterName,
  type OptionallyNamedCampaign,
} from "../../../../../../model/modelTypes";
import { type SceneryName } from "../../../../../../sprites/planets";
import {
  type CharacterRooms,
  type PickupsCollected,
} from "../../../../../gameState/GameState";
import { type Bounds } from "./Map.svg";
import { type NotableItemsByCell } from "./notableItemsByCell";

/**
 * everything needed to load the map -
 * the implementation of how we get this data can differ (provided by different hooks)
 * depending on if we are in the editor or in-game
 */
export type MapDataError = {
  isError: true;
  errors: Array<string>;
};

/**
 * Maps can have multiple areas that are not positioned to each other - this is one
 * of those areas
 */
export type MapArea<RoomId extends string> = {
  mapBounds: Bounds;
  gridPositions: SortedObjectOfRoomGridPositionSpecs<RoomId>;
  /**
   * the notable items (and their icon positions) per map cell, computed once so
   * the room renderer and behaviours draw to the same positions
   */
  notableItemsByCell?: NotableItemsByCell<RoomId>;
};

export type MapData<RoomId extends string> = {
  isError: false;
  campaign: OptionallyNamedCampaign<RoomId>;
  characterRooms: CharacterRooms<RoomId>;
  currentCharacterName: CharacterName;
  curRoomId: RoomId | undefined;
  curSubRoomId: string | undefined;
  pickupsCollected: PickupsCollected<RoomId>;
  roomsExplored: Record<RoomId, true>;
  curRoomScenery?: SceneryName;

  /**
   * teleporter links between rooms on the map, scraped while resolving geometry.
   * optional since only the editor populates it
   */
  teleporterLinks?: TeleporterLink<RoomId>[];

  areas: Array<MapArea<RoomId>>;
};
