import { expect, test } from "vitest";

import { blockSizePx } from "../../game/physics/mechanicsConstants";
import {
  type EditorJsonItem,
  type EditorRoomItemId,
  type EditorRoomJson,
} from "../editorTypes";
import { type WhichEditorGhostOfAnyItemType } from "../WhichEditorGhostOf";
import { editorGhostsOfLiftEndsAndConnectors } from "./editorGhostsOfLiftEndsAndConnectors";

const roomWithLift = (lift: EditorJsonItem<"lift">): EditorRoomJson => ({
  planet: "blacktooth",
  color: { hue: "cyan", shade: "basic" },
  items: {
    ["floor" as EditorRoomItemId]: {
      type: "floor",
      config: {
        floorType: "standable",
        scenery: "blacktooth",
        times: { x: 8, y: 8 },
      },
      position: { x: 0, y: 0, z: 0 },
    },
    ["lift" as EditorRoomItemId]: lift,
  },
});

test("a lift starting at its bottom has only an editor ghost at its top", () => {
  const lift: EditorJsonItem<"lift"> = {
    type: "lift",
    config: { bottom: 0, top: 4 },
    position: { x: 2, y: 2, z: 0 },
  };

  expect<[undefined | WhichEditorGhostOfAnyItemType, number][]>(
    editorGhostsOfLiftEndsAndConnectors(
      "lift" as EditorRoomItemId,
      lift,
      roomWithLift(lift),
    )
      .filter(
        (editorGhost) => editorGhost.config.whichEditorGhost !== undefined,
      )
      .map((editorGhost) => [
        editorGhost.config.whichEditorGhost,
        editorGhost.state.box.z,
      ]),
  ).toEqual<[WhichEditorGhostOfAnyItemType, number][]>([
    ["liftTop", 4 * blockSizePx.z],
  ]);
});

test("a lift starting between its ends has editor ghosts at both", () => {
  const lift: EditorJsonItem<"lift"> = {
    type: "lift",
    config: { bottom: 1, top: 4 },
    position: { x: 2, y: 2, z: 2 },
  };

  expect<[undefined | WhichEditorGhostOfAnyItemType, number][]>(
    editorGhostsOfLiftEndsAndConnectors(
      "lift" as EditorRoomItemId,
      lift,
      roomWithLift(lift),
    )
      .filter(
        (editorGhost) => editorGhost.config.whichEditorGhost !== undefined,
      )
      .map((editorGhost) => [
        editorGhost.config.whichEditorGhost,
        editorGhost.state.box.z,
      ]),
  ).toEqual<[WhichEditorGhostOfAnyItemType, number][]>([
    ["liftTop", 4 * blockSizePx.z],
    ["liftBottom", 1 * blockSizePx.z],
  ]);
});

test("a lift's editor ghosts each draw the lift", () => {
  const lift: EditorJsonItem<"lift"> = {
    type: "lift",
    config: { bottom: 0, top: 4 },
    position: { x: 2, y: 2, z: 0 },
  };

  expect(
    editorGhostsOfLiftEndsAndConnectors(
      "lift" as EditorRoomItemId,
      lift,
      roomWithLift(lift),
    )
      .filter(
        (editorGhost) => editorGhost.config.whichEditorGhost !== undefined,
      )
      .map((editorGhost) => editorGhost.config.brushItem.type),
  ).toEqual(["lift"]);
});

test("particle dots join the lift to its editor ghost every quarter block, outside both", () => {
  const lift: EditorJsonItem<"lift"> = {
    type: "lift",
    config: { bottom: 0, top: 4 },
    position: { x: 2, y: 2, z: 0 },
  };

  // the lift is a block high, so its top is a block up, where the gap to the editor ghost begins:
  expect<number[]>(
    editorGhostsOfLiftEndsAndConnectors(
      "lift" as EditorRoomItemId,
      lift,
      roomWithLift(lift),
    )
      .filter((editorGhost) => editorGhost.config.brushItem.type === "particle")
      .map((particleDot) => particleDot.state.box.z),
  ).toEqual<number[]>(
    [1.25, 1.5, 1.75, 2, 2.25, 2.5, 2.75, 3, 3.25, 3.5, 3.75].map(
      (blocks) => blocks * blockSizePx.z,
    ),
  );
});
