import { type ItemTypeUnion } from "../../_generated/types/ItemInPlayUnion";
import { type FreeItem } from "../../model/ItemInPlayNarrowedUnions";
import {
  dominantAxisXy,
  roundsToCardinalXy4,
  scaleXyz,
  type Xyz,
} from "../../utils/vectors/vectors";
import {
  conveyorSpeedPixPerMs,
  moveSpeedPixPerMs,
} from "../physics/mechanicsConstants";
import {
  shadowFullBlock,
  shadowFullBlockFlipX,
} from "../render/shadows/shadowCastTextures";
import { ItemBehaviour } from "./ItemBehaviour";

export class ConveyorBehaviour extends ItemBehaviour {
  constructor() {
    super({
      isCuboidWarped: true,
    });
  }

  override movingFloorVelocity<
    RoomId extends string,
    RoomItemId extends string,
  >(
    conveyor: ItemTypeUnion<"conveyor", RoomId, RoomItemId>,
    stander: FreeItem<RoomId, RoomItemId>,
  ): undefined | Xyz {
    const {
      config: { speed: configSpeed },
      state: { direction, disabled },
    } = conveyor;

    if (disabled) {
      return undefined;
    }

    const speedMultiplier = configSpeed ?? 1;

    /**
     * conveyors magically move quicker when heels is fighting against them, so that all
     * characters can only just stay still when walking against them, regardless of how
     * fast the character walks. Only applies at the standard (1×) conveyor speed.
     */

    const heelsWalkingAgainst =
      speedMultiplier === 1 &&
      stander.type === "heels" &&
      stander.state.action === "moving" &&
      // heels' facing rounds to the exact opposite of the belt's direction:
      roundsToCardinalXy4(
        stander.state.facing.x,
        stander.state.facing.y,
        -direction.x,
        -direction.y,
      );

    const conveyorSpeed =
      heelsWalkingAgainst ?
        moveSpeedPixPerMs.heels
      : conveyorSpeedPixPerMs * speedMultiplier;

    return scaleXyz(direction, conveyorSpeed);
  }

  override shadowCastTexture<RoomId extends string, RoomItemId extends string>(
    conveyor: ItemTypeUnion<"conveyor", RoomId, RoomItemId>,
  ) {
    return dominantAxisXy(conveyor.config.direction) === "x" ?
        shadowFullBlockFlipX
      : shadowFullBlock;
  }
}
