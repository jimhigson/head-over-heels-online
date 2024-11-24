import type { ItemInPlayType, ItemState } from "@/model/ItemInPlay";
import type { Xyz } from "@/utils/vectors/vectors";

export type MechanicResult<T extends ItemInPlayType> = {
  // TODO: replace all usages with the velocity delta:
  /**
   * @deprecated
   */
  //positionDelta?: Partial<Xyz>;
  accel?: Partial<Xyz>;
  stateDelta?: Partial<ItemState<T>>;
};

export const unitMechanicalResult = {} satisfies MechanicResult<ItemInPlayType>;
