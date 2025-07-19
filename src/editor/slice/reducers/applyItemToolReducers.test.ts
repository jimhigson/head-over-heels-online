import { describe, expect, test } from "vitest";
import type { ApplyToolToRoomJsonPayload } from "./applyItemToolReducers";
import { applyItemToolReducers } from "./applyItemToolReducers";
import {
  initialLevelEditorSliceState,
  type LevelEditorState,
} from "../levelEditorSlice";
import type {
  EditorRoomId,
  EditorRoomItemId,
  EditorRoomJsonItems,
} from "../../editorTypes";
import { produce } from "immer";
import type { Tool } from "src/editor/Tool";
import type {
  AwayWallConfig,
  WallJsonConfig,
} from "src/model/json/WallJsonConfig";
import { originXyz } from "../../../utils/vectors/vectors";

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
        items: {},
        size: { x: 5, y: 5 },
      },
    },
  },
};
const editorStateWithOneRoomWithOneAwayWall: Omit<LevelEditorState, "tool"> =
  produce(editorStateWithOneRoomWithNoItems, (draftState) => {
    draftState.campaignInProgress.rooms[testRoomId].items[wallItemId] = {
      type: "wall",
      config: {
        direction: "away",
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
    applyItemToolReducers.applyItemTool(draftState, {
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
        pointedAtItemJson: {
          type: "floor",
          config: {
            floorType: "standable",
            scenery: "blacktooth",
            times: { x: 8, y: 8 },
          },
          position: originXyz,
        },
        preview: false,
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
        ["pickup" as EditorRoomItemId]: {
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

    describe("adding cybermen", () => {
      test.each([
        {
          style: "volcano",
          activated: "on",
          deadlyBlockPosition: { x: 16, y: 32, z: 0 },
        },
        {
          style: "toaster",
          activated: "off",
          deadlyBlockPosition: { x: 16, y: 32, z: 0 },
        },
        // toaster but alongside, not below:
        {
          style: "toaster",
          activated: "on",
          deadlyBlockPosition: { x: 16, y: 16, z: 12 },
        },
      ] as const)(
        "clicking on a volcano adds a normal cyberman",
        ({ activated, style, deadlyBlockPosition }) => {
          const actionPayload: ApplyToolToRoomJsonPayload = {
            blockPosition: { x: 1, y: 2, z: 1 },
            pointedAtItemJson: {
              type: "deadlyBlock",
              config: {
                style,
              },
              // fake state for tests since it doesn't matter here:
              position: deadlyBlockPosition,
            },
            preview: false,
          };

          const addCybermanTool: Tool = {
            type: "item",
            item: {
              type: "monster",
              config: {
                which: "cyberman",
                activated: "on",
                movement: "towards-on-shortest-axis-xy4",
                startDirection: "towards",
              },
            },
          };
          const next = applyToolToRoomJsonNext(
            {
              ...editorStateWithOneRoomWithNoItems,
              tool: addCybermanTool,
            },
            actionPayload,
          );

          expect(
            next.campaignInProgress.rooms[testRoomId].items,
          ).toMatchObject<EditorRoomJsonItems>({
            ["cyberman" as EditorRoomItemId]: {
              type: "monster",
              config: {
                which: "cyberman",
                movement: "towards-on-shortest-axis-xy4",
                startDirection: "towards",
                activated,
              },
              position: {
                x: 1,
                y: 2,
                z: 1,
              },
            },
          });
        },
      );
    });

    describe("adding doors", () => {
      test("can cut a hole in a wall, making it into two walls", () => {
        const doorPosition = { x: 2, y: 5, z: 0 };
        const actionPayload: ApplyToolToRoomJsonPayload = {
          blockPosition: doorPosition,
          pointedAtItemJson: {
            type: "wall",
            config: editorStateWithOneRoomWithOneAwayWall.campaignInProgress
              .rooms[testRoomId].items[wallItemId]
              .config as WallJsonConfig<"blacktooth">,
            // fake state for tests since it doesn't matter here:
            position: originXyz,
          },
          preview: false,
        };

        const next = applyToolToRoomJsonNext(
          { ...editorStateWithOneRoomWithOneAwayWall, tool: doorItemTool },
          actionPayload,
        );

        expect(
          next.campaignInProgress.rooms[testRoomId].items,
        ).toEqual<EditorRoomJsonItems>({
          ["door" as EditorRoomItemId]: {
            config: {
              direction: "away",
              toRoom: "room_0" as EditorRoomId,
            },
            position: doorPosition,
            type: "door",
          },
          ["testWall/afterDoor" as EditorRoomItemId]: {
            config: {
              direction: "away",
              tiles: ["armour"],
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
          pointedAtItemJson: {
            type: "wall",
            config: editorStateWithOneRoomWithOneAwayWall.campaignInProgress
              .rooms[testRoomId].items[wallItemId]
              .config as WallJsonConfig<"blacktooth">,
            // fake state for tests since it doesn't matter here:
            position: originXyz,
          },
          preview: false,
        };

        const next = applyToolToRoomJsonNext(
          { ...editorStateWithOneRoomWithOneAwayWall, tool: doorItemTool },
          actionPayload,
        );

        expect(Object.keys(next.campaignInProgress.rooms[testRoomId].items))
          .toMatchInlineSnapshot(`
          [
            "testWall",
            "door",
          ]
        `);

        expect(
          next.campaignInProgress.rooms[testRoomId].items,
        ).toEqual<EditorRoomJsonItems>({
          ["door" as EditorRoomItemId]: {
            config: {
              direction: "away",
              toRoom: "room_0" as EditorRoomId,
            },
            position: doorPosition,
            type: "door",
          },
          ["testWall" as EditorRoomItemId]: {
            config: {
              direction: "away",
              tiles: ["armour", "armour", "armour"],
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
          pointedAtItemJson: {
            type: "wall",
            config: editorStateWithOneRoomWithOneAwayWall.campaignInProgress
              .rooms[testRoomId].items[wallItemId]
              .config as WallJsonConfig<"blacktooth">,
            // fake state for tests since it doesn't matter here:
            position: originXyz,
          },
          preview: false,
        };

        const next = applyToolToRoomJsonNext(
          { ...editorStateWithOneRoomWithOneAwayWall, tool: doorItemTool },
          actionPayload,
        );

        expect(
          next.campaignInProgress.rooms[testRoomId].items,
        ).toEqual<EditorRoomJsonItems>({
          ["door" as EditorRoomItemId]: {
            config: {
              direction: "away",
              toRoom: "room_0" as EditorRoomId,
            },
            position: doorPosition,
            type: "door",
          },
          ["testWall" as EditorRoomItemId]: {
            config: {
              direction: "away",
              tiles: ["armour", "armour", "armour"],
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

      test("deletes a wall if a door completely covers it", () => {
        const editorStateWithOneRoomWithOneSmallAwayWall = produce(
          editorStateWithOneRoomWithOneAwayWall,
          (draft) => {
            const wall =
              draft.campaignInProgress.rooms[testRoomId].items[wallItemId];
            (wall.config as AwayWallConfig<"blacktooth">).tiles = [
              "armour",
              "armour",
            ];
          },
        );

        const wallPosition =
          editorStateWithOneRoomWithOneSmallAwayWall.campaignInProgress.rooms[
            testRoomId
          ].items[wallItemId].position;
        const actionPayload: ApplyToolToRoomJsonPayload = {
          blockPosition:
            // placing at the wall's position:
            wallPosition,
          pointedAtItemJson: {
            type: "wall",
            config: editorStateWithOneRoomWithOneSmallAwayWall
              .campaignInProgress.rooms[testRoomId].items[wallItemId]
              .config as WallJsonConfig<"blacktooth">,
            // fake state for tests since it doesn't matter here:
            position: originXyz,
          },
          preview: false,
        };

        const next = applyToolToRoomJsonNext(
          { ...editorStateWithOneRoomWithOneSmallAwayWall, tool: doorItemTool },
          actionPayload,
        );

        expect(
          Object.keys(next.campaignInProgress.rooms[testRoomId].items),
        ).toEqual(["door"]);

        expect(
          next.campaignInProgress.rooms[testRoomId].items,
        ).toEqual<EditorRoomJsonItems>({
          // the wall is gone!
          ["door" as EditorRoomItemId]: {
            config: {
              direction: "away",
              toRoom: "room_0" as EditorRoomId,
            },
            position: wallPosition,
            type: "door",
          },
        });
      });

      test("creates a new room with a door for the reverse direction", () => {
        const doorPosition = { x: 3, y: 5, z: 0 };
        const actionPayload: ApplyToolToRoomJsonPayload = {
          blockPosition: doorPosition,
          pointedAtItemJson: {
            type: "wall",
            config: editorStateWithOneRoomWithOneAwayWall.campaignInProgress
              .rooms[testRoomId].items[wallItemId]
              .config as WallJsonConfig<"blacktooth">,
            // fake state for tests since it doesn't matter here:
            position: originXyz,
          },
          preview: false,
        };

        const next = applyToolToRoomJsonNext(
          { ...editorStateWithOneRoomWithOneAwayWall, tool: doorItemTool },
          actionPayload,
        );

        // should have one more room id:
        expect(Object.keys(next.campaignInProgress.rooms)).toMatchObject([
          "testRoomId",
          "room_0",
        ]);

        expect(
          next.campaignInProgress.rooms["room_0" as EditorRoomId],
        ).toMatchObject({
          color: {
            hue: "cyan",
            shade: "basic",
          },
          id: "room_0",
          items: {
            // here's the return door:
            door: {
              config: {
                direction: "towards",
                toRoom: "testRoomId",
              },
              position: {
                x: 3,
                y: 0,
                z: 0,
              },
              type: "door",
            },
          },
          planet: "blacktooth",
          size: {
            x: 8,
            y: 8,
          },
        });
      });
    });
  });
});
