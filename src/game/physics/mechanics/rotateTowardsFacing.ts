import { type CharacterName } from "../../../model/modelTypes";
import { type RoomState } from "../../../model/RoomState";
import { rotateVectorTowards } from "../../../utils/vectors/rotateVectorTowards";
import { type GameState } from "../../gameState/GameState";
import { type PlayableItem } from "../itemPredicates";
import { type Mechanic, type MechanicResult } from "../MechanicResult";

const playableTurnVisualAngularVelocityRadiansPerMs = 0.009;

export const rotateTowardsFacing: Mechanic<CharacterName> = <
  RoomId extends string,
  RoomItemId extends string,
>(
  playableItem: PlayableItem<CharacterName, RoomId, RoomItemId>,
  room: RoomState<RoomId, RoomItemId>,
  gameState: GameState<RoomId>,
  deltaMS: number,
): MechanicResult<CharacterName, RoomId, RoomItemId> => {
  const {
    state: { visualFacingVector, facing },
  } = playableItem;

  const newVisualFacing = rotateVectorTowards(
    // visualFacingVector will be undefined if this a game is loaded from a save from before this was implemented
    visualFacingVector ?? facing,
    facing,
    playableTurnVisualAngularVelocityRadiansPerMs,
    deltaMS,
  );

  return {
    movementType: "steady",
    stateDelta: {
      visualFacingVector: newVisualFacing,
    },
  };
};
