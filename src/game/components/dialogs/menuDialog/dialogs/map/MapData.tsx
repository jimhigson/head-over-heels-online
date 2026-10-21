import { type SortedObjectOfRoomGridPositionSpecs } from "../../../../../../model/map/sortRoomGridPositions";
import { type TeleporterLink } from "../../../../../../model/map/teleporterLinks";
import { type SceneryName } from "../../../../../../sprites/planets";
import { type Bounds } from "./Map.svg";

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
  /**
   * the room the area was laid out from, which names and stands for it
   */
  firstRoomId: RoomId;
  mapBounds: Bounds;
  gridPositions: SortedObjectOfRoomGridPositionSpecs<RoomId>;
};

/**
 * the map's geometry, and where on it the current room is. What is drawn in
 * each room comes from the map's context (see `MapContextValue`)
 */
export type MapData<RoomId extends string> = {
  isError: false;
  curRoomId: RoomId | undefined;
  curSubRoomId: string | undefined;
  curRoomScenery?: SceneryName;

  /**
   * teleporter links between rooms on the map, scraped while resolving geometry.
   * optional since only the editor populates it
   */
  teleporterLinks?: TeleporterLink<RoomId>[];

  areas: Array<MapArea<RoomId>>;
};
