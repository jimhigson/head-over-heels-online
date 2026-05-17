import { type UnionOfAllItemInPlayTypes } from "../../../model/ItemInPlay";
import { type RoomJson, roomJsonItemsIterable } from "../../../model/RoomJson";
import {
  roomItemsIterable,
  roomSpatialIndexKey,
  type RoomState,
  type RoomStateItems,
} from "../../../model/RoomState";
import { type PlanetName } from "../../../sprites/planets";
import { type ScrollsRead } from "../../../store/slices/gameInPlay/gameInPlaySlice";
import {
  type PokesEnabled,
  type UserSettings,
} from "../../../store/slices/userSettings/userSettingsSlice";
import { emptyObject } from "../../../utils/empty";
import { entries } from "../../../utils/entries";
import { collisionItemWithIndex } from "../../collision/aabbCollision";
import { findStandingOnWithHighestPriorityAndMostOverlap } from "../../collision/checkStandingOn";
import { GridSpatialIndex } from "../../physics/gridSpace/GridSpatialIndex";
import { isFreeItem, isSolid, isSpatial } from "../../physics/itemPredicates";
import { type RoomPickupsCollected } from "../GameState";
import { setStandingOnWithoutRemovingOldFirst } from "../mutators/standingOn/setStandingOnWithoutRemovingOldFirst";
import {
  buildRoomJsonDirectionalIndex,
  type RoomDirectionalIndex,
} from "./buildRoomJsonDirectionalIndex";
import { loadItemFromJson } from "./loadItemFromJson";
import { loadOutOfBoundsItem } from "./loadOutOfBoundsItem";
import { loadPortalsAboveAndBelow } from "./loadPortalsAboveAndBelow";
import { loadRoomEntrySound } from "./loadRoomEntrySound";
import { maybeLoadExtraCornerShadow } from "./maybeLoadExtraCornerShadow";

function* loadItems<RoomId extends string, RoomItemId extends string>(
  roomJson: RoomJson<RoomId, RoomItemId>,
  directionalIndex: RoomDirectionalIndex<RoomId, RoomItemId>,
  roomPickupsCollected: RoomPickupsCollected,
  scrollsRead: ScrollsRead,
  planetsLiberated: Partial<Record<PlanetName, boolean>>,
  pokesEnabled: PokesEnabled,
  isNewGame: boolean,
): Generator<UnionOfAllItemInPlayTypes<RoomId>> {
  const ent = entries(roomJson.items);
  for (const [id, item] of ent) {
    if (item.type === "player" && !isNewGame) {
      continue;
    }
    yield* loadItemFromJson(
      id,
      item,
      roomJson,
      directionalIndex,
      roomPickupsCollected,
      scrollsRead,
      planetsLiberated,
      pokesEnabled,
    );
  }
}

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
  const roomEntrySound = loadRoomEntrySound(roomJson, userSettings, isNewGame);
  const outOfBoundsItem = loadOutOfBoundsItem<RoomId, RoomItemId>();
  const items: RoomStateItems<RoomId, RoomItemId> = {
    ...itemsInItemObjectMap(loadPortalsAboveAndBelow(roomJson, roomItems)),
    ...roomItems,
    ...itemsInItemObjectMap(maybeLoadExtraCornerShadow(directionalIndex)),
    ...(roomEntrySound ? { [roomEntrySound.id]: roomEntrySound } : undefined),
    [outOfBoundsItem.id]: outOfBoundsItem,
  };

  const spatialIndex = new GridSpatialIndex(
    roomItemsIterable(items).filter(isSpatial),
  );

  // warn if anything is overlapping in the room
  for (const i of roomItemsIterable(items)) {
    const collisions = collisionItemWithIndex(i, spatialIndex);
    const solidCol = collisions.find(
      (col) =>
        isSolid(i) &&
        isSolid(col) &&
        // walls are allowed to collide with other walls, since they have thickness
        // - this is only really possible in large rooms with extra walls
        !(i.type === "wall" && col.type === "wall"),
    );

    if (solidCol !== undefined) {
      console.error(
        `in room ${roomJson.id} item ${i.id} @${JSON.stringify(i.state.position)} #${JSON.stringify(i.aabb)} is colliding with (solid item) ${solidCol.id} @${JSON.stringify(solidCol.state.position)} #${JSON.stringify(solidCol.aabb)} on loading room ${roomJson.id}`,
      );
    }
  }

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
    [roomSpatialIndexKey]: spatialIndex,
  };

  return roomState;
};
