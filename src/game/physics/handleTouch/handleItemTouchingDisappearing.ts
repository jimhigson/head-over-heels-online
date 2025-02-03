import { isPlayableItem } from "../itemPredicates";
import { movingItemIsPlayable, type ItemTouchEvent } from "./ItemTouchEvent";
import { jumping } from "../mechanics/jumping";
import { walking } from "../mechanics/walking";
import { touchTriggersOnStand } from "./touchTriggersOnStand";
import type { UnknownItemInPlay } from "../../../model/ItemInPlay";
import { makeItemFadeOut } from "../../gameState/mutators/makeItemFadeOut";
import { setStandingOn } from "../../gameState/mutators/modifyStandingOn";
import { applyMechanicsResults } from "src/game/mainLoop/applyMechanicsResults";

export const handleItemTouchingDissapearing = <RoomId extends string>(
  e: ItemTouchEvent<RoomId>,
) => {
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
        below: e.touchedItem as UnknownItemInPlay<RoomId>,
      });
      const controlMechanicalResults = [
        jumping(e.movingItem, e.gameState),
        // jumping is no use without also walking - eg, heels needs to be able to head forward at the
        // start of a jump or she will come to a stop after a few jumps:
        walking(e.movingItem, e.gameState, e.deltaMS),
      ];
      applyMechanicsResults(e.movingItem, controlMechanicalResults);
    }

    makeItemFadeOut(e);
  }
};
