import { describe, expect, test } from "vitest";
import { toggleSwitchInRoom } from "./handleItemTouchingSwitch";
import type { MonsterState } from "../../../model/ItemStateMap";
import type { ItemInPlay } from "../../../model/ItemInPlay";
import type { PartialDeep } from "type-fest";
import type { SwitchInRoomConfig } from "../../../model/json/SwitchConfig";

type TestRoomId = "anyRoom";
type TestItemId = "monster1" | "monster2" | "block1" | "block2";
type TestMonsterItem = ItemInPlay<"monster", TestRoomId, TestItemId>;
type TestBlockItem = ItemInPlay<"block", TestRoomId, TestItemId>;

const makeTestRoomItems = () => ({
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
  block1: {
    type: "block",
    state: { disappearing: { on: "stand" } },
  } satisfies PartialDeep<TestBlockItem> as unknown as TestMonsterItem,
  block2: {
    type: "block",
    state: { disappearing: { on: "stand" } },
  } satisfies PartialDeep<TestBlockItem> as unknown as TestMonsterItem,
});

describe("toggleSwitchInRoom", () => {
  test("turning two monsters on and off", () => {
    const testRoomItems = makeTestRoomItems();

    const testSwitchConfig: SwitchInRoomConfig<TestRoomId, TestItemId> = {
      type: "in-room",
      modifies: [
        {
          expectType: "monster",
          leftState: {
            activated: false,
          },
          rightState: {
            activated: true,
            everActivated: true,
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

  test("turning disappearing on and off of blocks", () => {
    const testRoomItems = makeTestRoomItems();

    const testSwitchConfig: SwitchInRoomConfig<TestRoomId, TestItemId> = {
      type: "in-room",
      modifies: [
        {
          expectType: "block",
          leftState: {
            disappearing: { on: "stand" },
          },
          rightState: {
            disappearing: null,
          },
          targets: ["block1", "block2"],
        },
      ],
    };

    toggleSwitchInRoom(testSwitchConfig, "right", testRoomItems, 12345);

    expect(testRoomItems.block1).toMatchObject({
      state: {
        disappearing: null,
        switchedSetting: "right",
        switchedAtRoomTime: 12345,
      },
    } satisfies PartialDeep<TestBlockItem>);
    expect(testRoomItems.block2).toMatchObject({
      state: {
        disappearing: null,
        switchedSetting: "right",
        switchedAtRoomTime: 12345,
      },
    } satisfies PartialDeep<TestBlockItem>);

    toggleSwitchInRoom(testSwitchConfig, "left", testRoomItems, 123456789);

    expect(testRoomItems.block1).toMatchObject({
      state: {
        disappearing: { on: "stand" },
        switchedSetting: "left",
        switchedAtRoomTime: 123456789,
      },
    } satisfies PartialDeep<TestBlockItem>);
    expect(testRoomItems.block2).toMatchObject({
      state: {
        disappearing: { on: "stand" },
        switchedSetting: "left",
        switchedAtRoomTime: 123456789,
      },
    } satisfies PartialDeep<TestBlockItem>);
  });

  test("errors if item is wrong type", () => {
    const testRoomItems = makeTestRoomItems();

    const testSwitchConfig: SwitchInRoomConfig<TestRoomId, TestItemId> = {
      type: "in-room",
      modifies: [
        {
          expectType: "block",
          leftState: {
            disappearing: { on: "stand" },
          },
          rightState: {
            disappearing: undefined,
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
            "leftState": {
              "disappearing": {
                "on": "stand"
              }
            },
            "rightState": {},
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
    const testRoomItems = makeTestRoomItems();

    const testSwitchConfig: SwitchInRoomConfig<TestRoomId, TestItemId> = {
      type: "in-room",
      modifies: [
        {
          expectType: "block",
          leftState: {
            disappearing: { on: "stand" },
          },
          rightState: {
            disappearing: undefined,
          },
          targets: ["block" as TestItemId],
        },
      ],
    };

    toggleSwitchInRoom(testSwitchConfig, "right", testRoomItems, 12345);
  });
});
