import { type UnionOfAllItemInPlayTypes } from "../../../model/ItemInPlay";
import { type RoomJson, roomJsonItemsIterable } from "../../../model/RoomJson";
import {
  roomItemsIterable,
  roomSpatialIndexKey,
  type RoomState,
  type RoomStateItems,
} from "../../../model/RoomState";
import { type PlanetName, type SceneryName } from "../../../sprites/planets";
import { type ScrollsRead } from "../../../store/slices/gameInPlay/gameInPlaySlice";
import { type UserSettings } from "../../../store/slices/userSettings/userSettingsSlice";
import { emptyObject } from "../../../utils/empty";
import { findStandingOnWithHighestPriorityAndMostOverlap } from "../../collision/checkStandingOn";
import { SpatialIndex } from "../../physics/gridSpace/SpatialIndex";
import { isFreeItem, isLamp, isSpatial } from "../../physics/itemPredicates";
import { tickLampLightBeams } from "../../physics/mechanics/lightBeams";
import { type RoomPickupsCollected } from "../GameState";
import { setStandingOnWithoutRemovingOldFirst } from "../mutators/standingOn/setStandingOnWithoutRemovingOldFirst";
import { buildRoomJsonDirectionalIndex } from "./buildRoomJsonDirectionalIndex";
import { loadItems } from "./loadItems";
import { loadOutOfBoundsItem } from "./loadOutOfBoundsItem";
import { loadPortalsAboveAndBelow } from "./loadPortalsAboveAndBelow";
import { loadRoomEntrySound } from "./loadRoomEntrySound";
import { maybeLoadExtraCornerShadow } from "./maybeLoadExtraCornerShadow";

/**
 * convert items from a flat list to an object map, key'd by their ids
 */
const itemsInItemObjectMap = <RoomId extends string, RoomItemId extends string>(
  items: Iterable<UnionOfAllItemInPlayTypes<RoomId, RoomItemId>>,
): RoomStateItems<RoomId, RoomItemId> => {
  const map = {} as RoomStateItems<RoomId, RoomItemId>;
  for (const item of items) {
    map[item.id] = item;
  }
  return map;
};

export type LoadRoomOptions<
  RoomId extends string,
  RoomItemId extends string,
> = {
  roomJson: RoomJson<RoomId, RoomItemId>;
  roomPickupsCollected: RoomPickupsCollected;
  scrollsRead: ScrollsRead;
  planetsLiberated?: Partial<Record<PlanetName, boolean>>;
  /**
   * if true, this is a new game - ie, load head and heels at using their starting json
   * item if they are in the room
   */
  isNewGame?: boolean;
  userSettings: UserSettings;
  /**
   * the planet of the room being left, used to decide whether to play the
   * room-entry tune when the room-entry-tunes setting is "sparse" (only play on
   * a change of planet). undefined when there is no previous room, eg on initial
   * game load
   */
  previousRoomPlanet?: SceneryName;
};

/**
 * convert a room from it's storage (json) format to its in-play (loaded) format
 */
export const loadRoom = <RoomId extends string, RoomItemId extends string>({
  roomJson,
  roomPickupsCollected,
  scrollsRead,
  planetsLiberated,
  isNewGame = false,
  userSettings,
  previousRoomPlanet,
}: LoadRoomOptions<RoomId, RoomItemId>): RoomState<RoomId, RoomItemId> => {
  const directionalIndex = buildRoomJsonDirectionalIndex(
    roomJsonItemsIterable(roomJson),
  );
  const roomItems = itemsInItemObjectMap(
    loadItems(
      roomJson,
      directionalIndex,
      roomPickupsCollected,
      scrollsRead,
      planetsLiberated ?? emptyObject,
      userSettings.pokesEnabled,
      isNewGame,
    ),
  );
  const roomEntrySound = loadRoomEntrySound(
    roomJson,
    userSettings,
    isNewGame,
    previousRoomPlanet,
  );
  const outOfBoundsItem = loadOutOfBoundsItem<RoomId, RoomItemId>();
  const items: RoomStateItems<RoomId, RoomItemId> = {
    ...itemsInItemObjectMap(loadPortalsAboveAndBelow(roomJson, roomItems)),
    ...roomItems,
    // rooms always load at the base camera angle (rotation re-derives via
    // reloadStructureForCamera):
    ...itemsInItemObjectMap(maybeLoadExtraCornerShadow(directionalIndex)),
    ...(roomEntrySound ? { [roomEntrySound.id]: roomEntrySound } : undefined),
    [outOfBoundsItem.id]: outOfBoundsItem,
  };

  const spatialIndex = new SpatialIndex(
    roomItemsIterable(items).filter(isSpatial),
  );

  // check for items that are standing on other items:
  for (const i of roomItemsIterable(items).filter(isFreeItem)) {
    const newStandingOn = findStandingOnWithHighestPriorityAndMostOverlap(
      i,
      roomItemsIterable(items).filter((j) => j.id !== i.id),
    );
    if (newStandingOn !== undefined) {
      setStandingOnWithoutRemovingOldFirst({ above: i, below: newStandingOn });
    }
  }

  const roomState: RoomState<RoomId, RoomItemId> = {
    ...roomJson,
    roomJson,
    items,
    roomTime: 0,
    progression: 0,
    [roomSpatialIndexKey]: spatialIndex,
  };

  // cast lamps' light beams immediately so they exist at roomTime=0 - the
  // editor renders rooms without ever ticking them, as do screenshot tests
  // running with gameSpeed=0:
  for (const lamp of roomItemsIterable(items).filter(isLamp)) {
    tickLampLightBeams(lamp, roomState);
  }

  return roomState;
};
