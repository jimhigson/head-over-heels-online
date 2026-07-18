import { expect, test } from "vitest";

import { campaign } from "../../../_generated/originalCampaign/campaign";
import { type OriginalCampaignRoomId } from "../../../_generated/originalCampaign/OriginalCampaignRoomId";
import { roomJsonItemsIterable } from "../../../model/RoomJson";
import { entries } from "../../../utils/entries";
import { unitVectors } from "../../../utils/vectors/unitVectors";
import { type Xyz } from "../../../utils/vectors/vectors";
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

/** the corner cube gated on the base angle's near corner (both base-hidden walls) */
const baseNearCornerCube = (
  roomJson: (typeof campaign.rooms)[keyof typeof campaign.rooms],
) =>
  [
    ...maybeLoadExtraCornerShadow(
      buildRoomJsonDirectionalIndex(roomJsonItemsIterable(roomJson)),
    ),
  ].filter(
    ({ hintShadowDirections }) =>
      hintShadowDirections !== undefined &&
      hintShadowDirections.includes(unitVectors.right) &&
      hintShadowDirections.includes(unitVectors.towards),
  );

test.each(roomsWithShadow)("%s has the extra corner shadow", (_, roomJson) => {
  expect(baseNearCornerCube(roomJson).length).toBe(1);
});

test.each(roomsWithoutShadow)(
  "%s does not have the extra corner shadow",
  (_, roomJson) => {
    expect(baseNearCornerCube(roomJson).length).toBe(0);
  },
);

// blacktooth11 is symmetric (walls and a door on every side), so every world
// corner qualifies: all four cubes load, each gated (via hintShadowDirections)
// on the camera angle where its corner is the near one. The room is 8x8
// blocks (128px); the cube is 9/12 of a block (12px):
test("blacktooth11 loads a gated corner cube at every corner", () => {
  const cubes = [
    ...maybeLoadExtraCornerShadow(
      buildRoomJsonDirectionalIndex(
        roomJsonItemsIterable(campaign.rooms.blacktooth11),
      ),
    ),
  ];

  const positionForDirections = (xDirection: Xyz, yDirection: Xyz) =>
    cubes.find(
      ({ hintShadowDirections }) =>
        hintShadowDirections!.includes(xDirection) &&
        hintShadowDirections!.includes(yDirection),
    )!.state.position;

  const { right, towards, left, away } = unitVectors;

  expect<Array<Xyz>>([
    positionForDirections(right, towards),
    positionForDirections(left, towards),
    positionForDirections(left, away),
    positionForDirections(right, away),
  ]).toEqual<Array<Xyz>>([
    { x: -12, y: -12, z: 0 },
    { x: 128, y: -12, z: 0 },
    { x: 128, y: 128, z: 0 },
    { x: -12, y: 128, z: 0 },
  ]);
  expect(cubes.length).toBe(4);
});
