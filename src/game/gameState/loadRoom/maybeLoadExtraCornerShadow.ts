import { type ItemInPlay } from "../../../model/ItemInPlay";
import { wallTimes } from "../../../model/times";
import { emptyObject } from "../../../utils/empty";
import { entries } from "../../../utils/entries";
import { addXyz, type Xy, type Xyz } from "../../../utils/vectors/vectors";
import { blockXyzToFineXyz } from "../../render/projections";
import { nonRenderingItemFixedZIndex } from "../../render/sortZ/fixedZIndexes";
import { type RoomDirectionalIndex } from "./buildRoomJsonDirectionalIndex";
import { defaultBaseState } from "./itemDefaultStates";

const setback: Xy = { x: -9 / 12, y: -9 / 12 };
const cubeSize: Xyz = blockXyzToFineXyz({ x: 9 / 12, y: 9 / 12, z: 1 });

export function* maybeLoadExtraCornerShadow<
  RoomId extends string,
  RoomItemId extends string,
>(
  directionalIndex: RoomDirectionalIndex<RoomId, RoomItemId>,
): Generator<ItemInPlay<"blocker", RoomId, RoomItemId>> {
  const { walls: wallLocations, doors: doorLocations } = directionalIndex;

  for (const [coordStr, wallDirections] of entries(wallLocations)) {
    const rightWall = wallDirections.right;
    const towardsWall = wallDirections.towards;

    if (!rightWall || !towardsWall) {
      continue;
    }

    // check if right-facing wall ends with same-facing doors:
    const rightWallEnd = addXyz(
      rightWall.position,
      wallTimes(rightWall.config),
      { x: -1 },
    );

    if (
      doorLocations[`${rightWallEnd.x},${rightWallEnd.y}`]?.right === undefined
    ) {
      continue;
    }

    // check it towards-facing wall end with same-facing doors:
    const towardsWallEnd = addXyz(
      towardsWall.position,
      wallTimes(towardsWall.config),
      { y: -1 },
    );

    if (
      doorLocations[`${towardsWallEnd.x},${towardsWallEnd.y}`]?.towards ===
      undefined
    ) {
      continue;
    }

    const wallJsonPosition = rightWall.position;

    const cornerCube: ItemInPlay<"blocker", RoomId, RoomItemId> = {
      id: `extraCornerShadow-${coordStr}` as RoomItemId,
      type: "blocker",
      state: {
        ...defaultBaseState<RoomItemId>(),
        position: blockXyzToFineXyz(addXyz(wallJsonPosition, setback)),
      },
      shadowCastTexture: {
        textureId: "shadow.wallCorner",
        spritesheetVariant: "original",
      },
      castsShadowWhileStoodOn: true,
      config: emptyObject,
      aabb: cubeSize,
      fixedZIndex: nonRenderingItemFixedZIndex,
    };

    yield cornerCube;
  }
}
