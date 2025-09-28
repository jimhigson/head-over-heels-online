import { first } from "iter-tools-es";
import { describe, expect, test } from "vitest";

import type { FreeItem } from "../physics/itemPredicates";

import { basicEmptyRoom } from "../../_testUtils/basicRoom";
import { blockSizePx } from "../../sprites/spritePivots";
import { originXyz } from "../../utils/vectors/vectors";
import { loadItemFromJson } from "../gameState/loadRoom/loadItemFromJson";
import {
  findStandingOnWithHighestPriorityAndMostOverlap,
  spatiallyCheckStandingOn,
} from "./checkStandingOn";

describe("findStandingOnWithHighestPriorityAndMostOverlap", () => {
  test("prefers blocks over conveyors even if the conveyor has more overlap", () => {
    const roomJson = basicEmptyRoom("firstRoom");
    const result = findStandingOnWithHighestPriorityAndMostOverlap(
      first(
        loadItemFromJson(
          "movable",
          {
            type: "pushableBlock",
            config: {},
            position: { x: 2.1, y: 0, z: 1 },
          },
          roomJson,
          {},
        ),
      ) as FreeItem<string, string>,
      [
        ...loadItemFromJson(
          "conv",
          {
            type: "conveyor",
            config: {
              direction: "right",
            },
            position: { x: 2, y: 0, z: 0 },
          },
          roomJson,
          {},
        ),

        ...loadItemFromJson(
          "block",
          {
            type: "block",
            config: {
              style: "organic",
            },
            position: { x: 3, y: 0, z: 0 },
          },
          roomJson,
          {},
        ),
      ],
    );

    expect(result?.id).toBe("block");
  });

  test("given two blocks, choses one with most overlap", () => {
    const roomJson = basicEmptyRoom("firstRoom");
    const result = findStandingOnWithHighestPriorityAndMostOverlap(
      first(
        loadItemFromJson(
          "movable",
          {
            type: "pushableBlock",
            config: {},
            position: { x: 2.2, y: 0, z: 1 },
          },
          roomJson,
          {},
        ),
      ) as FreeItem<string, string>,
      [
        ...loadItemFromJson(
          "block1",
          {
            type: "block",
            config: {
              style: "organic",
            },
            position: { x: 2, y: 0, z: 0 },
          },
          roomJson,
          {},
        ),

        ...loadItemFromJson(
          "block2",
          {
            type: "block",
            config: {
              style: "organic",
            },
            position: { x: 3, y: 0, z: 0 },
          },
          roomJson,
          {},
        ),
      ],
    );

    expect(result?.id).toBe("block1");
  });
});

describe("spatiallyCheckStandingOn", () => {
  test("simple case of being directly on top -> is standing on", () => {
    const roomJson = basicEmptyRoom("firstRoom");
    const playable = first(
      loadItemFromJson(
        "player",
        {
          type: "player",
          config: { which: "heels" },
          position: { x: 2, y: 0, z: 1 },
        },
        roomJson,
        {},
      ),
    );

    const itemMaybeBeingStoodOn = first(
      loadItemFromJson(
        "block",
        {
          type: "block",
          config: { style: "organic" },
          position: { x: 2, y: 0, z: 0 },
        },
        roomJson,
        {},
      ),
    )!;

    const result = spatiallyCheckStandingOn(
      playable as FreeItem<string, string>,
      itemMaybeBeingStoodOn,
    );

    expect(result).toBe(true);
  });

  test("simple case of being very slightly inside item in but mostly above with zero allowed overlap", () => {
    const roomJson = basicEmptyRoom("firstRoom");
    const playable = first(
      loadItemFromJson(
        "player",
        {
          type: "player",
          config: { which: "heels" },
          position: {
            x: 2,
            y: 0,
            // overlapping by 1% of a block height
            z: 0.99,
          },
        },
        roomJson,
        {},
      ),
    );

    const itemMaybeBeingStoodOn = first(
      loadItemFromJson(
        "block",
        {
          type: "block",
          config: { style: "organic" },
          position: { x: 2, y: 0, z: 0 },
        },
        roomJson,
        {},
      ),
    )!;

    const result = spatiallyCheckStandingOn(
      playable as FreeItem<string, string>,
      itemMaybeBeingStoodOn,
      0, // no overlap is allowed
    );

    expect(result).toBe(false);
  });

  test("simple case of being very slightly inside item in but mostly above", () => {
    const roomJson = basicEmptyRoom("firstRoom");
    const playable = first(
      loadItemFromJson(
        "player",
        {
          type: "player",
          config: { which: "heels" },
          position: {
            x: 2,
            y: 0,
            // overlapping by 1% of a block height
            z: 0.99,
          },
        },
        roomJson,
        {},
      ),
    );

    const itemMaybeBeingStoodOn = first(
      loadItemFromJson(
        "block",
        {
          type: "block",
          config: { style: "organic" },
          position: { x: 2, y: 0, z: 0 },
        },
        roomJson,
        {},
      ),
    )!;

    const result = spatiallyCheckStandingOn(
      playable as FreeItem<string, string>,
      itemMaybeBeingStoodOn,
      blockSizePx.h * 0.02, // how much overlap is allowed - 2% of a block height
    );

    expect(result).toBe(true);
  });

  test("simple case of being very slightly overlapping in z, but not in x or y", () => {
    const roomJson = basicEmptyRoom("firstRoom");
    const playable = first(
      loadItemFromJson(
        "player",
        {
          type: "player",
          config: { which: "heels" },
          position: { x: 3, y: 0, z: 0.99 },
        },
        roomJson,
        {},
      ),
    );

    const itemMaybeBeingStoodOn = first(
      loadItemFromJson(
        "block",
        {
          type: "block",
          config: { style: "organic" },
          position: { x: 2, y: 0, z: 0 },
        },
        roomJson,
        {},
      ),
    )!;

    const result = spatiallyCheckStandingOn(
      playable as FreeItem<string, string>,
      itemMaybeBeingStoodOn,
    );

    expect(result).toBe(false);
  });

  test("case of being adjacent on the same level but to the side and slightly overlapping in x", () => {
    const roomJson = basicEmptyRoom("firstRoom");
    const playable = first(
      loadItemFromJson(
        "player",
        {
          type: "player",
          config: { which: "heels" },
          position: originXyz, // <- doesn't matter, will be overwritten soon
        },
        roomJson,
        {},
      ),
    )!;

    const itemMaybeBeingStoodOn = first(
      loadItemFromJson(
        "block",
        {
          type: "block",
          config: { style: "organic" },
          position: originXyz, // <- doesn't matter, will be overwritten soon
        },
        roomJson,
        {},
      ),
    )!;

    playable.state.position = { x: 4.1, y: 0, z: 2 };
    itemMaybeBeingStoodOn.state.position = { x: blockSizePx.w, y: 0, z: 0 };

    const result = spatiallyCheckStandingOn(
      playable as FreeItem<string, string>,
      itemMaybeBeingStoodOn,
    );

    expect(result).toBe(false);
  });

  test("found bug case", () => {
    const roomJson = basicEmptyRoom("firstRoom");
    const playable = first(
      loadItemFromJson(
        "player",
        {
          type: "player",
          config: { which: "heels" },
          position: originXyz, // <- doesn't matter, will be overwritten soon
        },
        roomJson,
        {},
      ),
    )!;

    const itemMaybeBeingStoodOn = first(
      loadItemFromJson(
        "block",
        {
          type: "block",
          config: { style: "organic" },
          position: originXyz, // <- doesn't matter, will be overwritten soon
        },
        roomJson,
        {},
      ),
    )!;

    playable.state.position = {
      // slightly overlapping in x (player is 12 wide)
      x: 0.1,
      y: 0,
      // nowhere near the top of this item (which would be 12)
      z: 3,
    };
    itemMaybeBeingStoodOn.state.position = {
      x: 12,
      y: 0,
      z: 0,
    };

    const result = spatiallyCheckStandingOn(
      playable as FreeItem<string, string>,
      itemMaybeBeingStoodOn,
    );

    expect(result).toBe(false);
  });
});
