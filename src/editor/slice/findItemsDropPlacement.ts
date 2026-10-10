import { blockSizePx } from "../../model/blockSizePx";
import { nextItemIdSet } from "../../model/inPlaceMutators/nextItemId";
import { roomItemsIterable } from "../../model/RoomState";
import { keys } from "../../utils/entries";
import { addXyz, type Xyz } from "../../utils/vectors/vectors";
import {
  type EditorRoomId,
  type EditorRoomItemId,
  type EditorRoomJson,
} from "../editorTypes";
import { itemMoveOrResizeWouldCollide } from "../RoomEditingArea/cursor/editWouldCollide";
import { isMovableBetweenRooms } from "./isMovableBetweenRooms";
import {
  selectCurrentCommittedRoomJsonFromLevelEditorState,
  selectCursorSubRoomId,
} from "./levelEditorSelectors";
import { type LevelEditorState } from "./levelEditorSlice";
import { loadEditorRoom } from "./loadEditorRoom";
import { roomWallBounds } from "./roomWallBounds";

/** moving up a block is as costly as moving this many blocks across */
const verticalCostFactor = 4;
/** how far above where they would land the items may be stacked */
const maxRiseBlocks = 8;

export type ItemsDropPlacement = {
  /** the items that can move - scenery and doors are left behind */
  itemIds: EditorRoomItemId[];
  /** added to each item's position to place it in the destination room */
  blockPositionDelta: Xyz;
};

const placementCost = ({ x, y, z }: Xyz) =>
  Math.abs(x) + Math.abs(y) + verticalCostFactor * Math.abs(z);

/** cheapest first; ties broken the same way every time, so drops are repeatable */
const compareCandidates = (a: Xyz, b: Xyz) =>
  placementCost(a) - placementCost(b) ||
  Math.abs(a.z) - Math.abs(b.z) ||
  Math.abs(a.x) - Math.abs(b.x) ||
  a.x - b.x ||
  a.y - b.y ||
  a.z - b.z;

/** whole-block offsets in [min, max] */
const blockRange = (min: number, max: number) =>
  Array.from({ length: Math.max(0, max - min + 1) }, (_, i) => min + i);

/**
 * where to put the current room's items in another room: at the same offset
 * from the destination (sub-)room's corner as from their own, moved inside its
 * walls, then to the nearest whole-block spot where nothing collides -
 * preferring sideways moves to stacking up. Undefined if they fit nowhere
 */
export const findItemsDropPlacement = (
  state: LevelEditorState,
  itemIds: EditorRoomItemId[],
  toRoomId: EditorRoomId,
  toSubRoomId: string,
): ItemsDropPlacement | undefined => {
  const fromRoom = selectCurrentCommittedRoomJsonFromLevelEditorState(state);
  const toRoom = state.campaignInProgress.rooms[toRoomId] as
    EditorRoomJson | undefined;
  if (toRoom === undefined || toRoom.id === fromRoom.id) {
    return undefined;
  }

  const movingIds = itemIds.filter((itemId) => {
    const item = fromRoom.items[itemId];
    return item !== undefined && isMovableBetweenRooms(item);
  });
  if (movingIds.length === 0) {
    return undefined;
  }

  const fromWalls = roomWallBounds(fromRoom, selectCursorSubRoomId(state));
  const toWalls = roomWallBounds(toRoom, toSubRoomId);
  const sameOffsetDelta: Xyz = {
    x: toWalls.from.x - fromWalls.from.x,
    y: toWalls.from.y - fromWalls.from.y,
    z: 0,
  };

  // the destination with the items added at the same offset, to test against:
  const takenIds = new Set(keys(toRoom.items));
  const trialItems = { ...toRoom.items };
  const trialIds = movingIds.map((itemId) => {
    const trialId = nextItemIdSet(takenIds, itemId);
    takenIds.add(trialId);
    const item = fromRoom.items[itemId]!;
    trialItems[trialId] = {
      ...item,
      position: addXyz(item.position, sameOffsetDelta),
    };
    return trialId;
  });
  const trialRoomState = loadEditorRoom({ ...toRoom, items: trialItems });

  // the items' extent once loaded, in blocks:
  const trialIdSet = new Set<string>(trialIds);
  let minX = Infinity;
  let minY = Infinity;
  let minZ = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  for (const loadedItem of roomItemsIterable(trialRoomState.items)) {
    if (
      loadedItem.jsonItemId === undefined ||
      !trialIdSet.has(loadedItem.jsonItemId)
    ) {
      continue;
    }
    const { x, y, z, xd, yd } = loadedItem.state.box;
    minX = Math.min(minX, x / blockSizePx.x);
    minY = Math.min(minY, y / blockSizePx.y);
    minZ = Math.min(minZ, z / blockSizePx.z);
    maxX = Math.max(maxX, (x + xd) / blockSizePx.x);
    maxY = Math.max(maxY, (y + yd) / blockSizePx.y);
  }

  // whole-block offsets that keep every item inside the walls, and above the floor:
  const xOffsets = blockRange(
    Math.ceil(toWalls.from.x - minX),
    Math.floor(toWalls.to.x - maxX),
  );
  const yOffsets = blockRange(
    Math.ceil(toWalls.from.y - minY),
    Math.floor(toWalls.to.y - maxY),
  );
  if (xOffsets.length === 0 || yOffsets.length === 0) {
    // too big for the room
    return undefined;
  }

  // moved inside the walls by as little as possible:
  const nearestInside = (offsets: number[]) =>
    Math.min(Math.max(0, offsets[0]), offsets.at(-1)!);
  const insideX = nearestInside(xOffsets);
  const insideY = nearestInside(yOffsets);

  const candidates = xOffsets
    .flatMap((x) =>
      yOffsets.flatMap((y) =>
        blockRange(-Math.floor(minZ), maxRiseBlocks).map((z) => ({
          x: x - insideX,
          y: y - insideY,
          z,
        })),
      ),
    )
    .sort(compareCandidates);

  const fit = candidates.find(
    (candidate) =>
      !itemMoveOrResizeWouldCollide({
        roomState: trialRoomState,
        jsonItemIds: trialIds,
        blockPositionDelta: addXyz(candidate, { x: insideX, y: insideY }),
      }),
  );
  return fit === undefined ? undefined : (
      {
        itemIds: movingIds,
        blockPositionDelta: addXyz(sameOffsetDelta, fit, {
          x: insideX,
          y: insideY,
        }),
      }
    );
};
