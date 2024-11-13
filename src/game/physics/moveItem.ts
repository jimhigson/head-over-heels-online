import type {
  ItemInPlay,
  PlayableItem,
  UnknownItemInPlay,
} from "@/model/ItemInPlay";
import { isItemType, isPlayableItem } from "@/model/ItemInPlay";
import type { AxisXyz, Xyz } from "@/utils/vectors";
import { addXyz, axesXyz, originXyz, subXyz, xyzEqual } from "@/utils/vectors";
import { collision1toMany } from "../collision/aabbCollision";
import type { GameState } from "../gameState/GameState";
import { currentRoom, pickupCollected } from "../gameState/GameState";
import { changeCharacterRoom } from "../gameState/changeCharacterRoom";
import type { PlanetName } from "@/sprites/planets";
import { blockSizePx } from "@/sprites/spritePivots";
import { iterate } from "@/utils/iterate";
import { objectValues } from "iter-tools";
import { teleportAnimationDuration } from "../render/animationTimings";

/*
 * colliding with doors is a special case - since they are so narrow, the playable character
 * slides sideways into their opening, to make them easier to walk through
 */
export const slideOnDoors = (
  xyzDelta: Xyz,
  collisionsWithSolids: Iterable<UnknownItemInPlay>,
): Xyz => {
  // it is only possible (at least in normal level design) to collide with one door at once
  // so take the first one:
  const doorPart = iterate(collisionsWithSolids).find(
    isItemType("doorFar", "doorNear"),
  );

  if (doorPart === undefined) {
    return originXyz;
  }

  const {
    type: typeC,
    config: { axis },
  } = doorPart;

  return (
    typeC === "doorFar" ?
      {
        x: axis === "x" ? -Math.abs(xyzDelta.y) : 0,
        y: axis === "y" ? -Math.abs(xyzDelta.x) : 0,
        z: 0,
      }
    : typeC === "doorNear" ?
      {
        x: axis === "x" ? Math.abs(xyzDelta.y) : 0,
        y: axis === "y" ? Math.abs(xyzDelta.x) : 0,
        z: 0,
      }
    : originXyz
  );
};

export const protectAgainstIntersecting = (
  item: UnknownItemInPlay,
  xyzDelta: Xyz,
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
      const backedOffXyPositionForCollisionItem = axesXyz.reduce<Xyz>(
        (ac: Xyz, axis: AxisXyz) => {
          if (xyzDelta[axis] !== 0) {
            const aC = posC[axis];

            if (xyzDelta[axis] > 0) {
              // moving positive (left/away/up)
              // - clamp to the right/towards/bottom edge of the item:
              const minAC = Math.min(aC, aC + bbC[axis]);
              return {
                ...ac,
                [axis]: minAC - item.aabb[axis],
              };
            } else {
              // moving negative (right/towards/down)
              // - clamp to the left/away/top edge of the item:
              const maxAC = Math.max(aC, aC + bbC[axis]);
              return {
                ...ac,
                [axis]: maxAC,
              };
            }
          }
          return ac;
        },
        posAc,
      );

      return backedOffXyPositionForCollisionItem;
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
  pickup.state.expires = gameState.gameTime + teleportAnimationDuration;
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
  xyzDeltaPartial: Partial<Xyz>,
  gameState: GameState<RoomId>,
) => {
  const xyzDelta = addXyz(originXyz, xyzDeltaPartial);
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
  const correctedPosition1 = protectAgainstIntersecting(
    subjectItem,
    xyzDelta,
    targetPosition,
    solidItems,
  );

  const correctedPosition2 =
    // only players slide on doors:
    isPlayableItem(subjectItem) ?
      addXyz(correctedPosition1, slideOnDoors(xyzDelta, solidItems))
    : correctedPosition1;

  if (!xyzEqual(correctedPosition2, previousPosition)) {
    subjectItem.state.position = correctedPosition2;
    subjectItem.renderPositionDirty = true;
  }
};
