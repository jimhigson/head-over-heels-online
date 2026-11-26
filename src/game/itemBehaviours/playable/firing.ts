import {
  itemBehaviourKey,
  type ItemInPlay,
  type ItemInPlayConfig,
} from "../../../model/itemInPlay/ItemInPlay";
import type { PlayableItem } from "../../../model/itemInPlay/ItemInPlayNarrowedUnions";
import {
  addPokeableNumbers,
  pokeableToNumber,
} from "../../../model/itemInPlay/ItemStateMap";
import type { CharacterName } from "../../../model/modelTypes";
import type { RoomState } from "../../../model/RoomState";
import { unitTimesConfig } from "../../../model/times";
import {
  addXyz,
  boxWithSize,
  originXyz,
  scaleXyz,
  unitVector,
} from "../../../utils/vectors/vectors";
import { smallItemAabb } from "../../collision/boundingBoxes";
import type { GameState } from "../../gameState/GameState";
import { selectHeadAbilities } from "../../gameState/gameStateSelectors/selectPlayableItem";
import { defaultBaseState } from "../../gameState/loadRoom/itemDefaultStates";
import { addItemToRoom } from "../../gameState/mutators/addItemToRoom";
import {
  blockSizePx,
  doughnutsAutofireRate,
  moveSpeedPixPerMs,
} from "../../physics/mechanicsConstants";
import { getBehaviourForItemTypeAndConfig } from "../attachBehaviourToItem";

/**
 * how far ahead of head the doughnuts start.
 */
const aheadStart = blockSizePx.x * 0.75;

export const firing = <RoomId extends string, RoomItemId extends string>(
  firer: PlayableItem<CharacterName, RoomId, RoomItemId>,
  room: RoomState<RoomId, RoomItemId>,
  gameState: GameState<RoomId>,
  _deltaMS: number,
): undefined => {
  const { inputStateTracker } = gameState;

  const fireActionPress = inputStateTracker.currentActionPress("fire");

  const headAbilities = selectHeadAbilities(firer);
  if (headAbilities === undefined) {
    // not a firer:
    if (fireActionPress === "tap") {
      firer.state.abilityFailedToUseAtGameTime = gameState.gameTime;
    }
    return;
  }

  const { doughnuts, hasHooter } = headAbilities;
  const {
    state: { box, facing },
  } = firer;

  const direction = unitVector(facing);

  if (fireActionPress !== "released") {
    const successful = hasHooter && pokeableToNumber(doughnuts) > 0;

    if (!successful) {
      if (fireActionPress === "tap") {
        firer.state.abilityFailedToUseAtGameTime = gameState.gameTime;
      }
      return;
    }

    const firedDoughnut: ItemInPlay<"firedDoughnut", RoomId, RoomItemId> = {
      type: "firedDoughnut",
      // fired doughnuts share one synced animation, so the hash (only used to
      // de-synchronise animations) is irrelevant:
      hash: 0,
      config: unitTimesConfig satisfies ItemInPlayConfig<"firedDoughnut">,
      [itemBehaviourKey]: getBehaviourForItemTypeAndConfig(
        "firedDoughnut",
        unitTimesConfig,
      ),
      id: `firedDoughnut/${firer.id}/${room.roomTime}` as RoomItemId,
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
    inputStateTracker.inputWasHandled("fire", doughnutsAutofireRate);
  }
};
