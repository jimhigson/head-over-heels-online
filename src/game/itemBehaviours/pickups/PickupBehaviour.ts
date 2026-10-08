import { type ItemTypeUnion } from "../../../_generated/types/ItemInPlayUnion";
import { itemBehaviourKey, type ItemInPlay } from "../../../model/ItemInPlay";
import { itemInPlayCentre } from "../../../model/itemInPlayCentre";
import {
  isPlayableItem,
  type PlayableItem,
  type UnionOfAllItemInPlayTypes,
} from "../../../model/ItemInPlayNarrowedUnions";
import { type CharacterName } from "../../../model/modelTypes";
import { type RoomState } from "../../../model/RoomState";
import { store } from "../../../store/store";
import { addXyz, boxWithSize, originXyz } from "../../../utils/vectors/vectors";
import { type GameState } from "../../gameState/GameState";
import { defaultBaseState } from "../../gameState/loadRoom/itemDefaultStates";
import { addItemToRoom } from "../../gameState/mutators/addItemToRoom";
import { saveGameThunk } from "../../gameState/saving/saveGameThunk";
import { type ItemTouchEvent } from "../../physics/handleTouch/ItemTouchEvent";
import { blockSizePx } from "../../physics/mechanicsConstants";
import { shadowSmallRound } from "../../render/shadows/shadowCastTextures";
import { getBehaviourForItemTypeAndConfig } from "../attachBehaviourToItem";
import { FreeItemBehaviour } from "../freeItem/FreeItemBehaviour";

/**
 * how long to keep the floating text item in the room?
 * this just has to be long enough that the last line of text
 * is gone
 */
const floatingTextLife = 3_000;

export type PickupGives = ItemInPlay<
  "pickup",
  string,
  string
>["config"]["gives"];

/**
 * a pickup that gives one particular thing
 */
export type PickupThatGives<
  Gives extends PickupGives,
  RoomId extends string,
  RoomItemId extends string,
> = ItemInPlay<"pickup", RoomId, RoomItemId> & { config: { gives: Gives } };

/**
 * the behaviour common to all pickups. Subclasses give what each kind of
 * pickup (by the config's `gives`) gives to the playable that collects it
 */
export abstract class PickupBehaviour extends FreeItemBehaviour {
  constructor() {
    super({
      castsShadowWhileStoodOn: true,
      shadowCastTexture: shadowSmallRound,
      isPortable: true,
    });
  }

  override onTouch<RoomId extends string, RoomItemId extends string>(
    pickup: ItemInPlay<"pickup", RoomId, RoomItemId>,
    e: ItemTouchEvent<RoomId, RoomItemId>,
    isMover: boolean,
  ): void {
    // the playable on the other side of the touch, whichever moved:
    const other = isMover ? e.touchedItem : e.movingItem;
    if (isPlayableItem(other)) {
      this.#collect(pickup, other, e.room, e.gameState);
    }
    super.onTouch(pickup, e, isMover);
  }

  override tickStandingOn<RoomId extends string, RoomItemId extends string>(
    pickup: ItemTypeUnion<"pickup", RoomId, RoomItemId>,
    standingOn: UnionOfAllItemInPlayTypes<RoomId, RoomItemId>,
    room: RoomState<RoomId, RoomItemId>,
    gameState: GameState<RoomId>,
    _deltaMS: number,
  ): void {
    // a pickup standing on (ie, fallen onto) a player:
    if (isPlayableItem(standingOn)) {
      this.#collect(pickup, standingOn, room, gameState);
    }
  }

  /**
   * give the player what this pickup gives. Implementations call
   * {@link markCollected} once the pickup has been collected
   */
  protected abstract giveTo<RoomId extends string, RoomItemId extends string>(
    pickup: ItemInPlay<"pickup", RoomId, RoomItemId>,
    player: PlayableItem<CharacterName, RoomId, RoomItemId>,
    room: RoomState<RoomId, RoomItemId>,
    gameState: GameState<RoomId>,
  ): void;

  /**
   * mark the item as picked up, but only if it is in the room's original list of items Eg,
   * if the item is injected at play-time (by cheats or some other mechanic), there's no point
   * marking it as collected or when it generates again it won't be possible to pick up
   */
  protected markCollected<RoomId extends string, RoomItemId extends string>(
    { id: pickupId }: ItemInPlay<"pickup", RoomId, RoomItemId>,
    {
      id: roomId,
      roomJson: { items: roomJsonItems },
    }: RoomState<RoomId, RoomItemId>,
    gameState: GameState<RoomId>,
  ): void {
    const { pickupsCollected } = gameState;
    if (roomJsonItems[pickupId]) {
      if (pickupsCollected[roomId] === undefined) {
        pickupsCollected[roomId] = {};
      }
      pickupsCollected[roomId][pickupId] = true;
    }

    // probably a good time to save the game:
    store.dispatch(saveGameThunk(gameState));
  }

  /**
   * text floating up from where the pickup was
   */
  protected floatingText<RoomId extends string, RoomItemId extends string>(
    pickup: ItemInPlay<"pickup", RoomId, RoomItemId>,
    { roomTime }: RoomState<RoomId, RoomItemId>,
    textLines: string[],
  ): ItemInPlay<"floatingText", RoomId, RoomItemId> {
    const pickupCentre = itemInPlayCentre(pickup);
    const config = {
      textLines,
      appearanceRoomTime: roomTime,
    };
    return {
      type: "floatingText",
      // floating text animates from its appearanceRoomTime, not the hash (only
      // used to de-synchronise animations), so the hash is irrelevant:
      hash: 0,
      id: `floatingText-${pickup.id}` as RoomItemId,
      state: {
        ...defaultBaseState(),
        // zero-size box:
        box: boxWithSize(
          addXyz(pickupCentre, { z: blockSizePx.z / 2 }),
          originXyz,
        ),
        expires: roomTime + floatingTextLife,
      },
      config,
      [itemBehaviourKey]: getBehaviourForItemTypeAndConfig(
        "floatingText",
        config,
      ),
    };
  }

  /**
   * add text floating up from where the pickup was
   */
  protected addFloatingText<RoomId extends string, RoomItemId extends string>(
    pickup: ItemInPlay<"pickup", RoomId, RoomItemId>,
    room: RoomState<RoomId, RoomItemId>,
    textLines: string[],
  ): void {
    addItemToRoom({ room, item: this.floatingText(pickup, room, textLines) });
  }

  /**
   * a playable touching this pickup collects it
   */
  #collect<RoomId extends string, RoomItemId extends string>(
    pickup: ItemInPlay<"pickup", RoomId, RoomItemId>,
    player: PlayableItem<CharacterName, RoomId, RoomItemId>,
    room: RoomState<RoomId, RoomItemId>,
    gameState: GameState<RoomId>,
  ): void {
    if (gameState.pickupsCollected[room.id]?.[pickup.id] === true) {
      // ignore already picked up items
      return;
    }

    this.giveTo(pickup, player, room, gameState);
  }
}
