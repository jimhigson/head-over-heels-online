import type { ItemInPlay } from "@/model/ItemInPlay";
import type { PlayableItem } from "@/game/physics/itemPredicates";
import { isItemType, isPortal } from "@/game/physics/itemPredicates";
import type { GameState } from "../GameState";
import { loadRoom } from "../loadRoom/loadRoom";
import type { SceneryName } from "@/sprites/planets";
import type { Xyz } from "@/utils/vectors/vectors";
import { addXyz, originXyz, scaleXyz } from "@/utils/vectors/vectors";
import { objectValues } from "iter-tools";
import { iterate } from "@/utils/iterate";
import { entryState } from "../PlayableEntryState";
import type { CharacterName, RoomState } from "@/model/modelTypes";
import { otherIndividualCharacterName } from "@/model/modelTypes";
import { blockSizePx } from "@/sprites/spritePivots";
import { collision1toMany } from "@/game/collision/aabbCollision";
import { makeItemFadeOut } from "./makeItemFadeOut";
import { deleteItemFromRoom } from "./deleteItemFromRoom";
import { selectHeelsAbilities } from "../gameStateSelectors/selectPlayableItem";
import { removeStandingOn } from "./modifyStandingOn";

export type ChangeType = "teleport" | "portal" | "level-select";

type ChangeCharacterRoomOptions<RoomId extends string> =
  | {
      gameState: GameState<RoomId>;
      playableItem: PlayableItem<CharacterName, NoInfer<RoomId>>;
      changeType: "portal";
      toRoomId: NoInfer<NoInfer<RoomId>>;
      /* position relative to the portal in the source room */
      sourcePortal: ItemInPlay<"portal", SceneryName, NoInfer<RoomId>>;
      positionRelativeToSourcePortal: Xyz;
      /* if true, the position in the source and destimation room will be exactly maintained */
    }
  | {
      gameState: GameState<RoomId>;
      playableItem: PlayableItem<CharacterName, NoInfer<RoomId>>;
      changeType: "teleport" | "level-select";
      toRoomId: NoInfer<NoInfer<RoomId>>;
      sourcePortal?: undefined;
      /* position relative to the portal in the source room */
      positionRelativeToSourcePortal?: undefined;
      /* if true, the position in the source and destimation room will be exactly maintained */
    };

const findDestinationPortal = <RoomId extends string>(
  changeType: "portal" | "level-select",
  toRoom: RoomState<SceneryName, RoomId>,
  fromRoom: RoomState<SceneryName, RoomId>,
): ItemInPlay<"portal", SceneryName, RoomId> | undefined => {
  switch (changeType) {
    case "portal":
      return iterate(objectValues(toRoom.items)).find(
        (i): i is ItemInPlay<"portal", SceneryName, RoomId> =>
          isPortal(i) && i.config.toRoom === fromRoom.id,
      );

    case "level-select":
      return (
        // find a door in the right direction:
        iterate(objectValues(toRoom.items)).find(
          (i): i is ItemInPlay<"portal", SceneryName, RoomId> =>
            isPortal(i) &&
            // any horizontal portal (ie, not floor/ceiling)
            i.config.direction.z === 0,
          // fall back to horizontal/vertical portal:
        ) || iterate(objectValues(toRoom.items)).find(isPortal)
      );

    default:
      changeType satisfies never;
  }
};

export const changeCharacterRoom = <RoomId extends string>({
  playableItem,
  gameState,
  toRoomId,
  positionRelativeToSourcePortal = originXyz,
  changeType,
  sourcePortal,
}: ChangeCharacterRoomOptions<RoomId>) => {
  const leavingRoom = gameState.characterRooms[playableItem.id];

  if (leavingRoom === undefined) {
    throw new Error(`${playableItem.id} is not in a room on the gameState`);
  }

  if (toRoomId === leavingRoom.id) {
    throw new Error(
      `Can't move ${playableItem.id} to the same room "${toRoomId}""`,
    );
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

  if (changeType !== "teleport") {
    // find the door (etc) in the new room to enter in:
    const destinationPortal = findDestinationPortal(
      changeType,
      toRoom,
      leavingRoom,
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
      sourcePortal,
    );

    if (destinationPortal === undefined) {
      throw new Error(
        `trying to move ${playableItem.id} from ${leavingRoom.id} --to-> ${toRoomId} but no portal back the other way to locate with`,
      );
    }

    playableItem.state.position = addXyz(
      destinationPortal.state.position,
      destinationPortal.config.relativePoint,
      positionRelativeToSourcePortal,
      // an extra boost of one block when travelling up - this is because the room above won't have a floor
      // so the player needs to stand on a block, which is one block high, and they need to get up on top of it
      changeType === "portal" && sourcePortal.config.direction.z > 0 ?
        { z: blockSizePx.h }
      : {},
    );

    const heelsAbilities = selectHeelsAbilities(playableItem);
    if (heelsAbilities !== undefined) {
      // can't carry items through rooms
      heelsAbilities.carrying = null;
    }
    if (playableItem.type === "head" || playableItem.type === "headOverHeels") {
      const hushPuppyInRoomIter = iterate(objectValues(toRoom.items)).filter(
        isItemType("hushPuppy"),
      );
      // hush puppies don't like head:
      for (const hushPuppyBye of hushPuppyInRoomIter) {
        makeItemFadeOut({ touchedItem: hushPuppyBye, gameState, room: toRoom });
      }
    }

    console.log(
      "character put down at",
      playableItem.state.position,
      "which is relative to",
      "destination portal position",
      destinationPortal.state.position,
      destinationPortal.config.relativePoint,
      positionRelativeToSourcePortal,
    );

    const {
      config: { direction: portalDirection },
    } = destinationPortal;
    if (
      // portal is horizontal - not up or down
      portalDirection.z === 0
    ) {
      const portalDirectionXy = portalDirection;
      // automatically walk forward a short way in the new room to put character properly
      // inside the room (this doesn't happen for entering a room via teleporting or falling/climbing
      //  - only doors)
      // TODO: maybe this should be side-effect free
      playableItem.state.autoWalk = true;

      // face the character the way they should have walked through the portal - this
      // is usually a no-op since they had to be walking that way to get through, but
      // it is possible they were pushed through and the autowalk needs to go in
      // the right direction
      playableItem.state.facing = scaleXyz(portalDirectionXy, -1);

      // if the new position collides with the other character, back off some more so we can push them into
      // the room - serves them right for standing in the way:
      /*
      // this isn't quite right and is causing bugs - should only actually move by the amount of the overlap
      // alternatively, make the floor bigger and start futher back
      const collisionsWithPlayers = collision1toMany(
        playableItem,
        objectValues(toRoom.items),
      ).filter(isPlayableItem);
      for (const otherPlayer of collisionsWithPlayers) {
        console.log(
          "pushing other player in doorway by",
          scaleXyz(unitVectors[portalDirectionXy], playableItem.aabb.x),
        );        
        moveItem({
          gameState,
          room: toRoom,
          subjectItem: otherPlayer,
          pusher: playableItem,
          forceful: true,
          deltaMS: 15,
          posDelta: scaleXyz(
            unitVectors[oppositeDirection(portalDirectionXy)],
            playableItem.aabb.x,
          ),
        });
      }*/

      if (playableItem.state.action === "idle")
        playableItem.state.action = "moving";
    }
  }
  // when we put the playableItem in their new room, they won't be standing on anything yet (or will
  // still have their standing on set to an item in the previous room) - for example, they might
  // be already on the floor or a teleporter in the new room. By setting this to null, gravity will
  // apply to them and they will collide with the item below them and get standingOn set:
  removeStandingOn(playableItem);
  for (const standerOn of playableItem.state.stoodOnBy) {
    removeStandingOn(standerOn);
  }

  // remove the character from the new room if they're already there - this only really happens
  // if the room is their starting room (so they're in it twice since they appear in the starting room
  // by default):
  deleteItemFromRoom({ room: toRoom, item: playableItem });

  // but the character into the (probably newly loaded) room:
  (toRoom.items[playableItem.id] as typeof playableItem) = playableItem;

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

  // update game state to know which room this character is now in:
  gameState.characterRooms[playableItem.id] = toRoom;
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
};
