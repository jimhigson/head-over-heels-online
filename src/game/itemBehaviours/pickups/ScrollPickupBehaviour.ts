import { type PlayableItem } from "../../../model/ItemInPlayNarrowedUnions";
import { type CharacterName } from "../../../model/modelTypes";
import { type RoomState } from "../../../model/RoomState";
import { scrollRead } from "../../../store/slices/gameInPlay/gameInPlaySlice";
import { store } from "../../../store/store";
import { type GameState } from "../../gameState/GameState";
import { shadowScroll } from "../../render/shadows/shadowCastTextures";
import { PickupBehaviour, type PickupThatGives } from "./PickupBehaviour";

export class ScrollPickupBehaviour extends PickupBehaviour {
  /**
   * can't jump off of scrolls - the jump after reading is jarring
   */
  override isJumpOffable(): boolean {
    return false;
  }

  override shadowCastTexture() {
    return shadowScroll;
  }

  /**
   * the scroll is the one box-shaped pickup; the rest have rounded silhouettes
   */
  override isCuboidWarped(): boolean {
    return true;
  }

  protected override giveTo<RoomId extends string, RoomItemId extends string>(
    scroll: PickupThatGives<"scroll", RoomId, RoomItemId>,
    _player: PlayableItem<CharacterName, RoomId, RoomItemId>,
    room: RoomState<RoomId, RoomItemId>,
    gameState: GameState<RoomId>,
  ): void {
    // avoid the scroll being closed right away if the player already has jump held:
    store.dispatch(scrollRead(scroll.config));
    this.markCollected(scroll, room, gameState);
  }
}
