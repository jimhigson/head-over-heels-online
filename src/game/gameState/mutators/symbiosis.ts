import { defaultItemProperties } from "../../../model/defaultItemProperties";
import { type IndividualCharacterName } from "../../../model/modelTypes";
import { emptyObject } from "../../../utils/empty";
import { neverTime } from "../../../utils/neverTime";
import { pick } from "../../../utils/pick";
import { addXyz } from "../../../utils/vectors/vectors";
import {
  headAabbInfo,
  headOverHeelsAabbInfo,
  heelsAabbInfo,
} from "../../collision/boundingBoxes";
import { type PlayableItem } from "../../physics/itemPredicates";
import { blockSizePx } from "../../physics/mechanicsConstants";
import {
  defaultBaseState,
  defaultFreeItemState,
} from "../loadRoom/itemDefaultStates";
import {
  defaultCommonPlayableState,
  defaultPlayableRootAttributes,
} from "../loadRoom/loadPlayer";

export const uncombinePlayablesFromSymbiosis = <
  RoomId extends string,
  RoomItemId extends string,
>(
  headOverHeels: PlayableItem<"headOverHeels", RoomId, RoomItemId>,
) => {
  const head: PlayableItem<"head", RoomId, RoomItemId> = {
    id: "head" as RoomItemId,
    type: "head",
    // playables never use the hash (only used to de-synchronise animations):
    hash: 0,
    ...defaultItemProperties,
    ...defaultPlayableRootAttributes,
    ...headAabbInfo,
    state: {
      ...defaultBaseState<RoomItemId>(),
      ...defaultFreeItemState<RoomItemId>(),
      ...defaultCommonPlayableState(),
      ...headOverHeels.state.head,
      ...pick(
        headOverHeels.state,
        "facing",
        "walkStartFacing",
        "visualFacingVector",
        "actedOnAt",
        "collidedWith",
        "stoodOnUntilRoomTime",
        "autoWalk",
        "teleporting",
      ),
      position: addXyz(headOverHeels.state.position, { z: blockSizePx.z }),
      switchedToAt: neverTime,
    },
  };
  const heels: PlayableItem<"heels", RoomId, RoomItemId> = {
    id: "heels" as RoomItemId,
    type: "heels",
    // playables never use the hash (only used to de-synchronise animations):
    hash: 0,
    ...defaultItemProperties,
    ...defaultPlayableRootAttributes,
    ...heelsAabbInfo,
    state: {
      ...defaultBaseState<RoomItemId>(),
      ...defaultFreeItemState<RoomItemId>(),
      ...defaultCommonPlayableState(),
      ...headOverHeels.state.heels,
      ...pick(
        headOverHeels.state,
        "facing",
        "walkStartFacing",
        "visualFacingVector",
        "actedOnAt",
        "collidedWith",
        "stoodOnUntilRoomTime",
        "autoWalk",
        "teleporting",
      ),
      position: addXyz(headOverHeels.state.position),
      switchedToAt: neverTime,
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
  previousPlayable,
}: {
  head: PlayableItem<"head", RoomId, RoomItemId>;
  heels: PlayableItem<"heels", RoomId, RoomItemId>;
  /**
   * which player was current before combining?
   * If not given, assumes Heels
   */
  previousPlayable?: IndividualCharacterName;
}): PlayableItem<"headOverHeels", RoomId, RoomItemId> => {
  const previouslySelectedState =
    previousPlayable === "head" ? head.state : heels.state;

  return {
    id: "headOverHeels" as RoomItemId,
    type: "headOverHeels",
    // playables never use the hash (only used to de-synchronise animations):
    hash: 0,
    ...defaultItemProperties,
    shadowCastTexture: heels.shadowCastTexture,
    castsShadowWhileStoodOn: heels.castsShadowWhileStoodOn,
    config: emptyObject,
    ...headOverHeelsAabbInfo,
    state: {
      ...defaultBaseState<RoomItemId>(),
      ...defaultFreeItemState(),
      ...defaultCommonPlayableState(),
      position: heels.state.position,
      action: "idle",
      jumped: false,
      teleporting: null,
      autoWalk: false,
      facing: previouslySelectedState.facing,
      visualFacingVector: previouslySelectedState.visualFacingVector,
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
