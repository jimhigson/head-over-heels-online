import { expect, test } from "vitest";

import {
  type EditorRoomId,
  type EditorRoomItemId,
  type EditorRoomJson,
} from "../../editor/editorTypes";
import { type LevelEditorState } from "../../editor/slice/levelEditorSlice";
import { levelEditorHistoryTransform } from "./levelEditorHistoryTransform";

const roomId = "room" as EditorRoomId;
const roomWithBlockAt = (x: number): EditorRoomJson => ({
  id: roomId,
  planet: "blacktooth",
  color: { hue: "cyan", shade: "basic" },
  items: {
    ["block" as EditorRoomItemId]: {
      type: "block",
      position: { x, y: 0, z: 0 },
      config: { style: "organic" },
    },
  },
});
const description = { kind: "editRoomJson" } as const;

const history: LevelEditorState["history"] = {
  [roomId]: {
    undo: [0, 1, 2].map((x) => ({
      room: roomWithBlockAt(x),
      description,
      timestamp: x,
    })),
    redo: [4].map((x) => ({
      room: roomWithBlockAt(x),
      description,
      timestamp: x,
    })),
  },
};

test("history survives being stored and read back", () => {
  // as redux-persist does, through json:
  const stored = JSON.parse(
    JSON.stringify(levelEditorHistoryTransform.in(history, "history", {})),
  );

  expect(levelEditorHistoryTransform.out(stored, "history", {})).toEqual(
    history,
  );
});

test("history stored with every room in full is read back as it is", () => {
  const stored = JSON.parse(JSON.stringify(history));

  expect(levelEditorHistoryTransform.out(stored, "history", {})).toEqual(
    history,
  );
});
