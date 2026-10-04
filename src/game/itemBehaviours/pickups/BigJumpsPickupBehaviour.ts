import { type ItemInPlay } from "../../../model/ItemInPlay";
import { type PlayableItem } from "../../../model/ItemInPlayNarrowedUnions";
import { type CharacterName } from "../../../model/modelTypes";
import { type RoomState } from "../../../model/RoomState";
import { type GameState } from "../../gameState/GameState";
import { selectHeelsAbilities } from "../../gameState/gameStateSelectors/selectPlayableItem";
import { PickupBehaviour } from "./PickupBehaviour";

export class BigJumpsPickupBehaviour extends PickupBehaviour {
  protected override giveTo<RoomId extends string, RoomItemId extends string>(
    pickup: ItemInPlay<"pickup", RoomId, RoomItemId>,
    player: PlayableItem<CharacterName, RoomId, RoomItemId>,
    room: RoomState<RoomId, RoomItemId>,
    gameState: GameState<RoomId>,
  ): void {
    const toModify = selectHeelsAbilities(player);
    if (toModify === undefined) {
      return;
    }
    toModify.bigJumps += 10;
    this.addFloatingText(pickup, room, ["♨", "10", "BIG JUMPS"]);
    this.markCollected(pickup, room, gameState);
  }
}
