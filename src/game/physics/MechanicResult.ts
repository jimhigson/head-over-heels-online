import { ItemInPlayType, ItemState } from "@/model/ItemInPlay";
import { originXyz, Xyz } from "@/utils/vectors";

export type MechanicResult<T extends ItemInPlayType> = {
  positionDelta: Partial<Xyz>;
  stateDelta: Partial<ItemState<T>>;
};

export const unitMechanicalResult = {
  positionDelta: originXyz,
  stateDelta: {},
} satisfies MechanicResult<ItemInPlayType>;
