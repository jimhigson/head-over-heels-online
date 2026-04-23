import type {
  CharacterName,
  OptionallyNamedCampaign,
} from "../../../../../../model/modelTypes";
import type { SceneryName } from "../../../../../../sprites/planets";
import type {
  CharacterRooms,
  PickupsCollected,
} from "../../../../../gameState/GameState";
import type { Bounds } from "./Map.svg";
import type { SortedObjectOfRoomGridPositionSpecs } from "./sortRoomGridPositions";

/**
 * everything needed to load the map -
 * the implementation of how we get this data can differ (provided by different hooks)
 * depending on if we are in the editor or in-game
 */
export type MapDataError = {
  isError: true;
  errors: Array<string>;
};

export type MapData<RoomId extends string> = {
  isError: false;
  campaign: OptionallyNamedCampaign<RoomId>;
  characterRooms: CharacterRooms<RoomId>;
  currentCharacterName: CharacterName;
  curRoomId: RoomId | undefined;
  gridPositions: SortedObjectOfRoomGridPositionSpecs<RoomId>;
  mapBounds: Bounds;
  pickupsCollected: PickupsCollected<RoomId>;
  roomsExplored: Record<RoomId, true>;
  curRoomScenery?: SceneryName;
};
