import type { ItemInPlay } from "../../../model/ItemInPlay";
import type { RoomState } from "../../../model/RoomState";
import type { GameState } from "../../gameState/GameState";
import type { CreateSpriteOptions } from "../../render/createSprite";

import { defaultItemProperties } from "../../../model/defaultItemProperties";
import {
  addPokeableNumbers,
  pokeableToNumber,
} from "../../../model/ItemStateMap";
import { emptyObject } from "../../../utils/empty";
import {
  addXyz,
  originXyz,
  scaleXyz,
  unitVector,
} from "../../../utils/vectors/vectors";
import { defaultBaseState } from "../../gameState/loadRoom/itemDefaultStates";
import { addItemToRoom } from "../../gameState/mutators/addItemToRoom";
import { type PlayableItem } from "../itemPredicates";
import { blockSizePx } from "../mechanicsConstants";
import { moveSpeedPixPerMs } from "../mechanicsConstants";

const shadowSmallRound: CreateSpriteOptions = Object.freeze({
  textureId: "shadow.smallRound",
  spritesheetVariant: "original",
});

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
    state: { position, facing },
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
      config: emptyObject,
      id: `firedDoughnut/${firer.id}/${room.roomTime}` as RoomItemId,
      shadowCastTexture: shadowSmallRound,
      state: {
        ...defaultBaseState(),
        position: addXyz(
          position,
          scaleXyz(direction, aheadStart),
          firer.type === "headOverHeels" ? { z: blockSizePx.z } : originXyz,
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
