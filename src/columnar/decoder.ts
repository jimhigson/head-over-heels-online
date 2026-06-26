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

/**
 * natural sort (so `room10` follows `room2`, not `room1`). Matches the
 * `natural-orderby` ordering the original campaign's `campaign.ts` is generated
 * with, so decoded room order is the same whether the game loads the plain ts
 * (dev) or this blob (prod) - room iteration order is observable (eg it decides
 * which door a character enters a room by), so the two must agree.
 */
const naturalCompare = (a: string, b: string): number =>
  a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" });

/**
 * A small, fast, non-cryptographic hash of an item's (starting) position to a
 * short base-36 token. Positions sit on a 1/8 grid, so they're scaled to
 * integers before mixing; the FNV-1a-style multiply+shift spreads even small
 * coordinates across the 32-bit range (a plain xor would leave them clustered).
 */
const positionToken = (x: number, y: number, z: number): string => {
  let h = 0x81_1c_9d_c5;
  for (const n of [x, y, z]) {
    h ^= Math.round(n * 8);
    h = Math.imul(h, 0x01_00_01_93);
    h ^= h >>> 15;
  }
  return (h >>> 0).toString(36);
};

/**
 * an id for an item whose own id was dropped (because nothing references it).
 * Derived from the item's starting position so it is stable across re-encodes
 * (unlike a column-index): the renderer hashes item ids to pick animation
 * start-frames / bob phases, and keying that off intrinsic position keeps those
 * stable when ids are synthesised. Collisions (same type at one position) get a
 * short suffix so every id stays unique within its room.
 */
const synthesiseId = (
  type: string,
  x: number,
  y: number,
  z: number,
  existing: Record<string, unknown>,
): string => {
  const base = `${type}@${positionToken(x, y, z)}`;
  if (!(base in existing)) {
    return base;
  }
  let n = 1;
  while (`${base}~${n}` in existing) {
    n++;
  }
  return `${base}~${n}`;
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
      const x = Number(xCol[i]);
      const y = Number(yCol[i]);
      const z = Number(zCol[i]);
      // a dropped (unreferenced) id is the absent marker; synthesise a stable,
      // position-derived replacement. A kept id never contains "@", so the two
      // can't collide.
      const rawId = idCol[i];
      const id = rawId === _absent ? synthesiseId(type, x, y, z, items) : rawId;
      items[id] = {
        config,
        position: { x, y, z },
        type,
      };
    }
  }

  // rooms come out in natural-sorted order (matching the generated `campaign.ts`,
  // since iteration order is observable); everything inside each room is
  // key-sorted so the decoded form matches the canonical (alphabetical) json
  const rooms: Record<string, unknown> = {};
  for (const roomId of [...roomIndex].sort(naturalCompare)) {
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
