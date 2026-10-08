import { type ItemTypeUnion } from "../../_generated/types/ItemInPlayUnion";
import { isWallDirectionHiddenAtAngle } from "../../model/json/WallJsonConfig";
import { alongAxisOfDirectionXy, type Xy } from "../../utils/vectors/vectors";
import { shadowWallX, shadowWallY } from "../render/shadows/shadowCastTextures";
import { nonRenderingItemFixedZIndex } from "../render/sortZ/fixedZIndexes";
import { ItemBehaviour } from "./ItemBehaviour";

export class WallBehaviour extends ItemBehaviour {
  constructor() {
    super({
      // walls span their length rather than anchoring at their nearest corner:
      isExemptFromNearCornerOffset: true,
      isCuboidWarped: true,
    });
  }

  /**
   * walls on the camera-facing sides are hidden, so render nothing
   */
  override fixedZIndexAtAngle(
    wall: ItemTypeUnion<"wall", string, string>,
    cameraAngle: Xy,
  ) {
    return isWallDirectionHiddenAtAngle(wall.config.direction, cameraAngle) ?
        nonRenderingItemFixedZIndex
      : undefined;
  }

  override shadowCastTexture<RoomId extends string, RoomItemId extends string>(
    wall: ItemTypeUnion<"wall", RoomId, RoomItemId>,
  ) {
    return alongAxisOfDirectionXy(wall.config.direction) === "y" ? shadowWallY
      : shadowWallX;
  }

  /**
   * hidden walls cast their hint shadow even while stood on
   */
  override castsShadowWhileStoodOn<
    RoomId extends string,
    RoomItemId extends string,
  >(wall: ItemTypeUnion<"wall", RoomId, RoomItemId>, cameraAngle: Xy) {
    return isWallDirectionHiddenAtAngle(wall.config.direction, cameraAngle);
  }
}
