import { type ItemTypeUnion } from "../../_generated/types/ItemInPlayUnion";
import { isWallDirectionHiddenAtAngle } from "../../model/json/WallJsonConfig";
import { type Xy } from "../../utils/vectors/vectors";
import { shadowWallCorner } from "../render/shadows/shadowCastTextures";
import { nonRenderingItemFixedZIndex } from "../render/sortZ/fixedZIndexes";
import { ItemBehaviour } from "./ItemBehaviour";

/**
 * a hint shadow casts only while all of its directions' walls are hidden
 */
const hintShadowCasts = <RoomId extends string, RoomItemId extends string>(
  { hintShadowDirections }: ItemTypeUnion<"blocker", RoomId, RoomItemId>,
  cameraAngle: Xy,
): boolean =>
  hintShadowDirections !== undefined &&
  hintShadowDirections.every((direction) =>
    isWallDirectionHiddenAtAngle(direction, cameraAngle),
  );

/**
 * a non-rendering, invisible, general-purpose, collideable blocker
 */
export class BlockerBehaviour extends ItemBehaviour {
  constructor() {
    super({
      fixedZIndex: nonRenderingItemFixedZIndex,
    });
  }

  // blockers with hint shadows are the cubes poking out of room corners:
  override shadowCastTexture<RoomId extends string, RoomItemId extends string>(
    blocker: ItemTypeUnion<"blocker", RoomId, RoomItemId>,
    cameraAngle: Xy,
  ) {
    return hintShadowCasts(blocker, cameraAngle) ? shadowWallCorner : undefined;
  }

  override castsShadowWhileStoodOn<
    RoomId extends string,
    RoomItemId extends string,
  >(blocker: ItemTypeUnion<"blocker", RoomId, RoomItemId>, cameraAngle: Xy) {
    return hintShadowCasts(blocker, cameraAngle);
  }
}
