import { defaultItemProperties } from "../../../model/defaultItemProperties";
import type { ItemInPlay } from "../../../model/ItemInPlay";
import type { StoodOnBy } from "src/model/StoodOnBy";
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
import { maxDoughnutFireRate, moveSpeedPixPerMs } from "../mechanicsConstants";
import {
  addPokeableNumbers,
  pokeableToNumber,
} from "../../../model/ItemStateMap";

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

  const { doughnuts, hasHooter, doughnutLastFireTime, gameTime } =
    headAbilities;
  const {
    state: { position, facing },
  } = firer;

  const direction = unitVector(facing);

  if (
    inputStateTracker.currentActionPress("fire") === "tap" &&
    hasHooter &&
    pokeableToNumber(doughnuts) > 0 &&
    doughnutLastFireTime + maxDoughnutFireRate < gameTime
  ) {
    const firedDoughnut: ItemInPlay<"firedDoughnut", RoomId, RoomItemId> = {
      type: "firedDoughnut",
      ...defaultItemProperties,
      config: emptyObject,
      id: `firedDoughnut/${gameState.progression}` as RoomItemId,
      shadowCastTexture: "shadow.smallRound",
      state: {
        position: addXyz(
          position,
          scaleXyz(direction, aheadStart),
          firer.type === "headOverHeels" ? { z: blockSizePx.h } : originXyz,
        ),
        vels: {
          fired: scaleXyz(direction, moveSpeedPixPerMs.firedDoughnut),
        },
        disappear: "onTouch",
        expires: null,
        stoodOnBy: {} as StoodOnBy<RoomItemId>,
      },
    };

    addItemToRoom({
      room,
      item: firedDoughnut,
    });

    headAbilities.doughnuts = addPokeableNumbers(headAbilities.doughnuts, -1);
    headAbilities.doughnutLastFireTime = headAbilities.gameTime;
  }
};
