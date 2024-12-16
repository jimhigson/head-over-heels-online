import { addItemToRoom } from "@/game/gameState/mutators/addItemToRoom";
import { type PlayableItem } from "../itemPredicates";
import { type GameState } from "@/game/gameState/GameState";
import type { RoomState } from "@/model/modelTypes";
import type { PlanetName } from "@/sprites/planets";
import type { ItemInPlay } from "@/model/ItemInPlay";
import { defaultItemProperties } from "@/model/defaultItemProperties";
import { emptyObject } from "@/utils/empty";
import { addXyz, scaleXyz } from "@/utils/vectors/vectors";
import { unitVectors } from "@/utils/vectors/unitVectors";
import { moveSpeedPixPerMs } from "../mechanicsConstants";
import { blockSizePx } from "@/sprites/spritePivots";

export const firing = <RoomId extends string>(
  headItem: PlayableItem<"head">,
  room: RoomState<PlanetName, RoomId>,
  gameState: GameState<RoomId>,
  _deltaMS: number,
): undefined => {
  const {
    inputState: { fire: fireInput },
  } = gameState;
  const {
    state: { donuts, hasHooter, position, facing, donutLastFireTime },
  } = headItem;

  const maxFireRate = 500;

  if (
    fireInput &&
    hasHooter &&
    donuts > 0 &&
    donutLastFireTime + maxFireRate < gameState.gameTime
  ) {
    const firedDonut: ItemInPlay<"firedDonut", PlanetName, RoomId> = {
      type: "firedDonut",
      ...defaultItemProperties,
      config: emptyObject,
      id: `firedDonut/${gameState.progression}`,
      shadowCastTexture: "shadow.smallRound",
      state: {
        position: addXyz(
          position,
          scaleXyz(unitVectors[facing], blockSizePx.w),
        ),
        vels: {
          fired: scaleXyz(unitVectors[facing], moveSpeedPixPerMs.firedDonut),
        },
        disappear: "onTouch",
        expires: null,
        stoodOnBy: new Set(),
      },
    };

    addItemToRoom({
      room,
      item: firedDonut,
    });

    headItem.state.donuts -= 1;
    headItem.state.donutLastFireTime = gameState.gameTime;

    gameState.inputState.fire = false; //handled this input
  }
};
