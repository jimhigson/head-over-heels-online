import { type ItemTypeUnion } from "../../../_generated/types/ItemInPlayUnion";
import { type ItemInPlay } from "../../../model/ItemInPlay";
import { type CharacterName } from "../../../model/modelTypes";
import { type RoomState } from "../../../model/RoomState";
import { store } from "../../../store/store";
import { getAtPath } from "../../../utils/getAtPath";
import { type GameState } from "../../gameState/GameState";
import { changeCharacterRoom } from "../../gameState/mutators/changeCharacterRoom";
import { type PressStatus } from "../../input/InputStateTracker";
import { fadeInOrOutDuration } from "../../render/animationTimings";
import { isTeleporter, type PlayableItem } from "../itemPredicates";
import {
  type Mechanic,
  type MechanicResult,
  unitMechanicalResult,
} from "../MechanicResult";

export const teleporterIsActive = <
  RoomId extends string,
  RoomItemId extends string,
>({
  config: { activatedOnStoreValue },
}: ItemTypeUnion<
  "portableTeleporter" | "teleporter",
  RoomId,
  RoomItemId
>): boolean => {
  return activatedOnStoreValue === undefined ? true : (
      !!getAtPath(store.getState().gameInPlay.gameInPlay, activatedOnStoreValue)
    );
};

export const teleporting: Mechanic<CharacterName> = <
  RoomId extends string,
  RoomItemId extends string,
>(
  playableItem: PlayableItem<CharacterName, RoomId, RoomItemId>,
  room: RoomState<RoomId, RoomItemId>,
  gameState: GameState<RoomId>,
): MechanicResult<CharacterName, RoomId, RoomItemId> => {
  const {
    type,
    state: { teleporting, standingOnItemId },
  } = playableItem;

  const { inputStateTracker } = gameState;

  // we need to run the teleporting code for both players (if they're in the room)
  // since either could be teleporting in/out at any time, but we only care about input for the
  // current character
  const isCurrentCharacter = type === gameState.currentCharacterName;
  const jumpInput: PressStatus =
    isCurrentCharacter ?
      inputStateTracker.currentActionPress("jump")
    : "released";

  const standingOn =
    standingOnItemId === null ? null : room.items[standingOnItemId];

  const standingOnActivatedTeleporter =
    standingOn !== null &&
    isTeleporter(standingOn) &&
    teleporterIsActive(standingOn);

  if (teleporting === null) {
    // not already teleporting - see if we should start:
    const startTeleporting =
      jumpInput !== "released" && standingOnActivatedTeleporter;
    if (startTeleporting) {
      playableItem.state.teleporting = {
        phase: "out",
        otherRoom: standingOn.state.toRoom ?? room.id,
        startRoomTime: room.roomTime,
      };
    }
    return unitMechanicalResult;
  }

  const finished =
    teleporting.startRoomTime + fadeInOrOutDuration <= room.roomTime;

  switch (teleporting.phase) {
    case "out": {
      if (!standingOnActivatedTeleporter) {
        // rare-but-possible case where the player has moved off the teleporter while teleporting,
        // this can sometimes happen due to vagueness in floating point collision detection
        // if they were on the edge of the teleporter enough that the mtv will next move them
        // of it, or if something pushes them - abort teleporting!
        playableItem.state.teleporting = null;
        return unitMechanicalResult;
      }

      if (finished) {
        playableItem.state.teleporting = {
          phase: "in",
          startRoomTime: room.roomTime,
          otherRoom: room.id,
        };
        const newRoom = changeCharacterRoom({
          changeType: "teleport",
          sourceItem: standingOn as ItemInPlay<
            "teleporter",
            RoomId,
            RoomItemId
          >,
          playableItem,
          gameState,
          toRoomId: teleporting.otherRoom as RoomId,
        })!;
        playableItem.state.teleporting.startRoomTime = newRoom.roomTime;
      }
      break;
    }
    case "in":
      if (finished) {
        playableItem.state.teleporting = null;
      }
      break;
    default:
      teleporting.phase satisfies never;
  }

  return unitMechanicalResult;
};
