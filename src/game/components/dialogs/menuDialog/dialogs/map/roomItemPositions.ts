import { emptyObject } from "../../../../../../utils/empty";
import { entries } from "../../../../../../utils/entries";
import { type Xy } from "../../../../../../utils/vectors/vectors";

const possiblePositions: Xy[] = [
  { x: 0, y: 0 },
  { x: 0.5, y: 0 },
  { x: 1, y: 0 },
  { x: 0, y: 0.5 },
  { x: 0.5, y: 0.5 },
  { x: 1, y: 0.5 },
  { x: 0, y: 1 },
  { x: 0.5, y: 1 },
  { x: 1, y: 1 },
];

const distSquared = ({ x: x1, y: y1 }: Xy, { x: x2, y: y2 }: Xy) =>
  (x1 - x2) ** 2 + (y1 - y2) ** 2;

const isAdjacentIndex = (a: number, b: number): boolean => {
  const ax = a % 3,
    ay = Math.floor(a / 3);
  const bx = b % 3,
    by = Math.floor(b / 3);
  return Math.abs(ax - bx) <= 1 && Math.abs(ay - by) <= 1 && a !== b;
};

const hasAdjacency = (indices: number[]): boolean =>
  indices.some((a, i) =>
    indices.slice(i + 1).some((b) => isAdjacentIndex(a, b)),
  );

const combinations = <T>(arr: T[], k: number): T[][] => {
  if (k === 0) return [[]];
  if (arr.length < k) return [];
  const [head, ...tail] = arr;
  return [
    ...combinations(tail, k),
    ...combinations(tail, k - 1).map((combo) => [head, ...combo]),
  ];
};

const permutations = <T>(arr: T[]): T[][] => {
  if (arr.length <= 1) return [arr];
  return arr.flatMap((v, i) =>
    permutations([...arr.slice(0, i), ...arr.slice(i + 1)]).map((p) => [
      v,
      ...p,
    ]),
  );
};

// Precomputed valid grid index combinations for up to 3 items
const validGridIndexCombosByCount: Record<number, number[][]> = {
  1: combinations([...Array(9).keys()], 1),
  2: combinations([...Array(9).keys()], 2).filter((c) => !hasAdjacency(c)),
  3: combinations([...Array(9).keys()], 3).filter((c) => !hasAdjacency(c)),
};

type RoomItemPositionsOptions<ItemId extends string, Item> = {
  items: Record<ItemId, Item>;
  itemNormalisedPosition: (item: Item) => Xy;
};

export const maximumItemsForRoomLayoutOnMap = 3;
export const roomItemPositions = <Item, ItemId extends string>({
  items,
  itemNormalisedPosition,
}: RoomItemPositionsOptions<ItemId, Item>): Record<ItemId, Xy> => {
  const idEntries = entries(items);
  const itemCount = idEntries.length;
  if (itemCount === 0) {
    return emptyObject as Record<ItemId, Xy>;
  }
  if (itemCount > maximumItemsForRoomLayoutOnMap) {
    throw new Error(
      `roomItemPositions supports up to ${maximumItemsForRoomLayoutOnMap} items, but got ${itemCount}: ${Object.keys(items).join(", ")}`,
    );
  }

  const idAndPositions = idEntries.map(([id, item]) => ({
    id,
    pos: itemNormalisedPosition(item),
  }));

  let bestAssignment = emptyObject as Record<ItemId, Xy>;
  let lowestTotalLoss = Infinity;

  if (validGridIndexCombosByCount[itemCount] === undefined) {
    throw new Error(
      `no precomputed valid grid index combinations for count ${itemCount}`,
    );
  }

  for (const indexCombo of validGridIndexCombosByCount[itemCount]) {
    const slotCombo = indexCombo.map((i) => possiblePositions[i]);

    for (const slotPerm of permutations(slotCombo)) {
      const assignment: Record<string, Xy> = {};
      let totalLoss = 0;

      for (let i = 0; i < itemCount; i++) {
        const { id, pos } = idAndPositions[i];
        const target = slotPerm[i];
        assignment[id] = target;
        totalLoss += distSquared(pos, target);
      }

      if (totalLoss < lowestTotalLoss) {
        lowestTotalLoss = totalLoss;
        bestAssignment = assignment;
      }
    }
  }

  return bestAssignment;
};
