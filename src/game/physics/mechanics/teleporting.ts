import { PlayableItem } from "@/model/ItemInPlay";
import { MechanicResult } from "../MechanicResult";
import { CharacterName } from "@/model/modelTypes";
import { GameState } from "@/game/gameState/GameState";
import { changeCharacterRoom } from "@/game/gameState/changeCharacterRoom";
import { teleportTime } from "../mechanicsConstants";

export function teleporting<RoomId extends string>(
  playableItem: PlayableItem<RoomId>,
  gameState: GameState<RoomId>,
  deltaMS: number,
): MechanicResult<CharacterName> {
  const {
    state: { teleporting },
  } = playableItem;
  const {
    inputState: { jump: jumpInput },
  } = gameState;

  if (teleporting === null) {
    if (jumpInput && playableItem.state.standingOn?.type === "teleporter") {
      return {
        stateDelta: {
          teleporting: {
            phase: "out",
            toRoom: playableItem.state.standingOn.config.toRoom,
            timeRemaining: teleportTime,
          },
        },
      };
    }
    return {};
  }

  const newTimeRemaining = Math.max(teleporting.timeRemaining - deltaMS, 0);

  switch (teleporting.phase) {
    case "out":
      if (newTimeRemaining === 0) {
        changeCharacterRoom(
          gameState,
          teleporting.toRoom as RoomId /* TODO: propertly type in state */,
        );
        return {
          stateDelta: {
            teleporting: {
              phase: "in",
              timeRemaining: teleportTime,
            },
          },
        };
      }
      break;

    case "in":
      if (newTimeRemaining === 0) {
        return {
          stateDelta: {
            teleporting: null,
          },
        };
      }
      break;
    default:
      teleporting satisfies never;
  }

  return {
    stateDelta: {
      teleporting: {
        ...teleporting,
        timeRemaining: newTimeRemaining,
      },
    },
  };
}
