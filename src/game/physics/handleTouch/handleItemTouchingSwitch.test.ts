import { describe, expect, test } from "vitest";
import { toggleSwitchInRoom } from "./handleItemTouchingSwitch";
import type { MonsterState } from "../../../model/ItemStateMap";
import type { ItemInPlay } from "../../../model/ItemInPlay";
import type { PartialDeep } from "type-fest";
import type { SwitchInRoomConfig } from "../../../model/json/SwitchConfig";

type TestRoomId = "anyRoom";
type TestItemId = "monster1" | "monster2";
type TestMonsterItem = ItemInPlay<"monster", TestRoomId, TestItemId>;

const testRoomItems = {
  monster1: {
    type: "monster",
    state: {
      activated: false,
      everActivated: false,
    },
  } satisfies PartialDeep<TestMonsterItem> as unknown as TestMonsterItem,
  monster2: {
    type: "monster",
    state: {
      activated: true,
      everActivated: true,
    } as MonsterState<TestItemId>,
  } satisfies PartialDeep<TestMonsterItem> as unknown as TestMonsterItem,
};

describe("toggleSwitchInRoom", () => {
  test("turning two monsters on and off", () => {
    const testSwitchConfig: SwitchInRoomConfig<TestRoomId, TestItemId> = {
      type: "in-room",
      modifies: [
        {
          expectType: "monster",
          newState: {
            activated: { left: false, right: true },
            everActivated: { right: true },
          },
          targets: ["monster1", "monster2"],
        },
      ],
    };

    toggleSwitchInRoom(testSwitchConfig, "right", testRoomItems, 12345);

    expect(testRoomItems.monster1).toMatchObject({
      state: {
        activated: true,
        everActivated: true,
        switchedSetting: "right",
        switchedAtRoomTime: 12345,
      },
    } satisfies PartialDeep<TestMonsterItem>);
    expect(testRoomItems.monster2).toMatchObject({
      state: {
        activated: true,
        everActivated: true,
        switchedSetting: "right",
        switchedAtRoomTime: 12345,
      },
    } satisfies PartialDeep<TestMonsterItem>);

    toggleSwitchInRoom(testSwitchConfig, "left", testRoomItems, 123456789);

    expect(testRoomItems.monster1).toMatchObject({
      state: {
        activated: false,
        everActivated: true,
        switchedSetting: "left",
        switchedAtRoomTime: 123456789,
      },
    } satisfies PartialDeep<TestMonsterItem>);
    expect(testRoomItems.monster2).toMatchObject({
      state: {
        activated: false,
        everActivated: true,
        switchedSetting: "left",
        switchedAtRoomTime: 123456789,
      },
    } satisfies PartialDeep<TestMonsterItem>);
  });

  test("errors if item is wrong type", () => {
    const testSwitchConfig: SwitchInRoomConfig<TestRoomId, TestItemId> = {
      type: "in-room",
      modifies: [
        {
          expectType: "block",
          newState: {
            disappear: { left: "onStand", right: null },
          },
          targets: ["monster1", "monster2"],
        },
      ],
    };

    expect(() => {
      toggleSwitchInRoom(testSwitchConfig, "right", testRoomItems, 12345);
    }).toThrowErrorMatchingInlineSnapshot(`
      [Error: item "undefined" is of type "monster" - does not match expected type "block" from switch config {
        "type": "in-room",
        "modifies": [
          {
            "expectType": "block",
            "newState": {
              "disappear": {
                "left": "onStand",
                "right": null
              }
            },
            "targets": [
              "monster1",
              "monster2"
            ]
          }
        ]
      }]
    `);
  });

  test("ignores items not in the room", () => {
    const testSwitchConfig: SwitchInRoomConfig<TestRoomId, TestItemId> = {
      type: "in-room",
      modifies: [
        {
          expectType: "block",
          newState: {
            disappear: { left: "onStand", right: null },
          },
          targets: ["block" as TestItemId],
        },
      ],
    };

    toggleSwitchInRoom(testSwitchConfig, "right", testRoomItems, 12345);
  });
});
