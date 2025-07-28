import { describe, expect, test } from "vitest";
import type { ApplyToolToRoomJsonPayload } from "./applyItemToolReducers";
import type {
  EditorJsonItemUnion,
  EditorRoomId,
  EditorRoomItemId,
  EditorRoomJsonItems,
} from "../../editorTypes";
import { produce } from "immer";
import type { Tool } from "src/editor/Tool";
import type { AwayWallConfig } from "src/model/json/WallJsonConfig";
import { originXyz } from "../../../utils/vectors/vectors";
import {
  applyLevelEditorActions,
  doorItemToolWithAutoAddRooms,
  doorItemToolWithoutAutoAddRooms,
  editorStateWithOneRoomWithNoItems,
  editorStateWithOneRoomWithOneAwayWall,
  testRoomId,
  wallItemId,
} from "./__test__/storeStates";
import { applyItemTool, setTool } from "../levelEditorSlice";
import { zxSpectrumRoomHue, zxSpectrumShades } from "../../../originalGame";

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

      const next = applyLevelEditorActions(
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
          const next = applyLevelEditorActions(
            {
              ...editorStateWithOneRoomWithNoItems,
              tool: addCybermanTool,
            },
            applyItemTool(actionPayload),
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
          pointedAtItemJson: editorStateWithOneRoomWithOneAwayWall
            .campaignInProgress.rooms[testRoomId].items[
            wallItemId
          ] as EditorJsonItemUnion,
          preview: false,
        };

        const next = applyLevelEditorActions(
          editorStateWithOneRoomWithOneAwayWall,
          setTool(doorItemToolWithAutoAddRooms),
          applyItemTool(actionPayload),
        );

        expect(
          next.campaignInProgress.rooms[testRoomId].items,
        ).toEqual<EditorRoomJsonItems>({
          ["door" as EditorRoomItemId]: {
            config: {
              direction: "away",
              toRoom: "room_0" as EditorRoomId,
              toDoor: "door",
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
        };

        const next = applyLevelEditorActions(
          editorStateWithOneRoomWithOneAwayWall,
          setTool(doorItemToolWithAutoAddRooms),
          applyItemTool(actionPayload),
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
              toDoor: "door",
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
        };

        const next = applyLevelEditorActions(
          editorStateWithOneRoomWithOneAwayWall,
          setTool(doorItemToolWithAutoAddRooms),
          applyItemTool(actionPayload),
        );

        expect(
          next.campaignInProgress.rooms[testRoomId].items,
        ).toEqual<EditorRoomJsonItems>({
          ["door" as EditorRoomItemId]: {
            config: {
              direction: "away",
              toRoom: "room_0" as EditorRoomId,
              toDoor: "door",
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
        };

        const next = applyLevelEditorActions(
          editorStateWithOneRoomWithOneSmallAwayWall,
          setTool(doorItemToolWithAutoAddRooms),
          applyItemTool(actionPayload),
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
              toDoor: "door",
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
        };

        const next = applyLevelEditorActions(
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
        ).toMatchObject({
          color: {
            hue: expect.toBeOneOf(zxSpectrumRoomHue as unknown as string[]),
            shade: expect.toBeOneOf(zxSpectrumShades as unknown as string[]),
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

      test("does not creates a new room with a door for the reverse direction if auto-add is off in the tool", () => {
        const doorPosition = { x: 3, y: 5, z: 0 };
        const actionPayload: ApplyToolToRoomJsonPayload = {
          blockPosition: doorPosition,
          pointedAtItemJson: editorStateWithOneRoomWithOneAwayWall
            .campaignInProgress.rooms[testRoomId].items[
            wallItemId
          ] as EditorJsonItemUnion,
          preview: false,
        };

        const next = applyLevelEditorActions(
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
});
