import type { ItemTypeUnion } from "../../_generated/types/ItemInPlayUnion";
import type { ItemInPlayType } from "../../model/ItemInPlay";
import type { ItemState } from "../../model/ItemState";
import type { RoomState } from "../../model/RoomState";
import type { Xyz } from "../../utils/vectors/vectors";
import type { GameState } from "../gameState/GameState";

export type Mechanic<T extends ItemInPlayType> = <
  RoomId extends string,
  RoomItemId extends string,
>(
  item: ItemTypeUnion<T, RoomId, RoomItemId>,
  room: RoomState<RoomId, RoomItemId>,
  gameState: GameState<RoomId>,
  deltaMS: number,
) => MechanicResult<T, RoomId, RoomItemId>;

export type MechanicsNames = "gravity" | "jumping" | "walking";

export type VelocitiesForItem<T extends ItemInPlayType> =
  string & ItemState<T, string, string> extends (
    { vels: { [s in infer M]: Xyz } }
  ) ?
    M
  : never;

export type MechanicResult<
  T extends ItemInPlayType,
  RoomId extends string,
  RoomItemId extends string,
> =
  | {
      // a position delta
      movementType: "position";
      posDelta: Partial<Xyz>;
      stateDelta?: Partial<ItemState<T, RoomId, RoomItemId>>;
    }
  | {
      // velocity has changed
      movementType: "vel";
      vels: { [mechanic in VelocitiesForItem<T>]?: Xyz };
      stateDelta?: Partial<ItemState<T, RoomId, RoomItemId>>;
    }
  | {
      // velocity is unchanged by this result - keep moving as you were
      movementType: "steady";
      stateDelta?: Partial<ItemState<T, RoomId, RoomItemId>>;
    };

export const unitMechanicalResult = {
  movementType: "steady",
} as const satisfies MechanicResult<ItemInPlayType, string, string>;
