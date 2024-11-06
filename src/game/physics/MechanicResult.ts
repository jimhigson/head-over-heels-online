import { ItemInPlayType, ItemState } from "@/model/ItemInPlay";
import { Xyz } from "@/utils/vectors";

export type MechanicResult<T extends ItemInPlayType> = {
  positionDelta?: Partial<Xyz>;
  stateDelta?: Partial<ItemState<T>>;
};

export const unitMechanicalResult = {
  stateDelta: {},
} satisfies MechanicResult<ItemInPlayType>;
