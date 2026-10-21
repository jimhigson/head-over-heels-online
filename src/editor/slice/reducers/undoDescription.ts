import nanoEqual from "nano-equal";

import { camelToSpaced } from "../../../utils/camelToSpaced";
import { keys } from "../../../utils/entries";
import { directionXyz4Glyphs } from "../../../utils/vectors/directionGlyphs";
import { type DirectionXyz4, type Xyz } from "../../../utils/vectors/vectors";
import {
  type EditorJsonItemUnion,
  type EditorRoomItemId,
  type EditorRoomJson,
} from "../../editorTypes";

export type UndoItemEntry = readonly [EditorRoomItemId, EditorJsonItemUnion];

export type UndoDescription =
  | { kind: "changeColour" }
  | { kind: "changeScenery"; sceneryName: string }
  | { kind: "clearRoom" }
  | { kind: "editItems"; items: UndoItemEntry[] }
  | { kind: "editRoomJson" }
  | { kind: "editRoomProperty"; property: string }
  | { kind: "itemAction"; verb: string; items: UndoItemEntry[] }
  | { kind: "pasteItems" };

export const describeItem = (item: EditorJsonItemUnion): string => {
  switch (item.type) {
    case "monster":
      return item.config.which;
    case "player":
    case "sceneryPlayer":
      return item.config.which;
    case "deadlyBlock":
    case "moveableDeadly":
    case "slidingDeadly":
    case "slidingBlock":
      return item.config.style;
    case "portableBlock":
      return item.config.style;
    default:
      return camelToSpaced(item.type);
  }
};

/** the direction a single-axis move goes in, if it is one */
const singleAxisMoveDirection = ({
  x,
  y,
  z,
}: Xyz): DirectionXyz4 | undefined => {
  switch (true) {
    case x < 0 && y === 0 && z === 0:
      return "right";
    case x > 0 && y === 0 && z === 0:
      return "left";
    case x === 0 && y > 0 && z === 0:
      return "away";
    case x === 0 && y < 0 && z === 0:
      return "towards";
    case x === 0 && y === 0 && z > 0:
      return "up";
    case x === 0 && y === 0 && z < 0:
      return "down";
    case x === 0 && y === 0 && z === 0:
      throw new Error("moveVerb called with zero movement");
    default:
      return undefined;
  }
};

export const moveVerb = (positionDelta: Xyz): string => {
  const direction = singleAxisMoveDirection(positionDelta);
  return direction === undefined ? "Move" : (
      `${directionXyz4Glyphs[direction]} Move`
    );
};

export const describeRoomJsonEdit = (
  prev: EditorRoomJson,
  next: EditorRoomJson,
): UndoDescription => {
  const allKeys = [...new Set([...keys(prev), ...keys(next)])];

  const changedKeys = allKeys.filter((key) => !nanoEqual(prev[key], next[key]));

  if (changedKeys.length === 1) {
    const [key] = changedKeys;

    if (key === "items") {
      const allIds = new Set([...keys(prev.items), ...keys(next.items)]);
      const changedItems: UndoItemEntry[] = allIds
        .values()
        .filter((id) => !nanoEqual(prev.items[id], next.items[id]))
        .map((id): UndoItemEntry => [id, next.items[id] ?? prev.items[id]])
        .toArray();

      return { kind: "editItems", items: changedItems };
    }

    return { kind: "editRoomProperty", property: camelToSpaced(key) };
  }

  return { kind: "editRoomJson" };
};
