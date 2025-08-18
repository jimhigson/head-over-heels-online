import type { GameState } from "../GameState";
import { loadRoom } from "../loadRoom/loadRoom";
import { entryState } from "../PlayableEntryState";
import { deleteItemFromRoom } from "./deleteItemFromRoom";
import { selectHeelsAbilities } from "../gameStateSelectors/selectPlayableItem";
import { removeHushPuppiesFromRoom } from "./removeHushPuppiesFromRoom";
import type { ItemInPlay } from "../../../model/ItemInPlay";
import type {
  CharacterName,
  IndividualCharacterName,
} from "../../../model/modelTypes";
import { otherIndividualCharacterName } from "../../../model/modelTypes";
import { blockSizePx } from "../../../sprites/spritePivots";
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
import { blockXyzToFineXyz } from "../../render/projections";
import { store } from "../../../store/store";
import { moveItem } from "../../physics/moveItem";
import {
  characterRoomChange,
  roomExplored,
} from "../../../store/slices/gameMenusSlice";
import {
  iterateRoomItems,
  roomItemsIterable,
  type RoomState,
} from "../../../model/RoomState";
import type { RoomJson } from "../../../model/RoomJson";
import { emptyObject } from "../../../utils/empty";
import { iterate } from "../../../utils/iterate";
import { selectCurrentCampaign } from "../../../store/selectors";

export type ChangeType = "teleport" | "portal" | "level-select";

type ChangeCharacterRoomOptions<
  RoomId extends string,
  RoomItemId extends string,
> =
  | {
      changeType: "portal";
      gameState: GameState<RoomId>;
      // infer RoomItemId from the playable item - could take a room parameter too to infer this from
      playableItem: PlayableItem<CharacterName, NoInfer<RoomId>, RoomItemId>;
      toRoomId: NoInfer<RoomId>;
      /* position relative to the portal in the source room */
      sourceItem: ItemInPlay<"portal", NoInfer<RoomId>, NoInfer<RoomItemId>>;
    }
  | {
      changeType: "teleport";
      gameState: GameState<RoomId>;
      // infer RoomItemId from the playable item - could take a room parameter too to infer this from
      playableItem: PlayableItem<CharacterName, NoInfer<RoomId>, RoomItemId>;
      toRoomId: NoInfer<RoomId>;
      sourceItem: ItemInPlay<
        "teleporter",
        NoInfer<RoomId>,
        NoInfer<RoomItemId>
      >;
    }
  | {
      changeType: "level-select";
      gameState: GameState<RoomId>;
      // infer RoomItemId from the playable item - could take a room parameter too to infer this from
      playableItem: PlayableItem<CharacterName, NoInfer<RoomId>, RoomItemId>;
      toRoomId: NoInfer<RoomId>;
      sourceItem?: undefined;
    };

const findDestinationPortal = <
  RoomId extends string,
  RoomItemId extends string,
>(
  // TODO: this is wrong! there is no reason why both rooms would have the same RoomItemId type!
  toRoom: RoomState<RoomId, RoomItemId>,
  fromRoom: RoomState<RoomId, RoomItemId>,
  {
    changeType,
    sourceItem: sourcePortal,
  }: ChangeCharacterRoomOptions<RoomId, RoomItemId> & {
    changeType: "portal" | "level-select";
  },
): ItemInPlay<"portal", RoomId, RoomItemId> | undefined => {
  switch (changeType) {
    case "portal":
      return iterateRoomItems(toRoom.items).find(
        (i): i is ItemInPlay<"portal", RoomId, RoomItemId> =>
          isPortal(i) &&
          i.config.toRoom === fromRoom.id &&
          (sourcePortal.config.toDoor === undefined ||
            i.jsonItemId === sourcePortal.config.toDoor) &&
          // portal is going in the opposite direction - see for example the double-door transition
          // between #safari6triple and #safari7
          xyzEqual(
            scaleXyz(sourcePortal.config.direction, -1),
            i.config.direction,
          ),
      );

    case "level-select":
      return (
        iterateRoomItems(toRoom.items).find(
          (i): i is ItemInPlay<"portal", RoomId, RoomItemId> =>
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
        iterateRoomItems(toRoom.items).find(
          (i): i is ItemInPlay<"portal", RoomId, RoomItemId> =>
            isPortal(i) &&
            // any horizontal portal (ie, not floor/ceiling)
            i.config.direction.z === 0,
          // fall back to horizontal/vertical portal:
        ) ??
        iterateRoomItems(toRoom.items).find(
          (i): i is ItemInPlay<"portal", RoomId, RoomItemId> =>
            isPortal(i) &&
            // any ceiling portal - the floor would mean falling
            // instantly out of the room
            i.config.direction.z > 0,
        ) ??
        // fall back to any portal:
        iterateRoomItems(toRoom.items).find(isPortal)
      );

    default:
      changeType satisfies never;
  }
};

const backOffAndPushBack = <RoomId extends string, RoomItemId extends string>(
  playableItem: PlayableItem<CharacterName, RoomId, RoomItemId>,
  portalDirectionXy: Xyz,
  gameState: GameState<RoomId>,
  toRoom: RoomState<RoomId, RoomItemId>,
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

export const changeCharacterRoom = <
  RoomId extends string,
  RoomItemId extends string,
>(
  changeCharacterRoomOptions: ChangeCharacterRoomOptions<RoomId, RoomItemId>,
) => {
  const {
    playableItem,
    gameState,
    toRoomId,
    //positionRelativeToSourcePortal: maybePositionRelativeToSourcePortal,
    changeType,
    sourceItem,
  } = changeCharacterRoomOptions;

  /** TODO: @knownRoomIds - remove casts */
  const leavingRoom = gameState.characterRooms[
    playableItem.id as CharacterName
    // TODO: this cast is a bit off - 2/3 rooms are in scope here and not reason for them to have the same RoomItemId type
  ] as RoomState<RoomId, RoomItemId>;

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
    : /** TODO: @knownRoomIds - remove casts */
      (gameState.characterRooms[
        otherIndividualCharacterName(playableItem.id as IndividualCharacterName)
        // TODO: this cast is a bit off - 2/3 rooms are in scope here and not reason for them to have the same RoomItemId type
      ] as RoomState<RoomId, RoomItemId>);

  const campaign = selectCurrentCampaign(store.getState());
  const toRoomJson = campaign.rooms[toRoomId] as RoomJson<RoomId, RoomItemId>;
  if (toRoomJson === undefined) {
    throw new Error(`room ${toRoomId} does not exist in campaign`);
  }
  const toRoom: RoomState<RoomId, RoomItemId> =
    otherCharacterLoadedRoom?.id === toRoomId ?
      otherCharacterLoadedRoom
      // TODO: this cast is a bit off - 2/3 rooms are in scope here and not reason for them to have the same RoomItemId type
    : (loadRoom({
        roomJson: toRoomJson,
        roomPickupsCollected:
          gameState.pickupsCollected[toRoomId] ?? emptyObject,
        scrollsRead: store.getState().gameMenus.gameInPlay.scrollsRead,
      }) as RoomState<RoomId, RoomItemId>);

  // take the character out of the previous room:
  deleteItemFromRoom({ room: leavingRoom, item: playableItem });

  // heels can't carry items to different rooms:
  const heelsAbilities = selectHeelsAbilities(playableItem);
  if (heelsAbilities !== undefined) {
    heelsAbilities.carrying = null;
  }
  // latent movement does not apply outside of the room it was given in:
  playableItem.state.latentMovement = [];

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
  /** TODO: @knownRoomIds - remove casts */
  gameState.characterRooms[playableItem.id as CharacterName] = toRoom;

  // character is in the room, now let's update some of their state before the physics starts ticking again:
  if (changeCharacterRoomOptions.changeType === "teleport") {
    const {
      state: { toPosition: teleporterToBlockPosition },
    } = changeCharacterRoomOptions.sourceItem;

    playableItem.state.position = addXyz(
      blockXyzToFineXyz(teleporterToBlockPosition),
      positionRelativeToSourcePortal,
    );
  } else {
    // find the door (etc) in the new room to enter in:
    const destinationPortal = findDestinationPortal<RoomId, RoomItemId>(
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
    iterate(roomItemsIterable(toRoom.items))
      // colliding with the portal is normal - only warn for other collisions
      // on room enter:
      .filter((item) => item.type !== "portal"),
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

  /** TODO: @knownRoomIds - remove casts */
  gameState.entryState[playableItem.id as CharacterName] =
    entryState(playableItem);

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
    if (
      !gameState.entryState[
        /** TODO: @knownRoomIds - remove casts */
        otherIndividualCharacterName(playableItem.id as IndividualCharacterName)
      ]
    ) {
      gameState.entryState[
        /** TODO: @knownRoomIds - remove casts */
        otherIndividualCharacterName(playableItem.id as IndividualCharacterName)
      ] = gameState.entryState.headOverHeels;
    }
    delete gameState.entryState.headOverHeels;
  }

  store.dispatch(roomExplored(toRoomId));
  store.dispatch(
    characterRoomChange({ characterName: playableItem.type, roomId: toRoomId }),
  );
};
