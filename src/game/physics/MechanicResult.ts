import type { ItemInPlayType, ItemState } from "@/model/ItemInPlay";
import type { Xyz } from "@/utils/vectors";

export type MechanicResult<T extends ItemInPlayType> = {
  positionDelta?: Partial<Xyz>;
  stateDelta?: Partial<ItemState<T>>;
};

export const unitMechanicalResult = {} satisfies MechanicResult<ItemInPlayType>;
