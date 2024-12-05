import { scaleXyz, unitVector } from "@/utils/vectors/vectors";
import { mtv } from "../slidingCollision";
import type { GameState } from "@/game/gameState/GameState";
import { currentRoom } from "@/game/gameState/GameState";
import type { PlayableItem, ItemInPlay } from "@/model/ItemInPlay";
import type { CharacterName } from "@/model/modelTypes";
import type { PlanetName } from "@/sprites/planets";
import { moveItem } from "../moveItem";
import { walkSpeedPixPerMs } from "../mechanicsConstants";

export const handlePlayerTouchingJoystick = <RoomId extends string>(
  gameState: GameState<RoomId>,
  player: PlayableItem<CharacterName, RoomId>,
  joystickItem: ItemInPlay<"joystick", PlanetName, RoomId>,
  deltaMS: number,
) => {
  const room = currentRoom(gameState);

  const {
    config: { controls },
    state: { position: joystickPosition },
    aabb: joystickAabb,
  } = joystickItem;

  const m = mtv(
    player.state.position,
    player.aabb,
    joystickPosition,
    joystickAabb,
  );

  if (m.z !== 0) {
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
};
