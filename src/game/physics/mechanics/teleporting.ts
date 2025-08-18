import type { ItemInPlay } from "../../../model/ItemInPlay";
import type { CharacterName } from "../../../model/modelTypes";
import type { RoomState } from "../../../model/RoomState";
import { selectAtPath } from "../../../store/selectors";
import { store } from "../../../store/store";
import type { GameState } from "../../gameState/GameState";
import { changeCharacterRoom } from "../../gameState/mutators/changeCharacterRoom";
import type { PressStatus } from "../../input/InputStateTracker";
import { fadeInOrOutDuration } from "../../render/animationTimings";
import { type PlayableItem } from "../itemPredicates";
import { isItemType } from "../itemPredicates";
import type { Mechanic, MechanicResult } from "../MechanicResult";
import { unitMechanicalResult } from "../MechanicResult";

export const teleporterIsActive = <
  RoomId extends string,
  RoomItemId extends string,
>({
  config: { activatedOnStoreValue },
}: ItemInPlay<"teleporter", RoomId, RoomItemId>) => {
  return activatedOnStoreValue === undefined ? true : (
      selectAtPath(store.getState(), activatedOnStoreValue)
    );
};

export const teleporting: Mechanic<CharacterName> = <
  RoomId extends string,
  RoomItemId extends string,
>(
  playableItem: PlayableItem<CharacterName, RoomId, RoomItemId>,
  room: RoomState<RoomId, RoomItemId>,
  gameState: GameState<RoomId>,
  deltaMS: number,
): MechanicResult<CharacterName, RoomId, RoomItemId> => {
  const {
    state: { teleporting, standingOnItemId },
  } = playableItem;

  const { inputStateTracker } = gameState;

  const jumpInput: PressStatus = inputStateTracker.currentActionPress("jump");
  const standingOn =
    standingOnItemId === null ? null : room.items[standingOnItemId];

  const standingOnActivatedTeleporter =
    standingOn !== null &&
    isItemType("teleporter")(standingOn) &&
    teleporterIsActive(standingOn);

  if (teleporting === null) {
    // not already teleporting - see if we should start:
    const startTeleporting =
      jumpInput !== "released" && standingOnActivatedTeleporter;
    if (startTeleporting) {
      return {
        movementType: "steady",
        stateDelta: {
          teleporting: {
            phase: "out",
            toRoom: standingOn.state.toRoom,
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
      if (!standingOnActivatedTeleporter) {
        // rare-but-possible case where the player has moved off the teleporter while teleporting,
        // this can sometimes happen due to vagueness in floating point collision detection
        // if they were on the edge of the teleporter enough that the mtv will next move them
        // of it, or if something pushes them - abort teleporting!
        return {
          movementType: "steady",
          stateDelta: {
            teleporting: null,
          },
        };
      }

      if (newTimeRemaining === 0) {
        changeCharacterRoom({
          changeType: "teleport",
          sourceItem: standingOn as ItemInPlay<
            "teleporter",
            RoomId,
            RoomItemId
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
};
