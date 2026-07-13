import { keys } from "../../utils/entries";
import { type Xyz } from "../../utils/vectors/vectors";
import { type JsonItemUnion } from "../json/JsonItem";
import { typePrefix } from "../json/typePrefix";
import { type AnyRoomJson } from "../RoomJson";
import { nextItemIdInItems } from "./nextItemId";

type BlockConfig = Extract<JsonItemUnion, { type: "block" }>["config"];

/**
 * the shape a tower block's config could take before towers were restricted to
 * vertical stacking: a `block` with `style: "tower"` and a `times` that could
 * repeat in x/y as well as z.
 */
type LegacyTowerConfig = {
  style: "tower";
  times?: Partial<Xyz>;
  disappearing?: { on: "stand" };
};

/**
 * normalise towers so each is a single vertical column: any legacy tower that
 * repeats in x and/or y (`times.x`/`.y` > 1) is replaced by one tower per x/y
 * cell, each keeping only its `times.z`.
 *
 * Towers are cylindrical, so an x/y-repeated tower reads as a grid of separate
 * pillars anyway; splitting them lets each slide and z-sort independently under
 * camera rotation, and keeps the json to the z-only `times` its type now allows.
 *
 * Needed for json authored before this restriction: the original-campaign
 * generation (adjacent towers used to consolidate in x/y) and old community
 * campaigns loaded from the db.
 */
export const migrateTowersInPlace = (room: AnyRoomJson): void => {
  for (const id of keys(room.items)) {
    const item = room.items[id];
    if (item.type !== "block") {
      continue;
    }
    const config = item.config as LegacyTowerConfig;
    if (config.style !== "tower") {
      continue;
    }

    const timesX = config.times?.x ?? 1;
    const timesY = config.times?.y ?? 1;
    const timesZ = config.times?.z ?? 1;

    const towerConfig = (): BlockConfig =>
      ({
        style: "tower",
        ...(config.disappearing === undefined ?
          {}
        : { disappearing: config.disappearing }),
        ...(timesZ > 1 ? { times: { z: timesZ } } : {}),
      }) as BlockConfig;

    if (timesX <= 1 && timesY <= 1) {
      // already a single column - just drop any redundant x/y from times:
      item.config = towerConfig();
      continue;
    }

    // split into one tower per x/y cell, each a z-only column. Each column takes
    // a fresh id from the normal per-type scheme (`b`, `b1`, … - reclaiming the
    // freed id of the split tower first), matching `keyItems`, so the columns
    // read like any other block rather than carrying a `_x_y` split-history suffix:
    delete room.items[id];
    for (let x = 0; x < timesX; x++) {
      for (let y = 0; y < timesY; y++) {
        const fragmentId = nextItemIdInItems(room.items, typePrefix[item.type]);
        room.items[fragmentId] = {
          ...item,
          position: {
            x: item.position.x + x,
            y: item.position.y + y,
            z: item.position.z,
          },
          config: towerConfig(),
        };
      }
    }
  }
};
