import type { UnionOfAllItemInPlayTypes } from "../../../model/ItemInPlay";

import { makeItemFadeOut } from "../../gameState/mutators/makeItemFadeOut";
import { removeStandingOn } from "../../gameState/mutators/standingOn/removeStandingOn";
import { setStandingOnWithoutRemovingOldFirst } from "../../gameState/mutators/standingOn/setStandingOn";
import { applyMechanicsResults } from "../../mainLoop/applyMechanicsResults";
import { jumping } from "../mechanics/jumping";
import { walking } from "../mechanics/walking";
import { type ItemTouchEvent, movingItemIsPlayable } from "./ItemTouchEvent";
import { touchTriggersOnStand } from "./touchTriggersOnStand";

// buffer for writing into when we don't need the result
const unusedBuffer = { x: 0, y: 0, z: 0 };

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
    if (
      touchTriggersOnStand(e) &&
      movingItemIsPlayable(e) &&
      // an approx test for if we are landing on top - could
      // jumping off it. Shouldn't be able to jump off something that's not
      // below us
      e.movementVector.z < 0
    ) {
      // before setting standing on, we need to remove any existing standing on
      // to avoid broken two-way linking:
      removeStandingOn(e.movingItem, e.room);
      setStandingOnWithoutRemovingOldFirst({
        above: e.movingItem,
        below: e.touchedItem as UnionOfAllItemInPlayTypes<RoomId>,
      });
      const controlMechanicalResults = [
        jumping(e.movingItem, e.room, e.gameState, e.deltaMS),
        // jumping is no use without also walking - eg, heels needs to be able to head forward at the
        // start of a jump or she will come to a stop after a few jumps:
        walking(e.movingItem, e.room, e.gameState, e.deltaMS),
      ];
      applyMechanicsResults(
        unusedBuffer,
        e.movingItem,
        controlMechanicalResults,
      );
    }

    makeItemFadeOut(e);
  }
};
