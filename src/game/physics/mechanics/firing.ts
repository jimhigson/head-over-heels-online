import { addItemToRoom } from "@/game/gameState/mutators/addItemToRoom";
import { type PlayableItem } from "../itemPredicates";
import { type GameState } from "@/game/gameState/GameState";
import type { RoomState } from "@/model/modelTypes";
import type { PlanetName } from "@/sprites/planets";
import type { ItemInPlay } from "@/model/ItemInPlay";
import { defaultItemProperties } from "@/model/defaultItemProperties";
import { emptyObject } from "@/utils/empty";
import { addXyz, originXyz, scaleXyz } from "@/utils/vectors/vectors";
import { unitVectors } from "@/utils/vectors/unitVectors";
import { moveSpeedPixPerMs } from "../mechanicsConstants";
import { blockSizePx } from "@/sprites/spritePivots";

export const firing = <RoomId extends string>(
  firer: PlayableItem<"head" | "headOverHeels", RoomId>,
  room: RoomState<PlanetName, RoomId>,
  gameState: GameState<RoomId>,
  _deltaMS: number,
): undefined => {
  const {
    inputState: { fire: fireInput },
  } = gameState;

  const headAbilities = firer.type === "head" ? firer.state : firer.state.head;

  const { donuts, hasHooter, donutLastFireTime, gameTime } = headAbilities;
  const {
    state: { position, facing },
  } = firer;

  const maxFireRate = 500;

  if (
    fireInput &&
    hasHooter &&
    donuts > 0 &&
    donutLastFireTime + maxFireRate < gameTime
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
          firer.type === "headOverHeels" ? { z: blockSizePx.h } : originXyz,
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

    headAbilities.donuts -= 1;
    headAbilities.donutLastFireTime = headAbilities.gameTime;

    gameState.inputState.fire = false; //handled this input
  }
};
