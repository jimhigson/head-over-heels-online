import { type ItemInPlay } from "../../../model/ItemInPlay";
import { type PlayableItem } from "../../../model/ItemInPlayNarrowedUnions";
import { addPokeableNumbers } from "../../../model/ItemStateMap";
import { type CharacterName } from "../../../model/modelTypes";
import { type RoomState } from "../../../model/RoomState";
import { type GameState } from "../../gameState/GameState";
import { PickupBehaviour } from "./PickupBehaviour";

export class ExtraLifePickupBehaviour extends PickupBehaviour {
  protected override giveTo<RoomId extends string, RoomItemId extends string>(
    pickup: ItemInPlay<"pickup", RoomId, RoomItemId>,
    player: PlayableItem<CharacterName, RoomId, RoomItemId>,
    room: RoomState<RoomId, RoomItemId>,
    gameState: GameState<RoomId>,
  ): void {
    if (player.type === "headOverHeels") {
      player.state.head.lives = addPokeableNumbers(player.state.head.lives, 2);
      player.state.heels.lives = addPokeableNumbers(
        player.state.heels.lives,
        2,
      );
      this.addFloatingText(pickup, room, ["+2", "LIVES", "EACH"]);
    } else {
      player.state.lives = addPokeableNumbers(player.state.lives, 2);
      this.addFloatingText(pickup, room, ["+2", "LIVES"]);
    }
    this.markCollected(pickup, room, gameState);
  }
}
