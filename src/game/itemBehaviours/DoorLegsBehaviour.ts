import { type ItemTypeUnion } from "../../_generated/types/ItemInPlayUnion";
import {
  alongAxisOfDirectionXy,
  perpendicularAxisXy,
  type Xy,
  type Xyz,
} from "../../utils/vectors/vectors";
import { doorTunnelLengthBlocks } from "../gameState/loadRoom/loadDoorConstants";
import { blockSizePx } from "../physics/mechanicsConstants";
import { isDoorPartInHiddenWall } from "../render/renderBox/makeItemRenderBoxAtCameraAngle";
import {
  shadowDoorFloatingThresholdX,
  shadowDoorFloatingThresholdY,
} from "../render/shadows/shadowCastTextures";
import { ItemBehaviour } from "./ItemBehaviour";

type DoorLegs<RoomId extends string, RoomItemId extends string> = ItemTypeUnion<
  "doorLegs",
  RoomId,
  RoomItemId
>;

/**
 * door legs configs never change in play, so their offsets are reused
 */
const shadowOffsets = new WeakMap<object, Partial<Xyz>>();

/**
 * the legs a door stands on, when it is raised above the floor
 */
export class DoorLegsBehaviour extends ItemBehaviour {
  constructor() {
    super({
      collisionDoesNotStopAutowalk: true,
      // doors align to their wall rather than anchoring at their nearest corner:
      isExemptFromNearCornerOffset: true,
      isCuboidWarped: true,
    });
  }

  // the floating threshold only shows (and casts) in a hidden wall:
  override shadowCastTexture<RoomId extends string, RoomItemId extends string>(
    { config }: DoorLegs<RoomId, RoomItemId>,
    cameraAngle: Xy,
  ) {
    if (!isDoorPartInHiddenWall(config, cameraAngle)) {
      return undefined;
    }
    return alongAxisOfDirectionXy(config.direction) === "x" ?
        shadowDoorFloatingThresholdX
      : shadowDoorFloatingThresholdY;
  }

  override castsShadowWhileStoodOn<
    RoomId extends string,
    RoomItemId extends string,
  >({ config }: DoorLegs<RoomId, RoomItemId>, cameraAngle: Xy) {
    return isDoorPartInHiddenWall(config, cameraAngle);
  }

  override shadowOffset<RoomId extends string, RoomItemId extends string>({
    config,
  }: DoorLegs<RoomId, RoomItemId>) {
    const existingOffset = shadowOffsets.get(config);
    if (existingOffset !== undefined) {
      return existingOffset;
    }
    const throughDoorAxis = perpendicularAxisXy(
      alongAxisOfDirectionXy(config.direction),
    );
    const outIsNegative = config.direction[throughDoorAxis] < 0;
    const offset = {
      // bring shadows up to the top of the legs:
      z: config.height * blockSizePx.z,
      [throughDoorAxis]:
        outIsNegative ? doorTunnelLengthBlocks * blockSizePx.x : undefined,
    };
    shadowOffsets.set(config, offset);
    return offset;
  }
}
