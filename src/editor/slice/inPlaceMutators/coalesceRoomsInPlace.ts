import { consolidateItemsMap } from "../../../consolidateItems/consolidateItems";
import { roomGridPositions } from "../../../game/components/dialogs/menuDialog/dialogs/map/roomGridPositions";
import { nextItemIdSet } from "../../../model/inPlaceMutators/nextItemId";
import { type AnyWallJsonConfig } from "../../../model/json/WallJsonConfig";
import {
  roomJsonItemsEntriesIterable,
  roomJsonItemsIterable,
  type SubRooms,
} from "../../../model/RoomJson";
import { wallTimes } from "../../../model/times";
import { keys, objectEntriesIter, valuesIter } from "../../../utils/entries";
import {
  type DirectionXy4,
  perpendicularAxisXy,
  tangentAxis,
  type Xy,
} from "../../../utils/vectors/vectors";
import {
  type EditorJsonItemUnion,
  type EditorRoomId,
  type EditorRoomItemId,
  type EditorRoomJson,
} from "../../editorTypes";
import { selectCursorRoom } from "../levelEditorSelectors";
import { type LevelEditorState } from "../levelEditorSlice";
import {
  roomFloorMaxX,
  roomFloorMaxY,
  roomFloorMinX,
  roomFloorMinY,
} from "../roomJsonSelectors";
import { changeCurrentRoomInPlace } from "./changeCurrentRoomInPlace";

type FloorBounds = {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
};

const getRoomFloorBounds = (room: EditorRoomJson): FloorBounds => ({
  minX: roomFloorMinX(room),
  maxX: roomFloorMaxX(room),
  minY: roomFloorMinY(room),
  maxY: roomFloorMaxY(room),
});

type RoomLayoutEntry = {
  roomId: EditorRoomId;
  room: EditorRoomJson;
  gridPosition: Xy;
  bounds: FloorBounds;
  roomWidth: number;
  roomHeight: number;
  offsetX: number;
  offsetY: number;
};

type PhysicalGridCell = {
  gridPosition: Xy;
  physicalBounds: FloorBounds;
};

const computeLayout = (
  state: LevelEditorState,
  gridPositionLookup: ReadonlyMap<EditorRoomId, Xy>,
): RoomLayoutEntry[] => {
  const cursorRoomId = selectCursorRoom(state).roomId;
  const cursorGridPos = gridPositionLookup.get(cursorRoomId)!;

  return state.selectedRoomIds.map((roomId) => {
    const room = state.campaignInProgress.rooms[roomId] as EditorRoomJson;
    const gridPos = gridPositionLookup.get(roomId)!;
    const bounds = getRoomFloorBounds(room);
    const roomWidth = bounds.maxX - bounds.minX;
    const roomHeight = bounds.maxY - bounds.minY;

    const relX = gridPos.x - cursorGridPos.x;
    const relY = gridPos.y - cursorGridPos.y;

    return {
      roomId,
      room,
      gridPosition: { x: relX, y: relY },
      bounds,
      roomWidth,
      roomHeight,
      offsetX: 0,
      offsetY: 0,
    };
  });
};

const computeOffsets = (
  layout: RoomLayoutEntry[],
  cursorRoom: EditorRoomJson,
): void => {
  const cursor = layout.find(
    (e) => e.gridPosition.x === 0 && e.gridPosition.y === 0,
  )!;

  const subRooms = cursorRoom.meta?.subRooms;
  const originCell =
    subRooms ?
      valuesIter(subRooms).find(
        (sr) => sr.gridPosition.x === 0 && sr.gridPosition.y === 0,
      )
    : undefined;

  const originX = originCell?.physicalPosition.from.x ?? cursor.bounds.minX;
  const originY = originCell?.physicalPosition.from.y ?? cursor.bounds.minY;
  const cellWidth =
    originCell ?
      originCell.physicalPosition.to.x - originCell.physicalPosition.from.x
    : cursor.roomWidth;
  const cellHeight =
    originCell ?
      originCell.physicalPosition.to.y - originCell.physicalPosition.from.y
    : cursor.roomHeight;

  for (const entry of layout) {
    if (entry.gridPosition.x === 0 && entry.gridPosition.y === 0) {
      entry.offsetX = 0;
      entry.offsetY = 0;
      continue;
    }

    const entryOriginSubRoom =
      entry.room.meta?.subRooms ?
        valuesIter(entry.room.meta.subRooms).find(
          (sr) => sr.gridPosition.x === 0 && sr.gridPosition.y === 0,
        )
      : undefined;

    if (entryOriginSubRoom) {
      const baseX = originX + entry.gridPosition.x * cellWidth;
      const baseY = originY + entry.gridPosition.y * cellHeight;
      entry.offsetX = baseX - entryOriginSubRoom.physicalPosition.from.x;
      entry.offsetY = baseY - entryOriginSubRoom.physicalPosition.from.y;
    } else {
      let baseX: number;
      if (entry.gridPosition.x > 0) {
        baseX =
          originX + cellWidth + (entry.gridPosition.x - 1) * entry.roomWidth;
      } else if (entry.gridPosition.x < 0) {
        baseX = originX + entry.gridPosition.x * entry.roomWidth;
      } else {
        baseX = originX + Math.round((cellWidth - entry.roomWidth) / 2);
      }

      let baseY: number;
      if (entry.gridPosition.y > 0) {
        baseY =
          originY + cellHeight + (entry.gridPosition.y - 1) * entry.roomHeight;
      } else if (entry.gridPosition.y < 0) {
        baseY = originY + entry.gridPosition.y * entry.roomHeight;
      } else {
        baseY = originY + Math.round((cellHeight - entry.roomHeight) / 2);
      }

      entry.offsetX = baseX - entry.bounds.minX;
      entry.offsetY = baseY - entry.bounds.minY;
    }
  }
};

const mergeItems = (
  cursorRoom: EditorRoomJson,
  layout: RoomLayoutEntry[],
): Map<EditorRoomItemId, EditorRoomItemId> => {
  const existingIds = new Set(keys(cursorRoom.items) as EditorRoomItemId[]);
  const reIdMap = new Map<EditorRoomItemId, EditorRoomItemId>();

  for (const entry of layout) {
    if (entry.gridPosition.x === 0 && entry.gridPosition.y === 0) {
      continue;
    }

    for (const [originalId, item] of roomJsonItemsEntriesIterable(
      entry.room.items,
    )) {
      const offsetItem = {
        ...item,
        position: {
          x: item.position.x + entry.offsetX,
          y: item.position.y + entry.offsetY,
          z: item.position.z,
        },
      } as EditorJsonItemUnion;

      if (offsetItem.type === "door") {
        offsetItem.config = { ...offsetItem.config };
      }

      let newId = originalId as EditorRoomItemId;
      if (existingIds.has(newId)) {
        newId = nextItemIdSet(
          existingIds,
          originalId as string,
        ) as EditorRoomItemId;
        reIdMap.set(originalId as EditorRoomItemId, newId);
      }
      existingIds.add(newId);
      cursorRoom.items[newId] = offsetItem;
    }
  }

  return reIdMap;
};

const removeInternalDoorsAndUpdateExternal = (
  cursorRoom: EditorRoomJson,
  mergedRoomIds: Set<EditorRoomId>,
  reIdMap: Map<EditorRoomItemId, EditorRoomItemId>,
  roomIdToSubRoom: Map<EditorRoomId, string>,
  state: LevelEditorState,
): void => {
  const doorsToDelete: EditorRoomItemId[] = [];

  for (const [itemId, item] of roomJsonItemsEntriesIterable(cursorRoom.items)) {
    if (item.type !== "door") {
      continue;
    }

    if (
      mergedRoomIds.has(item.config.toRoom as EditorRoomId) ||
      item.config.toRoom === cursorRoom.id
    ) {
      doorsToDelete.push(itemId as EditorRoomItemId);
    }
  }

  for (const doorId of doorsToDelete) {
    delete cursorRoom.items[doorId];
  }

  for (const [, item] of roomJsonItemsEntriesIterable(cursorRoom.items)) {
    if (item.type !== "door") {
      continue;
    }

    if (item.config.toDoor) {
      const remapped = reIdMap.get(item.config.toDoor as EditorRoomItemId);
      if (remapped) {
        item.config.toDoor = remapped;
      }
    }
  }

  for (const room of valuesIter(state.campaignInProgress.rooms)) {
    if (room.id === cursorRoom.id) {
      continue;
    }

    for (const item of roomJsonItemsIterable(room, "door")) {
      if (mergedRoomIds.has(item.config.toRoom as EditorRoomId)) {
        const subRoom = roomIdToSubRoom.get(item.config.toRoom as EditorRoomId);
        item.config.toRoom = cursorRoom.id;
        if (subRoom !== undefined) {
          item.config.meta ??= {};
          item.config.meta.toSubRoom = subRoom;
        }
      } else if (item.config.toRoom === cursorRoom.id) {
        const subRoom = roomIdToSubRoom.get(cursorRoom.id as EditorRoomId);
        if (subRoom !== undefined) {
          item.config.meta ??= {};
          item.config.meta.toSubRoom = subRoom;
        }
      }

      if (item.config.toDoor) {
        const remapped = reIdMap.get(item.config.toDoor as EditorRoomItemId);
        if (remapped) {
          item.config.toDoor = remapped;
        }
      }
    }
  }
};

const offsetBounds = (entry: RoomLayoutEntry) => ({
  minX: entry.bounds.minX + entry.offsetX,
  maxX: entry.bounds.maxX + entry.offsetX,
  minY: entry.bounds.minY + entry.offsetY,
  maxY: entry.bounds.maxY + entry.offsetY,
});

const expandToGridCells = (layout: RoomLayoutEntry[]): PhysicalGridCell[] => {
  const cells: PhysicalGridCell[] = [];

  for (const entry of layout) {
    const isCursor = entry.gridPosition.x === 0 && entry.gridPosition.y === 0;
    const existingSubRooms = entry.room.meta?.subRooms;

    if (existingSubRooms) {
      for (const subRoom of valuesIter(existingSubRooms)) {
        cells.push({
          gridPosition: {
            x: entry.gridPosition.x + subRoom.gridPosition.x,
            y: entry.gridPosition.y + subRoom.gridPosition.y,
          },
          physicalBounds:
            isCursor ?
              {
                minX: subRoom.physicalPosition.from.x,
                maxX: subRoom.physicalPosition.to.x,
                minY: subRoom.physicalPosition.from.y,
                maxY: subRoom.physicalPosition.to.y,
              }
            : {
                minX: subRoom.physicalPosition.from.x + entry.offsetX,
                maxX: subRoom.physicalPosition.to.x + entry.offsetX,
                minY: subRoom.physicalPosition.from.y + entry.offsetY,
                maxY: subRoom.physicalPosition.to.y + entry.offsetY,
              },
        });
      }
    } else {
      cells.push({
        gridPosition: entry.gridPosition,
        physicalBounds: offsetBounds(entry),
      });
    }
  }

  return cells;
};

const buildInternalPositions = (cells: PhysicalGridCell[]): Set<string> => {
  const internal = new Set<string>();

  for (const cellA of cells) {
    for (const cellB of cells) {
      if (cellA === cellB) {
        continue;
      }

      const dx = cellB.gridPosition.x - cellA.gridPosition.x;
      const dy = cellB.gridPosition.y - cellA.gridPosition.y;

      if (dx === 1 && dy === 0) {
        const boundaryX = cellA.physicalBounds.maxX;
        const overlapMinY = Math.max(
          cellA.physicalBounds.minY,
          cellB.physicalBounds.minY,
        );
        const overlapMaxY = Math.min(
          cellA.physicalBounds.maxY,
          cellB.physicalBounds.maxY,
        );

        for (let y = overlapMinY; y < overlapMaxY; y++) {
          internal.add(`left,${boundaryX},${y}`);
          internal.add(`right,${boundaryX},${y}`);
        }
      }

      if (dx === 0 && dy === 1) {
        const boundaryY = cellA.physicalBounds.maxY;
        const overlapMinX = Math.max(
          cellA.physicalBounds.minX,
          cellB.physicalBounds.minX,
        );
        const overlapMaxX = Math.min(
          cellA.physicalBounds.maxX,
          cellB.physicalBounds.maxX,
        );

        for (let x = overlapMinX; x < overlapMaxX; x++) {
          internal.add(`away,${x},${boundaryY}`);
          internal.add(`towards,${x},${boundaryY}`);
        }
      }
    }
  }

  return internal;
};

const wallAlongAxis = (direction: DirectionXy4) =>
  perpendicularAxisXy(tangentAxis(direction));

const removeInternalWalls = (
  cursorRoom: EditorRoomJson,
  internal: Set<string>,
): void => {
  const existingIds = new Set(keys(cursorRoom.items) as EditorRoomItemId[]);
  const wallsToDelete: EditorRoomItemId[] = [];

  for (const [itemId, item] of roomJsonItemsEntriesIterable(cursorRoom.items)) {
    if (item.type !== "wall") {
      continue;
    }

    const { direction } = item.config;
    const alongAxis = wallAlongAxis(direction);
    const times = wallTimes(item.config);
    const length = times[alongAxis] ?? 1;

    let hasInternal = false;
    for (let i = 0; i < length; i++) {
      const pos = {
        x: item.position.x + (alongAxis === "x" ? i : 0),
        y: item.position.y + (alongAxis === "y" ? i : 0),
      };
      if (internal.has(`${direction},${pos.x},${pos.y}`)) {
        hasInternal = true;
        break;
      }
    }

    if (!hasInternal) {
      continue;
    }

    wallsToDelete.push(itemId as EditorRoomItemId);

    for (let i = 0; i < length; i++) {
      const pos = {
        x: item.position.x + (alongAxis === "x" ? i : 0),
        y: item.position.y + (alongAxis === "y" ? i : 0),
      };

      if (internal.has(`${direction},${pos.x},${pos.y}`)) {
        continue;
      }

      const config = item.config as AnyWallJsonConfig;

      // away/left walls cycle through a tiles array of sprite references — pick the one for this unit
      const tileIndex = config.tiles ? i % config.tiles.length : -1;

      const newId = nextItemIdSet(existingIds, "wall") as EditorRoomItemId;
      existingIds.add(newId);

      const newWall: EditorJsonItemUnion = {
        type: "wall",
        position: { x: pos.x, y: pos.y, z: item.position.z },
        config:
          direction === "towards" || direction === "right" ?
            { direction, times: { [alongAxis]: 1 } as Partial<Xy> }
          : {
              direction,
              tiles: tileIndex >= 0 ? [item.config.tiles![tileIndex]] : [],
            },
      } as EditorJsonItemUnion;

      cursorRoom.items[newId] = newWall;
    }
  }

  for (const id of wallsToDelete) {
    delete cursorRoom.items[id];
  }
};

const generateSubRooms = (cells: PhysicalGridCell[]): SubRooms => {
  const subRooms: Record<
    string,
    { gridPosition: Xy; physicalPosition: { from: Xy; to: Xy } }
  > = {};

  for (const [index, cell] of cells.entries()) {
    subRooms[index.toString()] = {
      gridPosition: cell.gridPosition,
      physicalPosition: {
        from: { x: cell.physicalBounds.minX, y: cell.physicalBounds.minY },
        to: { x: cell.physicalBounds.maxX, y: cell.physicalBounds.maxY },
      },
    };
  }

  return subRooms as SubRooms;
};

const transferVerticalLinks = (
  cursorRoom: EditorRoomJson,
  layout: RoomLayoutEntry[],
): void => {
  for (const entry of layout) {
    if (entry.gridPosition.x === 0 && entry.gridPosition.y === 0) {
      continue;
    }

    if (entry.room.roomAbove && !cursorRoom.roomAbove) {
      cursorRoom.roomAbove = entry.room.roomAbove;
    }
    if (entry.room.roomBelow && !cursorRoom.roomBelow) {
      cursorRoom.roomBelow = entry.room.roomBelow;
    }
  }
};

const transferMeta = (
  cursorRoom: EditorRoomJson,
  layout: RoomLayoutEntry[],
): void => {
  for (const entry of layout) {
    if (entry.gridPosition.x === 0 && entry.gridPosition.y === 0) {
      continue;
    }

    if (entry.room.meta?.label && !cursorRoom.meta?.label) {
      cursorRoom.meta ??= {};
      cursorRoom.meta.label = entry.room.meta.label;
    }

    if (
      entry.room.meta?.nonContiguousRelationship &&
      !cursorRoom.meta?.nonContiguousRelationship
    ) {
      cursorRoom.meta ??= {};
      cursorRoom.meta.nonContiguousRelationship =
        entry.room.meta.nonContiguousRelationship;
    }
  }
};

const findOriginSubRoomId = (room: EditorRoomJson): string | undefined => {
  const subRooms = room.meta?.subRooms;
  if (!subRooms) {
    return undefined;
  }

  const [originId] =
    objectEntriesIter(subRooms).find(
      ([, sr]) => sr.gridPosition.x === 0 && sr.gridPosition.y === 0,
    ) ?? [];

  return originId;
};

const computeGridPositionLookup = (
  state: LevelEditorState,
): ReadonlyMap<EditorRoomId, Xy> => {
  const { roomId, subRoomId } = selectCursorRoom(state);
  const specs = roomGridPositions({
    campaign: state.campaignInProgress,
    roomId,
    subRoomId,
  });

  const selectedSet = new Set(state.selectedRoomIds);

  const originSubRoomIds = new Map<EditorRoomId, string>();
  for (const selectedRoomId of selectedSet) {
    const room = state.campaignInProgress.rooms[
      selectedRoomId
    ] as EditorRoomJson;
    const originId = findOriginSubRoomId(room);
    if (originId !== undefined) {
      originSubRoomIds.set(selectedRoomId, originId);
    }
  }

  const lookup = new Map<EditorRoomId, Xy>();

  for (const spec of specs) {
    const editorRoomId = spec.roomId as EditorRoomId;
    if (!selectedSet.has(editorRoomId)) {
      continue;
    }
    if (lookup.has(editorRoomId)) {
      continue;
    }

    const originSubRoomId = originSubRoomIds.get(editorRoomId);
    if (originSubRoomId !== undefined && spec.subRoomId !== originSubRoomId) {
      continue;
    }

    lookup.set(editorRoomId, {
      x: spec.gridPosition.x,
      y: spec.gridPosition.y,
    });
  }

  return lookup;
};

export const coalesceRoomsInPlace = (state: LevelEditorState): void => {
  const gridPositionLookup = computeGridPositionLookup(state);

  const cursorRoomId = selectCursorRoom(state).roomId;
  const cursorRoom = state.campaignInProgress.rooms[
    cursorRoomId
  ] as EditorRoomJson;

  const layout = computeLayout(state, gridPositionLookup);
  computeOffsets(layout, cursorRoom);

  const mergedRoomIds = new Set(
    layout
      .filter((e) => !(e.gridPosition.x === 0 && e.gridPosition.y === 0))
      .map((e) => e.roomId),
  );

  const reIdMap = mergeItems(cursorRoom, layout);

  const cells = expandToGridCells(layout);

  const roomIdToSubRoom = new Map<EditorRoomId, string>();
  let subRoomIndex = 0;
  for (const entry of layout) {
    roomIdToSubRoom.set(entry.roomId, subRoomIndex.toString());
    const existingSubRooms = entry.room.meta?.subRooms;
    subRoomIndex += existingSubRooms ? Object.keys(existingSubRooms).length : 1;
  }

  removeInternalDoorsAndUpdateExternal(
    cursorRoom,
    mergedRoomIds,
    reIdMap,
    roomIdToSubRoom,
    state,
  );

  const internal = buildInternalPositions(cells);
  removeInternalWalls(cursorRoom, internal);

  cursorRoom.meta ??= {};
  cursorRoom.meta.subRooms = generateSubRooms(cells);

  transferVerticalLinks(cursorRoom, layout);
  transferMeta(cursorRoom, layout);

  for (const deletedRoomId of mergedRoomIds) {
    delete state.campaignInProgress.rooms[deletedRoomId];
    delete state.history[deletedRoomId];

    for (const room of valuesIter(state.campaignInProgress.rooms)) {
      if (room.roomAbove === deletedRoomId) {
        room.roomAbove = cursorRoomId;
      }
      if (room.roomBelow === deletedRoomId) {
        room.roomBelow = cursorRoomId;
      }

      const ncr = room.meta?.nonContiguousRelationship;
      if (ncr?.with.room === deletedRoomId) {
        ncr.with.room = cursorRoomId;
      }
    }
  }

  changeCurrentRoomInPlace(state, cursorRoomId);

  cursorRoom.items = consolidateItemsMap(cursorRoom.items);

  const isNotDeleted = (id: EditorRoomId) => !mergedRoomIds.has(id);
  state.editingRoomIdHistory.back =
    state.editingRoomIdHistory.back.filter(isNotDeleted);
  state.editingRoomIdHistory.forward =
    state.editingRoomIdHistory.forward.filter(isNotDeleted);
};
