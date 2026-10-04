import { type ItemTypeUnion } from "../../_generated/types/ItemInPlayUnion";
import { shadowFullBlock } from "../render/shadows/shadowCastTextures";
import { ItemBehaviour } from "./ItemBehaviour";

/**
 * floors have no fixed z-index: rooms can have several, in front of or behind
 * each other, which need sorting to get their relative z-positions correct
 */
export class FloorBehaviour extends ItemBehaviour {
  constructor() {
    super({
      collisionDoesNotStopAutowalk: true,
      // floors span the room rather than anchoring at their nearest corner:
      isExemptFromNearCornerOffset: true,
      isCuboidWarped: true,
    });
  }

  override isNonSolid<RoomId extends string, RoomItemId extends string>(
    floor: ItemTypeUnion<"floor", RoomId, RoomItemId>,
  ): boolean {
    // 'none' floors are not solid - items can fall out of the world this way!
    return floor.config.floorType === "none";
  }

  override isDeadly<RoomId extends string, RoomItemId extends string>(
    floor: ItemTypeUnion<"floor", RoomId, RoomItemId>,
  ): floor is ItemTypeUnion<"floor", RoomId, RoomItemId> {
    return floor.config.floorType === "deadly";
  }

  override shadowCastTexture() {
    // unusual for a floor to cast a shadow, but could be raised somehow in the remake engine
    return shadowFullBlock;
  }

  override castsWholeShadows(): boolean {
    return false;
  }
}
