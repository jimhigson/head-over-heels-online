import { positionCentredInBlock } from "./positionCentredInBlock";
import { defaultBaseState, defaultFreeItemState } from "./itemDefaultStates";
import { defaultItemProperties } from "../../../model/defaultItemProperties";
import type {
  CommonAbilities,
  PlayableState,
} from "../../../model/ItemStateMap";
import type { JsonItem } from "../../../model/json/JsonItem";
import type { CharacterName } from "../../../model/modelTypes";
import { emptyObject } from "../../../utils/empty";
import { unitVectors } from "../../../utils/vectors/unitVectors";
import { originXyz } from "../../../utils/vectors/vectors";
import { smallItemAabb } from "../../collision/boundingBoxes";
import type { PlayableItem } from "../../physics/itemPredicates";
import { originalGameStartingLives } from "../../physics/mechanicsConstants";
import { store } from "../../../store/store";
import {
  selectIsInfiniteDoughnutsPoke,
  selectIsInfiniteLivesPoke,
} from "../../../store/selectors";
import { neverTime } from "../../../utils/neverTime";

export const defaultPlayableRootAttributes = {
  config: emptyObject,
  shadowCastTexture: "shadow.smallRound",
  castsShadowWhileStoodOn: true,
  // head's nose is rendered outside of his bb in the original
  aabb: smallItemAabb,
} satisfies Partial<PlayableItem<CharacterName, string>>;

export const defaultPlayerState = () => {
  const infiniteLivesPoke = selectIsInfiniteLivesPoke(store.getState());
  type ReturnType = Partial<PlayableState<string> & CommonAbilities>;

  return {
    action: "idle",
    jumped: false,
    teleporting: null,
    autoWalk: false,
    facing: unitVectors["towards"],
    walkStartFacing: unitVectors["towards"],
    walkDistance: 0,
    vels: {
      walking: originXyz,
      gravity: originXyz,
      movingFloor: originXyz,
    },
    switchedToAt: neverTime,
    lastDiedAt: neverTime,
    gameTime: 0,
    jumpStartTime: neverTime,
    lives:
      infiniteLivesPoke ? ("infinite" as const) : originalGameStartingLives,
    // since a jump hasn't started this value doesn't matter:
    jumpStartZ: 0,
  } satisfies ReturnType;
};

export const loadPlayer = <RoomId extends string, RoomItemId extends string>(
  jsonItem: JsonItem<"player", RoomId, RoomItemId>,
  jsonItemId?: RoomItemId,
): PlayableItem<CharacterName, RoomId, RoomItemId> => {
  const infiniteDoughnutsPoke = selectIsInfiniteDoughnutsPoke(store.getState());

  if (jsonItem.config.which === "head") {
    return {
      // the id will almost always be 'head' - it can only be different if it is
      // a preview in the level editor
      id: jsonItemId as RoomItemId,
      jsonItemId,
      type: "head",
      ...defaultItemProperties,
      ...defaultPlayableRootAttributes,
      state: {
        ...defaultBaseState<RoomItemId>(),
        ...defaultFreeItemState(),
        ...defaultPlayerState(),
        hasHooter: false,
        gameWalkDistance: 0,
        fastStepsStartedAtDistance: neverTime,
        shieldCollectedAt: neverTime,
        doughnuts: infiniteDoughnutsPoke ? "infinite" : 0,
        position: positionCentredInBlock(jsonItem),
        stoodOnUntilRoomTime: neverTime,
      },
    };
  } else {
    return {
      // the id will almost always be 'heels' - it can only be different if it is
      // a preview in the level editor
      id: jsonItemId as RoomItemId,
      jsonItemId,
      type: "heels",
      ...defaultItemProperties,
      ...defaultPlayableRootAttributes,
      state: {
        ...defaultBaseState<RoomItemId>(),
        ...defaultFreeItemState(),
        ...defaultPlayerState(),
        carrying: null,
        hasBag: false,
        bigJumps: 0,
        isBigJump: false,
        shieldCollectedAt: neverTime,
        position: positionCentredInBlock(jsonItem),
        stoodOnUntilRoomTime: neverTime,
      },
    };
  }
};
