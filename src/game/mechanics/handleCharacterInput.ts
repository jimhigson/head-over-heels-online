import { directions, scaleXyz, directionVectors } from "@/utils/vectors";
import { GameState, currentCharacter } from "../gameState/GameState";
import { InputState } from "../input/InputState";
import { maybeUpdateItemState, playerSpeedPixPerMs } from "./gameEngineTicks";
import { moveItem } from "./moveItem";

export function handleCharacterInput<RoomId extends string>(
  gameState: GameState<RoomId>,
  inputState: InputState,
  deltaMS: number,
) {
  const character = currentCharacter(gameState);
  const currentCharacterItem = character.item;
  const { which } = currentCharacterItem.config;

  if (inputState.jump && currentCharacterItem.state.standingOn !== undefined) {
    console.log("jumping");
    currentCharacterItem.state.standingOn = undefined;

    return;
  }

  const directionPressed = directions.find((d) => {
    return inputState[d] === true;
  });

  if (directionPressed !== undefined) {
    maybeUpdateItemState(currentCharacterItem, {
      facing: directionPressed,
      movement: "moving",
    });

    const movementVector = scaleXyz(
      directionVectors[directionPressed],
      playerSpeedPixPerMs[which] * deltaMS,
    );

    moveItem(currentCharacterItem, movementVector, character.roomState);
  } else {
    maybeUpdateItemState(currentCharacterItem, { movement: "idle" });
  }
}
