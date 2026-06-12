import { type ItemInPlayType } from "../../../model/ItemInPlay";
import { flippedMirrorOrientation } from "../../../model/MirrorOrientation";
import { neverTime } from "../../../utils/neverTime";
import { switchMinTimeBetweenToggleMs } from "../mechanicsConstants";
import { type ItemTouchEventByItemType } from "./ItemTouchEvent";

/**
 * mirrors flip like switches do - anything colliding with a mirror rotates
 * it to its other diagonal orientation. The turn direction follows the
 * torque of the push: pressing off-centre spins the pane away from the
 * pushed end
 */
export const handleItemTouchingMirror = <
  RoomId extends string,
  RoomItemId extends string,
>({
  touchedItem: mirrorItem,
  movingItem,
  movementVector,
  room,
}: ItemTouchEventByItemType<RoomId, RoomItemId, ItemInPlayType, "mirror">) => {
  const lastFlippedAt: number =
    mirrorItem.state.lastFlippedAtRoomTime ?? neverTime;

  const { roomTime } = room;

  mirrorItem.state.lastFlippedAtRoomTime = roomTime;

  if (lastFlippedAt + switchMinTimeBetweenToggleMs > roomTime) {
    // mirror was already being pushed against so skip it:
    return;
  }

  /*
   * the push's torque about the mirror's vertical axis: contact point is
   * the centre of the two items' xy overlap, the force is the toucher's
   * movement. Positive z-cross is a turn from +x towards +y, which reads
   * as clockwise on screen
   */
  const mirrorPosition = mirrorItem.state.position;
  const moverPosition = movingItem.state.position;
  const contactX =
    (Math.max(mirrorPosition.x, moverPosition.x) +
      Math.min(
        mirrorPosition.x + mirrorItem.aabb.x,
        moverPosition.x + movingItem.aabb.x,
      )) /
    2;
  const contactY =
    (Math.max(mirrorPosition.y, moverPosition.y) +
      Math.min(
        mirrorPosition.y + mirrorItem.aabb.y,
        moverPosition.y + movingItem.aabb.y,
      )) /
    2;
  const torqueZ =
    (contactX - (mirrorPosition.x + mirrorItem.aabb.x / 2)) * movementVector.y -
    (contactY - (mirrorPosition.y + mirrorItem.aabb.y / 2)) * movementVector.x;

  mirrorItem.state.orientation = flippedMirrorOrientation(
    mirrorItem.state.orientation,
  );
  mirrorItem.state.flipDirection = torqueZ < 0 ? "anticlockwise" : "clockwise";
  mirrorItem.state.flippedAtRoomTime = roomTime;
};
