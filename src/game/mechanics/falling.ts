import { UnknownItemInPlay } from "@/model/ItemInPlay";
import { UnknownRoomState } from "@/model/modelTypes";
import { blockSizePx } from "@/sprites/pixiSpriteSheet";
import { unitVectors, scaleXyz } from "@/utils/vectors";
import { moveItem } from "./moveItem";
import { maybeUpdateItemState } from "./gameEngineTicks";

const fallSpeedPixPerMs = blockSizePx.h / 1_000; // fall one block per second

export const falling = (
  item: UnknownItemInPlay & { state: { standingOn: UnknownItemInPlay } },
  room: UnknownRoomState,
  deltaMS: number,
) => {
  if (item.state.standingOn !== undefined) {
    return; // standing on something = not falling
  }

  if (item.type === "player" && item.state.jumpRemaining > 0) {
    return; // players don't fall while they're jumping
  }

  if (item.type === "player" && item.config.which === "head") {
    maybeUpdateItemState(item, { movement: "falling" });
  }

  // ok, this item is falling:
  const fallVector = scaleXyz(unitVectors.down, fallSpeedPixPerMs * deltaMS);

  const collisions = moveItem(
    item,
    fallVector,
    room,
    //["z"], // collide only in z axis:
  );

  if (collisions.length > 0) {
    const [standingOn] = collisions;
    // we're assuming the object we collided with in z was below us. the collision detection
    // doesn't tell us if it was above or below.
    item.state.standingOn = standingOn;
  }
};
