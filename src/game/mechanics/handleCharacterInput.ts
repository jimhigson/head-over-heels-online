import {
  directions,
  scaleXyz,
  directionVectors,
  originXyz,
} from "@/utils/vectors";
import { GameState, currentCharacter } from "../gameState/GameState";
import { InputState } from "../input/InputState";
import { maybeUpdateItemState } from "./gameEngineTicks";
import { moveItem } from "./moveItem";
import { blockSizePx } from "@/sprites/pixiSpriteSheet";

// NOTE: zx spectrum ran at 50 (or 50.08) frames per second (PAL)

// original game timed at 5s to move 8 blocks
const playerSpeedPixPerMs = {
  head: (blockSizePx.w * 8) / 5_000,
  // twice as fast (just a guess - TODO: implement acceleration and measure)
  heels: (blockSizePx.w * 8) / 2_500,
};

const playerJumpHeight = {
  // head can jump almost 3 blocks high
  head: blockSizePx.h * 3 - 1,
  heels: blockSizePx.h,
};

const fallSpeedPixPerMs = blockSizePx.h / 1_000; // fall one block per second

export function handleCharacterInput<RoomId extends string>(
  gameState: GameState<RoomId>,
  inputState: InputState,
  deltaMS: number,
) {
  const character = currentCharacter(gameState);
  const characterItem = character.item;
  const { which } = characterItem.config;

  const isCharacterStandingOnSomething =
    characterItem.state.standingOn !== undefined;
  if (inputState.jump && isCharacterStandingOnSomething) {
    maybeUpdateItemState(characterItem, {
      movement: "moving",
    });
    characterItem.state.standingOn = undefined;
    characterItem.state.jumpRemaining = playerJumpHeight[which];
    return;
  }

  const directionPressed = directions.find((d) => {
    return inputState[d] === true;
  });

  if (directionPressed !== undefined) {
    // TODO: if not already facing that way, turn first (ie, allow to turn without moving
    // if key pressed for a short time)
    maybeUpdateItemState(characterItem, {
      // TODO: heels can't change direction while jumping
      facing: directionPressed,
      movement: "moving",
    });
  }

  const jumpRemaining = characterItem.state.jumpRemaining;

  // unit vector in direction of movement
  const directionVector = {
    ...(directionPressed !== undefined || jumpRemaining > 0
      ? directionVectors[characterItem.state.facing]
      : originXyz),
    z: jumpRemaining > 0 ? 1 : isCharacterStandingOnSomething ? 0 : -1,
  };

  const movementVector = scaleXyz(
    directionVector,
    playerSpeedPixPerMs[which] * deltaMS,
  );

  if (jumpRemaining > 0) {
    characterItem.state.jumpRemaining = Math.max(
      jumpRemaining - movementVector.z,
      0,
    );
  }

  moveItem(characterItem, movementVector, character.roomState);

  if (directionPressed === undefined && jumpRemaining === 0) {
    // no direction pressed and not jumping
    maybeUpdateItemState(characterItem, { movement: "idle" });
  }
}
