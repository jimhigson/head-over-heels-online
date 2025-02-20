import { defaultItemProperties } from "../../../model/defaultItemProperties";
import { blockSizePx } from "../../../sprites/spritePivots";
import { emptyObject } from "../../../utils/empty";
import { pick } from "../../../utils/pick";
import { addXyz } from "../../../utils/vectors/vectors";
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

export const uncombinePlayablesFromSymbiosis = <RoomId extends string>(
  headOverHeels: PlayableItem<"headOverHeels", RoomId>,
) => {
  const head: PlayableItem<"head", RoomId> = {
    id: "head",
    type: "head",
    ...defaultItemProperties,
    ...defaultPlayableRootAttributes,
    state: {
      ...defaultBaseState<RoomId>(),
      ...defaultFreeItemState(),
      ...defaultPlayerState(),
      ...headOverHeels.state.head,
      facing: headOverHeels.state.facing,
      position: addXyz(headOverHeels.state.position, { z: blockSizePx.h }),
      switchedToAt: Number.NEGATIVE_INFINITY,
      actedOnAt: headOverHeels.state.actedOnAt,
    },
  };
  const heels: PlayableItem<"heels", RoomId> = {
    id: "heels",
    type: "heels",
    ...defaultItemProperties,
    ...defaultPlayableRootAttributes,
    state: {
      ...defaultBaseState<RoomId>(),
      ...defaultFreeItemState(),
      ...defaultPlayerState(),
      ...headOverHeels.state.heels,
      facing: headOverHeels.state.facing,
      position: addXyz(headOverHeels.state.position),
      switchedToAt: Number.NEGATIVE_INFINITY,
      actedOnAt: headOverHeels.state.actedOnAt,
    },
  };

  return { head, heels };
};

export const combinePlayablesInSymbiosis = <RoomId extends string>({
  head,
  heels,
}: {
  head: PlayableItem<"head", RoomId>;
  heels: PlayableItem<"heels", RoomId>;
}): PlayableItem<"headOverHeels", RoomId> => {
  return {
    type: "headOverHeels",
    id: "headOverHeels",
    ...defaultItemProperties,
    shadowCastTexture: heels.shadowCastTexture,
    config: emptyObject,
    aabb: doubleHeightCharacter,
    state: {
      ...defaultBaseState<RoomId>(),
      ...defaultFreeItemState(),
      ...defaultPlayerState(),
      position: heels.state.position,
      action: "idle",
      jumped: false,
      teleporting: null,
      autoWalk: false,
      facing: heels.state.facing,
      actedOnAt: Math.max(heels.state.actedOnAt, heels.state.actedOnAt),
      head: {
        ...pick(
          head.state,
          "hasHooter",
          "doughnuts",
          "doughnutLastFireTime",
          "fastStepsStartedAtDistance",
          "gameWalkDistance",
          "lives",
          "gameTime",
          "shieldCollectedAt",
          "lastDiedAt",
        ),
        switchedToAt: Number.NEGATIVE_INFINITY,
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
        switchedToAt: Number.NEGATIVE_INFINITY,
      },
    },
  };
};
