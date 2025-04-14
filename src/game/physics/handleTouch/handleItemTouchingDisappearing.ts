import { isPlayableItem } from "../itemPredicates";
import { movingItemIsPlayable, type ItemTouchEvent } from "./ItemTouchEvent";
import { jumping } from "../mechanics/jumping";
import { walking } from "../mechanics/walking";
import { touchTriggersOnStand } from "./touchTriggersOnStand";
import type { UnionOfAllItemInPlayTypes } from "../../../model/ItemInPlay";
import { makeItemFadeOut } from "../../gameState/mutators/makeItemFadeOut";
import { setStandingOn } from "../../gameState/mutators/modifyStandingOn";
import { applyMechanicsResults } from "../../mainLoop/applyMechanicsResults";

export const handleItemTouchingDissapearing = <
  RoomId extends string,
  RoomItemId extends string,
>(
  e: ItemTouchEvent<RoomId, RoomItemId>,
) => {
  if (
    e.touchedItem.type === "firedDoughnut" &&
    (e.movingItem.type === "head" || e.movingItem.type === "firedDoughnut")
  ) {
    // special case - head can't collide with his own doughnuts as he fires them,
    // and the previous doughnut can't collide with the next one
    return;
  }

  const shouldDisappear =
    e.touchedItem.state.disappear === "onTouch" ||
    (e.touchedItem.state.disappear === "onTouchByPlayer" &&
      isPlayableItem(e.movingItem)) ||
    (e.touchedItem.state.disappear === "onStand" && touchTriggersOnStand(e));

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
