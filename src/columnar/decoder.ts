import { type Campaign } from "../model/modelTypes";

/**
 * The columnar transposition of a campaign's `rooms`. Items are grouped by
 * type and each field becomes a single array spanning every item of that type,
 * which turns the campaign's heavy repetition into long runs the compressor
 * collapses far better than the row-oriented JSON does.
 */
export type ColumnarRooms = {
  /**
   * room ids in their original order; columns refer to a room by its index
   * into this array
   */
  roomIndex: string[];
  /**
   * room-level fields (everything except `items`), one array per field running
   * across all rooms in `roomIndex` order
   */
  metaCols: Record<string, unknown[]>;
  /**
   * one entry per item type; each entry maps a field name to a column of
   * values, every column the same length (the number of items of that type)
   */
  columns: Record<string, Record<string, unknown[]>>;
};

/**
 * A campaign whose `rooms` have been columnar-encoded. The discriminator
 * `_enc` is written as the first key so the format can be sniffed from the
 * start of a stream, but the decoder never relies on key position.
 */
export type ColumnarEncoded = {
  _enc: string;
  /** the value a column uses to mean "this optional field is absent on this item" */
  _absent: string;
  rooms: ColumnarRooms;
} & Record<string, unknown>;

export const columnarVersion = "col1";

export const isColumnarEncoded = (obj: object): obj is ColumnarEncoded =>
  "_enc" in obj;

const sortKeysDeep = (value: unknown): unknown =>
  Array.isArray(value) ? value.map(sortKeysDeep)
  : value !== null && typeof value === "object" ?
    Object.fromEntries(
      Object.keys(value)
        .sort()
        .map((k) => [k, sortKeysDeep((value as Record<string, unknown>)[k])]),
    )
  : value;

const itemColumnKeys = new Set(["room", "id", "x", "y", "z"]);

/** reverse of the encoder's `deltaEncode`: [a, b-a, c-b] -> [a, b, c] */
const deltaDecode = (deltas: number[]): number[] => {
  let acc = 0;
  return deltas.map((d) => {
    acc += d;
    return acc;
  });
};

export const columnarDecode = <RoomId extends string>(
  encoded: ColumnarEncoded,
): Campaign<RoomId> => {
  const { _enc, _absent, rooms: columnar, ...rest } = encoded;
  if (_enc !== columnarVersion) {
    throw new Error(`unknown columnar encoding version: ${_enc}`);
  }
  const { roomIndex, metaCols, columns } = columnar;

  const builtRooms: Record<string, Record<string, unknown>> = {};
  roomIndex.forEach((roomId, i) => {
    const room: Record<string, unknown> = {};
    for (const k of Object.keys(metaCols)) {
      const v = metaCols[k][i];
      if (v !== _absent) {
        room[k] = v;
      }
    }
    room.items = {};
    builtRooms[roomId] = room;
  });

  for (const [type, cols] of Object.entries(columns)) {
    const roomCol = deltaDecode(cols.room as number[]);
    const idCol = cols.id as string[];
    const { x: xCol, y: yCol, z: zCol } = cols;
    const fieldKeys = Object.keys(cols).filter((k) => !itemColumnKeys.has(k));
    for (let i = 0; i < idCol.length; i++) {
      const config: Record<string, unknown> = {};
      for (const k of fieldKeys) {
        const v = cols[k][i];
        if (v !== _absent) {
          config[k] = v;
        }
      }
      const items = builtRooms[roomIndex[roomCol[i]]].items as Record<
        string,
        unknown
      >;
      // a dropped (unreferenced) id is the absent marker; synthesise a unique
      // replacement from type + column index. `type/index` can't collide with a
      // kept id (those never contain "/") nor with another synthesised id (each
      // index is distinct), so every id stays unique within its room.
      const rawId = idCol[i];
      const id = rawId === _absent ? `${type}/${i}` : rawId;
      items[id] = {
        config,
        position: { x: xCol[i], y: yCol[i], z: zCol[i] },
        type,
      };
    }
  }

  // the rooms map keeps roomIndex order; everything inside each room is
  // key-sorted so the decoded form matches the canonical (alphabetical) json
  const rooms: Record<string, unknown> = {};
  for (const roomId of roomIndex) {
    rooms[roomId] = sortKeysDeep(builtRooms[roomId]);
  }

  // campaign-level fields (locator, meta, …) are key-sorted too; `rooms` is
  // slotted in alphabetically but keeps its own internal order
  const sortedRest = sortKeysDeep(rest) as Record<string, unknown>;
  const campaign: Record<string, unknown> = {};
  for (const k of [...Object.keys(sortedRest), "rooms"].sort()) {
    campaign[k] = k === "rooms" ? rooms : sortedRest[k];
  }

  return campaign as Campaign<RoomId>;
};
