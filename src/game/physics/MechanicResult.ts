import type { ItemInPlayType, ItemState } from "@/model/ItemInPlay";
import type { Xyz } from "@/utils/vectors/vectors";

export type MechanicsNames = "gravity" | "walking" | "jumping";

export type VelocitiesForItem<T extends ItemInPlayType> =
  string & ItemState<T, string> extends { vels: { [s in infer M]: Xyz } } ? M
  : never;

export type MechanicResult<T extends ItemInPlayType, RoomId extends string> =
  | {
      movementType: "endTick";
      stateDelta?: Partial<ItemState<T, RoomId>>;
    }
  | {
      // velocity is unchanged by this result
      movementType: "steady";
      stateDelta?: Partial<ItemState<T, RoomId>>;
    }
  | {
      movementType: "vel";
      vels: { [mechanic in VelocitiesForItem<T>]?: Partial<Xyz> };
      stateDelta?: Partial<ItemState<T, RoomId>>;
    }
  | {
      movementType: "position";
      posDelta: Partial<Xyz>;
      stateDelta?: Partial<ItemState<T, RoomId>>;
    };

export const unitMechanicalResult = {
  movementType: "steady",
} as const satisfies MechanicResult<ItemInPlayType, string>;
