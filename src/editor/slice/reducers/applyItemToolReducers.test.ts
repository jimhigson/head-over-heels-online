import { produce } from "immer";
import { describe, expect, test } from "vitest";

import { type AwayWallConfig } from "../../../model/json/WallJsonConfig";
import {
  type AnyRoomJson,
  iterateRoomJsonItemsWithIds,
  roomJsonItemsIterable,
} from "../../../model/RoomJson";
import { zxSpectrumRoomHue, zxSpectrumShades } from "../../../originalGame";
import { originXyz } from "../../../utils/vectors/vectors";
import {
  type EditorJsonItemUnion,
  type EditorRoomId,
  type EditorRoomItemId,
  type EditorRoomJson,
  type EditorRoomJsonItems,
} from "../../editorTypes";
import { type Tool } from "../../RoomEditingArea/interactivity/Tool";
import { initialLevelEditorSliceState } from "../initialLevelEditorSliceState";
import { selectCursorRoomId } from "../levelEditorSelectors";
import {
  applyItemTool,
  deleteSelected,
  type LevelEditorState,
  setAutoCoalesce,
  setTool,
} from "../levelEditorSlice";
import {
  doorItemToolWithAutoAddRooms,
  doorItemToolWithoutAutoAddRooms,
  editorStateWithOneRoomWithNoItems,
  editorStateWithOneRoomWithOneAwayWall,
  reduceLevelEditorActions,
  testRoomId,
  wallItemId,
} from "./__test__/storeStates";
import { type ApplyToolToRoomJsonPayload } from "./applyItemToolReducers";

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
        timestamp: 0,
      };

      const next = reduceLevelEditorActions(
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
        applyItemTool(actionPayload),
      );

      expect(
        next.campaignInProgress.rooms[testRoomId].items,
      ).toMatchObject<EditorRoomJsonItems>({
        ["pi" as EditorRoomItemId]: {
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
              position: deadlyBlockPosition,
            },
            preview: false,
            timestamp: 0,
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
          const next = reduceLevelEditorActions(
            {
              ...editorStateWithOneRoomWithNoItems,
              tool: addCybermanTool,
            },
            applyItemTool(actionPayload),
          );

          expect(
            next.campaignInProgress.rooms[testRoomId].items,
          ).toMatchObject<EditorRoomJsonItems>({
            ["m" as EditorRoomItemId]: {
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
          pointedAtItemJson: editorStateWithOneRoomWithOneAwayWall
            .campaignInProgress.rooms[testRoomId].items[
            wallItemId
          ] as EditorJsonItemUnion,
          preview: false,
          timestamp: 0,
        };

        const next = reduceLevelEditorActions(
          editorStateWithOneRoomWithOneAwayWall,
          setTool(doorItemToolWithAutoAddRooms),
          applyItemTool(actionPayload),
        );

        expect(
          next.campaignInProgress.rooms[testRoomId].items,
        ).toEqual<EditorRoomJsonItems>({
          ["d" as EditorRoomItemId]: {
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
              tiles: ["shield"],
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
              tiles: ["plain", "plain"],
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
          pointedAtItemJson: editorStateWithOneRoomWithOneAwayWall
            .campaignInProgress.rooms[testRoomId].items[
            wallItemId
          ] as EditorJsonItemUnion,
          preview: false,
          timestamp: 0,
        };

        const next = reduceLevelEditorActions(
          editorStateWithOneRoomWithOneAwayWall,
          setTool(doorItemToolWithAutoAddRooms),
          applyItemTool(actionPayload),
        );

        expect(Object.keys(next.campaignInProgress.rooms[testRoomId].items))
          .toMatchInlineSnapshot(`
            [
              "testWall",
              "d",
            ]
          `);

        expect(
          next.campaignInProgress.rooms[testRoomId].items,
        ).toEqual<EditorRoomJsonItems>({
          ["d" as EditorRoomItemId]: {
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
              tiles: ["armour", "shield", "shield"],
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
          pointedAtItemJson: editorStateWithOneRoomWithOneAwayWall
            .campaignInProgress.rooms[testRoomId].items[
            wallItemId
          ] as EditorJsonItemUnion,
          preview: false,
          timestamp: 0,
        };

        const next = reduceLevelEditorActions(
          editorStateWithOneRoomWithOneAwayWall,
          setTool(doorItemToolWithAutoAddRooms),
          applyItemTool(actionPayload),
        );

        expect(
          next.campaignInProgress.rooms[testRoomId].items,
        ).toEqual<EditorRoomJsonItems>({
          ["d" as EditorRoomItemId]: {
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
              tiles: ["plain", "plain", "armour"],
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
          pointedAtItemJson: editorStateWithOneRoomWithOneSmallAwayWall
            .campaignInProgress.rooms[testRoomId].items[
            wallItemId
          ] as EditorJsonItemUnion,
          preview: false,
          timestamp: 0,
        };

        const next = reduceLevelEditorActions(
          editorStateWithOneRoomWithOneSmallAwayWall,
          setTool(doorItemToolWithAutoAddRooms),
          applyItemTool(actionPayload),
        );

        expect(
          Object.keys(next.campaignInProgress.rooms[testRoomId].items),
        ).toEqual(["d"]);

        expect(
          next.campaignInProgress.rooms[testRoomId].items,
        ).toEqual<EditorRoomJsonItems>({
          // the wall is gone!
          ["d" as EditorRoomItemId]: {
            config: {
              direction: "away",
              toRoom: "room_0" as EditorRoomId,
            },
            position: wallPosition,
            type: "door",
          },
        });
      });

      test("creates a new room with a door for the reverse direction if auto-add is on in the tool", () => {
        const doorPosition = { x: 3, y: 5, z: 0 };
        const actionPayload: ApplyToolToRoomJsonPayload = {
          blockPosition: doorPosition,
          pointedAtItemJson: editorStateWithOneRoomWithOneAwayWall
            .campaignInProgress.rooms[testRoomId].items[
            wallItemId
          ] as EditorJsonItemUnion,
          preview: false,
          timestamp: 0,
        };

        const next = reduceLevelEditorActions(
          editorStateWithOneRoomWithOneAwayWall,
          setTool(doorItemToolWithAutoAddRooms),
          applyItemTool(actionPayload),
        );

        // should have one more room id:
        expect(Object.keys(next.campaignInProgress.rooms)).toMatchObject([
          "testRoomId",
          "room_0",
        ]);

        expect(
          next.campaignInProgress.rooms["room_0" as EditorRoomId],
        ).toMatchObject<AnyRoomJson>({
          color: {
            hue: expect.toBeOneOf(zxSpectrumRoomHue as unknown as string[]),
            shade: expect.toBeOneOf(zxSpectrumShades as unknown as string[]),
          },
          id: "room_0",
          items: {
            // here's the return door:
            d: {
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
        });
      });

      test("does not creates a new room with a door for the reverse direction if auto-add is off in the tool", () => {
        const doorPosition = { x: 3, y: 5, z: 0 };
        const actionPayload: ApplyToolToRoomJsonPayload = {
          blockPosition: doorPosition,
          pointedAtItemJson: editorStateWithOneRoomWithOneAwayWall
            .campaignInProgress.rooms[testRoomId].items[
            wallItemId
          ] as EditorJsonItemUnion,
          preview: false,
          timestamp: 0,
        };

        const next = reduceLevelEditorActions(
          editorStateWithOneRoomWithOneAwayWall,
          setTool(doorItemToolWithoutAutoAddRooms),
          applyItemTool(actionPayload),
        );

        // should have the same single room:
        expect(Object.keys(next.campaignInProgress.rooms)).toMatchObject([
          "testRoomId",
        ]);
      });
    });
  });

  const currentRoom = (state: LevelEditorState) =>
    state.campaignInProgress.rooms[
      selectCursorRoomId(state)!
    ] as EditorRoomJson;

  const findFloor = (state: LevelEditorState) => {
    const floor = roomJsonItemsIterable(currentRoom(state)).find(
      (i) => i.type === "floor",
    );
    if (floor === undefined) {
      throw new Error("no floor in room");
    }
    return floor;
  };

  describe("toaster consolidation with monsters", () => {
    test("two adjacent toasters consolidate, adding a cyberman on top prevents consolidation, removing it restores consolidation", () => {
      // 1. add two adjacent toasters — they should consolidate into one with times.x=2
      const stateWithTwoToasters = reduceLevelEditorActions(
        initialLevelEditorSliceState,
        setTool({
          type: "item",
          item: { type: "deadlyBlock", config: { style: "toaster" } },
        }),
        (dispatch, getState) => {
          dispatch(
            applyItemTool({
              blockPosition: { x: 0, y: 0, z: 0 },
              pointedAtItemJson: findFloor(getState().levelEditor),
              preview: false,
              timestamp: 0,
            }),
          );
        },
        (dispatch, getState) => {
          dispatch(
            applyItemTool({
              blockPosition: { x: 1, y: 0, z: 0 },
              pointedAtItemJson: findFloor(getState().levelEditor),
              preview: false,
              timestamp: 0,
            }),
          );
        },
      );

      const toasters = roomJsonItemsIterable(currentRoom(stateWithTwoToasters))
        .filter((i) => i.type === "deadlyBlock")
        .toArray();
      expect(toasters).toHaveLength(1);
      expect(toasters[0].config).toMatchObject({
        style: "toaster",
        times: { x: 2 },
      });

      // 2. add a sleeping cyberman on top of one toaster — toasters should
      //    de-consolidate so each block under a monster stays individual
      const stateWithCyberman = reduceLevelEditorActions(
        stateWithTwoToasters,
        setTool({
          type: "item",
          item: {
            type: "monster",
            config: {
              which: "cyberman",
              activated: "after-player-near",
              movement: "towards-on-shortest-axis-xy4",
              startDirection: "towards",
            },
          },
        }),
        applyItemTool({
          blockPosition: { x: 0, y: 0, z: 1 },
          pointedAtItemJson: toasters[0] as EditorJsonItemUnion,
          preview: false,
          timestamp: 0,
        }),
      );

      const toastersAfterCyberman = roomJsonItemsIterable(
        currentRoom(stateWithCyberman),
      )
        .filter((i) => i.type === "deadlyBlock")
        .toArray();
      expect(toastersAfterCyberman).toHaveLength(2);

      // 3. remove the cyberman — toasters should re-consolidate
      const [[cybermanId]] = iterateRoomJsonItemsWithIds(
        currentRoom(stateWithCyberman).items,
        "monster",
      );

      const stateWithoutCyberman = reduceLevelEditorActions(
        {
          ...stateWithCyberman,
          selectedJsonItemIds: [cybermanId],
        },
        deleteSelected({ timestamp: 0 }),
      );

      const toastersAfterRemoval = roomJsonItemsIterable(
        currentRoom(stateWithoutCyberman),
      )
        .filter((i) => i.type === "deadlyBlock")
        .toArray();
      expect(toastersAfterRemoval).toHaveLength(1);
      expect(toastersAfterRemoval[0].config).toMatchObject({
        style: "toaster",
        times: { x: 2 },
      });
    });
  });

  test("two adjacent blocks do not consolidate when autoCoalesce is off", () => {
    const state = reduceLevelEditorActions(
      initialLevelEditorSliceState,
      setTool({
        type: "item",
        item: { type: "block", config: { style: "organic" } },
      }),
      setAutoCoalesce(false),
      (dispatch, getState) => {
        dispatch(
          applyItemTool({
            blockPosition: { x: 0, y: 0, z: 0 },
            pointedAtItemJson: findFloor(getState().levelEditor),
            preview: false,
            timestamp: 0,
          }),
        );
      },
      (dispatch, getState) => {
        dispatch(
          applyItemTool({
            blockPosition: { x: 1, y: 0, z: 0 },
            pointedAtItemJson: findFloor(getState().levelEditor),
            preview: false,
            timestamp: 0,
          }),
        );
      },
    );

    const blocks = roomJsonItemsIterable(currentRoom(state))
      .filter((i) => i.type === "block")
      .toArray();
    expect(blocks).toHaveLength(2);
  });
});
