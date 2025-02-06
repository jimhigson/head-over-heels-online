import { positionCentredInBlock } from "./positionCentredInBlock";
import { defaultBaseState, defaultFreeItemState } from "./itemDefaultStates";
import { defaultItemProperties } from "../../../model/defaultItemProperties";
import type { PlayableState } from "../../../model/ItemStateMap";
import type { JsonItem } from "../../../model/json/JsonItem";
import type { CharacterName } from "../../../model/modelTypes";
import type { SceneryName } from "../../../sprites/planets";
import { emptyObject } from "../../../utils/empty";
import { unitVectors } from "../../../utils/vectors/unitVectors";
import { originXyz } from "../../../utils/vectors/vectors";
import { mediumItemAabb } from "../../collision/boundingBoxes";
import type { PlayableItem } from "../../physics/itemPredicates";
import { originalGameStartingLives } from "../../physics/mechanicsConstants";
import { store } from "../../../store/store";

export const defaultPlayableRootAttributes = {
  config: emptyObject,
  shadowCastTexture: "shadow.smallRound",
  // head's nose is rendered outside of his bb in the original
  aabb: mediumItemAabb,
} satisfies Partial<PlayableItem<CharacterName, string>>;

export const defaultPlayerState = () =>
  ({
    action: "idle",
    jumped: false,
    teleporting: null,
    autoWalk: false,
    facing: unitVectors["towards"],
    walkDistance: 0,
    vels: {
      walking: originXyz,
      gravity: originXyz,
      movingFloor: originXyz,
    },
  }) satisfies Partial<PlayableState<string>>;

export const loadPlayer = <RoomId extends string>(
  jsonItem: JsonItem<"player", SceneryName, RoomId>,
): PlayableItem<CharacterName, RoomId> => {
  const { infiniteLivesPoke } = store.getState().userSettings;

  if (jsonItem.config.which === "head") {
    return {
      id: "head",
      type: "head",
      ...defaultItemProperties,
      ...defaultPlayableRootAttributes,
      state: {
        ...defaultBaseState<RoomId>(),
        ...defaultFreeItemState(),
        ...defaultPlayerState(),
        hasHooter: false,
        totalWalkDistance: 0,
        fastStepsStartedAtDistance: Number.NEGATIVE_INFINITY,
        lives:
          infiniteLivesPoke ?
            Number.POSITIVE_INFINITY
          : originalGameStartingLives,
        shieldCollectedAt: Number.NEGATIVE_INFINITY,
        doughnuts: 0,
        doughnutLastFireTime: Number.NEGATIVE_INFINITY,
        switchedToAt: Number.NEGATIVE_INFINITY,
        position: positionCentredInBlock(jsonItem),
        gameTime: 0,
        actedOnAt: Number.NEGATIVE_INFINITY,
      },
    };
  } else {
    return {
      id: "heels",
      type: "heels",
      ...defaultItemProperties,
      ...defaultPlayableRootAttributes,
      state: {
        ...defaultBaseState<RoomId>(),
        ...defaultFreeItemState(),
        ...defaultPlayerState(),
        carrying: null,
        hasBag: false,
        bigJumps: 0,
        lives:
          infiniteLivesPoke ?
            Number.POSITIVE_INFINITY
          : originalGameStartingLives,
        shieldCollectedAt: Number.NEGATIVE_INFINITY,
        switchedToAt: Number.NEGATIVE_INFINITY,
        position: positionCentredInBlock(jsonItem),
        gameTime: 0,
        actedOnAt: Number.NEGATIVE_INFINITY,
      },
    };
  }
};
