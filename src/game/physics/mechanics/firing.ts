import { defaultItemProperties } from "../../../model/defaultItemProperties";
import { type ItemInPlay } from "../../../model/ItemInPlay";
import {
  addPokeableNumbers,
  pokeableToNumber,
} from "../../../model/ItemStateMap";
import { type RoomState } from "../../../model/RoomState";
import { emptyObject } from "../../../utils/empty";
import {
  addXyz,
  boxWithSize,
  originXyz,
  scaleXyz,
  unitVector,
} from "../../../utils/vectors/vectors";
import { smallItemAabb } from "../../collision/boundingBoxes";
import { type GameState } from "../../gameState/GameState";
import { defaultBaseState } from "../../gameState/loadRoom/itemDefaultStates";
import { shadowSmallRound } from "../../gameState/loadRoom/loadItemShadowCast";
import { addItemToRoom } from "../../gameState/mutators/addItemToRoom";
import { type PlayableItem } from "../itemPredicates";
import { blockSizePx, moveSpeedPixPerMs } from "../mechanicsConstants";

/**
 * how far ahead of head the doughnuts start.
 */
const aheadStart = blockSizePx.x * 0.75;

/**
 * if fire is press and held, how long until we next fire?
 */
const autofireRate = 500;

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
    state: { box, facing },
  } = firer;

  const direction = unitVector(facing);

  if (
    inputStateTracker.currentActionPress("fire") !== "released" &&
    hasHooter &&
    pokeableToNumber(doughnuts) > 0
  ) {
    const firedDoughnut: ItemInPlay<"firedDoughnut", RoomId, RoomItemId> = {
      type: "firedDoughnut",
      ...defaultItemProperties,
      // fired doughnuts share one synced animation, so the hash (only used to
      // de-synchronise animations) is irrelevant:
      hash: 0,
      config: emptyObject,
      id: `firedDoughnut/${firer.id}/${room.roomTime}` as RoomItemId,
      shadowCastTexture: shadowSmallRound,
      state: {
        ...defaultBaseState(),
        box: boxWithSize(
          addXyz(
            box,
            scaleXyz(direction, aheadStart),
            firer.type === "headOverHeels" ? { z: blockSizePx.z } : originXyz,
          ),
          smallItemAabb,
        ),
        vels: {
          fired: scaleXyz(direction, moveSpeedPixPerMs.firedDoughnut),
        },
        disappearing: { on: "touch" },
      },
    };

    addItemToRoom({
      room,
      item: firedDoughnut,
    });

    headAbilities.doughnuts = addPokeableNumbers(headAbilities.doughnuts, -1);
    inputStateTracker.inputWasHandled("fire", autofireRate);
  }
};
