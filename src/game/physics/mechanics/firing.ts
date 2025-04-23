import { defaultItemProperties } from "../../../model/defaultItemProperties";
import type { ItemInPlay } from "../../../model/ItemInPlay";
import type { RoomState } from "../../../model/RoomState";
import { blockSizePx } from "../../../sprites/spritePivots";
import { emptyObject } from "../../../utils/empty";
import {
  addXyz,
  scaleXyz,
  originXyz,
  unitVector,
} from "../../../utils/vectors/vectors";
import type { GameState } from "../../gameState/GameState";
import { addItemToRoom } from "../../gameState/mutators/addItemToRoom";
import { type PlayableItem } from "../itemPredicates";
import { moveSpeedPixPerMs } from "../mechanicsConstants";
import {
  addPokeableNumbers,
  pokeableToNumber,
} from "../../../model/ItemStateMap";
import { defaultBaseState } from "../../gameState/loadRoom/itemDefaultStates";

/**
 * how far ahead of head the doughnuts start. This has to be enough to clear his bounding box,
 * even when shooting them diagonally
 */
const aheadStart = blockSizePx.w * 0.8;

export const firing = <RoomId extends string, RoomItemId extends string>(
  firer: PlayableItem<"head" | "headOverHeels", RoomId, RoomItemId>,
  room: RoomState<RoomId, RoomItemId>,
  gameState: GameState<RoomId>,
  _deltaMS: number,
): undefined => {
  const { inputStateTracker } = gameState;

  const headAbilities = firer.type === "head" ? firer.state : firer.state.head;

  const { doughnuts, hasHooter } = headAbilities;
  const {
    state: { position, facing },
  } = firer;

  const direction = unitVector(facing);

  if (
    inputStateTracker.currentActionPress("fire") === "tap" &&
    hasHooter &&
    pokeableToNumber(doughnuts) > 0
  ) {
    // TODO: this would be less duplicative if it loaded from json - when firing
    // was originally added to the game, loading fired doughnuts from json
    // wasn't supported
    const firedDoughnut: ItemInPlay<"firedDoughnut", RoomId, RoomItemId> = {
      type: "firedDoughnut",
      ...defaultItemProperties,
      config: emptyObject,
      id: `firedDoughnut/${gameState.progression}` as RoomItemId,
      shadowCastTexture: "shadow.smallRound",
      state: {
        ...defaultBaseState(),
        position: addXyz(
          position,
          scaleXyz(direction, aheadStart),
          firer.type === "headOverHeels" ? { z: blockSizePx.h } : originXyz,
        ),
        vels: {
          fired: scaleXyz(direction, moveSpeedPixPerMs.firedDoughnut),
        },
        disappear: "onTouch",
      },
    };

    addItemToRoom({
      room,
      item: firedDoughnut,
    });

    headAbilities.doughnuts = addPokeableNumbers(headAbilities.doughnuts, -1);
    inputStateTracker.actionsHandled.add("fire");
  }
};
