import { type PlayableItem } from "../../../model/ItemInPlayNarrowedUnions";
import { type CharacterName } from "../../../model/modelTypes";
import { type RoomState } from "../../../model/RoomState";
import { crownCollected } from "../../../store/slices/gameInPlay/gameInPlaySlice";
import { store } from "../../../store/store";
import { type GameState } from "../../gameState/GameState";
import { addParticlesAroundCrown } from "../../mainLoop/addParticlesToRoom";
import { PickupBehaviour, type PickupThatGives } from "./PickupBehaviour";

export class CrownPickupBehaviour extends PickupBehaviour {
  override afterMechanicsApplied<
    RoomId extends string,
    RoomItemId extends string,
  >(
    crown: PickupThatGives<"crown", RoomId, RoomItemId>,
    room: RoomState<RoomId, RoomItemId>,
    deltaMS: number,
  ): void {
    addParticlesAroundCrown(room, crown, deltaMS);
  }

  protected override giveTo<RoomId extends string, RoomItemId extends string>(
    crown: PickupThatGives<"crown", RoomId, RoomItemId>,
    _player: PlayableItem<CharacterName, RoomId, RoomItemId>,
    room: RoomState<RoomId, RoomItemId>,
    gameState: GameState<RoomId>,
  ): void {
    const { planet } = crown.config;
    // a little experiment- let's go straight to the store, even though
    // we're in the game engine:
    store.dispatch(crownCollected(planet));
    this.addFloatingText(crown, room, [planet.toUpperCase(), "LIBERATED!"]);
    this.markCollected(crown, room, gameState);
  }
}
