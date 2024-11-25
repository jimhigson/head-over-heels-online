import type { ItemInPlayType, ItemState } from "@/model/ItemInPlay";
import type { Xyz } from "@/utils/vectors/vectors";

export type MechanicsNames = "gravity" | "walking" | "jumping";

export type VelocitiesForItem<T extends ItemInPlayType> =
  string & ItemState<T> extends { vels: { [s in infer M]: Xyz } } ? M : never;

export type MechanicResult<T extends ItemInPlayType> = {
  //positionDelta?: Partial<Xyz>;
  vels?: { [mechanic in VelocitiesForItem<T>]?: Partial<Xyz> };
  stateDelta?: Partial<ItemState<T>>;
};

export const unitMechanicalResult = {} satisfies MechanicResult<ItemInPlayType>;
