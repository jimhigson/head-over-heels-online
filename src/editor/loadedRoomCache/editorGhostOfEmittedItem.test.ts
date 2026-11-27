import { expect, test } from "vitest";

import type { XyzBox } from "../../utils/vectors/vectors";
import type {
  EditorJsonItem,
  EditorRoomItemId,
  EditorRoomJson,
} from "../editorTypes";
import { editorGhostOfEmittedItem } from "./editorGhostOfEmittedItem";

test("the ghost of an emitted item is where the game emits it: centred on the emitter, on its base, then offset", () => {
  const emitter: EditorJsonItem<"emitter"> = {
    type: "emitter",
    // 2×2 blocks, one high, from (32, 32, 120) px:
    position: { x: 2, y: 2, z: 10 },
    config: {
      emits: { type: "portableBlock", config: { style: "cube" } },
      period: 1_000,
      maximum: null,
      times: { x: 2, y: 2 },
      offset: { z: 0.5 },
    },
  };
  const roomJson: EditorRoomJson = {
    planet: "blacktooth",
    color: { hue: "cyan", shade: "basic" },
    items: { ["emitter" as EditorRoomItemId]: emitter },
  };

  const [ghost] = editorGhostOfEmittedItem(
    "emitter" as EditorRoomItemId,
    emitter,
    roomJson,
  );

  // a 12px cube, centred on the 32px-wide emitter, half a block (6px) above its base:
  expect(ghost.state.box).toEqual<XyzBox>({
    x: 42,
    y: 42,
    z: 126,
    xd: 12,
    yd: 12,
    zd: 12,
  });
});
