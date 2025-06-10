import { describe, expect, test } from "vitest";
import type { ApplyToolToRoomJsonPayload } from "./applyToolToRoomJson";
import { applyToolReducers } from "./applyToolToRoomJson";
import {
  initialLevelEditorSliceState,
  type LevelEditorState,
} from "../levelEditorSlice";
import type {
  EditorRoomId,
  EditorRoomItemId,
  EditorRoomJsonItems,
} from "../../EditorRoomId";
import { produce } from "immer";
import type { Tool } from "src/editor/Tool";
import type { WallJsonConfig } from "src/model/json/WallJsonConfig";

const testRoomId = "testRoomId" as EditorRoomId;
const wallItemId = "testWall" as EditorRoomItemId;

const doorItemTool: Tool = {
  type: "item",
  item: {
    type: "door",
    config: { toRoom: "(placeholder)" as EditorRoomId, direction: "towards" },
  },
};

const editorStateWithOneRoomWithNoItems: Omit<LevelEditorState, "tool"> = {
  ...initialLevelEditorSliceState,
  currentlyEditingRoomId: testRoomId,
  campaignInProgress: {
    name: "testCampaign",
    rooms: {
      [testRoomId]: {
        id: testRoomId,
        planet: "blacktooth",
        color: { hue: "cyan", shade: "basic" },
        floor: "blacktooth",
        items: {},
        size: { x: 5, y: 5 },
      },
    },
  },
};
const editorStateWithOneRoomWithOneWall: Omit<LevelEditorState, "tool"> =
  produce(editorStateWithOneRoomWithNoItems, (draftState) => {
    draftState.campaignInProgress.rooms[testRoomId].items[wallItemId] = {
      type: "wall",
      config: {
        direction: "away",
        times: { x: 5 },
        tiles: ["armour", "armour", "armour", "armour", "armour"],
      },
      position: { x: 0, y: 5, z: 0 },
    };
  });

const applyToolToRoomJsonNext = (
  state: LevelEditorState,
  payload: ApplyToolToRoomJsonPayload,
) => {
  return produce(state, (draftState) =>
    applyToolReducers.applyToolToRoomJson(draftState, {
      type: "",
      payload,
    }),
  );
};

describe("applying tools", () => {
  describe("applying items", () => {
    test("can put an item into a room", () => {
      const itemPosition = { x: 3, y: 3, z: 0 };
      const actionPayload: ApplyToolToRoomJsonPayload = {
        blockPosition: itemPosition,
        pointedAtItem: {
          type: "floor",
          config: { type: "standable" },
        },
      };

      const next = applyToolToRoomJsonNext(
        {
          ...editorStateWithOneRoomWithNoItems,
          tool: {
            type: "item",
            item: {
              type: "pickup",
              config: {
                gives: "bag",
              },
            },
          },
        },
        actionPayload,
      );

      expect(
        next.campaignInProgress.rooms[testRoomId].items,
      ).toMatchObject<EditorRoomJsonItems>({
        ["item(pickup)#0" as EditorRoomItemId]: {
          config: {
            gives: "bag",
          },
          position: {
            x: 3,
            y: 3,
            z: 0,
          },
          type: "pickup",
        },
      });
    });

    describe("adding doors", () => {
      test("can cut a hole in a wall, making it into two walls", () => {
        const doorPosition = { x: 2, y: 5, z: 0 };
        const actionPayload: ApplyToolToRoomJsonPayload = {
          blockPosition: doorPosition,
          pointedAtItem: {
            type: "wall",
            config: editorStateWithOneRoomWithOneWall.campaignInProgress.rooms[
              testRoomId
            ].items[wallItemId].config as WallJsonConfig<"blacktooth">,
          },
        };

        const next = applyToolToRoomJsonNext(
          { ...editorStateWithOneRoomWithOneWall, tool: doorItemTool },
          actionPayload,
        );

        expect(
          next.campaignInProgress.rooms[testRoomId].items,
        ).toMatchObject<EditorRoomJsonItems>({
          ["item(door)#0" as EditorRoomItemId]: {
            config: {
              direction: "away",
              toRoom: "(placeholder)" as EditorRoomId,
            },
            position: doorPosition,
            type: "door",
          },
          ["testWall/afterDoor" as EditorRoomItemId]: {
            config: {
              direction: "away",
              tiles: ["armour"],
              times: {
                x: 1,
              },
            },
            position: {
              x: 4,
              y: 5,
              z: 0,
            },
            type: "wall",
          },
          ["testWall/beforeDoor" as EditorRoomItemId]: {
            config: {
              direction: "away",
              tiles: ["armour", "armour"],
              times: {
                x: 2,
              },
            },
            position: {
              x: 0,
              y: 5,
              z: 0,
            },
            type: "wall",
          },
        });
      });
      test("move the start of a wall", () => {
        const doorPosition = { x: 0, y: 5, z: 0 };
        const actionPayload: ApplyToolToRoomJsonPayload = {
          blockPosition: doorPosition,
          pointedAtItem: {
            type: "wall",
            config: editorStateWithOneRoomWithOneWall.campaignInProgress.rooms[
              testRoomId
            ].items[wallItemId].config as WallJsonConfig<"blacktooth">,
          },
        };

        const next = applyToolToRoomJsonNext(
          { ...editorStateWithOneRoomWithOneWall, tool: doorItemTool },
          actionPayload,
        );

        expect(
          next.campaignInProgress.rooms[testRoomId].items,
        ).toMatchObject<EditorRoomJsonItems>({
          ["item(door)#0" as EditorRoomItemId]: {
            config: {
              direction: "away",
              toRoom: "(placeholder)" as EditorRoomId,
            },
            position: doorPosition,
            type: "door",
          },
          ["testWall" as EditorRoomItemId]: {
            config: {
              direction: "away",
              tiles: ["armour", "armour", "armour"],
              times: {
                x: 3,
              },
            },
            position: {
              x: 2,
              y: 5,
              z: 0,
            },
            type: "wall",
          },
        });
      });
      test("move the end of a wall", () => {
        const doorPosition = { x: 3, y: 5, z: 0 };
        const actionPayload: ApplyToolToRoomJsonPayload = {
          blockPosition: doorPosition,
          pointedAtItem: {
            type: "wall",
            config: editorStateWithOneRoomWithOneWall.campaignInProgress.rooms[
              testRoomId
            ].items[wallItemId].config as WallJsonConfig<"blacktooth">,
          },
        };

        const next = applyToolToRoomJsonNext(
          { ...editorStateWithOneRoomWithOneWall, tool: doorItemTool },
          actionPayload,
        );

        expect(
          next.campaignInProgress.rooms[testRoomId].items,
        ).toMatchObject<EditorRoomJsonItems>({
          ["item(door)#0" as EditorRoomItemId]: {
            config: {
              direction: "away",
              toRoom: "(placeholder)" as EditorRoomId,
            },
            position: doorPosition,
            type: "door",
          },
          ["testWall" as EditorRoomItemId]: {
            config: {
              direction: "away",
              tiles: ["armour", "armour", "armour"],
              times: {
                x: 3,
              },
            },
            position: {
              x: 0,
              y: 5,
              z: 0,
            },
            type: "wall",
          },
        });
      });
    });
  });
});
