import type { SharedUnionFields } from "type-fest";

import type {
  HeadOverHeelsState,
  HeadState,
  HeelsState,
} from "../../../model/ItemStateMap";
import type { JsonItem } from "../../../model/json/JsonItem";
import type { CharacterName } from "../../../model/modelTypes";
import type { PokesEnabled } from "../../../store/slices/userSettings/userSettingsSlice";
import type { PlayableItem } from "../../physics/itemPredicates";
import type { SpecifiedTextureCreateSpriteOptions } from "../../render/createSprite";

import { defaultItemProperties } from "../../../model/defaultItemProperties";
import { emptyObject } from "../../../utils/empty";
import { neverTime } from "../../../utils/neverTime";
import { unitVectors } from "../../../utils/vectors/unitVectors";
import { originXyz } from "../../../utils/vectors/vectors";
import { headAabbInfo, heelsAabbInfo } from "../../collision/boundingBoxes";
import { originalGameStartingLives } from "../../physics/mechanicsConstants";
import { defaultBaseState, defaultFreeItemState } from "./itemDefaultStates";
import { positionCentredInBlock } from "./positionCentredInBlock";

const shadowPlayable: SpecifiedTextureCreateSpriteOptions = Object.freeze({
  textureId: "shadow.playable",
  spritesheetVariant: "original",
});

export const defaultPlayableRootAttributes = {
  config: emptyObject,
  shadowCastTexture: shadowPlayable,
  castsShadowWhileStoodOn: true,
} satisfies Partial<PlayableItem<CharacterName, string>>;

export const defaultCommonPlayableState = () => {
  type CommonToAllPlayablesState = SharedUnionFields<
    HeadOverHeelsState<string> | HeadState<string> | HeelsState<string>
  >;

  return {
    action: "idle",
    jumped: false,
    teleporting: null,
    autoWalk: false,
    facing: unitVectors["towards"],
    visualFacingVector: unitVectors["towards"],
    walkStartFacing: unitVectors["towards"],
    walkDistance: 0,
    vels: {
      walking: originXyz,
      gravity: originXyz,
      movingFloor: originXyz,
    },
    jumpStartZ: 0,
  } as const satisfies Partial<CommonToAllPlayablesState>;
};

/** what individual playables always start with, in addition to what's in defaultCommonPlayableState */
function defaultCommonIndividualPlayableState(pokesEnabled: PokesEnabled) {
  type CommonToBothIndividualPlayablesState = SharedUnionFields<
    HeadState<string> | HeelsState<string>
  >;
  return {
    lives:
      pokesEnabled!.infiniteLives ?
        ("infinite" as const)
      : originalGameStartingLives,
    lastDiedAt: neverTime,
    switchedToAt: neverTime,
    gameTime: 0,
  } as const satisfies Partial<CommonToBothIndividualPlayablesState>;
}

export const loadPlayer = <RoomId extends string, RoomItemId extends string>(
  jsonItem: JsonItem<"player", RoomId, RoomItemId>,
  jsonItemId: RoomItemId | undefined,
  pokesEnabled: PokesEnabled = emptyObject,
): PlayableItem<CharacterName, RoomId, RoomItemId> => {
  const { infiniteDoughnuts } = pokesEnabled;

  if (jsonItem.config.which === "head") {
    return {
      // the id will almost always be 'head' - it can only be different if it is
      // a preview in the level editor
      id: jsonItemId as RoomItemId,
      jsonItemId,
      type: "head",
      ...defaultItemProperties,
      ...defaultPlayableRootAttributes,
      ...headAabbInfo,
      state: {
        ...defaultBaseState<RoomItemId>(),
        ...defaultFreeItemState(),
        ...defaultCommonPlayableState(),
        ...defaultCommonIndividualPlayableState(pokesEnabled),
        hasHooter: false,
        gameWalkDistance: 0,
        fastStepsStartedAtDistance: neverTime,
        shieldCollectedAt: neverTime,
        doughnuts: infiniteDoughnuts ? "infinite" : 0,
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
      ...heelsAabbInfo,
      state: {
        ...defaultBaseState<RoomItemId>(),
        ...defaultFreeItemState(),
        ...defaultCommonPlayableState(),
        ...defaultCommonIndividualPlayableState(pokesEnabled),
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
