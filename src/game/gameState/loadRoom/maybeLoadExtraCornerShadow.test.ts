import { expect, test } from "vitest";

import { campaign } from "../../../_generated/originalCampaign/campaign";
import { type OriginalCampaignRoomId } from "../../../_generated/originalCampaign/OriginalCampaignRoomId";
import { roomJsonItemsIterable } from "../../../model/RoomJson";
import { entries } from "../../../utils/entries";
import { cameraAngleBase } from "../../../utils/vectors/rotateXy";
import { type Xy, type Xyz } from "../../../utils/vectors/vectors";
import { buildRoomJsonDirectionalIndex } from "./buildRoomJsonDirectionalIndex";
import { maybeLoadExtraCornerShadow } from "./maybeLoadExtraCornerShadow";

const roomsWithExtraCornerShadow = new Set<OriginalCampaignRoomId>([
  "blacktooth11",
  "blacktooth20",
  "blacktooth27fish",
  "blacktooth50market",
  "blacktooth62fish",
  "blacktooth66",
  "blacktooth71",
  "blacktooth72",
  "blacktooth74",
  "bookworld1",
  "bookworld9",
  "bookworld12fish",
  "bookworld16",
  "bookworld23",
  "egyptus8",
  "egyptus18",
  "egyptus24",
  "egyptus26",
  "egyptus28",
  "moonbase7",
  "moonbase12",
  "moonbase14",
  "moonbase16",
  "moonbase20",
  "moonbase23",
  "penitentiary11",
  "penitentiary26",
  "penitentiary28",
  "safari7",
  "safari23",
]);

const roomsWithShadow = entries(campaign.rooms).filter(([roomId]) =>
  roomsWithExtraCornerShadow.has(roomId),
);
const roomsWithoutShadow = entries(campaign.rooms).filter(
  ([roomId]) => !roomsWithExtraCornerShadow.has(roomId),
);

test.each(roomsWithShadow)("%s has the extra corner shadow", (_, roomJson) => {
  const yieldCount = [
    ...maybeLoadExtraCornerShadow(
      buildRoomJsonDirectionalIndex(roomJsonItemsIterable(roomJson)),
      cameraAngleBase,
    ),
  ].length;
  expect(yieldCount).toBe(1);
});

test.each(roomsWithoutShadow)(
  "%s does not have the extra corner shadow",
  (_, roomJson) => {
    const yieldCount = [
      ...maybeLoadExtraCornerShadow(
        buildRoomJsonDirectionalIndex(roomJsonItemsIterable(roomJson)),
        cameraAngleBase,
      ),
    ].length;
    expect(yieldCount).toBe(0);
  },
);

// blacktooth11 is symmetric (walls and a door on every side), so it qualifies
// for the corner shadow at every camera angle; the cube sits diagonally out of
// the room at the camera-near corner, which is a different world corner per
// angle. The room is 8x8 blocks (128px); the cube is 9/12 of a block (12px):
test.for<[string, Xy, Xyz]>([
  ["base", { x: 1, y: 0 }, { x: -12, y: -12, z: 0 }],
  ["cw90", { x: 0, y: -1 }, { x: 128, y: -12, z: 0 }],
  ["cw180", { x: -1, y: 0 }, { x: 128, y: 128, z: 0 }],
  ["cw270", { x: 0, y: 1 }, { x: -12, y: 128, z: 0 }],
])(
  "blacktooth11 has the corner shadow at the near corner at %s",
  ([, cameraAngle, expectedPosition]) => {
    const cubes = [
      ...maybeLoadExtraCornerShadow(
        buildRoomJsonDirectionalIndex(
          roomJsonItemsIterable(campaign.rooms.blacktooth11),
        ),
        cameraAngle,
      ),
    ];
    expect(cubes.length).toBe(1);
    const [{ state }] = cubes;
    expect(state.position).toEqual(expectedPosition);
  },
);
