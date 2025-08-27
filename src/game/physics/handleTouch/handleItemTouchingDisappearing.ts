import type { UnionOfAllItemInPlayTypes } from "../../../model/ItemInPlay";

import { makeItemFadeOut } from "../../gameState/mutators/makeItemFadeOut";
import { setStandingOn } from "../../gameState/mutators/setStandingOn";
import { applyMechanicsResults } from "../../mainLoop/applyMechanicsResults";
import { jumping } from "../mechanics/jumping";
import { walking } from "../mechanics/walking";
import { type ItemTouchEvent, movingItemIsPlayable } from "./ItemTouchEvent";
import { touchTriggersOnStand } from "./touchTriggersOnStand";

export const handleItemTouchingDissapearing = <
  RoomId extends string,
  RoomItemId extends string,
>(
  e: ItemTouchEvent<RoomId, RoomItemId>,
) => {
  if (
    // TODO: this could probably be replaced with a more generic 'notByType' like 'byType'
    e.touchedItem.type === "firedDoughnut" &&
    (e.movingItem.type === "head" || e.movingItem.type === "firedDoughnut")
  ) {
    // special case - head can't collide with his own doughnuts as he fires them,
    // and the previous doughnut can't collide with the next one
    return;
  }

  const {
    touchedItem: {
      state: { disappearing: disappear },
    },
  } = e;

  const shouldDisappear =
    // needs to have disappearing behaviour:
    disappear !== null &&
    // needs to not care about the type, or be touched by the right type:
    (disappear.byType === undefined ||
      disappear.byType.includes(e.movingItem.type)) &&
    // needs to be either touched, or onStand and stood on:
    (disappear.on === "touch" ||
      (disappear.on === "stand" && touchTriggersOnStand(e)));

  if (shouldDisappear) {
    if (touchTriggersOnStand(e) && movingItemIsPlayable(e)) {
      //give one last chance to jump off this item as it disappears - 'stand' on it
      //(but it will be removed very soon and this property will be gone):
      setStandingOn({
        above: e.movingItem,
        below: e.touchedItem as UnionOfAllItemInPlayTypes<RoomId>,
      });
      const controlMechanicalResults = [
        jumping(e.movingItem, e.room, e.gameState, e.deltaMS),
        // jumping is no use without also walking - eg, heels needs to be able to head forward at the
        // start of a jump or she will come to a stop after a few jumps:
        walking(e.movingItem, e.room, e.gameState, e.deltaMS),
      ];
      applyMechanicsResults(e.movingItem, controlMechanicalResults);
    }

    makeItemFadeOut(e);
  }
};
