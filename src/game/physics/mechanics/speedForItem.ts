import type { ItemTypeUnion } from "../../../_generated/types/ItemInPlayUnion";
import type {
  ItemInPlayType,
  UnionOfAllItemInPlayTypes,
} from "../../../model/ItemInPlay";

import { isMonster } from "../itemPredicates";
import { moveSpeedPixPerMs } from "../mechanicsConstants";

/**
 * @returns the speed for the item, if one is defined
 */
export const maybeSpeedForItem = (
  itemWithMovement: UnionOfAllItemInPlayTypes<string, string>,
): number | undefined => {
  if (isMonster(itemWithMovement)) {
    return moveSpeedPixPerMs[itemWithMovement.config.which];
  } else {
    return (moveSpeedPixPerMs as { [i in ItemInPlayType]?: number })[
      itemWithMovement.type
    ];
  }
};

/**
 * like maybeSpeedForItem, but only accepts items that have movement speed defined,
 * so never returns undefined
 *
 * @returns the speed for the item
 */
export const speedForItem = (
  itemWithMovement: ItemTypeUnion<
    "monster" | (ItemInPlayType & keyof typeof moveSpeedPixPerMs),
    string,
    string
  >,
): number => {
  if (isMonster(itemWithMovement)) {
    return moveSpeedPixPerMs[itemWithMovement.config.which];
  } else {
    return moveSpeedPixPerMs[itemWithMovement.type];
  }
};
