import { Graphics, type Container } from "pixi.js";
import type { PlayableItem } from "../physics/itemPredicates";
import { projectWorldXyzToScreenXy } from "./projectToScreen";
import { floorRenderExtent } from "./renderExtent";
import { moveSpeedPixPerMs } from "../physics/mechanicsConstants";
import type { UnknownRoomState } from "../../model/modelTypes";
import type { AnyRoomJson } from "../../model/RoomJson";
import { wallTileSize } from "../../sprites/textureSizes";
import type { Xy } from "../../utils/vectors/vectors";
import { addXyz, subXy, lengthXy } from "../../utils/vectors/vectors";

const scrollLimit = 0.33;
// how much to move the room up (at home position) to bring off the hud
const worldBottomMargin = 16;

// the height without the width - ie, the height from wall bottom on a x-coord of the sprite
// to the wall top on the same x-coord column
const wallHeight = wallTileSize.h - wallTileSize.w / 2;

const scrollSpeedPxPerMs = moveSpeedPixPerMs.heels;

/**
 * put the room on the screen in the right place - either scrolling, or at its home position similar to how
 * it would have been put onto the screen in the original game
 */
export const positionRoom = (
  room: UnknownRoomState,
  container: Container,
  effectiveScreenSize: Xy,
) => {
  const { edgeLeftX, edgeRightX, frontSide, topEdgeY } = floorRenderExtent(
    room.roomJson,
  );
  // take into account the that floor isn't always rendered at 0,0:
  const edgeLeftXTranslated = edgeLeftX + frontSide.x;
  const edgeRightXTranslated = edgeRightX + frontSide.x;

  const renderingMedianX = (edgeRightX + edgeLeftX) / 2;

  // the position the room 'wants' to be at - where it would be (roughly) in the original game without any scrolling
  const roomHomePosition = {
    x: effectiveScreenSize.x / 2 - renderingMedianX,
    y:
      effectiveScreenSize.y -
      worldBottomMargin -
      frontSide.y -
      /* moving up by half the x offset preserves movement in 2:1 ratio of isometric projection
       - while also avoiding the hud elements */
      Math.abs(renderingMedianX / 2),
  };

  // is there content off the left edge when the room is in its home position?
  const scrollableLeft = roomHomePosition.x + edgeLeftXTranslated < 0;
  // is there content off the right edge when the room is in its home position?
  const scrollableRight =
    roomHomePosition.x + edgeRightXTranslated > effectiveScreenSize.x;

  // scrollable up in y if the top of the room is off the top of the screen when in the home position:
  const scrollableUp = roomHomePosition.y + topEdgeY - wallHeight < 0;

  /**
   * @param playable - undefined only if game over (both players have no lives)
   */
  return (
    playable: PlayableItem | undefined,
    deltaMS: number,
    snapInstantly: boolean,
  ) => {
    if (playable === undefined) {
      // don't scroll if no lives left for either character
      return;
    }

    const characterProjectionInRoom = projectWorldXyzToScreenXy(
      playable.state.position,
    );

    const combinedProjectedPositionAtRoomHome = addXyz(
      characterProjectionInRoom,
      roomHomePosition,
    );

    const targetRoomPositionWithScrolling = {
      x:
        (
          scrollableLeft &&
          combinedProjectedPositionAtRoomHome.x <
            effectiveScreenSize.x * scrollLimit
        ) ?
          // scrolling to show more of the left side of the room
          Math.min(
            // x with left-edge of the room on the left edge of the screen:
            -edgeLeftXTranslated,
            // put player on scrollLimit proportion of effective width:
            effectiveScreenSize.x * scrollLimit - characterProjectionInRoom.x,
          )
        : (
          scrollableRight &&
          combinedProjectedPositionAtRoomHome.x >
            effectiveScreenSize.x * (1 - scrollLimit)
        ) ?
          // scrolling to show more of the right side of the room
          Math.max(
            // x with right-edge of the room on the right edge of the screen:
            effectiveScreenSize.x - edgeRightXTranslated,
            // x that puts the player on the (1-scrollLimit) proportion of the screen:
            effectiveScreenSize.x * (1 - scrollLimit) -
              characterProjectionInRoom.x,
          )
        : roomHomePosition.x,
      y:
        (
          scrollableUp &&
          combinedProjectedPositionAtRoomHome.y <
            effectiveScreenSize.y * scrollLimit
        ) ?
          effectiveScreenSize.y * scrollLimit - characterProjectionInRoom.y
        : roomHomePosition.y,
    };

    // ease towards from current rendering:
    if (snapInstantly) {
      container.x = targetRoomPositionWithScrolling.x;
      container.y = targetRoomPositionWithScrolling.y;
    } else {
      const maxScrollDelta = scrollSpeedPxPerMs * deltaMS;
      const targetScrollDelta = subXy(
        container,
        targetRoomPositionWithScrolling,
      );
      const targetScrollDeltaLength = lengthXy(targetScrollDelta);

      if (targetScrollDeltaLength > maxScrollDelta) {
        const scrollDirectionUnitVector = {
          x: targetScrollDelta.x / targetScrollDeltaLength,
          y: targetScrollDelta.y / targetScrollDeltaLength,
        };

        container.x -= scrollDirectionUnitVector.x * maxScrollDelta;
        container.y -= scrollDirectionUnitVector.y * maxScrollDelta;
      } else {
        container.x = targetRoomPositionWithScrolling.x;
        container.y = targetRoomPositionWithScrolling.y;
      }
    }
  };
};

/**
 * for debugging, show scroll info overlaid on a room
 */
export const showRoomScrollBounds = (roomJson: AnyRoomJson) => {
  const { edgeLeftX, edgeRightX, frontSide, topEdgeY } =
    floorRenderExtent(roomJson);

  //const wallHeight = 0;

  const graphics = new Graphics()
    .rect(
      edgeLeftX + frontSide.x,
      topEdgeY - wallHeight,
      edgeRightX - edgeLeftX,
      frontSide.y - topEdgeY + wallHeight,
    )
    .stroke("red")
    .rect(
      edgeLeftX + frontSide.x,
      topEdgeY,
      edgeRightX - edgeLeftX,
      frontSide.y - topEdgeY,
    )
    .stroke("blue");

  return graphics;
};
