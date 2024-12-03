import { isItemType, type ItemInPlay } from "@/model/ItemInPlay";
import type { GameState } from "@/game/gameState/GameState";
import type { PlanetName } from "@/sprites/planets";
import { addXyz } from "@/utils/vectors/vectors";
import { blockSizePx } from "@/sprites/spritePivots";

/**
 * walking, but also gliding and changing direction mid-air
 */
export const carrying = <RoomId extends string>(
  heelsItem: ItemInPlay<"heels", PlanetName, RoomId>,
  { inputState }: GameState<RoomId>,
  _deltaMS: number,
): undefined => {
  const { carry: carryInput } = inputState;
  const {
    state: { carrying, standingOn, position: heelsPosition, hasBag },
  } = heelsItem;

  if (!hasBag) {
    return;
  }

  if (carryInput) {
    if (carrying === null) {
      if (
        standingOn === null ||
        !isItemType("portableBlock", "spring")(standingOn)
      ) {
        return;
      }

      standingOn.state.unsolidAfterProgression = -1;

      heelsItem.state.carrying = standingOn;
      heelsItem.state.standingOn = null;
      standingOn.state.stoodOnBy.clear();
      inputState.carry = false; // handled this input
    } else {
      // trying to put down
      if (heelsItem.state.standingOn === null) {
        // can't put down mid-air
        return;
      }

      carrying.state.position = heelsPosition;
      carrying.state.unsolidAfterProgression = null;
      heelsItem.state.position = addXyz(heelsPosition, {
        x: 0,
        y: 0,
        z: blockSizePx.h,
      });
      heelsItem.state.standingOn = carrying;
      carrying.state.stoodOnBy.add(heelsItem);

      // put down
      heelsItem.state.carrying = null;
      inputState.carry = false; // handled this input
    }
  }
};
