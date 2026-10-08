import { type ItemInPlay } from "../../../model/ItemInPlay";
import { type PlayableItem } from "../../../model/ItemInPlayNarrowedUnions";
import { type CharacterName } from "../../../model/modelTypes";
import { type RoomState } from "../../../model/RoomState";
import { type GameState } from "../../gameState/GameState";
import { PickupBehaviour } from "./PickupBehaviour";

export class ShieldPickupBehaviour extends PickupBehaviour {
  protected override giveTo<RoomId extends string, RoomItemId extends string>(
    pickup: ItemInPlay<"pickup", RoomId, RoomItemId>,
    player: PlayableItem<CharacterName, RoomId, RoomItemId>,
    room: RoomState<RoomId, RoomItemId>,
    gameState: GameState<RoomId>,
  ): void {
    if (player.type === "headOverHeels") {
      player.state.head.shieldCollectedAt = player.state.head.gameTime;
      player.state.heels.shieldCollectedAt = player.state.heels.gameTime;
    } else {
      player.state.shieldCollectedAt = player.state.gameTime;
    }
    this.addFloatingText(pickup, room, ["🛡", "SHIELD"]);
    this.markCollected(pickup, room, gameState);
  }
}
