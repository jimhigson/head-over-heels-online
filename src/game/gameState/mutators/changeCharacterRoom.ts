import type { GameState } from "../GameState";
import { loadRoom } from "../loadRoom/loadRoom";
import { objectValues } from "iter-tools";
import { entryState } from "../PlayableEntryState";
import { deleteItemFromRoom } from "./deleteItemFromRoom";
import { selectHeelsAbilities } from "../gameStateSelectors/selectPlayableItem";
import { removeHushPuppiesFromRoom } from "./removeHushPuppiesFromRoom";
import type { ItemInPlay } from "../../../model/ItemInPlay";
import type { CharacterName, RoomState } from "../../../model/modelTypes";
import { otherIndividualCharacterName } from "../../../model/modelTypes";
import type { SceneryName } from "../../../sprites/planets";
import { blockSizePx } from "../../../sprites/spritePivots";
import { iterate } from "../../../utils/iterate";
import type { Xyz } from "../../../utils/vectors/vectors";
import {
  xyzEqual,
  scaleXyz,
  subXyz,
  addXyz,
} from "../../../utils/vectors/vectors";
import { collision1toMany } from "../../collision/aabbCollision";
import type { PlayableItem } from "../../physics/itemPredicates";
import { isPortal } from "../../physics/itemPredicates";
import { blockXyzToFineXyz } from "../../render/projectToScreen";
import { store } from "../../../store/store";
import { moveItem } from "../../physics/moveItem";
import { roomExplored } from "../../../store/slices/gameMenusSlice";

export type ChangeType = "teleport" | "portal" | "level-select";

type ChangeCharacterRoomOptions<RoomId extends string> =
  | {
      changeType: "portal";
      gameState: GameState<RoomId>;
      playableItem: PlayableItem<CharacterName, NoInfer<RoomId>>;
      toRoomId: NoInfer<NoInfer<RoomId>>;
      /* position relative to the portal in the source room */
      sourceItem: ItemInPlay<"portal", SceneryName, NoInfer<RoomId>>;
    }
  | {
      changeType: "teleport";
      gameState: GameState<RoomId>;
      playableItem: PlayableItem<CharacterName, NoInfer<RoomId>>;
      toRoomId: NoInfer<NoInfer<RoomId>>;
      sourceItem: ItemInPlay<"teleporter", SceneryName, NoInfer<RoomId>>;
    }
  | {
      changeType: "level-select";
      gameState: GameState<RoomId>;
      playableItem: PlayableItem<CharacterName, NoInfer<RoomId>>;
      toRoomId: NoInfer<NoInfer<RoomId>>;
      sourceItem?: undefined;
    };

const findDestinationPortal = <RoomId extends string>(
  toRoom: RoomState<SceneryName, RoomId>,
  fromRoom: RoomState<SceneryName, RoomId>,
  {
    changeType,
    sourceItem: sourcePortal,
  }: ChangeCharacterRoomOptions<RoomId> & {
    changeType: "portal" | "level-select";
  },
): ItemInPlay<"portal", SceneryName, RoomId> | undefined => {
  switch (changeType) {
    case "portal":
      return iterate(objectValues(toRoom.items)).find(
        (i): i is ItemInPlay<"portal", SceneryName, RoomId> =>
          isPortal(i) &&
          i.config.toRoom === fromRoom.id &&
          // portal is going in the opposite direction - see for example the double-door transition
          // between #safari6triple and #safari7
          xyzEqual(
            scaleXyz(sourcePortal.config.direction, -1),
            i.config.direction,
          ),
      );

    case "level-select":
      return (
        iterate(objectValues(toRoom.items)).find(
          (i): i is ItemInPlay<"portal", SceneryName, RoomId> =>
            isPortal(i) &&
            // find a door coming from the right room (if the level select was from
            // an adjacent room - this is not guaranteed) but makes clicking through
            // rooms less confusing
            i.config.toRoom === fromRoom.id &&
            // horizontal portal (ie, not floor/ceiling)
            i.config.direction.z === 0,
          // fall back to horizontal/vertical portal:
        ) ??
        // find a door in the right direction:
        iterate(objectValues(toRoom.items)).find(
          (i): i is ItemInPlay<"portal", SceneryName, RoomId> =>
            isPortal(i) &&
            // any horizontal portal (ie, not floor/ceiling)
            i.config.direction.z === 0,
          // fall back to horizontal/vertical portal:
        ) ??
        iterate(objectValues(toRoom.items)).find(
          (i): i is ItemInPlay<"portal", SceneryName, RoomId> =>
            isPortal(i) &&
            // any ceiling portal - the floor would mean falling
            // instantly out of the room
            i.config.direction.z > 0,
        ) ??
        // fall back to any portal:
        iterate(objectValues(toRoom.items)).find(isPortal)
      );

    default:
      changeType satisfies never;
  }
};

const backOffAndPushBack = <RoomId extends string>(
  playableItem: PlayableItem<CharacterName, RoomId>,
  portalDirectionXy: Xyz,
  gameState: GameState<RoomId>,
  toRoom: RoomState<SceneryName, RoomId>,
) => {
  // back off one square, and push progressively into the room:
  const backOffAndPushLength = 1 * blockSizePx.w;
  playableItem.state.position = addXyz(
    playableItem.state.position,
    scaleXyz(portalDirectionXy, backOffAndPushLength),
  );
  // push in increments of 1px
  for (let i = 0; i < backOffAndPushLength; i++) {
    moveItem({
      subjectItem: playableItem,
      posDelta: scaleXyz(portalDirectionXy, -1),
      gameState,
      room: toRoom,
      deltaMS: 16, //fiction
      forceful: true,
      // don't handle any touches, otherwise would collide with the portal
      onTouch: undefined,
    });
  }
};

export const changeCharacterRoom = <RoomId extends string>(
  changeCharacterRoomOptions: ChangeCharacterRoomOptions<RoomId>,
) => {
  const {
    playableItem,
    gameState,
    toRoomId,
    //positionRelativeToSourcePortal: maybePositionRelativeToSourcePortal,
    changeType,
    sourceItem,
  } = changeCharacterRoomOptions;

  const leavingRoom = gameState.characterRooms[playableItem.id];

  if (leavingRoom === undefined) {
    throw new Error(`${playableItem.id} is not in a room on the gameState`);
  }

  if (toRoomId === leavingRoom.id) {
    throw new Error(
      `Can't move ${playableItem.id} to the same room "${toRoomId}""`,
    );
  }

  let positionRelativeToSourcePortal: Xyz;

  switch (changeType) {
    case "portal": {
      const {
        config: { relativePoint },
        state: { position: portalPosition },
      } = sourceItem;

      positionRelativeToSourcePortal = subXyz(
        playableItem.state.position,
        addXyz(portalPosition, relativePoint),
      );
      break;
    }
    case "teleport": {
      const {
        state: { position: teleporterPosition },
      } = sourceItem;
      positionRelativeToSourcePortal = subXyz(
        playableItem.state.position,
        teleporterPosition,
      );
      break;
    }
    case "level-select":
      positionRelativeToSourcePortal = { x: 0, y: 0, z: 0 };
      break;
    default:
      changeType satisfies "never";
      throw new Error();
  }

  const otherCharacterLoadedRoom =
    playableItem.type === "headOverHeels" ?
      // if in symbiosis, there is no other player so no other player's room:
      undefined
    : gameState.characterRooms[otherIndividualCharacterName(playableItem.id)];

  const toRoomJson = gameState.campaign.rooms[toRoomId];
  if (toRoomJson === undefined) {
    throw new Error(`room ${toRoomId} does not exist in campaign`);
  }
  const toRoom =
    otherCharacterLoadedRoom?.id === toRoomId ?
      otherCharacterLoadedRoom
    : loadRoom(toRoomJson, gameState.pickupsCollected[toRoomId]);

  // take the character out of the previous room:
  deleteItemFromRoom({ room: leavingRoom, item: playableItem });

  // heels can't carry items to different rooms:
  const heelsAbilities = selectHeelsAbilities(playableItem);
  if (heelsAbilities !== undefined) {
    heelsAbilities.carrying = null;
  }

  // hush puppies vanish the moment head enters:
  if (playableItem.type === "head" || playableItem.type === "headOverHeels") {
    removeHushPuppiesFromRoom(toRoom, gameState);
  }

  // remove the character from the new room if they're already there - this only really happens
  // if the room is their starting room (so they're in it twice since they appear in the starting room
  // by default):
  deleteItemFromRoom({ room: toRoom, item: playableItem });

  // but the character into the (probably newly loaded) room:
  (toRoom.items[playableItem.id] as typeof playableItem) = playableItem;

  // update game state to know which room this character is now in:
  gameState.characterRooms[playableItem.id] = toRoom;

  // character is in the room, now let's update some of their state before the physics starts ticking again:
  if (changeCharacterRoomOptions.changeType === "teleport") {
    const {
      config: { toPosition: teleporterToBlockPosition },
    } = changeCharacterRoomOptions.sourceItem;

    playableItem.state.position = addXyz(
      blockXyzToFineXyz(teleporterToBlockPosition),
      positionRelativeToSourcePortal,
    );
  } else {
    // find the door (etc) in the new room to enter in:
    const destinationPortal = findDestinationPortal(
      toRoom,
      leavingRoom,
      changeCharacterRoomOptions,
    );

    console.log(
      "putting",
      playableItem.id,
      "into",
      toRoomId,
      "at portal",
      destinationPortal,
      "because",
      changeType,
      "sourceportal",
      sourceItem,
    );

    if (destinationPortal === undefined) {
      if (changeCharacterRoomOptions.changeType === "level-select") {
        // you're probably level selecting into the final room, but could also in theory be a room with only teleporters
        // to access - don't think there are any in the original game though:
        // choose a random spot that's likely to not collide:
        playableItem.state.position = blockXyzToFineXyz({ x: 1, y: 1, z: 8 });
      } else {
        // we're not level selecting, there is really a bug in the campaign topology
        throw new Error(
          `trying to move ${playableItem.id} from ${leavingRoom.id} --to-> ${toRoomId} but no destination portal found to locate with`,
        );
      }
    } else {
      playableItem.state.position = addXyz(
        destinationPortal.state.position,
        destinationPortal.config.relativePoint,
        positionRelativeToSourcePortal,
        // an extra boost of one block when travelling up - this is because the room above won't have a floor
        // so the player needs to stand on a block, which is one block high, and they need to get up on top of it
        changeType === "portal" && sourceItem.config.direction.z > 0 ?
          {
            z: blockSizePx.h,
            // *
            // (playableItem.type === "headOverHeels" ?
            //   // headOverHeels is taller, so they hit the ceiling portal earlier (bookworld28 -> bookworld29) so they need
            //   // two extra blocks of height. Actually, bw28/29 is a heads room, but the same principle should apply
            //   // and there's no known case where this is needed - left commented just in case
            //   2
            // : 1),
          }
        : {},
      );

      const {
        config: { direction: portalDirection },
      } = destinationPortal;
      if (
        // portal is horizontal (door) - not up or down (floor/ceiling)
        portalDirection.z === 0
      ) {
        // automatically walk forward a short way in the new room to put character properly
        // inside the room (this doesn't happen for entering a room via teleporting or falling/climbing
        //  - only doors)
        playableItem.state.autoWalk = true;

        // face the character the way they should have walked through the portal - this
        // is usually a no-op since they had to be walking that way to get through, but
        // it is possible they were pushed through and the autowalk needs to go in
        // the right direction
        playableItem.state.facing = scaleXyz(portalDirection, -1);

        if (playableItem.state.action === "idle")
          playableItem.state.action = "moving";

        backOffAndPushBack(playableItem, portalDirection, gameState, toRoom);
      }
    }
  }

  const collisionsInDestinationRoom = collision1toMany(
    playableItem,
    objectValues(toRoom.items),
  );
  if (collisionsInDestinationRoom.length > 0) {
    console.warn(
      "on entering room",
      toRoomId,
      "character",
      playableItem.id,
      "at",
      playableItem.state.position,
      "collides with",
      collisionsInDestinationRoom,
    );
  }

  gameState.entryState[playableItem.id] = entryState(playableItem);

  // delete entry states that no longer apply:
  if (playableItem.id === "headOverHeels") {
    // both players are now in a different room (in symbiosis) so their old
    // entry states are no longer relevant:
    delete gameState.entryState.head;
    delete gameState.entryState.heels;
  } else {
    // individual character moving out of the room:
    // there may be an issue here if it leaves the character that didn't move
    // into the new room without an entrystate.
    if (!gameState.entryState[otherIndividualCharacterName(playableItem.id)]) {
      gameState.entryState[otherIndividualCharacterName(playableItem.id)] =
        gameState.entryState.headOverHeels;
    }
    delete gameState.entryState.headOverHeels;
  }

  store.dispatch(roomExplored(toRoomId));
};
