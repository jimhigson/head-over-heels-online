import type {
  CharacterName,
  Campaign,
} from "../../../../../../model/modelTypes";
import type { SceneryName } from "../../../../../../sprites/planets";
import type {
  PickupsCollected,
  CharacterRooms,
} from "../../../../../gameState/GameState";
import type { Bounds } from "./Map.svg";
import type { SortedObjectOfRoomGridPositionSpecs } from "./sortRoomGridPositions";

/**
 * everything needed to load the map -
 * the implementation of how we get this data can differ (provided by different hooks)
 * depending on if we are in the editor or in-game
 */
export type MapData<RoomId extends string> = {
  campaign: Campaign<RoomId>;
  characterRooms: CharacterRooms<RoomId>;
  currentCharacterName: CharacterName;
  curRoomId: RoomId | undefined;
  gridPositions: SortedObjectOfRoomGridPositionSpecs<RoomId>;
  mapBounds: Bounds;
  pickupsCollected: PickupsCollected<RoomId>;
  roomsExplored: Record<RoomId, true>;
  curRoomScenery?: SceneryName;
};
