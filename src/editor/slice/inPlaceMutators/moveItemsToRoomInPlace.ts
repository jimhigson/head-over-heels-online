import { nextItemIdSet } from "../../../model/inPlaceMutators/nextItemId";
import { mapReferencedItemIdsInPlace } from "../../../model/json/mapReferencedItemIdsInPlace";
import {
  resolveTeleporterLanding,
  type TeleporterLandingConfig,
} from "../../../model/json/resolveTeleporterLanding";
import { iterateRoomJsonItemsWithIds } from "../../../model/RoomJson";
import { keys, valuesIter } from "../../../utils/entries";
import { addXyz, type Xyz } from "../../../utils/vectors/vectors";
import {
  type EditorJsonItem,
  type EditorJsonItemUnion,
  type EditorRoomId,
  type EditorRoomItemId,
  type EditorRoomJson,
} from "../../editorTypes";
import { isMovableBetweenRooms } from "../isMovableBetweenRooms";
import { selectCurrentCommittedRoomJsonFromLevelEditorState } from "../levelEditorSelectors";
import { type LevelEditorState } from "../levelEditorSlice";
import { pushUndoForRoomInPlace } from "../reducers/undoReducers";
import { changeCurrentRoomInPlace } from "./changeCurrentRoomInPlace";

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
  const destinationRoom = roomById(
    rooms,
    (teleporter.config.toRoom ?? roomId) as EditorRoomId,
  );
  if (destinationRoom === undefined) {
    return undefined;
  }
  const landing = resolveTeleporterLanding(
    teleporter.config,
    iterateRoomJsonItemsWithIds(
      destinationRoom.items,
      "teleporter",
      "portableTeleporter",
    ).map(([teleporterId]) => teleporterId),
    (candidateId): candidateId is EditorRoomItemId =>
      candidateId in destinationRoom.items,
    destinationRoom.id === roomId ? itemId : undefined,
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
  valuesIter(rooms)
    .flatMap((room) =>
      iterateRoomJsonItemsWithIds(
        (room as EditorRoomJson).items,
        "teleporter",
        "portableTeleporter",
      ).map(([itemId, teleporter]) => {
        const location = { roomId: room.id as EditorRoomId, itemId };
        return {
          teleporter: location,
          destinationRoomId: (teleporter.config.toRoom ??
            room.id) as EditorRoomId,
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

export type MoveItemsToRoomPayload = {
  /** items in the current room; scenery and doors among them are left behind */
  itemIds: EditorRoomItemId[];
  toRoomId: EditorRoomId;
  /** the sub-room of the destination to show after moving */
  toSubRoomId: string;
  /** added to each moved item's position */
  blockPositionDelta: Xyz;
  timestamp: number;
};

/**
 * move items from the current room to another, which becomes the current
 * room. References between the items are kept where both ends move, and
 * dropped where only one does; teleporters keep landing on the items they did
 */
export const moveItemsToRoomInPlace = (
  state: LevelEditorState,
  {
    itemIds,
    toRoomId,
    toSubRoomId,
    blockPositionDelta,
    timestamp,
  }: MoveItemsToRoomPayload,
) => {
  // the drag's preview is replaced by the move:
  state.pendingEdits = undefined;
  state.dragInProgress = undefined;

  const { rooms } = state.campaignInProgress;
  const fromRoom = selectCurrentCommittedRoomJsonFromLevelEditorState(state);
  const toRoom = roomById(rooms, toRoomId);
  if (toRoom === undefined || toRoom.id === fromRoom.id) {
    return;
  }

  const movingIds = itemIds.filter((itemId) => {
    const item = fromRoom.items[itemId];
    return item !== undefined && isMovableBetweenRooms(item);
  });
  if (movingIds.length === 0) {
    return;
  }

  const affectedTeleporters = findAffectedTeleporters(
    rooms,
    fromRoom.id,
    toRoomId,
    new Set(movingIds),
  );

  const takenIds = new Set(keys(toRoom.items));
  const newIds = new Map(
    movingIds.map((itemId) => {
      const newId = nextItemIdSet(takenIds, itemId);
      takenIds.add(newId);
      return [itemId, newId];
    }),
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

  pushUndoForRoomInPlace(
    state,
    fromRoom.id,
    {
      kind: "itemAction",
      verb: `Move to ${toRoom.id}`,
      items: movingIds.map((itemId) => [itemId, fromRoom.items[itemId]!]),
    },
    timestamp,
  );
  pushUndoForRoomInPlace(
    state,
    toRoom.id,
    {
      kind: "itemAction",
      verb: `Move from ${fromRoom.id}`,
      items: movedEntries,
    },
    timestamp,
  );

  for (const itemId of movingIds) {
    delete fromRoom.items[itemId];
  }
  for (const [newId, movedItem] of movedEntries) {
    toRoom.items[newId] = movedItem;
    mapReferencedItemIdsInPlace(movedItem, (targetId) => newIds.get(targetId));
  }
  for (const remainingItem of valuesIter(fromRoom.items)) {
    mapReferencedItemIdsInPlace(remainingItem, (targetId) =>
      newIds.has(targetId) ? undefined : targetId,
    );
  }

  /** where an item is now, given where it was before the move */
  const locationAfterMove = ({ roomId, itemId }: ItemLocation): ItemLocation =>
    roomId === fromRoom.id && newIds.has(itemId) ?
      { roomId: toRoom.id, itemId: newIds.get(itemId)! }
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

    if (landing === undefined || destinationConfig.toPosition !== undefined) {
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

  changeCurrentRoomInPlace(state, toRoom.id, toSubRoomId);
  state.selectedJsonItemIds = [...newIds.values()];
};
