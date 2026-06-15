import {
  isWholeRoomSubRooms,
  type NonContiguousRelationship,
  type SubRoom,
} from "../../../model/RoomJson";
import { objectEntriesIter, valuesIter } from "../../../utils/entries";
import {
  type EditorCampaign,
  type EditorRoomId,
  type EditorRoomJson,
} from "../../editorTypes";

/**
 * a room as it used to be stored: the non-contiguous relationship lived on the
 * room's `meta`. It now lives per sub-room inside `meta.subRooms`.
 */
type LegacyRoom = EditorRoomJson & {
  meta?: {
    nonContiguousRelationship?: NonContiguousRelationship<EditorRoomId>;
  };
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
 * convert a campaign loaded in the old format - where a non-contiguous
 * relationship was a `meta.nonContiguousRelationship` field on the room - to the
 * current format where it lives on a sub-room, returning a migrated copy. Runs
 * in memory on load into the editor; nothing is persisted until the campaign is
 * re-saved. Idempotent: rooms already in the new format are left untouched.
 *
 * The campaign is cloned first, since the incoming one may be frozen (eg from
 * the RTK Query cache) and we rewrite the relationship in place on the copy.
 */
export const migrateRoomNonContiguousRelationships = (
  campaign: EditorCampaign,
): EditorCampaign => {
  const migrated = structuredClone(campaign);
  for (const room of valuesIter(migrated.rooms)) {
    const legacy = room as LegacyRoom;
    if (legacy.meta?.nonContiguousRelationship === undefined) {
      continue;
    }
    const relationship = legacy.meta.nonContiguousRelationship;
    delete legacy.meta.nonContiguousRelationship;

    const subRooms = room.meta?.subRooms;
    if (subRooms !== undefined && !isWholeRoomSubRooms(subRooms)) {
      // a divided room: best-effort - put the relationship on the origin cell
      const cell = findOriginCell(subRooms);
      cell.nonContiguousRelationship ??= relationship;
    } else if (subRooms !== undefined) {
      // an undivided room that already has a whole-room ('*') cell (eg from the
      // vertical-links migration) - add the relationship to it
      subRooms["*"].nonContiguousRelationship ??= relationship;
    } else {
      // an undivided room with no sub-rooms yet - hold it on the whole-room form
      room.meta ??= {};
      room.meta.subRooms = {
        "*": { nonContiguousRelationship: relationship },
      };
    }
  }
  return migrated;
};
