import { produce } from "immer";
import { describe, expect, test } from "vitest";

import { createNewRoom } from "../../../model/inPlaceMutators/createNewRoom";
import type { VerificationCampaign } from "../../../model/json/verification/verificationTypes";
import { verifyCampaign } from "../../../model/json/verification/verifyCampaign";
import type { WallJsonConfig } from "../../../model/json/WallJsonConfig";
import type { AnyRoomJson } from "../../../model/RoomJson";
import {
  iterateRoomJsonItemIds,
  iterateRoomJsonItemsWithIds,
  roomJsonItemsIterable,
} from "../../../model/RoomJsonItemIterators";
import { zxSpectrumRoomHue, zxSpectrumShades } from "../../../originalGame";
import { keys } from "../../../utils/entries";
import { originXyz } from "../../../utils/vectors/vectors";
import type {
  EditorJsonItemUnion,
  EditorRoomId,
  EditorRoomItemId,
  EditorRoomJson,
  EditorRoomJsonItems,
} from "../../editorTypes";
import type { Tool } from "../../RoomEditingArea/interactivity/Tool";
import { initialLevelEditorSliceState } from "../initialLevelEditorSliceState";
import { selectCursorRoomIdFromLevelEditorState } from "../levelEditorSelectors";
import {
  applyItemTool,
  changeToRoom,
  deleteSelected,
  type LevelEditorState,
  setAutoCoalesce,
  setSelectedItemsInRoom,
  setTool,
} from "../levelEditorSlice";
import { existingLayoutNode } from "../PaneLayout";
import {
  doorItemToolWithAutoAddRooms,
  doorItemToolWithoutAutoAddRooms,
  editorStateWithOneRoomWithNoItems,
  editorStateWithOneRoomWithOneAwayWall,
  reduceLevelEditorActions,
  testOpenRoomId,
  testRoomId,
  wallItemId,
} from "./__test__/storeStates";
import type { ApplyToolToRoomJsonPayload } from "./applyItemToolReducers";

describe("applying tools", () => {
  describe("applying items", () => {
    test("can put an item into a room", () => {
      const itemPosition = { x: 3, y: 3, z: 0 };

      const actionPayload: ApplyToolToRoomJsonPayload = {
        roomId: testRoomId,
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

      const state0: LevelEditorState = {
        ...editorStateWithOneRoomWithNoItems,
        tool: {
          type: "item",
          items: [
            {
              type: "pickup",
              config: {
                gives: "bag",
              },
            },
          ],
        },
      };
      const state1 = reduceLevelEditorActions(
        state0,
        applyItemTool(actionPayload),
      );

      expect(
        state1.campaignInProgress.rooms[testRoomId].items,
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

    describe("adding a tool of several items", () => {
      const floor: EditorJsonItemUnion = {
        type: "floor",
        config: {
          floorType: "standable",
          scenery: "blacktooth",
          times: { x: 8, y: 8 },
        },
        position: originXyz,
      };
      const state0TwoItemTool: LevelEditorState = {
        ...editorStateWithOneRoomWithNoItems,
        tool: {
          type: "item",
          items: [
            {
              type: "block",
              config: { style: "organic" },
            },
            {
              type: "pickup",
              config: { gives: "bag" },
              position: { x: 2, y: 1, z: 3 },
            },
          ],
        },
      };

      test("puts each item down at its position from where the tool puts down", () => {
        const state1 = reduceLevelEditorActions(
          state0TwoItemTool,
          applyItemTool({
            roomId: testRoomId,
            blockPosition: { x: 3, y: 3, z: 0 },
            pointedAtItemJson: floor,
            preview: false,
            timestamp: 0,
          }),
        );

        expect(
          Object.values(state1.campaignInProgress.rooms[testRoomId].items).map(
            ({ type, position }) => ({ type, position }),
          ),
        ).toEqual([
          { type: "block", position: { x: 3, y: 3, z: 0 } },
          { type: "pickup", position: { x: 5, y: 4, z: 3 } },
        ]);
      });

      test("puts them all down as one undoable edit", () => {
        const state1 = reduceLevelEditorActions(
          state0TwoItemTool,
          applyItemTool({
            roomId: testRoomId,
            blockPosition: { x: 3, y: 3, z: 0 },
            pointedAtItemJson: floor,
            preview: false,
            timestamp: 0,
          }),
        );

        expect(state1.history[testRoomId]?.undo).toHaveLength(1);
      });

      test("previews each item under an id of its own", () => {
        const state1 = reduceLevelEditorActions(
          state0TwoItemTool,
          applyItemTool({
            roomId: testRoomId,
            blockPosition: { x: 3, y: 3, z: 0 },
            pointedAtItemJson: floor,
            preview: true,
            timestamp: 0,
          }),
        );

        expect(
          Object.values(state1.pendingEdits?.edits[testRoomId] ?? {}).map(
            (previewedItem) => previewedItem?.type,
          ),
        ).toEqual(["block", "pickup"]);
      });
    });

    describe("adding cybermen", () => {
      test.for([
        {
          style: "volcano",
          activated: "on",
          deadlyBlockPosition: { x: 1, y: 2, z: 0 },
        },
        {
          style: "toaster",
          activated: "off",
          deadlyBlockPosition: { x: 1, y: 2, z: 0 },
        },
        // toaster but alongside, not below:
        {
          style: "toaster",
          activated: "on",
          deadlyBlockPosition: { x: 2, y: 2, z: 0 },
        },
      ] as const)(
        "a cyberman put down above a $style at $deadlyBlockPosition is activated: $activated",
        ({ activated, style, deadlyBlockPosition }) => {
          const deadlyBlock: EditorJsonItemUnion = {
            type: "deadlyBlock",
            config: {
              style,
            },
            position: deadlyBlockPosition,
          };
          const actionPayload: ApplyToolToRoomJsonPayload = {
            roomId: testRoomId,
            blockPosition: { x: 1, y: 2, z: 1 },
            pointedAtItemJson: deadlyBlock,
            preview: false,
            timestamp: 0,
          };

          const addCybermanTool: Tool = {
            type: "item",
            items: [
              {
                type: "monster",
                config: {
                  which: "cyberman",
                  activated: "on",
                  movement: "towards-on-shortest-axis-xy4",
                  startDirection: "towards",
                },
              },
            ],
          };
          const state0: LevelEditorState = produce(
            {
              ...editorStateWithOneRoomWithNoItems,
              tool: addCybermanTool,
            },
            (draft) => {
              draft.campaignInProgress.rooms[testRoomId].items[
                "deadlyBlock" as EditorRoomItemId
              ] = deadlyBlock;
            },
          );
          const state1 = reduceLevelEditorActions(
            state0,
            applyItemTool(actionPayload),
          );

          expect(
            state1.campaignInProgress.rooms[testRoomId].items,
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

      test.for<{ description: string; toasters: EditorJsonItemUnion[] }>([
        {
          description: "three toasters in a row",
          toasters: [1, 2, 3].map((x) => ({
            type: "deadlyBlock",
            config: { style: "toaster" },
            position: { x, y: 2, z: 0 },
          })),
        },
        {
          description: "one toaster three long",
          toasters: [
            {
              type: "deadlyBlock",
              config: { style: "toaster", times: { x: 3 } },
              position: { x: 1, y: 2, z: 0 },
            },
          ],
        },
      ])(
        "a row of three cybermen put down above $description are all deactivated",
        ({ toasters }) => {
          const cybermanConfig = {
            which: "cyberman",
            activated: "on",
            movement: "towards-on-shortest-axis-xy4",
            startDirection: "towards",
          } as const;
          const state0: LevelEditorState = produce(
            {
              ...editorStateWithOneRoomWithNoItems,
              tool: {
                type: "item",
                items: [
                  {
                    type: "monster",
                    config: cybermanConfig,
                  },
                  {
                    type: "monster",
                    config: cybermanConfig,
                    position: { x: 1, y: 0, z: 0 },
                  },
                  {
                    type: "monster",
                    config: cybermanConfig,
                    position: { x: 2, y: 0, z: 0 },
                  },
                ],
              },
            } satisfies LevelEditorState,
            (draft) => {
              for (const [index, toaster] of toasters.entries()) {
                draft.campaignInProgress.rooms[testRoomId].items[
                  `toaster${index}` as EditorRoomItemId
                ] = toaster;
              }
            },
          );
          const state1 = reduceLevelEditorActions(
            state0,
            applyItemTool({
              roomId: testRoomId,
              blockPosition: { x: 1, y: 2, z: 1 },
              pointedAtItemJson: toasters[0],
              preview: false,
              timestamp: 0,
            }),
          );

          expect(
            roomJsonItemsIterable(state1.campaignInProgress.rooms[testRoomId])
              .filter((item) => item.type === "monster")
              .map((cyberman) => cyberman.config.activated)
              .toArray(),
          ).toEqual(["off", "off", "off"]);
        },
      );
    });

    describe("adding doors", () => {
      test("can cut a hole in a wall, making it into two walls", () => {
        const doorPosition = { x: 2, y: 5, z: 0 };
        const actionPayload: ApplyToolToRoomJsonPayload = {
          roomId: testRoomId,
          blockPosition: doorPosition,
          pointedAtItemJson: editorStateWithOneRoomWithOneAwayWall
            .campaignInProgress.rooms[testRoomId].items[
            wallItemId
          ] as EditorJsonItemUnion,
          preview: false,
          timestamp: 0,
        };

        const state0 = editorStateWithOneRoomWithOneAwayWall;
        const state1 = reduceLevelEditorActions(
          state0,
          setTool(doorItemToolWithAutoAddRooms),
          applyItemTool(actionPayload),
        );

        expect(
          state1.campaignInProgress.rooms[testRoomId].items,
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
          roomId: testRoomId,
          blockPosition: doorPosition,
          pointedAtItemJson: editorStateWithOneRoomWithOneAwayWall
            .campaignInProgress.rooms[testRoomId].items[
            wallItemId
          ] as EditorJsonItemUnion,
          preview: false,
          timestamp: 0,
        };

        const state0 = editorStateWithOneRoomWithOneAwayWall;
        const state1 = reduceLevelEditorActions(
          state0,
          setTool(doorItemToolWithAutoAddRooms),
          applyItemTool(actionPayload),
        );

        expect(Object.keys(state1.campaignInProgress.rooms[testRoomId].items))
          .toMatchInlineSnapshot(`
            [
              "testWall",
              "d",
            ]
          `);

        expect(
          state1.campaignInProgress.rooms[testRoomId].items,
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
          roomId: testRoomId,
          blockPosition: doorPosition,
          pointedAtItemJson: editorStateWithOneRoomWithOneAwayWall
            .campaignInProgress.rooms[testRoomId].items[
            wallItemId
          ] as EditorJsonItemUnion,
          preview: false,
          timestamp: 0,
        };

        const state0 = editorStateWithOneRoomWithOneAwayWall;
        const state1 = reduceLevelEditorActions(
          state0,
          setTool(doorItemToolWithAutoAddRooms),
          applyItemTool(actionPayload),
        );

        expect(
          state1.campaignInProgress.rooms[testRoomId].items,
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
        const state0WithOneSmallAwayWall = produce(
          editorStateWithOneRoomWithOneAwayWall,
          (draft) => {
            const wall =
              draft.campaignInProgress.rooms[testRoomId].items[wallItemId];
            (wall.config as WallJsonConfig<"blacktooth">).tiles = [
              "armour",
              "armour",
            ];
          },
        );

        const wallPosition =
          state0WithOneSmallAwayWall.campaignInProgress.rooms[testRoomId].items[
            wallItemId
          ].position;
        const actionPayload: ApplyToolToRoomJsonPayload = {
          roomId: testRoomId,
          blockPosition:
            // placing at the wall's position:
            wallPosition,
          pointedAtItemJson: state0WithOneSmallAwayWall.campaignInProgress
            .rooms[testRoomId].items[wallItemId] as EditorJsonItemUnion,
          preview: false,
          timestamp: 0,
        };

        const state1 = reduceLevelEditorActions(
          state0WithOneSmallAwayWall,
          setTool(doorItemToolWithAutoAddRooms),
          applyItemTool(actionPayload),
        );

        expect(
          Object.keys(state1.campaignInProgress.rooms[testRoomId].items),
        ).toEqual(["d"]);

        expect(
          state1.campaignInProgress.rooms[testRoomId].items,
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
          roomId: testRoomId,
          blockPosition: doorPosition,
          pointedAtItemJson: editorStateWithOneRoomWithOneAwayWall
            .campaignInProgress.rooms[testRoomId].items[
            wallItemId
          ] as EditorJsonItemUnion,
          preview: false,
          timestamp: 0,
        };

        const state0 = editorStateWithOneRoomWithOneAwayWall;
        const state1 = reduceLevelEditorActions(
          state0,
          setTool(doorItemToolWithAutoAddRooms),
          applyItemTool(actionPayload),
        );

        // should have one more room id:
        expect(Object.keys(state1.campaignInProgress.rooms)).toMatchObject([
          "testRoomId",
          "room_0",
        ]);

        expect(
          state1.campaignInProgress.rooms["room_0" as EditorRoomId],
        ).toMatchObject<AnyRoomJson>({
          color: {
            hue: expect.toBeOneOf(zxSpectrumRoomHue as unknown as string[]),
            shade: expect.toBeOneOf(zxSpectrumShades as unknown as string[]),
          },
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
          roomId: testRoomId,
          blockPosition: doorPosition,
          pointedAtItemJson: editorStateWithOneRoomWithOneAwayWall
            .campaignInProgress.rooms[testRoomId].items[
            wallItemId
          ] as EditorJsonItemUnion,
          preview: false,
          timestamp: 0,
        };

        const state0 = editorStateWithOneRoomWithOneAwayWall;
        const state1 = reduceLevelEditorActions(
          state0,
          setTool(doorItemToolWithoutAutoAddRooms),
          applyItemTool(actionPayload),
        );

        // should have the same single room:
        expect(Object.keys(state1.campaignInProgress.rooms)).toMatchObject([
          "testRoomId",
        ]);
      });
    });
  });

  const currentRoom = (state: LevelEditorState) =>
    state.campaignInProgress.rooms[
      selectCursorRoomIdFromLevelEditorState(state)!
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
      const state0 = initialLevelEditorSliceState;
      const state1WithTwoToasters = reduceLevelEditorActions(
        state0,
        setTool({
          type: "item",
          items: [
            {
              type: "deadlyBlock",
              config: { style: "toaster" },
            },
          ],
        }),
        (dispatch, getState) => {
          dispatch(
            applyItemTool({
              roomId: selectCursorRoomIdFromLevelEditorState(state0),
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
              roomId: selectCursorRoomIdFromLevelEditorState(state0),
              blockPosition: { x: 1, y: 0, z: 0 },
              pointedAtItemJson: findFloor(getState().levelEditor),
              preview: false,
              timestamp: 0,
            }),
          );
        },
      );

      const toasters = roomJsonItemsIterable(currentRoom(state1WithTwoToasters))
        .filter((i) => i.type === "deadlyBlock")
        .toArray();
      expect(toasters).toHaveLength(1);
      expect(toasters[0].config).toMatchObject({
        style: "toaster",
        times: { x: 2 },
      });

      // 2. add a sleeping cyberman on top of one toaster — toasters should
      //    de-consolidate so each block under a monster stays individual
      const state2WithCyberman = reduceLevelEditorActions(
        state1WithTwoToasters,
        setTool({
          type: "item",
          items: [
            {
              type: "monster",
              config: {
                which: "cyberman",
                activated: "after-player-near",
                movement: "towards-on-shortest-axis-xy4",
                startDirection: "towards",
              },
            },
          ],
        }),
        applyItemTool({
          roomId: selectCursorRoomIdFromLevelEditorState(state0),
          blockPosition: { x: 0, y: 0, z: 1 },
          pointedAtItemJson: toasters[0] as EditorJsonItemUnion,
          preview: false,
          timestamp: 0,
        }),
      );

      const toastersAfterCyberman = roomJsonItemsIterable(
        currentRoom(state2WithCyberman),
      )
        .filter((i) => i.type === "deadlyBlock")
        .toArray();
      expect(toastersAfterCyberman).toHaveLength(2);

      // 3. remove the cyberman — toasters should re-consolidate
      const [cybermanId] = iterateRoomJsonItemIds(
        currentRoom(state2WithCyberman).items,
        "monster",
      );

      const state3WithoutCyberman = reduceLevelEditorActions(
        state2WithCyberman,
        setSelectedItemsInRoom({
          selection: [{ jsonItemId: cybermanId, whichEditorGhost: undefined }],
        }),
        deleteSelected({ timestamp: 0 }),
      );

      const toastersAfterRemoval = roomJsonItemsIterable(
        currentRoom(state3WithoutCyberman),
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
    const state0 = initialLevelEditorSliceState;
    const state1 = reduceLevelEditorActions(
      state0,
      setTool({
        type: "item",
        items: [
          {
            type: "block",
            config: { style: "organic" },
          },
        ],
      }),
      setAutoCoalesce(false),
      (dispatch, getState) => {
        dispatch(
          applyItemTool({
            roomId: selectCursorRoomIdFromLevelEditorState(state0),
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
            roomId: selectCursorRoomIdFromLevelEditorState(state0),
            blockPosition: { x: 1, y: 0, z: 0 },
            pointedAtItemJson: findFloor(getState().levelEditor),
            preview: false,
            timestamp: 0,
          }),
        );
      },
    );

    const blocks = roomJsonItemsIterable(currentRoom(state1))
      .filter((i) => i.type === "block")
      .toArray();
    expect(blocks).toHaveLength(2);
  });
});

test("a door adding a room beside one sub-room of a divided room adds no verification issues", () => {
  const roomId = "divided" as EditorRoomId;
  const room = createNewRoom<EditorRoomId, EditorRoomItemId>(
    { x: 8, y: 8 },
    { hue: "cyan", shade: "basic" },
    "blacktooth",
    [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 0, y: 1 },
      { x: 1, y: 1 },
    ],
  );
  const [[, awayWall]] = iterateRoomJsonItemsWithIds(room.items, "wall")
    .filter(([, wall]) => wall.config.direction === "away")
    .toArray();
  const state0: LevelEditorState = produce(
    {
      ...editorStateWithOneRoomWithNoItems,
      selectedRoomIds: [roomId],
      campaignInProgress: {
        ...editorStateWithOneRoomWithNoItems.campaignInProgress,
        rooms: {
          [roomId]: room,
        } as LevelEditorState["campaignInProgress"]["rooms"],
      },
    },
    (draft) => {
      Object.assign(existingLayoutNode(draft.layout, testOpenRoomId), {
        roomId,
        subRoomId: "2",
      });
    },
  );
  const issueMessages = (state: LevelEditorState) =>
    verifyCampaign(state.campaignInProgress as VerificationCampaign).map(
      ({ msg }) => msg,
    );

  const state1 = reduceLevelEditorActions(
    state0,
    setTool(doorItemToolWithAutoAddRooms),
    applyItemTool({
      roomId,
      // on the away wall of sub-room 2:
      blockPosition: { x: 3, y: 16, z: 0 },
      pointedAtItemJson: awayWall as EditorJsonItemUnion,
      preview: false,
      timestamp: 0,
    }),
  );

  expect(issueMessages(state1)).toEqual(issueMessages(state0));
});

test("previewing an item in a room other than the cursor room previews it there, leaving the cursor room as it is", () => {
  const roomB = "roomB" as EditorRoomId;
  const state0 = produce(editorStateWithOneRoomWithNoItems, (draft) => {
    const { rooms } = draft.campaignInProgress;
    rooms[roomB] = { ...rooms[testRoomId] };
  });
  const state1 = reduceLevelEditorActions(
    state0,
    changeToRoom(roomB),
    setTool({
      type: "item",
      items: [
        {
          type: "block",
          config: { style: "organic" },
        },
      ],
    }),
    applyItemTool({
      roomId: testRoomId,
      blockPosition: { x: 3, y: 3, z: 0 },
      pointedAtItemJson: {
        type: "floor",
        config: {
          floorType: "standable",
          scenery: "blacktooth",
          times: { x: 8, y: 8 },
        },
        position: originXyz,
      },
      preview: true,
      timestamp: 0,
    }),
  );
  expect({
    previewRoomIds: keys(state1.pendingEdits?.edits ?? {}),
    cursorRoomId: selectCursorRoomIdFromLevelEditorState(state1),
  }).toEqual({ previewRoomIds: [testRoomId], cursorRoomId: roomB });
});
