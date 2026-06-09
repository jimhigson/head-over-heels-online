import { isWholeRoomSubRooms, type SubRoom } from "../../../model/RoomJson";
import { objectEntriesIter, valuesIter } from "../../../utils/entries";
import {
  type EditorCampaign,
  type EditorRoomId,
  type EditorRoomJson,
} from "../../editorTypes";

/**
 * the vertical links as they used to be stored: as top-level fields on the
 * room. They now live per sub-room inside `meta.subRooms`.
 */
type LegacyVerticalLinks = {
  roomAbove?: EditorRoomId;
  subRoomAbove?: string;
  roomBelow?: EditorRoomId;
  subRoomBelow?: string;
};

const findOriginCell = (
  subRooms: Record<string, SubRoom<EditorRoomId>>,
): SubRoom<EditorRoomId> => {
  for (const [, cell] of objectEntriesIter(subRooms)) {
    if (cell.gridPosition.x === 0 && cell.gridPosition.y === 0) {
      return cell;
    }
  }
  const [first] = valuesIter(subRooms);
  return first;
};

/**
 * convert a campaign loaded in the old format - where vertical links were
 * top-level `roomAbove`/`roomBelow` fields - to the current format where they
 * live on a sub-room, returning a migrated copy. Runs in memory on load into
 * the editor; nothing is persisted until the campaign is re-saved. Idempotent:
 * rooms already in the new format are left untouched.
 *
 * The campaign is cloned first, since the incoming one may be frozen (eg from
 * the RTK Query cache) and we rewrite links in place on the copy.
 */
export const migrateRoomVerticalLinks = (
  campaign: EditorCampaign,
): EditorCampaign => {
  const migrated = structuredClone(campaign);
  for (const room of valuesIter(migrated.rooms)) {
    const legacy = room as EditorRoomJson & LegacyVerticalLinks;
    const { roomAbove, subRoomAbove, roomBelow, subRoomBelow } = legacy;

    if (roomAbove === undefined && roomBelow === undefined) {
      continue;
    }

    delete legacy.roomAbove;
    delete legacy.subRoomAbove;
    delete legacy.roomBelow;
    delete legacy.subRoomBelow;

    const above =
      roomAbove === undefined ? undefined : (
        { room: roomAbove, subRoom: subRoomAbove }
      );
    const below =
      roomBelow === undefined ? undefined : (
        { room: roomBelow, subRoom: subRoomBelow }
      );

    const subRooms = room.meta?.subRooms;
    if (subRooms !== undefined && !isWholeRoomSubRooms(subRooms)) {
      // a divided room: best-effort - put the single link on the origin cell
      const cell = findOriginCell(subRooms);
      cell.above = above ?? cell.above;
      cell.below = below ?? cell.below;
    } else {
      // an undivided room: hold the link on the whole-room ('*') form
      room.meta ??= {};
      room.meta.subRooms = { "*": { above, below } };
    }
  }
  return migrated;
};
