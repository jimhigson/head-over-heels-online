import type { ItemInPlay } from "../../../model/ItemInPlay";
import type { CharacterName } from "../../../model/modelTypes";
import type { SceneryName } from "../../../sprites/planets";
import type { GameState } from "../../gameState/GameState";
import { changeCharacterRoom } from "../../gameState/mutators/changeCharacterRoom";
import type { PressStatus } from "../../input/InputStateTracker";
import { fadeInOrOutDuration } from "../../render/animationTimings";
import { type PlayableItem } from "../itemPredicates";
import { isItemType } from "../itemPredicates";
import { unitMechanicalResult, type MechanicResult } from "../MechanicResult";

export function teleporting<RoomId extends string>(
  playableItem: PlayableItem<CharacterName, RoomId>,
  gameState: GameState<RoomId>,
  deltaMS: number,
): MechanicResult<CharacterName, RoomId> {
  const {
    state: { teleporting, standingOn },
  } = playableItem;

  const { inputStateTracker } = gameState;

  const jumpInput: PressStatus = inputStateTracker.currentActionPress("jump");

  if (teleporting === null) {
    if (
      jumpInput !== "released" &&
      standingOn !== null &&
      isItemType("teleporter")(standingOn)
    ) {
      return {
        movementType: "steady",
        stateDelta: {
          teleporting: {
            phase: "out",
            toRoom: standingOn.config.toRoom,
            timeRemaining: fadeInOrOutDuration,
          },
        },
      };
    }
    return unitMechanicalResult;
  }

  const newTimeRemaining = Math.max(teleporting.timeRemaining - deltaMS, 0);

  switch (teleporting.phase) {
    case "out":
      if (newTimeRemaining === 0) {
        changeCharacterRoom({
          changeType: "teleport",
          sourceItem: standingOn as ItemInPlay<
            "teleporter",
            SceneryName,
            RoomId
          >,
          playableItem,
          gameState,
          toRoomId:
            teleporting.toRoom as RoomId /* TODO: propertly type in state */,
        });
        return {
          movementType: "steady",
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
          movementType: "steady",
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
    movementType: "steady",
    stateDelta: {
      teleporting: {
        ...teleporting,
        timeRemaining: newTimeRemaining,
      },
    },
  };
}
