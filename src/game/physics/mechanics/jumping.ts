import type { PlayableItem } from "@/model/ItemInPlay";
import type { MechanicResult } from "../MechanicResult";
import type { CharacterName } from "@/model/modelTypes";
import type { GameState } from "@/game/gameState/GameState";
import { originalGameFrameDuration } from "@/originalGame";
import {
  fallG,
  originalGameJumpPxPerFrame,
  playerJumpHeightPx,
} from "../mechanicsConstants";
import { blockSizePx } from "@/sprites/spritePivots";

const createJumpAbility = (apexZ: number) => {
  // Calculate the time to reach the apex in milliseconds in the original game:
  const framesToApex = apexZ / originalGameJumpPxPerFrame;
  const tApex = framesToApex * originalGameFrameDuration;

  // Calculate the initial velZ needed to reach the apex
  const velZ = (apexZ + 0.5 * fallG * tApex ** 2) / tApex;

  return { velZ, tApex };
};

const jumpAbilities = {
  head: createJumpAbility(playerJumpHeightPx.head),
  // TODO: confirm that springs give one extra block of height for head - this is
  // correct for heels (from 1 to 2) but that could be a doubling
  headOnSpring: createJumpAbility(playerJumpHeightPx.head + blockSizePx.h),
  heels: createJumpAbility(playerJumpHeightPx.heels),
  heelsOnSpring: createJumpAbility(playerJumpHeightPx.heels + blockSizePx.h),
};

const getJumpAbility = (characterName: CharacterName, onSpring: boolean) => {
  return jumpAbilities[`${characterName}${onSpring ? "OnSpring" : ""}`];
};

export const jumping = <RoomId extends string>(
  characterItem: PlayableItem,
  { inputState: { jump: jumpInput }, gameTime }: GameState<RoomId>,
  _deltaMS: number,
): MechanicResult<CharacterName> => {
  const { type: characterType } = characterItem;

  if (
    !jumpInput ||
    // can't jump if not standing on anything!
    characterItem.state.standingOn === null ||
    // you can't jump from a teleporter!
    characterItem.state.standingOn?.type === "teleporter"
  ) {
    return {};
  }

  const { velZ, tApex } = getJumpAbility(
    characterType,
    characterItem.state.standingOn?.type === "spring",
  );

  console.log("starting jump with end time after", tApex * 2);

  const jumpEndTime =
    gameTime +
    // heels is considered to be jumping for twice as long, because
    // head glides from the top of the jump, whereas heels continues
    // on the parabolic arc. Hover, use *2 for both for simplicity since
    // it doesn't matter if head thinks he is in a jump or not
    //tApex * 2;
    // actually, tPex * 2 doesn't totally work - this value is experimentally
    // decided on. This might be because of the terminal velocity of the falling,
    // but actually probably not
    740;

  return {
    stateDelta: {
      action: "moving",
      standingOn: null,
      jumpEndTime,
      velZ,
    },
  };
};
