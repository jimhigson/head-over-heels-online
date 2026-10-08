import {
  itemBehaviourKey,
  type ItemInPlayConfig,
} from "../../../model/ItemInPlay";
import { type PlayableItem } from "../../../model/ItemInPlayNarrowedUnions";
import { type IndividualCharacterName } from "../../../model/modelTypes";
import { emptyObject } from "../../../utils/empty";
import { neverTime } from "../../../utils/neverTime";
import { pick } from "../../../utils/pick";
import { addXyz, boxWithSize } from "../../../utils/vectors/vectors";
import {
  headAabb,
  headOverHeelsAabb,
  heelsAabb,
} from "../../collision/boundingBoxes";
import { getBehaviourForItemTypeAndConfig } from "../../itemBehaviours/attachBehaviourToItem";
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
    ...defaultPlayableRootAttributes,
    [itemBehaviourKey]: getBehaviourForItemTypeAndConfig(
      "head",
      defaultPlayableRootAttributes.config,
    ),
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
      box: boxWithSize(
        addXyz(headOverHeels.state.box, { z: blockSizePx.z }),
        headAabb,
      ),
      switchedToAt: neverTime,
    },
  };
  const heels: PlayableItem<"heels", RoomId, RoomItemId> = {
    id: "heels" as RoomItemId,
    type: "heels",
    // playables never use the hash (only used to de-synchronise animations):
    hash: 0,
    ...defaultPlayableRootAttributes,
    [itemBehaviourKey]: getBehaviourForItemTypeAndConfig(
      "heels",
      defaultPlayableRootAttributes.config,
    ),
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
      box: boxWithSize(headOverHeels.state.box, heelsAabb),
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

  const config = emptyObject satisfies ItemInPlayConfig<"headOverHeels">;
  return {
    id: "headOverHeels" as RoomItemId,
    type: "headOverHeels",
    // playables never use the hash (only used to de-synchronise animations):
    hash: 0,
    config,
    [itemBehaviourKey]: getBehaviourForItemTypeAndConfig(
      "headOverHeels",
      config,
    ),
    state: {
      ...defaultBaseState<RoomItemId>(),
      ...defaultFreeItemState(),
      ...defaultCommonPlayableState(),
      box: boxWithSize(heels.state.box, headOverHeelsAabb),
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
          "wouldPickUpNextItemId",
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
