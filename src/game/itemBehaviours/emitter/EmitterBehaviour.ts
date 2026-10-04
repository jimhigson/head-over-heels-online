import { type ItemTypeUnion } from "../../../_generated/types/ItemInPlayUnion";
import { type ItemInPlayType } from "../../../model/ItemInPlay";
import { type RoomState } from "../../../model/RoomState";
import { type GameState } from "../../gameState/GameState";
import { type MechanicResult } from "../../physics/MechanicResult";
import { nonRenderingItemFixedZIndex } from "../../render/sortZ/fixedZIndexes";
import { NonSolidBehaviour } from "../NonSolidBehaviour";
import { emitting } from "./emitting";

export class EmitterBehaviour extends NonSolidBehaviour {
  constructor() {
    super({
      fixedZIndex: nonRenderingItemFixedZIndex,
    });
  }

  override mechanicResults<RoomId extends string, RoomItemId extends string>(
    emitter: ItemTypeUnion<"emitter", RoomId, RoomItemId>,
    room: RoomState<RoomId, RoomItemId>,
    gameState: GameState<RoomId>,
    deltaMS: number,
    _into: Array<MechanicResult<ItemInPlayType, RoomId, RoomItemId>>,
  ): void {
    emitting(emitter, room, gameState, deltaMS);
  }
}
