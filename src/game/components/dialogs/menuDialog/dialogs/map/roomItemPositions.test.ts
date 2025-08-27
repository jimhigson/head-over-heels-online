import seedrandom from "seedrandom";
import { expect, test } from "vitest";

import type { Xy } from "../../../../../../utils/vectors/vectors";

import { roomItemPositions } from "./roomItemPositions";

type Item = { pos: Xy };

const isTooClose = (a: Xy, b: Xy): boolean =>
  Math.abs(a.x - b.x) <= 0.5 && Math.abs(a.y - b.y) <= 0.5;

const assertValidAssignment = (
  inputItems: Record<string, Item>,
  assigned: Record<string, Xy>,
  seed: string,
): void => {
  const inputIds = Object.keys(inputItems);
  const assignedIds = Object.keys(assigned);

  const missing = inputIds.filter((id) => !(id in assigned));
  if (missing.length > 0) {
    throw new Error(
      `Missing assignments (seed = ${seed}): ${missing.join(", ")}`,
    );
  }

  const entries = assignedIds.map((id) => [id, assigned[id]] as const);
  for (let i = 0; i < entries.length; i++) {
    for (let j = i + 1; j < entries.length; j++) {
      const [idA, a] = entries[i];
      const [idB, b] = entries[j];
      if (isTooClose(a, b)) {
        throw new Error(
          `Too-close positions found (seed = ${seed}):\n` +
            `  ${idA}: (${a.x}, ${a.y})\n` +
            `  ${idB}: (${b.x}, ${b.y})`,
        );
      }
    }
  }
};

const makeRandomItems = (
  count: number,
  rng: () => number,
  roomSize: Xy,
): Record<string, Item> =>
  Object.fromEntries(
    Array.from({ length: count }, (_, i) => [
      `item-${i}`,
      {
        pos: {
          x: Math.floor(rng() * roomSize.x),
          y: Math.floor(rng() * roomSize.y),
        },
      },
    ]),
  );

const seeds = Array.from({ length: 100 }, (_, i) => `seed-${i}`);

test.each(seeds)(
  "assigns valid non-overlapping positions (seed = %s)",
  (seed) => {
    const rng = seedrandom(seed);
    const roomSize = {
      x: Math.floor(rng() * 7) + 2, // [2, 8]
      y: Math.floor(rng() * 7) + 2,
    };

    const itemCount = Math.floor(rng() * 3) + 1; // [1, 3]
    const items = makeRandomItems(itemCount, rng, roomSize);

    const result = roomItemPositions({
      items,
      itemNormalisedPosition: (item) => ({
        x: item.pos.x / roomSize.x,
        y: item.pos.y / roomSize.y,
      }),
    });

    expect(Object.keys(result).length).toBe(itemCount);
    assertValidAssignment(items, result, seed);
  },
);
