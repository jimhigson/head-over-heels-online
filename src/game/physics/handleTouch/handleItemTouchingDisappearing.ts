import { spatiallyCheckStandingOn } from "@/game/collision/checkStandingOn";
import type { PlayableItem } from "../itemPredicates";
import { isFreeItem, isPlayableItem } from "../itemPredicates";
import { movingItemIsType, type ItemTouchEvent } from "./ItemTouchEvent";
import { makeItemFadeOut } from "@/game/gameState/mutators/makeItemFadeOut";
import { setStandingOn } from "@/game/gameState/mutators/removeStandingOn";
import { applyMechanicsResults } from "@/game/mainLoop/tickItem";
import type { CharacterName } from "@/model/modelTypes";
import { characterNames } from "@/model/modelTypes";
import { jumping } from "../mechanics/jumping";
import { walking } from "../mechanics/walking";
import type { UnknownItemInPlay } from "@/model/ItemInPlay";

export const handleItemTouchingDissapearing = <RoomId extends string>(
  e: ItemTouchEvent<RoomId>,
) => {
  const spatiallyStandingOn =
    isFreeItem(e.movingItem) &&
    spatiallyCheckStandingOn(
      e.movingItem,
      e.touchedItem,
      Math.abs(e.movementVector.z),
    );

  const shouldDisappear =
    e.touchedItem.state.disappear === "onTouch" ||
    (e.touchedItem.state.disappear === "onTouchByPlayer" &&
      isPlayableItem(e.movingItem)) ||
    (e.touchedItem.state.disappear === "onStand" && spatiallyStandingOn);

  if (shouldDisappear) {
    if (spatiallyStandingOn && movingItemIsType(e, ...characterNames)) {
      //give one last chance to jump off htis item as it disappears - 'stand' on it
      //(but it will be removed very soon and this property will be gone):
      setStandingOn(e.movingItem, e.touchedItem as UnknownItemInPlay<RoomId>);
      const controlMechanicalResults = [
        jumping(
          e.movingItem as PlayableItem<CharacterName, RoomId>,
          e.gameState,
        ),
        // jumping is no use without also walking - eg, heels needs to be able to head forward at the
        // start of a jump or she will come to a stop after a few jumps:
        walking(
          e.movingItem as PlayableItem<CharacterName, RoomId>,
          e.gameState,
          e.deltaMS,
        ),
      ];
      applyMechanicsResults(e.movingItem, controlMechanicalResults);
    }

    makeItemFadeOut(e);
  }
};
