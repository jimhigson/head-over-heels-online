import { ItemInPlayType, ItemState } from "@/model/ItemInPlay";
import { originXyz, Xyz } from "@/utils/vectors";

export type MechanicResult<T extends ItemInPlayType> = {
  positionDelta: Partial<Xyz>;
  stateDelta: Partial<ItemState<T>>;
};

export const unitMechanicalResult: MechanicResult<ItemInPlayType> = {
  positionDelta: originXyz,
  stateDelta: {},
};
