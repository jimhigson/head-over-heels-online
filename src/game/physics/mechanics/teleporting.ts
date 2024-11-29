import { isItemType, type PlayableItem } from "@/model/ItemInPlay";
import type { MechanicResult } from "../MechanicResult";
import type { CharacterName } from "@/model/modelTypes";
import type { GameState } from "@/game/gameState/GameState";
import { changeCharacterRoom } from "@/game/gameState/gameStateTransitions/changeCharacterRoom";
import { fadeInOrOutDuration } from "@/game/render/animationTimings";

export function teleporting<RoomId extends string>(
  playableItem: PlayableItem<CharacterName, RoomId>,
  gameState: GameState<RoomId>,
  deltaMS: number,
): MechanicResult<CharacterName> {
  const {
    state: { teleporting },
  } = playableItem;
  const {
    inputState: { jump: jumpInput },
  } = gameState;

  const teleporter = playableItem.state.standingOn?.find(
    isItemType("teleporter"),
  );

  if (teleporting === null) {
    if (jumpInput && teleporter !== undefined) {
      return {
        stateDelta: {
          teleporting: {
            phase: "out",
            toRoom: teleporter.config.toRoom,
            timeRemaining: fadeInOrOutDuration,
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
        changeCharacterRoom({
          gameState,
          toRoomId:
            teleporting.toRoom as RoomId /* TODO: propertly type in state */,
          changeType: "teleport",
        });
        return {
          stateDelta: {
            teleporting: {
              phase: "in",
              timeRemaining: fadeInOrOutDuration,
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
