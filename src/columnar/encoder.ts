import { entries, keys } from "../utils/entries";
import { type ColumnarEncoded, columnarVersion } from "./decoder";

/**
 * Candidate markers for an absent optional field, tried in order. The first
 * that does not occur anywhere in the campaign's values is used and recorded
 * in `_absent`, so the marker can never be confused with real data.
 */
const absentCandidates = ["!@", " absent", "  absent  "];

const containsString = (value: unknown, target: string): boolean =>
  typeof value === "string" ? value === target
  : Array.isArray(value) ? value.some((v) => containsString(v, target))
  : value !== null && typeof value === "object" ?
    Object.values(value).some((v) => containsString(v, target))
  : false;

const chooseAbsentMarker = (rooms: object): string => {
  const marker = absentCandidates.find((c) => !containsString(rooms, c));
  if (marker === undefined) {
    throw new Error("no free absent-marker candidate for this campaign");
  }
  return marker;
};

/** the structural minimum the codec reads; the rest of a room/campaign is opaque */
type AnyItem = {
  type: string;
  position: { x: number; y: number; z: number };
  config: Record<string, unknown>;
};
type AnyRoom = { items: Record<string, AnyItem> } & Record<string, unknown>;

type FlatItem = {
  room: number;
  type: string;
  id: string;
  x: number;
  y: number;
  z: number;
  config: Record<string, unknown>;
};

/** [a, b, c] -> [a, b-a, c-b]; reversed by `deltaDecode` in the decoder */
const deltaEncode = (values: number[]): number[] => {
  let prev = 0;
  return values.map((v) => {
    const d = v - prev;
    prev = v;
    return d;
  });
};

/**
 * For each room, the ids that must keep their original key because something in
 * the campaign references them. References are always stored as plain string
 * values, so this matches strings against ids without coupling to any config
 * shape. Two kinds:
 *
 *  - in-room: a switch/button/timer's `modifies[].targets` or a joystick's
 *    `controls` names an id in the same room (a string value equal to one of
 *    that room's ids).
 *  - cross-room: a door/teleporter pairs `toRoom` with an id field
 *    (`toDoor` / `toItemId`) naming an item in *that* room. Detected by taking
 *    any config object carrying a `toRoom` and matching its sibling strings
 *    against the target room's ids.
 *
 * A coincidental match (a value that happens to equal an id) only over-keeps an
 * id; it can never drop one that is genuinely referenced.
 */
export const referencedItemIds = (
  rooms: Record<string, AnyRoom>,
): Map<string, Set<string>> => {
  const idsByRoom = new Map(
    entries(rooms).map(([roomId, room]) => [roomId, new Set(keys(room.items))]),
  );
  const referenced = new Map<string, Set<string>>(
    [...idsByRoom.keys()].map((roomId) => [roomId, new Set<string>()]),
  );

  const markIfId = (roomId: string, value: unknown): void => {
    if (typeof value !== "string") {
      return;
    }
    const ids = idsByRoom.get(roomId);
    if (ids?.has(value)) {
      referenced.get(roomId)!.add(value);
    }
  };

  const visit = (roomId: string, value: unknown): void => {
    if (typeof value === "string") {
      markIfId(roomId, value);
    } else if (Array.isArray(value)) {
      for (const v of value) {
        visit(roomId, v);
      }
    } else if (value !== null && typeof value === "object") {
      const { toRoom } = value as { toRoom?: unknown };
      if (typeof toRoom === "string" && idsByRoom.has(toRoom)) {
        for (const sibling of Object.values(value)) {
          markIfId(toRoom, sibling);
        }
      }
      for (const v of Object.values(value)) {
        visit(roomId, v);
      }
    }
  };

  for (const [roomId, room] of entries(rooms)) {
    for (const item of Object.values(room.items)) {
      visit(roomId, item);
    }
  }
  return referenced;
};

/**
 * Transpose a campaign's `rooms` into columns. Works on anything with a `rooms`
 * map (`Campaign`, `OptionallyNamedCampaign`, `DbCampaign`, …); the rest of the
 * object (`locator`, `meta`, …) is passed through untouched. The result
 * round-trips to an identical object via `columnarDecode`.
 */
export const columnarEncode = (
  campaign: object,
  {
    /**
     * drop the id of every item nothing in its room points at, so the id
     * column shrinks to just the referenced ids (the decoder synthesises a
     * fresh unique id for each dropped one). Used for the pre-baked original
     * campaign; left off for db campaigns so their ids round-trip verbatim.
     */
    dropUnreferencedIds = false,
  }: { dropUnreferencedIds?: boolean } = {},
): ColumnarEncoded => {
  const { rooms, ...rest } = campaign as {
    rooms: Record<string, AnyRoom>;
  } & Record<string, unknown>;
  const absent = chooseAbsentMarker(rooms);

  const roomEntries = entries(rooms);
  const roomIndex = roomEntries.map(([id]) => id);

  // ids that must keep their original key because something in the campaign
  // (this room or another) references them (undefined = keep every id)
  const referencedByRoomId =
    dropUnreferencedIds ? referencedItemIds(rooms) : undefined;

  const itemsByType = new Map<string, FlatItem[]>();
  roomEntries.forEach(([, room], roomNumber) => {
    for (const [id, item] of entries(room.items)) {
      const flat: FlatItem = {
        room: roomNumber,
        type: item.type,
        id,
        x: item.position.x,
        y: item.position.y,
        z: item.position.z,
        config: item.config,
      };
      const bucket = itemsByType.get(item.type);
      if (bucket) {
        bucket.push(flat);
      } else {
        itemsByType.set(item.type, [flat]);
      }
    }
  });

  // larger types first, so the smaller ones sit inside their compression
  // context (deterministic: insertion order breaks ties via a stable sort)
  const typeSize = new Map(
    [...itemsByType].map(([type, items]) => [
      type,
      JSON.stringify(items).length,
    ]),
  );
  const typeOrder = [...itemsByType.keys()].sort(
    (a, b) => typeSize.get(b)! - typeSize.get(a)!,
  );

  // within a type, group identical/similar configs together so every column
  // runs in long repeats; room number breaks ties deterministically
  const byConfig = (a: FlatItem, b: FlatItem) => {
    const ca = JSON.stringify(a.config);
    const cb = JSON.stringify(b.config);
    return (
      ca < cb ? -1
      : ca > cb ? 1
      : a.room - b.room
    );
  };

  const columns: Record<string, Record<string, unknown[]>> = {};
  for (const type of typeOrder) {
    const group = itemsByType.get(type)!.sort(byConfig);
    const cols: Record<string, unknown[]> = {
      // items of one config are room-sorted, so the room column is mostly
      // consecutive; delta-encoding it turns long runs into 0/1s. (positions
      // are scattered, so they stay absolute - delta would only add entropy.)
      room: deltaEncode(group.map((i) => i.room)),
      // unreferenced ids become the absent marker when dropping is on; the
      // decoder synthesises a unique replacement for each
      id: group.map((i) => {
        if (referencedByRoomId === undefined) {
          return i.id;
        }
        return referencedByRoomId.get(roomIndex[i.room])?.has(i.id) ?
            i.id
          : absent;
      }),
      x: group.map((i) => i.x),
      y: group.map((i) => i.y),
      z: group.map((i) => i.z),
    };
    // an undefined value is indistinguishable from an absent key once
    // serialised to json, so treat both as absent (null stays a real value)
    const configKeys = [
      ...new Set(
        group.flatMap((i) =>
          keys(i.config).filter((k) => i.config[k] !== undefined),
        ),
      ),
    ].sort();
    for (const k of configKeys) {
      cols[k] = group.map((i) =>
        i.config[k] === undefined ? absent : i.config[k],
      );
    }
    columns[type] = cols;
  }

  const metaKeys = [
    ...new Set(
      roomEntries.flatMap(([, room]) =>
        keys(room).filter((k) => k !== "items" && room[k] !== undefined),
      ),
    ),
  ];
  const metaCols: Record<string, unknown[]> = {};
  for (const k of metaKeys) {
    metaCols[k] = roomEntries.map(([, room]) =>
      room[k] === undefined ? absent : room[k],
    );
  }

  return {
    _enc: columnarVersion,
    _absent: absent,
    ...rest,
    rooms: { roomIndex, metaCols, columns },
  };
};
