import { type ItemInPlay } from "../../../model/ItemInPlay";
import { type PlayableItem } from "../../../model/ItemInPlayNarrowedUnions";
import { type CharacterName } from "../../../model/modelTypes";
import { type RoomState } from "../../../model/RoomState";
import { reincarnationFishEaten } from "../../../store/slices/gameInPlay/gameInPlaySlice";
import { store } from "../../../store/store";
import { type GameState } from "../../gameState/GameState";
import { createSavedGame } from "../../gameState/saving/createSavedGame";
import { PickupBehaviour } from "./PickupBehaviour";

/**
 * alive fish - eating one saves a reincarnation point
 */
export class ReincarnationPickupBehaviour extends PickupBehaviour {
  protected override giveTo<RoomId extends string, RoomItemId extends string>(
    pickup: ItemInPlay<"pickup", RoomId, RoomItemId>,
    player: PlayableItem<CharacterName, RoomId, RoomItemId>,
    room: RoomState<RoomId, RoomItemId>,
    gameState: GameState<RoomId>,
  ): void {
    // mark as collected before creating the save, so it is also collected in the saved game
    this.markCollected(pickup, room, gameState);

    const savedGame = createSavedGame(gameState, store.getState(), {
      characterPickingUp: player.type,
      pickupId: pickup.id,
    });

    // add text into the saved version of the room for when it is restored:
    // note there could be multiple copies of the room in the saved game:
    for (const savedRoom of Object.values(savedGame.gameState.characterRooms)) {
      if (savedRoom.id === room.id) {
        const floatingText = this.floatingText(pickup, room, [
          "REINCARNATION",
          "POINT",
          "RESTORED",
        ]);
        // saved games are unindexed, so add the 'restored' version directly
        // to the room:
        savedRoom.items[floatingText.id] = floatingText;
      }
    }

    store.dispatch(reincarnationFishEaten(savedGame));
    // adding the floating text after saving the reincarnation point means the text won't be
    // in the reloaded room
    this.addFloatingText(pickup, room, ["REINCARNATION", "POINT", "SAVED"]);
  }
}
