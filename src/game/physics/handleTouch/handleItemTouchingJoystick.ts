import { mtv } from "../slidingCollision";
import { moveSpeedPixPerMs } from "../mechanicsConstants";
import type { ItemTouchEventByItemType } from "./ItemTouchEvent";
import type { ItemInPlayType, ItemInPlay } from "../../../model/ItemInPlay";
import { unitVector, scaleXyz } from "../../../utils/vectors/vectors";
import { moveItem } from "../moveItem";
import type { handleItemsTouchingItems } from "./handleItemsTouchingItems";

export const handleItemTouchingJoystick = <
  RoomId extends string,
  RoomItemId extends string,
>(
  {
    movingItem,
    room,
    touchedItem: joystickItem,
    deltaMS,
    gameState,
  }: ItemTouchEventByItemType<RoomId, RoomItemId, ItemInPlayType, "joystick">,
  onTouch: typeof handleItemsTouchingItems,
) => {
  const {
    config: { controls },
    state: { position: joystickPosition },
    aabb: joystickAabb,
  } = joystickItem;

  const m = mtv(
    movingItem.state.position,
    movingItem.aabb,
    joystickPosition,
    joystickAabb,
  );

  if (m.x === 0 && m.y === 0) {
    return;
  }

  const unitM = unitVector(m);

  for (const sillyOldFaceId of controls) {
    const sillyOldFace = room.items[sillyOldFaceId] as ItemInPlay<
      "charles",
      RoomId,
      RoomItemId
    >;

    const posDelta = scaleXyz(unitM, -moveSpeedPixPerMs.charles * deltaMS);
    sillyOldFace.state.facing = posDelta;

    // unlike the original, there is latency in controlling the charles - this
    // also avoids a circular dependency moveItem -> handleJoystick ->
    moveItem({
      room,
      subjectItem: sillyOldFace,
      gameState,
      pusher: joystickItem,
      posDelta,
      deltaMS,
      onTouch,
    });
  }
};
