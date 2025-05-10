import { defaultItemProperties } from "../../../model/defaultItemProperties";
import { blockSizePx } from "../../../sprites/spritePivots";
import { emptyObject } from "../../../utils/empty";
import { pick } from "../../../utils/pick";
import { addXyz } from "../../../utils/vectors/vectors";
import { neverTime } from "../../../utils/veryClose";
import { doubleHeightCharacter } from "../../collision/boundingBoxes";
import type { PlayableItem } from "../../physics/itemPredicates";
import {
  defaultBaseState,
  defaultFreeItemState,
} from "../loadRoom/itemDefaultStates";
import {
  defaultPlayableRootAttributes,
  defaultPlayerState,
} from "../loadRoom/loadPlayer";

export const uncombinePlayablesFromSymbiosis = <
  RoomId extends string,
  RoomItemId extends string,
>(
  headOverHeels: PlayableItem<"headOverHeels", RoomId, RoomItemId>,
) => {
  const head: PlayableItem<"head", RoomId, RoomItemId> = {
    // TODO: remove cast with known ids
    id: "head" as RoomItemId,
    type: "head",
    ...defaultItemProperties,
    ...defaultPlayableRootAttributes,
    state: {
      ...defaultBaseState<RoomItemId>(),
      ...defaultFreeItemState(),
      ...defaultPlayerState(),
      ...headOverHeels.state.head,
      facing: headOverHeels.state.facing,
      position: addXyz(headOverHeels.state.position, { z: blockSizePx.h }),
      switchedToAt: neverTime,
      actedOnAt: headOverHeels.state.actedOnAt,
      collidedWith: headOverHeels.state.collidedWith,
      stoodOnUntilRoomTime: headOverHeels.state.stoodOnUntilRoomTime,
    },
  };
  const heels: PlayableItem<"heels", RoomId, RoomItemId> = {
    // TODO: remove cast with known ids
    id: "heels" as RoomItemId,
    type: "heels",
    ...defaultItemProperties,
    ...defaultPlayableRootAttributes,
    state: {
      ...defaultBaseState<RoomItemId>(),
      ...defaultFreeItemState(),
      ...defaultPlayerState(),
      ...headOverHeels.state.heels,
      facing: headOverHeels.state.facing,
      position: addXyz(headOverHeels.state.position),
      switchedToAt: neverTime,
      actedOnAt: headOverHeels.state.actedOnAt,
      collidedWith: headOverHeels.state.collidedWith,
      stoodOnUntilRoomTime: headOverHeels.state.stoodOnUntilRoomTime,
      isBigJump: false,
    },
  };

  return { head, heels };
};

export const combinePlayablesInSymbiosis = <
  RoomId extends string,
  RoomItemId extends string,
>({
  head,
  heels,
}: {
  head: PlayableItem<"head", RoomId, RoomItemId>;
  heels: PlayableItem<"heels", RoomId, RoomItemId>;
}): PlayableItem<"headOverHeels", RoomId, RoomItemId> => {
  return {
    // TODO: remove cast with known ids
    id: "headOverHeels" as RoomItemId,
    type: "headOverHeels",
    ...defaultItemProperties,
    shadowCastTexture: heels.shadowCastTexture,
    config: emptyObject,
    aabb: doubleHeightCharacter,
    state: {
      ...defaultBaseState<RoomItemId>(),
      ...defaultFreeItemState(),
      ...defaultPlayerState(),
      position: heels.state.position,
      action: "idle",
      jumped: false,
      teleporting: null,
      autoWalk: false,
      facing: heels.state.facing,
      actedOnAt:
        heels.state.actedOnAt.roomTime > head.state.actedOnAt.roomTime ?
          heels.state.actedOnAt
        : head.state.actedOnAt,
      collidedWith:
        heels.state.collidedWith.roomTime > head.state.collidedWith.roomTime ?
          heels.state.collidedWith
        : head.state.collidedWith,
      stoodOnUntilRoomTime: heels.state.stoodOnUntilRoomTime,
      head: {
        ...pick(
          head.state,
          "hasHooter",
          "doughnuts",
          "fastStepsStartedAtDistance",
          "gameWalkDistance",
          "lives",
          "gameTime",
          "shieldCollectedAt",
          "lastDiedAt",
        ),
        switchedToAt: neverTime,
      },
      heels: {
        ...pick(
          heels.state,
          "hasBag",
          "bigJumps",
          "carrying",
          "lives",
          "gameTime",
          "shieldCollectedAt",
          "lastDiedAt",
        ),
        switchedToAt: neverTime,
      },
    },
  };
};
