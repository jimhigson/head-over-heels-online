import { exitGameRoomId } from "../../../model/json/ItemConfigMap";
import { type JsonItem } from "../../../model/json/JsonItem";
import { doorTargetSubRoomId } from "../../../model/map/doorTargetSubRoomId";
import {
  roomGridPositions,
  type RoomNode,
} from "../../../model/map/roomGridPositions";
import { iterateRoomJsonItemsWithIds } from "../../../model/RoomJsonItemIterators";
import { unitVectors } from "../../../utils/vectors/unitVectors";
import {
  addXyz,
  type DirectionXy4,
  oppositeDirection,
  type Xy,
  type Xyz,
} from "../../../utils/vectors/vectors";
import { type EditorRoomId, type EditorRoomJson } from "../../editorTypes";
import { selectCursorRoomFromLevelEditorState } from "../levelEditorSelectors";
import { type LevelEditorState } from "../levelEditorSlice";
import { changeCurrentRoomInPlace } from "./changeCurrentRoomInPlace";
import {
  type CellDoorsAcross,
  doorsAcrossCell,
  spliceNewRoomIntoCellInPlace,
} from "./insertRoomInPlace";

/**
 * a selected room's cell that a new room goes beside
 */
type SourceCell = {
  room: EditorRoomJson;
  node: RoomNode<EditorRoomId>;
  doorsAcross: CellDoorsAcross;
};

const cellKey = ({ x, y, z }: Xyz) => `${x},${y},${z}`;

/**
 * the cells of the selected rooms that new rooms go beside: every cell with
 * doors across that side, or for a room with none, one cell on its outer edge
 * that way (the cursor's, where it is that room's)
 */
const sourceCells = (
  state: LevelEditorState,
  nodes: ReadonlyArray<RoomNode<EditorRoomId>>,
  direction: DirectionXy4,
): SourceCell[] | undefined => {
  const cursorRoom = selectCursorRoomFromLevelEditorState(state);
  const sources: SourceCell[] = [];

  for (const roomId of state.selectedRoomIds) {
    const room = state.campaignInProgress.rooms[roomId] as EditorRoomJson;
    const roomNodes = nodes.filter((node) => node.roomId === roomId);
    if (roomNodes.length === 0) {
      // not in the shown area of the map, so can't be placed against the rest
      return undefined;
    }

    const withDoors = roomNodes
      .map((node) => ({
        room,
        node,
        doorsAcross: doorsAcrossCell(state, room, node.subRoomId, direction),
      }))
      .filter(
        ({ doorsAcross: { outDoors, inboundDoors } }) =>
          outDoors.length > 0 || inboundDoors.length > 0,
      );
    if (withDoors.length > 0) {
      sources.push(...withDoors);
      continue;
    }

    const ownCellKeys = new Set(
      roomNodes.map(({ gridPosition }) => cellKey(gridPosition)),
    );
    const outerEdgeNodes = roomNodes.filter(
      ({ gridPosition }) =>
        !ownCellKeys.has(cellKey(addXyz(gridPosition, unitVectors[direction]))),
    );
    const node =
      outerEdgeNodes.find(
        ({ subRoomId }) =>
          roomId === cursorRoom.roomId && subRoomId === cursorRoom.subRoomId,
      ) ?? outerEdgeNodes.at(0);
    if (node !== undefined) {
      sources.push({
        room,
        node,
        doorsAcross: { outDoors: [], inboundDoors: [] },
      });
    }
  }
  return sources;
};

/**
 * the rooms beyond the source cells' side - reached from the rooms across it
 * without going back through the doors being split - or undefined where they
 * lead back round to a selected room, so can't be moved away from it
 */
const roomsBeyond = (
  state: LevelEditorState,
  sources: ReadonlyArray<SourceCell>,
  direction: DirectionXy4,
): Set<EditorRoomId> | undefined => {
  const { rooms } = state.campaignInProgress;
  const oppositeDir = oppositeDirection(direction);
  const selectedRoomIds = new Set(state.selectedRoomIds);
  const isSourceCell = (roomId: string, subRoomId: string) =>
    sources.some(
      ({ room, node }) => room.id === roomId && node.subRoomId === subRoomId,
    );

  const splitDoors = new Set<JsonItem<"door", EditorRoomId, string>>(
    sources.flatMap(({ doorsAcross: { outDoors, inboundDoors } }) => [
      ...outDoors.map(([, door]) => door),
      ...inboundDoors.map(({ door }) => door),
    ]),
  );
  // the rooms across the doors being split; doors to the exit or to rooms
  // that don't exist lead nowhere:
  const beyond = new Set<EditorRoomId>(
    sources.flatMap(({ doorsAcross: { outDoors, inboundDoors } }) => [
      ...outDoors
        .map(([, door]) => door.config.toRoom)
        .filter(
          (toRoom): toRoom is EditorRoomId =>
            toRoom !== exitGameRoomId && toRoom in rooms,
        ),
      ...inboundDoors.map(({ room }) => room.id),
    ]),
  );

  const queue = [...beyond];
  while (queue.length > 0) {
    const roomId = queue.shift()!;
    if (selectedRoomIds.has(roomId)) {
      return undefined;
    }
    for (const [, door] of iterateRoomJsonItemsWithIds(
      rooms[roomId].items,
      "door",
    )) {
      const { toRoom } = door.config;
      const isReturnOfSplitDoor =
        door.config.direction === oppositeDir &&
        isSourceCell(toRoom, doorTargetSubRoomId(rooms, roomId, door));
      if (
        splitDoors.has(door) ||
        isReturnOfSplitDoor ||
        toRoom === exitGameRoomId ||
        !(toRoom in rooms)
      ) {
        continue;
      }
      if (!beyond.has(toRoom)) {
        beyond.add(toRoom);
        queue.push(toRoom);
      }
    }
  }
  return beyond;
};

/**
 * add a new room beside each selected room, in `direction`: split into the
 * doors that cross that side, or joined by a new door where none do. The rooms
 * beyond move one cell along to make space, so this only goes ahead when
 * they all can at once - when they don't lead back round to a selected room,
 * and land on nothing else
 */
export const insertRoomsBesideSelectionInPlace = (
  state: LevelEditorState,
  direction: DirectionXy4,
  roomSize?: Xy,
): void => {
  const cursorRoom = selectCursorRoomFromLevelEditorState(state);
  const { nodes } = roomGridPositions({
    campaign: state.campaignInProgress,
    roomId: cursorRoom.roomId,
    subRoomId: cursorRoom.subRoomId,
    skipMissingRooms: true,
  });

  const sources = sourceCells(state, nodes, direction);
  if (sources === undefined || sources.length === 0) {
    return;
  }
  const beyond = roomsBeyond(state, sources, direction);
  if (beyond === undefined) {
    return;
  }

  // after the move, a cell is taken by anything that stays where it is, or
  // anything beyond, moved one along:
  const step = unitVectors[direction];
  const takenCellKeys = new Set(
    nodes.map(({ roomId, gridPosition }) =>
      cellKey(beyond.has(roomId) ? addXyz(gridPosition, step) : gridPosition),
    ),
  );
  const movedBeyondLandsOnSomething =
    takenCellKeys.size < nodes.length ||
    sources.some(({ node }) =>
      takenCellKeys.has(cellKey(addXyz(node.gridPosition, step))),
    );
  if (movedBeyondLandsOnSomething) {
    return;
  }

  // every source's doors are found before any of them is split:
  const newRooms = sources.map(({ room, node, doorsAcross }) => ({
    node,
    newRoom: spliceNewRoomIntoCellInPlace(
      state,
      room,
      node.subRoomId,
      direction,
      doorsAcross,
      roomSize,
    ),
  }));

  const cursorNewRoom =
    newRooms.find(({ node }) => node.roomId === cursorRoom.roomId) ??
    newRooms[0];
  changeCurrentRoomInPlace(state, cursorNewRoom.newRoom.id);
  state.selectedRoomIds = newRooms.map(({ newRoom }) => newRoom.id);
};
