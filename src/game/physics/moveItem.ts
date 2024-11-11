import type {
  ItemInPlay,
  PlayableItem,
  UnknownItemInPlay,
} from "@/model/ItemInPlay";
import { isItemType, isPlayableItem } from "@/model/ItemInPlay";
import type { AxisXyz, Xyz } from "@/utils/vectors";
import { addXyz, axesXyz, subXyz, xyzEqual } from "@/utils/vectors";
import { collision1toMany } from "../collision/aabbCollision";
import type { GameState } from "../gameState/GameState";
import { currentRoom, pickupCollected } from "../gameState/GameState";
import { changeCharacterRoom } from "../gameState/changeCharacterRoom";
import type { PlanetName } from "@/sprites/planets";
import { blockSizePx } from "@/sprites/spritePivots";
import { iterate } from "@/utils/iterate";
import { objectValues } from "iter-tools";

export const protectAgainstIntersecting = (
  item: UnknownItemInPlay,
  xyzDelta: Partial<Xyz>,
  targetPosition: Xyz,
  collisionsWithSolids: Iterable<UnknownItemInPlay>,
) => {
  // right now the only reaction to collisions is to not move as far. This could also be pushing the item,
  // or dying (if it is deadly), and maybe some others
  const correctedPosition = iterate(collisionsWithSolids).reduce<Xyz>(
    /**
     * @param collisionItem the item collided with
     * @returns
     */
    (
      posAc: Xyz,
      { state: { position: posC }, aabb: bbC }: UnknownItemInPlay,
    ) => {
      // roll back acPos to just prior to the collision in each axis:
      return axesXyz.reduce<Xyz>((ac: Xyz, axis: AxisXyz) => {
        if (xyzDelta[axis] !== 0) {
          const aC = posC[axis];
          if (xyzDelta[axis] === undefined) {
            return ac;
          }

          if (xyzDelta[axis] > 0) {
            // moving positive (left/away/up)
            const minAC = Math.min(aC, aC + bbC[axis]);
            return {
              ...ac,
              [axis]: minAC - item.aabb[axis],
            };
          } else {
            // moving negative (right/towards/down)
            const maxAC = Math.max(aC, aC + bbC[axis]);
            return {
              ...ac,
              [axis]: maxAC,
            };
          }
        }
        return ac;
      }, posAc);
    },
    targetPosition,
  );

  return correctedPosition;
};

const handlePlayerTouchingPickup = <RoomId extends string>(
  gameState: GameState<RoomId>,
  player: PlayableItem,
  pickup: ItemInPlay<"pickup">,
) => {
  const roomId = currentRoom(gameState).id;
  if (pickupCollected(gameState, roomId, pickup.id)) {
    // ignore already picked up items
    return;
  }

  const roomPickupCollections = gameState.pickupsCollected[roomId] as Record<
    string,
    true
  >;
  roomPickupCollections[pickup.id] = true;
  pickup.renderingDirty = true;

  switch (pickup.config.gives) {
    case "extra-life":
      player.state.lives += 2;
  }
};

const handlePlayerTouchingPortal = <RoomId extends string>(
  gameState: GameState<RoomId>,
  player: PlayableItem,
  portal: ItemInPlay<"portal", PlanetName, RoomId>,
) => {
  changeCharacterRoom(
    gameState,
    portal.config.toRoom,
    subXyz(player.state.position, portal.config.relativePoint),
  );
  // automatically walk forward a short way in the new room to put character properly
  // inside the room (this doesn't happen for entering a room via teleporting or falling/climbing
  //  - only doors)
  // TODO: maybe this should be side-effect free
  player.state.autoWalkDistance = blockSizePx.w * 0.75;
};

/**
 * @param subjectItem the item that is wanting to move
 * @param xyzDelta
 */
export const moveItem = <RoomId extends string>(
  subjectItem: UnknownItemInPlay,
  xyzDelta: Partial<Xyz>,
  gameState: GameState<RoomId>,
) => {
  const room = currentRoom(gameState);
  const {
    state: { position: previousPosition },
  } = subjectItem;
  const targetPosition = addXyz(previousPosition, xyzDelta);

  const collisions = collision1toMany(
    {
      aabb: subjectItem.aabb,
      state: { position: targetPosition },
      id: subjectItem.id,
    },
    objectValues(room.items),
  );

  const solidItems =
    collisions.filter(
      (item) =>
        item.type !== "portal" &&
        // a collected pickup is just an animation out that should not be interacted with
        !(
          item.type === "pickup" && pickupCollected(gameState, room.id, item.id)
        ) &&
        !(item.type === "pickup" && isPlayableItem(subjectItem)) &&
        !(subjectItem.type === "pickup" && isPlayableItem(item)),
    ) || [];

  if (isPlayableItem(subjectItem)) {
    const {
      portal = [],
      deadly = [],
      pickup = [],
    } = Object.groupBy(collisions, (colItem) => colItem.onTouch) as {
      portal: Array<ItemInPlay<"portal", PlanetName, RoomId>>;
      deadly: Array<
        | ItemInPlay<"baddie", PlanetName, RoomId>
        | ItemInPlay<"deadly-block", PlanetName, RoomId>
      >;
      pickup: Array<ItemInPlay<"pickup", PlanetName, RoomId>>;
    };

    const firstPortal = portal.at(0);
    if (
      firstPortal !== undefined &&
      // don't use portals if autowalking - otherwise would flip right back to the previous room
      subjectItem.state.autoWalkDistance === 0
    ) {
      handlePlayerTouchingPortal(gameState, subjectItem, firstPortal);
      return;
    }

    if (deadly?.length) {
      console.log("LOSE a life");
    }
    for (const p of pickup) {
      handlePlayerTouchingPickup(gameState, subjectItem, p);
    }
  }

  if (isItemType("pickup")(subjectItem)) {
    const player = collisions.find(isPlayableItem);
    if (player !== undefined) {
      handlePlayerTouchingPickup(gameState, player, subjectItem);
    }
  }

  // right now the only reaction to collisions is to not move as far. This could also be pushing the item,
  // or dying (if it is deadly), and maybe some others
  const correctedPosition = protectAgainstIntersecting(
    subjectItem,
    xyzDelta,
    targetPosition,
    solidItems,
  );

  if (!xyzEqual(correctedPosition, previousPosition)) {
    subjectItem.state.position = correctedPosition;
    subjectItem.renderPositionDirty = true;
  }
};
