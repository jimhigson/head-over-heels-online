import { type ItemTypeUnion } from "../../_generated/types/ItemInPlayUnion";
import { type ItemInPlayType } from "../../model/ItemInPlay";
import {
  alongAxisOfDirectionXy,
  perpendicularAxisXy,
  type Xy,
  type Xyz,
} from "../../utils/vectors/vectors";
import { isDoorPartInHiddenWall } from "../render/renderBox/makeItemRenderBoxAtCameraAngle";
import {
  shadowDoorFrameTopX,
  shadowDoorFrameTopY,
} from "../render/shadows/shadowCastTextures";
import { ItemBehaviour } from "./ItemBehaviour";

type DoorFrame<
  RoomId extends string,
  RoomItemId extends string,
> = ItemTypeUnion<"doorFrame", RoomId, RoomItemId>;

const doorFrameTopNoCastShadowOn: Array<ItemInPlayType> = ["doorLegs"];

/**
 * door frame configs never change in play, so their offsets are reused
 */
const topShadowOffsets = new WeakMap<object, Partial<Xyz>>();

const topShadowOffset = <RoomId extends string, RoomItemId extends string>({
  config,
}: DoorFrame<RoomId, RoomItemId>): Partial<Xyz> => {
  const existingOffset = topShadowOffsets.get(config);
  if (existingOffset !== undefined) {
    return existingOffset;
  }
  const alongWallAxis = alongAxisOfDirectionXy(config.direction);
  const throughDoorAxis = perpendicularAxisXy(alongWallAxis);
  const offset = {
    [alongWallAxis]: -1,
    [throughDoorAxis]: 1,
  };
  topShadowOffsets.set(config, offset);
  return offset;
};

/**
 * the near and far posts of a door, and the top that spans them
 */
export class DoorFrameBehaviour extends ItemBehaviour {
  constructor() {
    super({
      collisionDoesNotStopAutowalk: true,
      // doors align to their wall rather than anchoring at their nearest corner:
      isExemptFromNearCornerOffset: true,
      isCuboidWarped: true,
    });
  }

  // only the top casts, and only in a visible wall:
  override shadowCastTexture<RoomId extends string, RoomItemId extends string>(
    { config }: DoorFrame<RoomId, RoomItemId>,
    cameraAngle: Xy,
  ) {
    if (config.part !== "top" || isDoorPartInHiddenWall(config, cameraAngle)) {
      return undefined;
    }
    return alongAxisOfDirectionXy(config.direction) === "x" ?
        shadowDoorFrameTopX
      : shadowDoorFrameTopY;
  }

  override shadowOffset<RoomId extends string, RoomItemId extends string>(
    doorFrame: DoorFrame<RoomId, RoomItemId>,
  ) {
    return doorFrame.config.part === "top" ?
        topShadowOffset(doorFrame)
      : undefined;
  }

  override castsShadowWhileStoodOn<
    RoomId extends string,
    RoomItemId extends string,
  >(doorFrame: DoorFrame<RoomId, RoomItemId>): boolean {
    // ie, if character jumps while stood in a doorway, the top of the doorframe is now 'standing' on them:
    return doorFrame.config.part === "top";
  }

  // the top spares the door legs its shadow, while it casts at all:
  override noShadowCastOn<RoomId extends string, RoomItemId extends string>(
    { config }: DoorFrame<RoomId, RoomItemId>,
    cameraAngle: Xy,
  ) {
    return (
        config.part === "top" && !isDoorPartInHiddenWall(config, cameraAngle)
      ) ?
        doorFrameTopNoCastShadowOn
      : undefined;
  }
}
