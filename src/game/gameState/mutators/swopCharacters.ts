import type { IndividualCharacterName } from "@/model/modelTypes";
import { otherIndividualCharacterName } from "@/model/modelTypes";
import { otherPlayableItem, type GameState } from "../GameState";
import { selectPlayableItem } from "../gameStateSelectors/selectPlayableItem";
import { addItemToRoom } from "./addItemToRoom";
import { deleteItemFromRoom } from "./deleteItemFromRoom";
import { entryState } from "../EntryState";
import type { PlayableItem } from "@/game/physics/itemPredicates";
import {
  defaultBaseState,
  defaultFreeItemState,
} from "@/game/gameState/loadRoom/loadItem";
import {
  defaultPlayableRootAttributes,
  defaultPlayerState,
} from "../loadRoom/loadPlayer";
import { defaultItemProperties } from "@/model/defaultItemProperties";
import { emptyObject } from "@/utils/empty";
import { addXyz, originXyz } from "@/utils/vectors/vectors";
import { pick } from "../../../utils/pick";
import { blockSizePx } from "@/sprites/spritePivots";
import { setStandingOn } from "./modifyStandingOn";
import { uncombineLittleJumpPxHeight } from "@/game/physics/mechanicsConstants";
import { doubleHeightCharacter } from "@/game/collision/boundingBoxes";

const checkCanCombine = <RoomId extends string>(
  gameState: GameState<RoomId>,
): boolean => {
  const head = selectPlayableItem(gameState, "head");
  const heels = selectPlayableItem(gameState, "heels");

  return (
    head !== undefined &&
    heels !== undefined &&
    head.state.action === "idle" &&
    heels.state.action === "idle" &&
    head.state.standingOn === heels
  );
};

const combinePlayables = <RoomId extends string>(
  gameState: GameState<RoomId>,
) => {
  const { room } = gameState.characterRooms["head"]!;
  const head = selectPlayableItem(gameState, "head")!;
  const heels = selectPlayableItem(gameState, "heels")!;
  const headOverHeels: PlayableItem<"headOverHeels", RoomId> = {
    type: "headOverHeels",
    id: "headOverHeels",
    ...defaultItemProperties,
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
      head: pick(
        head.state,
        "hasHooter",
        "donuts",
        "donutLastFireTime",
        "fastSteps",
        "lives",
      ),
      heels: pick(heels.state, "hasBag", "bigJumps", "carrying", "lives"),
    },
  };

  deleteItemFromRoom({ room, item: "head" });
  deleteItemFromRoom({ room, item: "heels" });
  addItemToRoom({ room, item: headOverHeels });
  gameState.previousPlayable =
    gameState.currentCharacterName as IndividualCharacterName;
  gameState.currentCharacterName = "headOverHeels";
  gameState.characterRooms = {
    head: undefined,
    heels: undefined,
    headOverHeels: {
      room,
      entryState: entryState(headOverHeels),
    },
  };
};

const uncombinePlayables = <RoomId extends string>(
  gameState: GameState<RoomId>,
) => {
  const { room } = gameState.characterRooms["headOverHeels"]!;
  const headOverHeels = selectPlayableItem(gameState, "headOverHeels")!;

  const switchingToCharacter = otherIndividualCharacterName(
    gameState.previousPlayable!,
  );

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
      shieldCollectedAt: headOverHeels.state.shieldCollectedAt,
      position: addXyz(
        headOverHeels.state.position,
        { z: blockSizePx.h },
        { z: uncombineLittleJumpPxHeight },
      ),
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
      shieldCollectedAt: headOverHeels.state.shieldCollectedAt,
      position: addXyz(
        headOverHeels.state.position,
        switchingToCharacter === "heels" ?
          { z: uncombineLittleJumpPxHeight }
        : originXyz,
      ),
    },
  };
  deleteItemFromRoom({ room, item: "headOverHeels" });
  addItemToRoom({ room, item: head });
  addItemToRoom({ room, item: heels });
  setStandingOn({ above: head, below: heels });
  gameState.currentCharacterName = switchingToCharacter;
  gameState.previousPlayable = undefined;
  gameState.characterRooms = {
    head: { room, entryState: entryState(head) },
    heels: { room, entryState: entryState(heels) },
    headOverHeels: undefined,
  };
};

export const swopPlayables = <RoomId extends string>(
  gameState: GameState<RoomId>,
) => {
  if (checkCanCombine(gameState)) {
    combinePlayables(gameState);
  } else if (gameState.currentCharacterName === "headOverHeels") {
    uncombinePlayables(gameState);
  } else {
    // normal swop - one player for another
    if (otherPlayableItem(gameState) === undefined) {
      // other player doesn't exist in any room (has zero lives) - can't swop
      return;
    }

    // TODO: don't allow to swop if the other character has zero lives
    // TODO: don't allow to swop if the current character is playing death animation

    gameState.currentCharacterName = otherIndividualCharacterName(
      gameState.currentCharacterName,
    );
  }
};
