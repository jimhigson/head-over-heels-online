import { Container, Graphics } from "pixi.js";
import { projectWorldXyzToScreenXy } from "./projectToScreen";
import { floorRenderExtent } from "./renderExtent";
import { moveSpeedPixPerMs } from "../physics/mechanicsConstants";
import type { AnyRoomJson } from "../../model/RoomJson";
import { wallTileSize } from "../../sprites/textureSizes";
import type { Xy } from "../../utils/vectors/vectors";
import { addXyz, subXy, lengthXy } from "../../utils/vectors/vectors";
import { detectDeviceType } from "../../utils/detectDeviceType";
import { defaultUserSettings } from "../../store/defaultUserSettings";
import type { RoomRenderContext, RoomTickContext } from "./RoomRenderContexts";
import type { SoundAndGraphicsOutput } from "./SoundAndGraphicsOutput";
import { selectCurrentPlayableItem } from "../gameState/gameStateSelectors/selectPlayableItem";
import type { RoomRendererType } from "./RoomRendererType";
import type { SetRequired } from "type-fest";

const scrollLimit = 0.33;
// how much to move the room up (at home position) to bring off the hud
const worldBottomMargin = detectDeviceType() === "mobile" ? -4 : 16;

// the height without the width - ie, the height from wall bottom on a x-coord of the sprite
// to the wall top on the same x-coord column
const wallHeight = wallTileSize.h - wallTileSize.w / 2;

const scrollSpeedPxPerMs = moveSpeedPixPerMs.heels;

/**
 * put the room on the screen in the right place - either scrolling, or at its home position similar to how
 * it would have been put onto the screen in the original game
 */
export class RoomScrollRenderer<
  RoomId extends string,
  RoomItemId extends string,
> implements RoomRendererType<RoomId, RoomItemId>
{
  #everRendered: boolean = false;
  #scrollableLeft: boolean;
  #scrollableRight: boolean;
  #scrollableUp: boolean;
  #edgeLeftXTranslated: number;
  #edgeRightXTranslated: number;
  /* the position the room 'wants' to be at - where it would be (roughly) in the original game without any scrolling */
  #roomHomePosition: Xy;

  public output: SetRequired<SoundAndGraphicsOutput, "graphics">;

  constructor(
    public readonly renderContext: RoomRenderContext<RoomId, RoomItemId>,
    private readonly childRenderer: RoomRendererType<RoomId, RoomItemId>,
  ) {
    const {
      room,
      general: {
        upscale: { gameEngineScreenSize: effectiveScreenSize },
        displaySettings,
      },
    } = renderContext;

    const { edgeLeftX, edgeRightX, frontSide, topEdgeY } = floorRenderExtent(
      room.roomJson,
    );
    // take into account the that floor isn't always rendered at 0,0:
    this.#edgeLeftXTranslated = edgeLeftX + frontSide.x;
    this.#edgeRightXTranslated = edgeRightX + frontSide.x;

    const renderingMedianX = (edgeRightX + edgeLeftX) / 2;

    this.#roomHomePosition = {
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
    this.#scrollableLeft =
      this.#roomHomePosition.x + this.#edgeLeftXTranslated < 0;
    // is there content off the right edge when the room is in its home position?
    this.#scrollableRight =
      this.#roomHomePosition.x + this.#edgeRightXTranslated >
      effectiveScreenSize.x;

    // scrollable up in y if the top of the room is off the top of the screen when in the home position:
    this.#scrollableUp = this.#roomHomePosition.y + topEdgeY - wallHeight < 0;

    const childRendererGraphics = this.childRenderer.output.graphics;
    if (childRendererGraphics === undefined) {
      throw new Error("can't scroll a renderer without graphics");
    }
    const output = {
      sound: this.childRenderer.output.sound,
      graphics: new Container({
        children: [childRendererGraphics],
        label: `RoomScrollRenderer(${room.id})`,
      }),
    };

    const showBoundingBoxes =
      displaySettings?.showBoundingBoxes ??
      defaultUserSettings.displaySettings.showBoundingBoxes;

    if (showBoundingBoxes !== "none") {
      // these aren't really bounding boxes, but it is useful to be abl to turn them on and I don't want to add
      // any more switches:
      output.graphics.addChild(
        showRoomScrollBounds(renderContext.room.roomJson),
      );
    }
    this.output = output;
  }

  tick(tickContext: RoomTickContext<RoomId, RoomItemId>) {
    const {
      general: {
        upscale: { gameEngineScreenSize: effectiveScreenSize },
        gameState,
      },
    } = this.renderContext;
    const { deltaMS } = tickContext;

    const playable = selectCurrentPlayableItem(gameState);
    if (playable === undefined) {
      // don't scroll if no lives left for either character
      return;
    }

    const characterProjectionInRoom = projectWorldXyzToScreenXy(
      playable.state.position,
    );

    const combinedProjectedPositionAtRoomHome = addXyz(
      characterProjectionInRoom,
      this.#roomHomePosition,
    );

    const targetRoomPositionWithScrolling = {
      x:
        (
          this.#scrollableLeft &&
          combinedProjectedPositionAtRoomHome.x <
            effectiveScreenSize.x * scrollLimit
        ) ?
          // scrolling to show more of the left side of the room
          Math.min(
            // x with left-edge of the room on the left edge of the screen:
            -this.#edgeLeftXTranslated,
            // put player on scrollLimit proportion of effective width:
            effectiveScreenSize.x * scrollLimit - characterProjectionInRoom.x,
          )
        : (
          this.#scrollableRight &&
          combinedProjectedPositionAtRoomHome.x >
            effectiveScreenSize.x * (1 - scrollLimit)
        ) ?
          // scrolling to show more of the right side of the room
          Math.max(
            // x with right-edge of the room on the right edge of the screen:
            effectiveScreenSize.x - this.#edgeRightXTranslated,
            // x that puts the player on the (1-scrollLimit) proportion of the screen:
            effectiveScreenSize.x * (1 - scrollLimit) -
              characterProjectionInRoom.x,
          )
        : this.#roomHomePosition.x,
      y:
        (
          this.#scrollableUp &&
          combinedProjectedPositionAtRoomHome.y <
            effectiveScreenSize.y * scrollLimit
        ) ?
          effectiveScreenSize.y * scrollLimit - characterProjectionInRoom.y
        : this.#roomHomePosition.y,
    };

    const container = this.output.graphics;

    // ease towards from current rendering:
    const snapInstantly = !this.#everRendered;
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
    this.#everRendered = true;

    this.childRenderer.tick(tickContext);
  }

  destroy(): void {
    this.output.graphics.destroy({ children: true });
    this.childRenderer.destroy();
  }
}

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
