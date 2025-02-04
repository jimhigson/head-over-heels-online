import { mtv } from "../slidingCollision";
import { moveSpeedPixPerMs } from "../mechanicsConstants";
import type { ItemTouchEventByItemType } from "./ItemTouchEvent";
import type { ItemInPlayType, ItemInPlay } from "../../../model/ItemInPlay";
import type { SceneryName } from "../../../sprites/planets";
import { unitVector, scaleXyz } from "../../../utils/vectors/vectors";
import { assignLatentMovement } from "../../gameState/mutators/assignLatentMovement";

export const handlePlayerTouchingJoystick = <RoomId extends string>({
  movingItem,
  room,
  touchedItem: joystickItem,
  deltaMS,
}: ItemTouchEventByItemType<RoomId, ItemInPlayType, "joystick">) => {
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
      SceneryName,
      RoomId
    >;

    const posDelta = scaleXyz(unitM, -moveSpeedPixPerMs.charles * deltaMS);
    sillyOldFace.state.facing = posDelta;

    // unlike the original, there is latency in controlling the charles - this
    // also avoids a circular dependency moveItem -> handleJoystick -> moveItem
    assignLatentMovement(sillyOldFace, room, posDelta);
  }
};
