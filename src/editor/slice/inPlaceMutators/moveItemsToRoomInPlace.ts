import { current } from "@reduxjs/toolkit";
import { produce } from "immer";

import { nextItemIdSet } from "../../../model/inPlaceMutators/nextItemId";
import {
  resolveTeleporterLanding,
  type TeleporterLandingConfig,
} from "../../../model/json/resolveTeleporterLanding";
import { rewriteControllerTargetIdsInPlace } from "../../../model/json/rewriteControllerTargetIdsInPlace";
import {
  iterateRoomJsonItemIds,
  iterateRoomJsonItemsWithIds,
} from "../../../model/RoomJsonItemIterators";
import { keys, objectEntriesIter, valuesIter } from "../../../utils/entries";
import { addXyz, type Xyz } from "../../../utils/vectors/vectors";
import {
  type EditorJsonItem,
  type EditorJsonItemUnion,
  type EditorRoomId,
  type EditorRoomItemId,
  type EditorRoomJson,
} from "../../editorTypes";
import { isMovableBetweenRooms } from "../isMovableBetweenRooms";
import {
  type LevelEditorState,
  type PreviewedEditsByRoom,
  type PreviewedRoomItemEdits,
} from "../levelEditorSlice";
import { layoutNodesOfType } from "../PaneLayout";
import {
  type UndoDescription,
  type UndoItemEntry,
} from "../reducers/undoDescription";
import {
  commitPendingEditsInPlace,
  commitPendingNudgeInPlace,
} from "./commitPendingNudgeInPlace";

type TeleporterJson =
  EditorJsonItem<"portableTeleporter"> | EditorJsonItem<"teleporter">;

type Rooms = LevelEditorState["campaignInProgress"]["rooms"];

type ItemLocation = { roomId: EditorRoomId; itemId: EditorRoomItemId };

/** a teleporter whose destination the move may change, and where it lands */
type AffectedTeleporter = {
  teleporter: ItemLocation;
  destinationRoomId: EditorRoomId;
  /** undefined when it lands on a position, or nowhere */
  landingItemId: EditorRoomItemId | undefined;
};

const roomById = (rooms: Rooms, roomId: EditorRoomId) =>
  rooms[roomId] as EditorRoomJson | undefined;

/** the item a teleporter in `roomId` lands on, as the room json is now */
const landingItemIdOf = (
  rooms: Rooms,
  { roomId, itemId }: ItemLocation,
  teleporter: TeleporterJson,
): EditorRoomItemId | undefined => {
  const destinationRoomId = (teleporter.config.toRoom ??
    roomId) as EditorRoomId;
  const destinationRoom = roomById(rooms, destinationRoomId);
  if (destinationRoom === undefined) {
    return undefined;
  }
  const landing = resolveTeleporterLanding(
    teleporter.config,
    iterateRoomJsonItemIds(
      destinationRoom.items,
      "teleporter",
      "portableTeleporter",
    ),
    (candidateId): candidateId is EditorRoomItemId =>
      candidateId in destinationRoom.items,
    destinationRoomId === roomId ? itemId : undefined,
  );
  return landing.type === "item" ? landing.itemId : undefined;
};

/**
 * teleporters that are moving, that land on a moving item, or that land in
 * the destination room (which may become ambiguous once it has more
 * teleporters) - read before anything moves
 */
const findAffectedTeleporters = (
  rooms: Rooms,
  fromRoomId: EditorRoomId,
  toRoomId: EditorRoomId,
  movingIds: ReadonlySet<EditorRoomItemId>,
): AffectedTeleporter[] =>
  objectEntriesIter(rooms)
    .flatMap(([roomId, room]) =>
      iterateRoomJsonItemsWithIds(
        (room as EditorRoomJson).items,
        "teleporter",
        "portableTeleporter",
      ).map(([itemId, teleporter]) => {
        const location = { roomId, itemId };
        return {
          teleporter: location,
          destinationRoomId: (teleporter.config.toRoom ??
            roomId) as EditorRoomId,
          landingItemId: landingItemIdOf(rooms, location, teleporter),
        };
      }),
    )
    .filter(
      ({ teleporter, destinationRoomId, landingItemId }) =>
        (teleporter.roomId === fromRoomId &&
          movingIds.has(teleporter.itemId)) ||
        (destinationRoomId === fromRoomId &&
          landingItemId !== undefined &&
          movingIds.has(landingItemId)) ||
        (destinationRoomId === toRoomId && landingItemId !== undefined),
    )
    .toArray();

export type MoveItemsToRoomArgs = {
  fromRoomId: EditorRoomId;
  /** items in the room they move from; scenery and doors among them are left behind */
  itemIds: EditorRoomItemId[];
  toRoomId: EditorRoomId;
  /** added to each moved item's position */
  blockPositionDelta: Xyz;
  timestamp: number;
};

/**
 * a move of items from one room to another, with the id each will have there
 */
export type ItemsMoveBetweenRooms = {
  fromRoomId: EditorRoomId;
  toRoomId: EditorRoomId;
  /**
   * added to each moved item's position
   */
  blockPositionDelta: Xyz;
  /**
   * each moving item's id, to its id in the destination room
   */
  newIds: Map<EditorRoomItemId, EditorRoomItemId>;
};

/**
 * what moving items from one room to another would do: which of them move
 * (scenery and doors are left behind), and their ids in the destination.
 * Undefined if nothing would move
 */
export const planItemsMoveBetweenRooms = (
  rooms: Rooms,
  {
    fromRoomId,
    itemIds,
    toRoomId,
    blockPositionDelta,
  }: Omit<MoveItemsToRoomArgs, "timestamp">,
): ItemsMoveBetweenRooms | undefined => {
  const fromRoom = roomById(rooms, fromRoomId);
  const toRoom = roomById(rooms, toRoomId);
  if (
    fromRoom === undefined ||
    toRoom === undefined ||
    toRoomId === fromRoomId
  ) {
    return undefined;
  }

  const movingIds = itemIds.filter((itemId) => {
    const item = fromRoom.items[itemId];
    return item !== undefined && isMovableBetweenRooms(item);
  });
  if (movingIds.length === 0) {
    return undefined;
  }

  const takenIds = new Set(keys(toRoom.items));
  return {
    fromRoomId,
    toRoomId,
    blockPositionDelta,
    newIds: new Map(
      movingIds.map((itemId) => {
        const newId = nextItemIdSet(takenIds, itemId);
        takenIds.add(newId);
        return [itemId, newId];
      }),
    ),
  };
};

/**
 * the edits to every room that moving the items makes - as a preview, these
 * are exactly what committing the move does
 */
export const itemsMoveBetweenRoomsEdits = (
  rooms: Rooms,
  move: ItemsMoveBetweenRooms,
): PreviewedEditsByRoom => {
  const movedRooms = produce(rooms, (draftRooms) => {
    moveItemsBetweenRoomsInPlace(draftRooms, move);
  });
  const edits: PreviewedEditsByRoom = {};
  for (const roomId of keys(movedRooms)) {
    const room = roomById(rooms, roomId)!;
    const movedRoom = roomById(movedRooms, roomId)!;
    if (movedRoom === room) {
      continue;
    }
    const roomEdits: PreviewedRoomItemEdits = {};
    for (const itemId of new Set([
      ...keys(room.items),
      ...keys(movedRoom.items),
    ])) {
      const movedItem = movedRoom.items[itemId];
      if (movedItem !== room.items[itemId]) {
        roomEdits[itemId] = movedItem ?? null;
      }
    }
    edits[roomId] = roomEdits;
  }
  return edits;
};

/**
 * how the move is described in each room's undo history
 */
export const itemsMoveBetweenRoomsDescription = (
  rooms: Rooms,
  { fromRoomId, toRoomId, newIds }: ItemsMoveBetweenRooms,
): UndoDescription => {
  const fromRoom = roomById(rooms, fromRoomId)!;
  return {
    kind: "moveBetweenRooms",
    fromRoomId,
    toRoomId,
    items: newIds
      .keys()
      .map((itemId): UndoItemEntry => [itemId, fromRoom.items[itemId]!])
      .toArray(),
  };
};

/**
 * Move items from one room to another, returning the new ids of the moved items there
 * (undefined if nothing moved) which can change in the event of collisions.
 *
 * References between the items are kept where both ends move, or dropped where only one does.
 */
export const moveItemsToRoomInPlace = (
  state: LevelEditorState,
  { timestamp, ...moveArgs }: MoveItemsToRoomArgs,
): EditorRoomItemId[] | undefined => {
  commitPendingNudgeInPlace(state);
  // the drag's preview is replaced by the move:
  state.pendingEdits = undefined;
  state.itemGrab = undefined;
  for (const openRoom of layoutNodesOfType(state.layout, "openRoom")) {
    openRoom.dragInProgress = undefined;
  }

  const rooms = current(state.campaignInProgress.rooms);
  const move = planItemsMoveBetweenRooms(rooms, moveArgs);
  if (move === undefined) {
    return undefined;
  }

  state.pendingEdits = {
    edits: itemsMoveBetweenRoomsEdits(rooms, move),
    description: itemsMoveBetweenRoomsDescription(rooms, move),
    timestamp,
    madeBy: { type: "drag" },
  };
  commitPendingEditsInPlace(state);
  return move.newIds.values().toArray();
};

/**
 * move the items in the rooms given
 */
const moveItemsBetweenRoomsInPlace = (
  rooms: Rooms,
  { fromRoomId, toRoomId, blockPositionDelta, newIds }: ItemsMoveBetweenRooms,
) => {
  const fromRoom = roomById(rooms, fromRoomId)!;
  const toRoom = roomById(rooms, toRoomId)!;
  const movingIds = newIds.keys().toArray();

  const affectedTeleporters = findAffectedTeleporters(
    rooms,
    fromRoomId,
    toRoomId,
    new Set(movingIds),
  );

  const movedEntries = movingIds.map(
    (itemId): [EditorRoomItemId, EditorJsonItemUnion] => {
      const item = fromRoom.items[itemId]!;
      return [
        newIds.get(itemId)!,
        { ...item, position: addXyz(item.position, blockPositionDelta) },
      ];
    },
  );

  for (const itemId of movingIds) {
    delete fromRoom.items[itemId];
  }
  for (const [newId, movedItem] of movedEntries) {
    toRoom.items[newId] = movedItem;
    rewriteControllerTargetIdsInPlace(movedItem, (targetId) =>
      newIds.get(targetId),
    );
  }
  for (const remainingItem of valuesIter(fromRoom.items)) {
    rewriteControllerTargetIdsInPlace(remainingItem, (targetId) =>
      newIds.has(targetId) ? undefined : targetId,
    );
  }

  /** where an item is now, given where it was before the move */
  const locationAfterMove = ({ roomId, itemId }: ItemLocation): ItemLocation =>
    roomId === fromRoomId && newIds.has(itemId) ?
      { roomId: toRoomId, itemId: newIds.get(itemId)! }
    : { roomId, itemId };

  for (const {
    teleporter: teleporterBefore,
    destinationRoomId: destinationBefore,
    landingItemId: landingItemIdBefore,
  } of affectedTeleporters) {
    const teleporterLocation = locationAfterMove(teleporterBefore);
    const teleporter = roomById(rooms, teleporterLocation.roomId)!.items[
      teleporterLocation.itemId
    ] as TeleporterJson;
    const landing =
      landingItemIdBefore === undefined ? undefined : (
        locationAfterMove({
          roomId: destinationBefore,
          itemId: landingItemIdBefore,
        })
      );
    const destinationRoomId = landing?.roomId ?? destinationBefore;

    // viewed with every destination field optional, so any can be deleted:
    const destinationConfig: TeleporterLandingConfig & { toRoom?: string } =
      teleporter.config;
    if (
      (destinationConfig.toRoom ?? teleporterLocation.roomId) !==
      destinationRoomId
    ) {
      if (destinationRoomId === teleporterLocation.roomId) {
        delete destinationConfig.toRoom;
      } else {
        destinationConfig.toRoom = destinationRoomId;
      }
    }

    if (landing === undefined) {
      continue;
    }
    if (destinationConfig.toItemId !== undefined) {
      destinationConfig.toItemId = landing.itemId;
    } else if (
      landingItemIdOf(rooms, teleporterLocation, teleporter) !== landing.itemId
    ) {
      // the destination no longer has a lone teleporter to land on implicitly:
      destinationConfig.toItemId = landing.itemId;
    }
  }
};
