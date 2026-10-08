import { type ItemInPlay } from "../../../model/ItemInPlay";
import { type PlayableItem } from "../../../model/ItemInPlayNarrowedUnions";
import { type CharacterName } from "../../../model/modelTypes";
import { type RoomState } from "../../../model/RoomState";
import { type GameState } from "../../gameState/GameState";
import { selectHeadAbilities } from "../../gameState/gameStateSelectors/selectPlayableItem";
import { PickupBehaviour } from "./PickupBehaviour";

export class HooterPickupBehaviour extends PickupBehaviour {
  protected override giveTo<RoomId extends string, RoomItemId extends string>(
    pickup: ItemInPlay<"pickup", RoomId, RoomItemId>,
    player: PlayableItem<CharacterName, RoomId, RoomItemId>,
    room: RoomState<RoomId, RoomItemId>,
    gameState: GameState<RoomId>,
  ): void {
    const toModify = selectHeadAbilities(player);
    if (toModify === undefined) {
      return;
    }
    toModify.hasHooter = true;
    this.addFloatingText(pickup, room, ["HOOTER", "COLLECTED"]);
    this.markCollected(pickup, room, gameState);
  }
}
