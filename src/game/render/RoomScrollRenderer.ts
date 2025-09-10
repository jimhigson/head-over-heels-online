import type { SetRequired } from "type-fest";

import { Container, Graphics } from "pixi.js";

import type { RoomState } from "../../model/RoomState";
import type { Xy } from "../../utils/vectors/vectors";
import type {
  RoomRenderContextInGame,
  RoomTickContext,
} from "./RoomRenderContexts";
import type {
  RoomRendererType,
  RoomRendererTypeInGameOnly,
} from "./RoomRendererType";
import type { SoundAndGraphicsOutput } from "./SoundAndGraphicsOutput";

import { defaultUserSettings } from "../../store/defaultUserSettings";
import { detectDeviceType } from "../../utils/detectDeviceType";
import { epsilon } from "../../utils/epsilon";
import { neverTime } from "../../utils/neverTime";
import { assignRoundedXy } from "../../utils/pixi/assignRoundedXy";
import {
  addXy,
  addXyz,
  lengthXySquared,
  scaleXy,
  scaleXyz,
  subXy,
  subXyz,
} from "../../utils/vectors/vectors";
import { selectCurrentPlayableItem } from "../gameState/gameStateSelectors/selectPlayableItem";
import { floorsRenderExtent } from "./floorsExtent";
import { projectWorldXyzToScreenXy } from "./projections";

// a higher value means more scrolling will occur.
// 0.33 is generally good for original game levels, 0.4 is good for new remake-specific levels
// with more verticality
const scrollLimit = 0.4;

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

  constructor(
    public readonly renderContext: RoomRenderContextInGame<RoomId, RoomItemId>,
    private readonly childRenderer: RoomRendererType<RoomId, RoomItemId>,
  ) {
    const {
      room,
      general: {
        upscale: { gameEngineScreenSize: effectiveScreenSize },
        displaySettings,
      },
    } = renderContext;

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

    const renderingMedianX = (floorsEdgeRightX + floorsEdgeLeftX) / 2;

    const renderingWidth = floorsEdgeRightX - floorsEdgeLeftX;
    const renderingHeight = floorsBottomEdgeY - allItemsTopEdgeY;
    const fitsInY = effectiveScreenSize.y >= renderingHeight;
    const fitsOnScreen = fitsInY && effectiveScreenSize.x >= renderingWidth;

    // how much to move the room up (at home position) to bring off the hud
    const bottomMargin =
      fitsInY ?
        // like the original:
        16
        // we don't fit so we're going to not sacrifice vertical y space to the gap
        // at the bottom:
      : detectDeviceType() === "mobile" ?
        // space is super-tight and we don't have the traditional hud to worry about
        // - allow half a playable block to go off-screen
        -4
        // the very bottom standable pixel will be at the bottom of the screen, overlapping the hud
      : 0;

    this.#roomHomePosition = {
      x: effectiveScreenSize.x / 2 - renderingMedianX,
      y:
        effectiveScreenSize.y -
        bottomMargin -
        floorsBottomEdgeY -
        (fitsOnScreen ?
          /* similar to the original's (non-scrolling) room  positioning on screen: moving up by half
             the x offset creates movement in the 2:1 isometric projection along the x/y in-game axes;
             also avoids the hud elements since they are set up at about 2:1 ratio */
          Math.abs(renderingMedianX / 2)
          // ignore this adjustment if the room is wider than the screen - it tends to force a
          // black space below, especially on non-rectangular 'big' rooms and mobile-sized displays, where
        : 0),
    };

    // is there content off the left edge when the room is in its home position?
    this.#scrollableLeft =
      this.#roomHomePosition.x + this.#edgeLeftXTranslated < 0;
    // is there content off the right edge when the room is in its home position?
    this.#scrollableRight =
      this.#roomHomePosition.x + this.#edgeRightXTranslated >
      effectiveScreenSize.x;

    // scrollable up in y if the top of the room is off the top of the screen when
    // in the home position:
    this.#scrollableUp = this.#roomHomePosition.y + allItemsTopEdgeY < 0;

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
      output.graphics.addChild(showRoomScrollBounds(renderContext.room));
    }
    this.output = output;
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
      general: {
        upscale: { gameEngineScreenSize: effectiveScreenSize },
        gameState,
      },
    } = this.renderContext;
    const { deltaMS } = tickContext;

    this.#tickLookOffset(tickContext);

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
          // not scrolling in x - staying in home position
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

  //const wallHeight = 0;

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
