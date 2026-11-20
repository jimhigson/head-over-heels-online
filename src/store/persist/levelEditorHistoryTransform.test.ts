import { expect, test } from "vitest";

import type {
  EditorRoomId,
  EditorRoomItemId,
  EditorRoomJson,
} from "../../editor/editorTypes";
import type { LevelEditorState } from "../../editor/slice/levelEditorSlice";
import type { UndoDescription } from "../../editor/slice/reducers/undoDescription";
import { levelEditorHistoryTransform } from "./levelEditorHistoryTransform";

const roomId = "room" as EditorRoomId;
const roomWithBlockAt = (x: number): EditorRoomJson => ({
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
      link: undefined,
    })),
    redo: [4].map((x) => ({
      room: roomWithBlockAt(x),
      description,
      timestamp: x,
      link: undefined,
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

test("undo items stored by their bare json id are read back as selection entries", () => {
  const blockJsonItem = roomWithBlockAt(0).items["block" as EditorRoomItemId];
  // as redux-persist reads it, from json:
  const stored = JSON.parse(
    JSON.stringify({
      [roomId]: {
        undo: {
          newestRoom: roomWithBlockAt(0),
          entries: [
            {
              description: {
                kind: "itemAction",
                verb: "Delete",
                items: [["block", blockJsonItem]],
              },
              timestamp: 0,
              patchFromNext: [],
            },
          ],
        },
        redo: { newestRoom: undefined, entries: [] },
      },
    }),
  );

  expect(
    levelEditorHistoryTransform.out(stored, "history", {})[roomId]?.undo[0]
      .description,
  ).toEqual<UndoDescription>({
    kind: "itemAction",
    verb: "Delete",
    items: [
      [
        {
          jsonItemId: "block" as EditorRoomItemId,
          whichEditorGhost: undefined,
        },
        blockJsonItem!,
      ],
    ],
  });
});

test("an undo item for an editor ghost survives being stored and read back", () => {
  const liftJsonItemId = "lift" as EditorRoomItemId;
  const liftHistory: LevelEditorState["history"] = {
    [roomId]: {
      undo: [
        {
          room: roomWithBlockAt(0),
          description: {
            kind: "itemAction",
            verb: "Move",
            items: [
              [
                { jsonItemId: liftJsonItemId, whichEditorGhost: "liftTop" },
                {
                  type: "lift",
                  position: { x: 0, y: 0, z: 0 },
                  config: { bottom: 0, top: 4 },
                },
              ],
            ],
          },
          timestamp: 0,
          link: undefined,
        },
      ],
      redo: [],
    },
  };
  const stored = JSON.parse(
    JSON.stringify(levelEditorHistoryTransform.in(liftHistory, "history", {})),
  );

  expect(levelEditorHistoryTransform.out(stored, "history", {})).toEqual(
    liftHistory,
  );
});
