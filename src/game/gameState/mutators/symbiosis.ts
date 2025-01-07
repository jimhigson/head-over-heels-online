import type { PlayableItem } from "@/game/physics/itemPredicates";
import { defaultItemProperties } from "@/model/defaultItemProperties";
import { blockSizePx } from "@/sprites/spritePivots";
import { addXyz } from "@/utils/vectors/vectors";
import { defaultBaseState, defaultFreeItemState } from "../loadRoom/loadItem";
import {
  defaultPlayableRootAttributes,
  defaultPlayerState,
} from "../loadRoom/loadPlayer";
import { doubleHeightCharacter } from "@/game/collision/boundingBoxes";
import { emptyObject } from "@/utils/empty";
import { pick } from "@/utils/pick";

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
      head: {
        ...pick(
          head.state,
          "hasHooter",
          "doughnuts",
          "doughnutLastFireTime",
          "fastStepsStartedAtDistance",
          "totalWalkDistance",
          "lives",
          "gameTime",
          "shieldCollectedAt",
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
        ),
        switchedToAt: Number.NEGATIVE_INFINITY,
      },
    },
  };
};
