import type { ItemInPlay } from "@/model/ItemInPlay";
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
      // trying to pick up
      const pickupableStandingOn = standingOn.find(
        (soI) => soI.type === "portableBlock" || soI.type === "spring",
      );

      if (pickupableStandingOn === undefined) {
        return;
      }

      pickupableStandingOn.state.unsolidAfterProgression = -1;
      pickupableStandingOn.state.position = { x: -1024, y: -1024, z: -1024 };

      heelsItem.state.carrying = pickupableStandingOn;
      inputState.carry = false; // handled this input
    } else {
      carrying.state.position = heelsPosition;
      carrying.state.unsolidAfterProgression = null;
      heelsItem.state.position = addXyz(heelsPosition, {
        x: 0,
        y: 0,
        z: blockSizePx.h,
      });

      // put down
      heelsItem.state.carrying = null;
      inputState.carry = false; // handled this input
    }
  }
};
