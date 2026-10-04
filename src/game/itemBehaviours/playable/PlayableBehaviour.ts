import {
  itemBehaviourKey,
  type ItemInPlayType,
} from "../../../model/ItemInPlay";
import {
  type PlayableItem,
  type UnionOfAllItemInPlayTypes,
} from "../../../model/ItemInPlayNarrowedUnions";
import {
  type CharacterName,
  otherIndividualCharacterName,
} from "../../../model/modelTypes";
import { type RoomState } from "../../../model/RoomState";
import { lostLife } from "../../../store/slices/gameInPlay/gameInPlaySlice";
import { type DeathMenuParam } from "../../../store/slices/gameMenus/gameMenusSlice";
import { store } from "../../../store/store";
import { rotateVectorTowards } from "../../../utils/vectors/rotateVectorTowards";
import { type GameState } from "../../gameState/GameState";
import { playerDiedRecently } from "../../gameState/gameStateSelectors/playerDiedRecently";
import { playableHasShield } from "../../gameState/gameStateSelectors/selectPickupAbilities";
import { selectPlayableItem } from "../../gameState/gameStateSelectors/selectPlayableItem";
import { saveGameThunk } from "../../gameState/saving/saveGameThunk";
import { type ItemTouchEvent } from "../../physics/handleTouch/ItemTouchEvent";
import { type MechanicResult } from "../../physics/MechanicResult";
import { jumping } from "../../physics/mechanics/jumping";
import { pickingUp } from "../../physics/mechanics/pickingUp";
import { puttingDown } from "../../physics/mechanics/puttingDown";
import { teleporting } from "../../physics/mechanics/teleporting";
import { walking } from "../../physics/mechanics/walking";
import { fadeInOrOutDuration } from "../../render/animationTimings";
import { shadowPlayable } from "../../render/shadows/shadowCastTextures";
import { FreeItemBehaviour } from "../freeItem/FreeItemBehaviour";
import { type ItemBehaviourOptions } from "../ItemBehaviour";
import { firing } from "./firing";

const playableTurnVisualAngularVelocityRadiansPerMs = 0.009;

const gatherLivesInfo = <RoomId extends string>(
  playableItem: PlayableItem<CharacterName, RoomId>,
  gameState: GameState<RoomId>,
): DeathMenuParam => {
  if (playableItem.type === "headOverHeels") {
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

/**
 * head, heels, and both together in symbiosis
 */
export class PlayableBehaviour extends FreeItemBehaviour {
  constructor(options: ItemBehaviourOptions = {}) {
    super({
      shadowCastTexture: shadowPlayable,
      castsShadowWhileStoodOn: true,
      ...options,
    });
  }

  override isPushableBy<RoomId extends string, RoomItemId extends string>(
    playable: PlayableItem<CharacterName, RoomId, RoomItemId>,
    pusher: UnionOfAllItemInPlayTypes<RoomId, RoomItemId>,
    forceful: boolean,
  ): playable is PlayableItem<CharacterName, RoomId, RoomItemId> {
    return (
      super.isPushableBy(playable, pusher, forceful) &&
      // can't push a player while they're autowalking - lets players walk into a room while invincible if
      // an enemy is near the door.
      (forceful || !playable.state.autoWalk)
    );
  }

  override isJumpOffable<RoomId extends string, RoomItemId extends string>(
    playable: PlayableItem<CharacterName, RoomId, RoomItemId>,
  ): boolean {
    // can't jump off of a character that is jumping. This prevents
    // a 'superjump' by going out of symbiosis while jumping and
    // holding jump
    return playable.state.standingOnItemId !== null;
  }

  override mechanicResults<RoomId extends string, RoomItemId extends string>(
    playable: PlayableItem<CharacterName, RoomId, RoomItemId>,
    room: RoomState<RoomId, RoomItemId>,
    gameState: GameState<RoomId>,
    deltaMS: number,
    into: Array<MechanicResult<ItemInPlayType, RoomId, RoomItemId>>,
  ): void {
    super.mechanicResults(playable, room, gameState, deltaMS, into);

    // walking is allowed if not current for autowalking:
    into.push(walking(playable, room, gameState, deltaMS));

    const {
      state: { visualFacingVector, facing },
    } = playable;
    // turn visually towards the facing direction, rather than snapping:
    into.push({
      movementType: "steady",
      stateDelta: {
        visualFacingVector: rotateVectorTowards(
          // visualFacingVector will be undefined if this a game is loaded from a save from before this was implemented
          visualFacingVector ?? facing,
          facing,
          playableTurnVisualAngularVelocityRadiansPerMs,
          deltaMS,
        ),
      },
    });

    // although teleporting involves user controls, it also manages the in/out
    // phase which need to happen even if the user switched character since activating the
    // teleporter
    into.push(teleporting(playable, room, gameState, deltaMS));

    // user controls:
    if (playable.id === gameState.currentCharacterName) {
      // putting down before jumping means that have a chance to
      // put down a spring and then jump off of it:
      puttingDown(playable, room, gameState, deltaMS);

      into.push(jumping(playable, room, gameState, deltaMS));

      // picking up after jumping means have time to jump off a spring while
      // instantly (same tick) picking it up:
      pickingUp(playable, room, gameState);
      firing(playable, room, gameState, deltaMS);
    }
  }

  override tickStandingOnBeforeMechanics<
    RoomId extends string,
    RoomItemId extends string,
  >(
    playable: PlayableItem<CharacterName, RoomId, RoomItemId>,
    standingOn: UnionOfAllItemInPlayTypes<RoomId, RoomItemId>,
    room: RoomState<RoomId, RoomItemId>,
    gameState: GameState<RoomId>,
    deltaMS: number,
  ): void {
    if (standingOn[itemBehaviourKey].isDeadlyToStandOn(standingOn)) {
      // the player has a shield that has only just expired - if they are standing on a deadly
      // item, it should kill them. This would normally have already killed them, but it is possible
      // they had a shield when they walked onto the deadly thing
      this.onDeadlyContact(playable, room, gameState);
    }
  }

  override tickStandingOn<RoomId extends string, RoomItemId extends string>(
    playable: PlayableItem<CharacterName, RoomId, RoomItemId>,
    standingOn: UnionOfAllItemInPlayTypes<RoomId, RoomItemId>,
    room: RoomState<RoomId, RoomItemId>,
    gameState: GameState<RoomId>,
    deltaMS: number,
  ): void {
    // case of walking onto a pickup from another platform, not colliding with it
    if (standingOn.type === "pickup") {
      standingOn[itemBehaviourKey].onTouch(
        standingOn,
        {
          gameState,
          movingItem: playable,
          touchedItem: standingOn,
          room,
          movementVector: { x: 0, y: 0, z: -1 },
          deltaMS,
        },
        false,
      );
    }
  }

  override onTouch<RoomId extends string, RoomItemId extends string>(
    playable: PlayableItem<CharacterName, RoomId, RoomItemId>,
    e: ItemTouchEvent<RoomId, RoomItemId>,
    isMover: boolean,
  ): void {
    const { room, gameState } = e;
    if (!isMover) {
      // something moved into the player - handled as if the player moved into it:
      this.#touchingItem(playable, e.movingItem, room, gameState);
      return;
    }

    const { touchedItem } = e;
    // portals and pickups act on the playable before it reacts to them:
    if (touchedItem.type === "portal" || touchedItem.type === "pickup") {
      super.onTouch(playable, e, isMover);
      this.#touchingItem(playable, touchedItem, room, gameState);
    } else {
      this.#touchingItem(playable, touchedItem, room, gameState);
      super.onTouch(playable, e, isMover);
    }
  }

  #touchingItem<RoomId extends string, RoomItemId extends string>(
    playable: PlayableItem<CharacterName, RoomId, RoomItemId>,
    touchedItem: UnionOfAllItemInPlayTypes<RoomId, RoomItemId>,
    room: RoomState<RoomId, RoomItemId>,
    gameState: GameState<RoomId>,
  ): void {
    const touchedBehaviour = touchedItem[itemBehaviourKey];
    if (touchedBehaviour.isDeadly(touchedItem)) {
      this.onDeadlyContact(playable, room, gameState);
    }

    if (!touchedBehaviour.collisionDoesNotStopAutowalk) {
      // the "stopAutowalk" special item is in front of every door
      // to ensure there's something to collide with when coming through,
      // but to fix the player getting stuck in an autowalk (if there's an
      // item in front of the door that can't be pushed) we also stop if
      // they collide with anything other than a few scenery items:
      playable.state.autoWalk = false;
    }
  }

  /**
   * touching something deadly costs a life, unless shielded or already dying
   */
  override onDeadlyContact<RoomId extends string, RoomItemId extends string>(
    playableItem: PlayableItem<CharacterName, RoomId, RoomItemId>,
    { roomTime }: RoomState<RoomId, RoomItemId>,
    gameState: GameState<RoomId>,
  ): void {
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

    store.dispatch(
      lostLife({
        characterLosingLifeItem: playableItem,
        deathMenuParam: gatherLivesInfo(playableItem, gameState),
      }),
    );
    store.dispatch(saveGameThunk(gameState));
  }
}
