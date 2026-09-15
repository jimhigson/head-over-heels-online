import { type ItemTypeUnion } from "../../../_generated/types/ItemInPlayUnion";
import {
  type CharacterName,
  otherIndividualCharacterName,
} from "../../../model/modelTypes";
import { lostLife } from "../../../store/slices/gameInPlay/gameInPlaySlice";
import { type DeathMenuParam } from "../../../store/slices/gameMenus/gameMenusSlice";
import { store } from "../../../store/store";
import { type GameState } from "../../gameState/GameState";
import { playerDiedRecently } from "../../gameState/gameStateSelectors/playerDiedRecently";
import { playableHasShield } from "../../gameState/gameStateSelectors/selectPickupAbilities";
import { selectPlayableItem } from "../../gameState/gameStateSelectors/selectPlayableItem";
import { saveGameThunk } from "../../gameState/saving/saveGameThunk";
import { startCameraSpin } from "../../mainLoop/tickCameraTransition";
import { deathAnimationVisibleDuration } from "../../mainLoop/tickGameSpeed";
import { isHeadOverHeels } from "../../physics/itemPredicates";
import { fadeInOrOutDuration } from "../../render/animationTimings";
import { type DeadlyItemType, type PlayableItem } from "../itemPredicates";
import { type ItemTouchEvent } from "./ItemTouchEvent";

/**
 * quarter turns the camera sweeps while the death fade plays. The spin runs on
 * the game clock, which the death slows asymptotically towards a standstill, so
 * the sweep eases off to a crawl as the world settles
 */
const deathCameraSpinQuarterTurns = 1;

const gatherLivesInfo = <RoomId extends string>(
  playableItem: PlayableItem<CharacterName, RoomId>,
  gameState: GameState<RoomId>,
): DeathMenuParam => {
  if (isHeadOverHeels(playableItem)) {
    return {
      dyingCharacterName: playableItem.type,
      headLives: playableItem.state.head.lives,
      heelsLives: playableItem.state.heels.lives,
    };
  }

  const otherCharacter = selectPlayableItem(
    gameState,
    otherIndividualCharacterName(playableItem.type),
  );
  const otherLives = otherCharacter?.state.lives ?? 0;

  return {
    dyingCharacterName: playableItem.type,
    headLives:
      playableItem.type === "head" ? playableItem.state.lives : otherLives,
    heelsLives:
      playableItem.type === "heels" ? playableItem.state.lives : otherLives,
  };
};

export function handlePlayerTouchingDeadly<
  RoomId extends string,
  RoomItemId extends string,
>({
  room: { roomTime },
  movingItem: playableItem,
  gameState,
}: ItemTouchEvent<
  RoomId,
  RoomItemId,
  PlayableItem<CharacterName, RoomId, RoomItemId>,
  ItemTypeUnion<"floor" | "spikes" | DeadlyItemType, RoomId, RoomItemId>
>) {
  if (playableItem.state.action === "death") {
    return;
  }

  if (playableHasShield(playableItem)) {
    return;
  }

  if (playerDiedRecently(playableItem)) {
    return;
  }

  playableItem.state.action = "death";
  playableItem.state.expires = roomTime + fadeInOrOutDuration;

  // sweeps for exactly as long as the fade is visible, so the camera comes to
  // rest on the frame the world freezes on:
  startCameraSpin(
    gameState,
    deathCameraSpinQuarterTurns,
    deathAnimationVisibleDuration,
  );

  store.dispatch(
    lostLife({
      characterLosingLifeItem: playableItem,
      deathMenuParam: gatherLivesInfo(playableItem, gameState),
    }),
  );
  store.dispatch(saveGameThunk(gameState));
}
