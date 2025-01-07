import { addItemToRoom } from "@/game/gameState/mutators/addItemToRoom";
import { type PlayableItem } from "../itemPredicates";
import { type GameState } from "@/game/gameState/GameState";
import type { RoomState } from "@/model/modelTypes";
import type { SceneryName } from "@/sprites/planets";
import type { ItemInPlay } from "@/model/ItemInPlay";
import { defaultItemProperties } from "@/model/defaultItemProperties";
import { emptyObject } from "@/utils/empty";
import { addXyz, originXyz, scaleXyz } from "@/utils/vectors/vectors";
import { moveSpeedPixPerMs } from "../mechanicsConstants";
import { blockSizePx } from "@/sprites/spritePivots";

export const firing = <RoomId extends string>(
  firer: PlayableItem<"head" | "headOverHeels", RoomId>,
  room: RoomState<SceneryName, RoomId>,
  gameState: GameState<RoomId>,
  _deltaMS: number,
): undefined => {
  const {
    inputState: { fire: fireInput },
  } = gameState;

  const headAbilities = firer.type === "head" ? firer.state : firer.state.head;

  const { doughnuts, hasHooter, doughnutLastFireTime, gameTime } =
    headAbilities;
  const {
    state: { position, facing },
  } = firer;

  const maxFireRate = 500;

  if (
    fireInput &&
    hasHooter &&
    doughnuts > 0 &&
    doughnutLastFireTime + maxFireRate < gameTime
  ) {
    const firedDoughnut: ItemInPlay<"firedDoughnut", SceneryName, RoomId> = {
      type: "firedDoughnut",
      ...defaultItemProperties,
      config: emptyObject,
      id: `firedDoughnut/${gameState.progression}`,
      shadowCastTexture: "shadow.smallRound",
      state: {
        position: addXyz(
          position,
          scaleXyz(facing, blockSizePx.w),
          firer.type === "headOverHeels" ? { z: blockSizePx.h } : originXyz,
        ),
        vels: {
          fired: scaleXyz(facing, moveSpeedPixPerMs.firedDoughnut),
        },
        disappear: "onTouch",
        expires: null,
        stoodOnBy: new Set(),
      },
    };

    addItemToRoom({
      room,
      item: firedDoughnut,
    });

    headAbilities.doughnuts -= 1;
    headAbilities.doughnutLastFireTime = headAbilities.gameTime;

    gameState.inputState.fire = false; //handled this input
  }
};
