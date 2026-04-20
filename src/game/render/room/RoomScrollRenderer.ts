import type { SetRequired } from "type-fest";

import { Container, Graphics } from "pixi.js";

import type { RoomState } from "../../../model/RoomState";
import type { Xy, Xyz } from "../../../utils/vectors/vectors";
import type { SoundAndGraphicsOutput } from "../SoundAndGraphicsOutput";
import type {
  RoomRenderContextInGame,
  RoomTickContext,
} from "./RoomRenderContexts";
import type {
  RoomRendererType,
  RoomRendererTypeInGameOnly,
} from "./RoomRendererType";

import { defaultUserSettings } from "../../../store/slices/gameMenus/defaultUserSettings";
import { epsilon } from "../../../utils/epsilon";
import { neverTime } from "../../../utils/neverTime";
import { assignRoundedXy } from "../../../utils/pixi/assignRoundedXy";
import {
  addXy,
  addXyz,
  lengthXySquared,
  scaleXy,
  scaleXyz,
  subXy,
  subXyz,
} from "../../../utils/vectors/vectors";
import { selectCurrentPlayableItem } from "../../gameState/gameStateSelectors/selectPlayableItem";
import { projectWorldXyzToScreenXy } from "../projections";
import { floorsRenderExtent } from "./floorsExtent";

// how close over towards the edge of the screen do you have to be for scrolling to occur?
// a higher value means more scrolling will occur.
// 0.33 is generally good for original game levels, 0.4 is good for new remake-specific levels
// with more verticality
const scrollLimitCoefficient = 0.4;

/** roughly how long the eased scrolling should aim to catch up with where its
 *  target position is */
const scrollCatchupPeriod = 300;

/**
 * If the scroll delta squared is less than this, don't bother with any scrolling.
 * Avoids very small scroll steps at the end of easing
 * Also allows a little bit of movement relative to the screen when 'setting off'
 * on a motion or turning 180° */
const smallestScrollSquared = 36; // 6²

/**
 * pixels per ms with axis=1 (or -1) - stick at the limit or key pressed
 */
const controllerOrKeyboardLookSpeed = 0.2; // 200px/second

/**
 * how long after looking until the scrolling starts to revert?
 */
const periodUntilLookRevert = 1_250;

const easeTowards = (vector: Xy, deltaMS: number) => {
  // move towards at 100% per catchup period (but will back off/ease as
  // that distance gets smaller):
  return scaleXy(vector, Math.min(1, deltaMS / scrollCatchupPeriod));
};

/**
 * the edge of the screen will stop this much short of the edge of the room
 * while on-screen controls are enabled, so the on-screen controls don't overlap
 * the content too much
 * test in:
 *  #blacktooth35
 *  #bookworld28
 *  #bookworld31
 *  #moonbase33triple
 *
 */
const onScreenControlsOverscroll = 64;

/**
 * put the room on the screen in the right place - either scrolling, or at its home position similar to how
 * it would have been put onto the screen in the original game
 */
export class RoomScrollRenderer<
  RoomId extends string,
  RoomItemId extends string,
> implements RoomRendererTypeInGameOnly<RoomId, RoomItemId>
{
  /** the current position, not counting looking */
  #curScroll: Xy = { x: 0, y: 0 };
  /** the user's input into looking around */
  #lookOffset: Xy = { x: 0, y: 0 };
  #lastLookTime: number = neverTime;

  #everRendered: boolean = false;
  #scrollableLeft: boolean;
  #scrollableRight: boolean;
  #scrollableUp: boolean;
  #edgeLeftXTranslated: number;
  #edgeRightXTranslated: number;
  /* the position the room 'wants' to be at - where it would be (roughly) in the original game without any scrolling */
  #roomHomePosition: Xy;

  public output: SetRequired<SoundAndGraphicsOutput, "graphics">;

  readonly renderContext: RoomRenderContextInGame<RoomId, RoomItemId>;
  #childRenderer: RoomRendererType<RoomId, RoomItemId>;

  constructor(
    renderContext: RoomRenderContextInGame<RoomId, RoomItemId>,
    childRenderer: RoomRendererType<RoomId, RoomItemId>,
  ) {
    this.renderContext = renderContext;
    this.#childRenderer = childRenderer;
    const {
      room,
      general: {
        upscale: { gameEngineScreenSize: effectiveScreenSize },
        displaySettings,
      },
    } = renderContext;

    const onScreenControls =
      renderContext.general.onScreenControls ??
      defaultUserSettings.onScreenControls;

    const {
      floors: {
        edgeLeftX: floorsEdgeLeftX,
        edgeRightX: floorsEdgeRightX,
        bottomEdgeY: floorsBottomEdgeY,
      },
      allItems: { topEdgeY: allItemsTopEdgeY },
    } = floorsRenderExtent(room);
    // take into account the that floor isn't always rendered at 0,0:
    this.#edgeLeftXTranslated = floorsEdgeLeftX;
    this.#edgeRightXTranslated = floorsEdgeRightX;

    let renderingMedianX = (floorsEdgeRightX + floorsEdgeLeftX) / 2;

    const roomRenderingWidth = floorsEdgeRightX - floorsEdgeLeftX;
    const roomRenderingHeight = floorsBottomEdgeY - allItemsTopEdgeY;
    const fitsInY = effectiveScreenSize.y >= roomRenderingHeight;
    const fitsInX = effectiveScreenSize.x >= roomRenderingWidth;
    const roomFitsOnScreen = fitsInY && fitsInX;

    if (fitsInX && !onScreenControls) {
      // if we have space, reduce renderingMedianX towards zero to make the room
      // more centred in the ui, which also brings it lower in the ui, allowing more
      // of the higher parts to be seen
      renderingMedianX /= 2;
    }

    // how much to move the room up (at home position) to bring off the hud
    const bottomMargin =
      onScreenControls ?
        // probably on mobile space is super-tight and we don't have the traditional hud to worry about
        // - allow half a playable block to go off-screen
        -4
      : fitsInY ?
        // like the original:
        16
        // we don't fit so we're going to not sacrifice vertical y space to the gap
        // at the bottom - the very bottom standable pixel will be at the bottom of the screen, overlapping the hud
      : 0;

    this.#roomHomePosition = {
      x: effectiveScreenSize.x / 2 - renderingMedianX,
      y:
        fitsInY && onScreenControls ?
          // streamlined version for rooms that fit on the screen in y on mobile - simply centre vertically:
          Math.floor((effectiveScreenSize.y + roomRenderingHeight) / 2) - 4
        : effectiveScreenSize.y -
          bottomMargin -
          floorsBottomEdgeY -
          (roomFitsOnScreen && !onScreenControls ?
            /* similar to the original's (non-scrolling) room  positioning on screen: moving up by half
             the x offset creates movement in the 2:1 isometric projection along the x/y in-game axes;
             also avoids the hud elements since they are set up at about 2:1 ratio 
             
             test on (eg #egyptus33 or #egyptus35)
             */
            Math.abs(renderingMedianX / 2)
            // ignore this adjustment on mobile since we are free to let the room render all the way down
            // to the bottom of the screen
            // ignore this adjustment if the room is wider than the screen - it tends to force a
            // black space below, especially on non-rectangular 'big' rooms and mobile-sized displays, where
          : 0),
    };

    // is there content off the left edge when the room is in its home position?
    this.#scrollableLeft =
      // < 0 performs poorly in #blacktooth35, #bookworld3 since the door coming into the room will be under the
      // hud joystick
      this.#roomHomePosition.x + this.#edgeLeftXTranslated < 0;
    // is there content off the right edge when the room is in its home position?
    this.#scrollableRight =
      this.#roomHomePosition.x + this.#edgeRightXTranslated >
      effectiveScreenSize.x;

    // scrollable up in y if the top of the room is off the top of the screen when
    // in the home position:
    this.#scrollableUp = this.#roomHomePosition.y + allItemsTopEdgeY < 0;

    const childRendererGraphics = this.#childRenderer.output.graphics;
    if (childRendererGraphics === undefined) {
      throw new Error("can't scroll a renderer without graphics");
    }
    const output = {
      sound: this.#childRenderer.output.sound,
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
      output.graphics.addChild(showRoomScrollBounds(renderContext.room));
    }
    this.output = output;
  }

  #targetRoomPosition(playablePosition: Xyz): Xy {
    const {
      general: {
        upscale: { gameEngineScreenSize: effectiveScreenSize },
        onScreenControls,
      },
    } = this.renderContext;

    const characterProjectionInRoom =
      projectWorldXyzToScreenXy(playablePosition);

    let x: number;
    let y: number;

    const overscroll = onScreenControls ? onScreenControlsOverscroll : 0;
    const { x: homeX, y: homeY } = this.#roomHomePosition;
    const combinedProjectedPositionAtRoomHome = addXy(
      characterProjectionInRoom,
      this.#roomHomePosition,
    );

    if (
      this.#scrollableLeft &&
      combinedProjectedPositionAtRoomHome.x <
        effectiveScreenSize.x * scrollLimitCoefficient
    ) {
      const adjustedPlayerX = Math.max(
        characterProjectionInRoom.x,
        onScreenControls ?
          this.#edgeLeftXTranslated + onScreenControlsOverscroll
          // unit value of .max (no effect)
        : Number.NEGATIVE_INFINITY,
      );

      const maxX =
        effectiveScreenSize.x * scrollLimitCoefficient - adjustedPlayerX;

      // scrolling to show more of the left side of the room
      x = Math.min(
        // x with left-edge of the room on the left edge of the screen - ie the
        // most left-scrolled position we will go to:
        -this.#edgeLeftXTranslated + overscroll,
        // put player on scrollLimit proportion of effective width:
        maxX,
      );
    } else if (
      this.#scrollableRight &&
      combinedProjectedPositionAtRoomHome.x >
        effectiveScreenSize.x * (1 - scrollLimitCoefficient)
    ) {
      const adjustedPlayerX = Math.min(
        characterProjectionInRoom.x,
        onScreenControls ?
          this.#edgeRightXTranslated - onScreenControlsOverscroll
        : Number.POSITIVE_INFINITY,
      );

      const minX =
        // x that puts the player on the (1-scrollLimit) proportion of the screen:
        effectiveScreenSize.x * (1 - scrollLimitCoefficient) - adjustedPlayerX;

      // scrolling to show more of the right side of the room
      x = Math.max(
        // x with right-edge of the room on the right edge of the screen:
        effectiveScreenSize.x - this.#edgeRightXTranslated - overscroll,

        minX,
      );
    } else {
      // not scrolling in x - staying in home position
      x = homeX;
    }

    if (
      this.#scrollableUp &&
      combinedProjectedPositionAtRoomHome.y <
        effectiveScreenSize.y * scrollLimitCoefficient
    ) {
      y =
        effectiveScreenSize.y * scrollLimitCoefficient -
        characterProjectionInRoom.y;
    } else {
      y = homeY;
    }

    return { x, y };
  }

  #updateOutputXy() {
    const {
      general: {
        upscale: { gameEngineUpscale },
      },
    } = this.renderContext;
    const scroll = this.#curScroll;
    const outputGraphics = this.output.graphics;

    const xyPlusLook = addXy(scroll, this.#lookOffset);

    assignRoundedXy(
      outputGraphics,
      xyPlusLook.x,
      xyPlusLook.y,
      gameEngineUpscale,
    );
  }

  #tickLookOffset(tickContext: RoomTickContext<RoomId, RoomItemId>) {
    const {
      general: { gameState },
      room: { roomTime },
    } = this.renderContext;
    const { deltaMS } = tickContext;

    const {
      inputStateTracker: {
        lookVector: controllerOrKeyboardLookVector,
        hudInputState: { lookVector: hudLookVector },
      },
    } = gameState;

    if (
      lengthXySquared(controllerOrKeyboardLookVector) +
        lengthXySquared(hudLookVector) <
      epsilon
    ) {
      if (this.#lastLookTime < roomTime - periodUntilLookRevert) {
        // no looking for a while. start to decay the lookOffset to decay the
        // looking back to centring on the character
        this.#lookOffset = subXy(
          this.#lookOffset,
          easeTowards(this.#lookOffset, deltaMS),
        );
      }
    } else {
      this.#lastLookTime = roomTime;

      this.#lookOffset = subXyz(
        addXyz(
          this.#lookOffset,
          scaleXyz(
            controllerOrKeyboardLookVector,
            deltaMS * controllerOrKeyboardLookSpeed,
          ),
        ),
        hudLookVector,
      );

      hudLookVector.x = 0;
      hudLookVector.y = 0;
    }
  }

  tick(tickContext: RoomTickContext<RoomId, RoomItemId>) {
    const {
      general: { gameState },
    } = this.renderContext;
    const { deltaMS } = tickContext;

    this.#tickLookOffset(tickContext);

    const playable = selectCurrentPlayableItem(gameState);
    if (playable === undefined) {
      // don't scroll if no lives left for either character
      return;
    }

    const targetRoomPositionWithScrolling = this.#targetRoomPosition(
      playable.state.position,
    );

    const snapInstantly = !this.#everRendered;
    if (snapInstantly) {
      this.#curScroll = targetRoomPositionWithScrolling;
    } else {
      // ease towards from target position:

      const targetScrollDelta = subXy(
        this.#curScroll,
        targetRoomPositionWithScrolling,
      );

      if (lengthXySquared(targetScrollDelta) > smallestScrollSquared) {
        // move towards at 100% per catchup period (but will back off/ease as
        // that distance gets smaller):
        const targetScrollDeltaFrame = easeTowards(targetScrollDelta, deltaMS);

        this.#curScroll = {
          x: this.#curScroll.x - targetScrollDeltaFrame.x,
          y: this.#curScroll.y - targetScrollDeltaFrame.y,
        };
      }
    }

    this.#updateOutputXy();
    this.#everRendered = true;

    this.#childRenderer.tick(tickContext);
  }

  destroy(): void {
    this.output.graphics.destroy({ children: true });
    this.#childRenderer.destroy();
  }
}

/**
 * for debugging, show scroll info overlaid on a room
 */
export const showRoomScrollBounds = <
  RoomId extends string,
  RoomItemId extends string,
>(
  roomState: RoomState<RoomId, RoomItemId>,
) => {
  const {
    floors: {
      edgeLeftX: floorEdgeLeftX,
      edgeRightX: floorEdgeRightX,
      bottomEdgeY: floorBottomEdgeY,
      topEdgeY: floorTopEdgeY,
    },
    allItems: { topEdgeY: allItemsTopEdgeY },
  } = floorsRenderExtent(roomState);

  const graphics = new Graphics()
    .rect(
      floorEdgeLeftX,
      allItemsTopEdgeY,
      floorEdgeRightX - floorEdgeLeftX,
      floorBottomEdgeY - allItemsTopEdgeY,
    )
    .stroke("red")
    .rect(
      floorEdgeLeftX,
      floorTopEdgeY,
      floorEdgeRightX - floorEdgeLeftX,
      floorBottomEdgeY - floorTopEdgeY,
    )
    .stroke("blue");

  return graphics;
};
