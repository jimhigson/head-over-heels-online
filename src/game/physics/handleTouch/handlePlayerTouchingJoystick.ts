import { scaleXyz, unitVector } from "@/utils/vectors/vectors";
import { mtv } from "../slidingCollision";
import { currentRoom } from "@/game/gameState/GameState";
import type { ItemInPlay, ItemInPlayType } from "@/model/ItemInPlay";
import type { PlanetName } from "@/sprites/planets";
import { moveItem } from "../moveItem";
import { walkSpeedPixPerMs } from "../mechanicsConstants";
import type { ItemTouchEvent } from "./ItemTouchEvent";

export const handlePlayerTouchingJoystick = <RoomId extends string>({
  gameState,
  movingItem,
  touchedItem: joystickItem,
  deltaMS,
}: ItemTouchEvent<RoomId, ItemInPlayType, "joystick">) => {
  const room = currentRoom(gameState);

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
      PlanetName,
      RoomId
    >;

    const posDelta = scaleXyz(unitM, -walkSpeedPixPerMs.charles * deltaMS);
    sillyOldFace.state.facing = posDelta;
    moveItem({
      subjectItem: sillyOldFace,
      posDelta,
      gameState,
      pusher: joystickItem,
      deltaMS,
    });
  }

  return false;
};
