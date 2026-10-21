import { type JsonItem } from "../../JsonItem";

/**
 * the two "x,y" floor squares on the room side of a door, one per block of its
 * width
 */
const floorSquaresInsideDoor = <
  RoomId extends string,
  RoomItemId extends string,
>({
  position: { x, y },
  config: { direction },
}: JsonItem<"door", RoomId, RoomItemId>): [string, string] => {
  switch (direction) {
    case "towards":
      return [`${x},${y}`, `${x + 1},${y}`];
    case "away":
      return [`${x},${y - 1}`, `${x + 1},${y - 1}`];
    case "right":
      return [`${x},${y}`, `${x},${y + 1}`];
    case "left":
      return [`${x - 1},${y}`, `${x - 1},${y + 1}`];
    default:
      direction satisfies never;
      throw new Error(`unknown door direction ${String(direction)}`);
  }
};

/**
 * whether a door has floor beside both of its blocks - otherwise it hangs off
 * the room's edge, so the player can't walk through all of it
 */
export const isDoorBesideFloor = <
  RoomId extends string,
  RoomItemId extends string,
>(
  /**
   * the room's floor squares, as given by `floorSquares`
   */
  floorSquares: ReadonlySet<string>,
  door: JsonItem<"door", RoomId, RoomItemId>,
): boolean =>
  floorSquaresInsideDoor(door).every((square) => floorSquares.has(square));
