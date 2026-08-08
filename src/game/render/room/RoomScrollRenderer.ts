import { Container, Graphics } from "pixi.js";
import { type SetRequired } from "type-fest";

import { type RoomState } from "../../../model/RoomState";
import { type SpritesheetMetadata } from "../../../sprites/spritesheet/spritesheetData/spritesheetMetaData";
import { defaultUserSettings } from "../../../store/slices/userSettings/defaultUserSettings";
import { epsilon } from "../../../utils/epsilon";
import { neverTime } from "../../../utils/neverTime";
import { assignRoundedXy } from "../../../utils/pixi/assignRoundedXy";
import {
  isAtQuarterAngle,
  nearestQuarterAngle,
} from "../../../utils/vectors/cameraAngleVectors";
import {
  addXy,
  addXyz,
  lengthXySquared,
  scaleXy,
  scaleXyz,
  subXy,
  subXyz,
  type Xy,
  type Xyz,
} from "../../../utils/vectors/vectors";
import { selectCurrentPlayableItem } from "../../gameState/gameStateSelectors/selectPlayableItem";
import { hermiteEase } from "../../mainLoop/transitionCameraAngle";
import { projectWorldXyzToScreenXy } from "../projections";
import { type SoundAndGraphicsOutput } from "../SoundAndGraphicsOutput";
import {
  type RoomRenderContextInGame,
  type RoomTickContext,
} from "./RoomRenderContexts";
import {
  type RoomRendererType,
  type RoomRendererTypeInGameOnly,
} from "./RoomRendererType";
import { roomRenderExtent } from "./roomRenderExtent";

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
 * the angle-dependent geometry the scroll uses to place a room on screen: its home
 * position plus the flags/edges that drive player-follow scrolling. Derived purely
 * from the room and a discrete camera angle, so a given (room, angle) always yields
 * the same values - which is what lets the two renderers of a rotation agree
 * on an interpolated scroll at the midpoint hand-over.
 */
type RoomScrollGeometry = {
  /** the position the room 'wants' to be at - where it would be (roughly) in the original game without any scrolling */
  roomHomePosition: Xy;
  edgeLeftXTranslated: number;
  edgeRightXTranslated: number;
  scrollableLeft: boolean;
  scrollableRight: boolean;
  scrollableUp: boolean;
};

const computeRoomScrollGeometry = <
  RoomId extends string,
  RoomItemId extends string,
>(
  room: RoomState<RoomId, RoomItemId>,
  cameraAngle: Xy,
  effectiveScreenSize: Xy,
  onScreenControls: boolean,
  spritesheetMeta: SpritesheetMetadata,
): RoomScrollGeometry => {
  const {
    floors: {
      edgeLeftX: floorsEdgeLeftX,
      edgeRightX: floorsEdgeRightX,
      bottomEdgeY: floorsBottomEdgeY,
      nearCornerX: floorsNearCornerX,
    },
    allItems: { topEdgeY: allItemsTopEdgeY },
  } = roomRenderExtent(room, spritesheetMeta, cameraAngle);
  // take into account the that floor isn't always rendered at 0,0:
  const edgeLeftXTranslated = floorsEdgeLeftX;
  const edgeRightXTranslated = floorsEdgeRightX;

  // how horizontally lopsided the room is about its camera-near corner. At the
  // base angle the near corner projects at exactly x=0 so this is just the
  // extent's median (the historic behaviour); rotated, the extent carries the
  // near corner's own projection offset, which must not read as lopsidedness:
  let asymmetryX = (floorsEdgeRightX + floorsEdgeLeftX) / 2 - floorsNearCornerX;

  const roomRenderingWidth = floorsEdgeRightX - floorsEdgeLeftX;
  const roomRenderingHeight = floorsBottomEdgeY - allItemsTopEdgeY;
  const fitsInY = effectiveScreenSize.y >= roomRenderingHeight;
  const fitsInX = effectiveScreenSize.x >= roomRenderingWidth;
  const roomFitsOnScreen = fitsInY && fitsInX;

  if (fitsInX && !onScreenControls) {
    // if we have space, reduce the lopsidedness correction to make the room
    // more centred in the ui, which also brings it lower in the ui, allowing more
    // of the higher parts to be seen
    asymmetryX /= 2;
  }

  const renderingMedianX = floorsNearCornerX + asymmetryX;

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

  const roomHomePosition: Xy = {
    x: effectiveScreenSize.x / 2 - renderingMedianX,
    y:
      fitsInY && onScreenControls ?
        // streamlined version for rooms that fit on the screen in y on mobile -
        // simply centre vertically. Anchoring on the floors' projected bottom
        // edge keeps this correct at every camera angle - the projection
        // rotates about the world origin, so the bottom edge is only near
        // zero at the base angle:
        Math.floor((effectiveScreenSize.y + roomRenderingHeight) / 2) -
        floorsBottomEdgeY
      : effectiveScreenSize.y -
        bottomMargin -
        floorsBottomEdgeY -
        (roomFitsOnScreen && !onScreenControls ?
          /* similar to the original's (non-scrolling) room  positioning on screen: moving up by half
           the x offset creates movement in the 2:1 isometric projection along the x/y in-game axes;
           also avoids the hud elements since they are set up at about 2:1 ratio

           test on (eg #egyptus33 or #egyptus35)
           */
          Math.abs(asymmetryX / 2)
          // ignore this adjustment on mobile since we are free to let the room render all the way down
          // to the bottom of the screen
          // ignore this adjustment if the room is wider than the screen - it tends to force a
          // black space below, especially on non-rectangular 'big' rooms and mobile-sized displays, where
        : 0),
  };

  return {
    roomHomePosition,
    edgeLeftXTranslated,
    edgeRightXTranslated,
    // is there content off the left edge when the room is in its home position?
    // < 0 performs poorly in #blacktooth35, #bookworld3 since the door coming into the room will be under the
    // hud joystick
    scrollableLeft: roomHomePosition.x + edgeLeftXTranslated < 0,
    // is there content off the right edge when the room is in its home position?
    scrollableRight:
      roomHomePosition.x + edgeRightXTranslated > effectiveScreenSize.x,
    // scrollable up in y if the top of the room is off the top of the screen when
    // in the home position:
    scrollableUp: roomHomePosition.y + allItemsTopEdgeY < 0,
  };
};

/**
 * put the room on the screen in the right place - either scrolling, or at its home position similar to how
 * it would have been put onto the screen in the original game
 */
export class RoomScrollRenderer<
  RoomId extends string,
  RoomItemId extends string,
> implements RoomRendererTypeInGameOnly<RoomId, RoomItemId> {
  /** the current position, not counting looking */
  #curScroll: Xy = { x: 0, y: 0 };
  /** the user's input into looking around */
  #lookOffset: Xy = { x: 0, y: 0 };
  #lastLookTime: number = neverTime;

  #everRendered: boolean = false;
  /** angle-dependent scroll geometry at this renderer's own discrete camera angle */
  #geometry: RoomScrollGeometry;
  /**
   * the two endpoint geometries of the rotation currently animating,
   * memoised so {@link roomRenderExtent} is not re-derived for both angles every
   * frame. Rebuilt when the transition's from/to angles change (a chained turn).
   */
  #transitionGeometries:
    | {
        fromAngle: Xy;
        toAngle: Xy;
        from: RoomScrollGeometry;
        to: RoomScrollGeometry;
      }
    | undefined;
  /**
   * cache key for {@link #geometry}: the quarter angle it was computed for.
   * Compared against the current derived quarter at use; a mismatch (the
   * camera's discrete angle changed) recomputes the geometry - and doubles
   * as the signal that the room must snap exactly onto the new angle's
   * scroll target
   */
  #geometryQuarterAngle: Xy;

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
        cameraAngle,
      },
    } = renderContext;

    const cameraQuarterAngle = nearestQuarterAngle(cameraAngle);
    this.#geometryQuarterAngle = cameraQuarterAngle;

    const onScreenControls =
      renderContext.general.onScreenControls ??
      defaultUserSettings.onScreenControls;

    this.#geometry = computeRoomScrollGeometry(
      room,
      cameraQuarterAngle,
      effectiveScreenSize,
      onScreenControls,
      renderContext.general.spritesheetMeta,
    );

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

    const showScrollBounds =
      displaySettings?.showRoomScrollBounds ??
      defaultUserSettings.displaySettings.showRoomScrollBounds;

    if (showScrollBounds) {
      output.graphics.addChild(
        showRoomScrollBounds(
          renderContext.room,
          cameraQuarterAngle,
          renderContext.general.spritesheetMeta,
        ),
      );
    }
    this.output = output;
  }

  #targetRoomPosition(
    playablePosition: Xyz,
    geometry: RoomScrollGeometry,
    cameraAngle: Xy,
  ): Xy {
    const {
      general: {
        upscale: { gameEngineScreenSize: effectiveScreenSize },
        onScreenControls,
      },
    } = this.renderContext;

    const {
      roomHomePosition,
      edgeLeftXTranslated,
      edgeRightXTranslated,
      scrollableLeft,
      scrollableRight,
      scrollableUp,
    } = geometry;

    const characterProjectionInRoom = projectWorldXyzToScreenXy(
      playablePosition,
      cameraAngle,
    );

    let x: number;
    let y: number;

    const overscroll = onScreenControls ? onScreenControlsOverscroll : 0;
    const { x: homeX, y: homeY } = roomHomePosition;
    const combinedProjectedPositionAtRoomHome = addXy(
      characterProjectionInRoom,
      roomHomePosition,
    );

    if (
      scrollableLeft &&
      combinedProjectedPositionAtRoomHome.x <
        effectiveScreenSize.x * scrollLimitCoefficient
    ) {
      const adjustedPlayerX = Math.max(
        characterProjectionInRoom.x,
        onScreenControls ?
          edgeLeftXTranslated + onScreenControlsOverscroll
          // unit value of .max (no effect)
        : Number.NEGATIVE_INFINITY,
      );

      const maxX =
        effectiveScreenSize.x * scrollLimitCoefficient - adjustedPlayerX;

      // scrolling to show more of the left side of the room
      x = Math.min(
        // x with left-edge of the room on the left edge of the screen - ie the
        // most left-scrolled position we will go to:
        -edgeLeftXTranslated + overscroll,
        // put player on scrollLimit proportion of effective width:
        maxX,
      );
    } else if (
      scrollableRight &&
      combinedProjectedPositionAtRoomHome.x >
        effectiveScreenSize.x * (1 - scrollLimitCoefficient)
    ) {
      const adjustedPlayerX = Math.min(
        characterProjectionInRoom.x,
        onScreenControls ?
          edgeRightXTranslated - onScreenControlsOverscroll
        : Number.POSITIVE_INFINITY,
      );

      const minX =
        // x that puts the player on the (1-scrollLimit) proportion of the screen:
        effectiveScreenSize.x * (1 - scrollLimitCoefficient) - adjustedPlayerX;

      // scrolling to show more of the right side of the room
      x = Math.max(
        // x with right-edge of the room on the right edge of the screen:
        effectiveScreenSize.x - edgeRightXTranslated - overscroll,

        minX,
      );
    } else {
      // not scrolling in x - staying in home position
      x = homeX;
    }

    if (
      scrollableUp &&
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

  /**
   * the two endpoint scroll geometries for the currently-animating rotation,
   * memoised so the room extents are not re-derived for both angles every frame.
   */
  #transitionEndpointGeometries(
    fromAngle: Xy,
    toAngle: Xy,
  ): { from: RoomScrollGeometry; to: RoomScrollGeometry } {
    const cache = this.#transitionGeometries;
    if (
      cache !== undefined &&
      cache.fromAngle.x === fromAngle.x &&
      cache.fromAngle.y === fromAngle.y &&
      cache.toAngle.x === toAngle.x &&
      cache.toAngle.y === toAngle.y
    ) {
      return cache;
    }

    const {
      room,
      general: {
        upscale: { gameEngineScreenSize: effectiveScreenSize },
        onScreenControls,
      },
    } = this.renderContext;
    const resolvedOnScreenControls =
      onScreenControls ?? defaultUserSettings.onScreenControls;

    const rebuilt = {
      fromAngle,
      toAngle,
      from: computeRoomScrollGeometry(
        room,
        fromAngle,
        effectiveScreenSize,
        resolvedOnScreenControls,
        this.renderContext.general.spritesheetMeta,
      ),
      to: computeRoomScrollGeometry(
        room,
        toAngle,
        effectiveScreenSize,
        resolvedOnScreenControls,
        this.renderContext.general.spritesheetMeta,
      ),
    };
    this.#transitionGeometries = rebuilt;
    return rebuilt;
  }

  tick(tickContext: RoomTickContext<RoomId, RoomItemId>) {
    const {
      general: { gameState, cameraAngle },
    } = this.renderContext;
    const { deltaMS } = tickContext;

    this.#tickLookOffset(tickContext);

    const playable = selectCurrentPlayableItem(gameState);
    if (playable === undefined) {
      // don't scroll if no lives left for either character
      return;
    }

    const { cameraTransition } = gameState;
    if (cameraTransition !== undefined && !isAtQuarterAngle(cameraAngle)) {
      // interpolate the container's scroll between the two discrete-angle targets,
      // so the from-angle and to-angle renderers land on the identical offset at
      // the midpoint hand-over (no whole-room snap) and the room tracks the item
      // warps smoothly through the turn. Set directly rather than eased: the eased
      // progress already smooths it, and both renderers must agree frame-for-frame.
      const { fromAngle } = cameraTransition;
      const toAngle = gameState.targetCameraAngle;
      const { from, to } = this.#transitionEndpointGeometries(
        fromAngle,
        toAngle,
      );
      const targetFrom = this.#targetRoomPosition(
        playable.state.position,
        from,
        fromAngle,
      );
      const targetTo = this.#targetRoomPosition(
        playable.state.position,
        to,
        toAngle,
      );
      const eased = hermiteEase(
        cameraTransition.progress,
        cameraTransition.startSlope,
      );
      this.#curScroll = {
        x: targetFrom.x + (targetTo.x - targetFrom.x) * eased,
        y: targetFrom.y + (targetTo.y - targetFrom.y) * eased,
      };
    } else {
      this.#transitionGeometries = undefined;

      // the settled angle - either truly settled, or a transition held
      // within epsilon of one of its endpoints (where the blend and the
      // plain per-angle target coincide):
      const cameraQuarterAngle = nearestQuarterAngle(cameraAngle);
      const angleChanged = cameraQuarterAngle !== this.#geometryQuarterAngle;
      if (angleChanged) {
        // the per-angle home geometry is a cache; invalidated by the
        // camera's discrete angle having changed since it was computed:
        const { room, general } = this.renderContext;
        this.#geometry = computeRoomScrollGeometry(
          room,
          cameraQuarterAngle,
          general.upscale.gameEngineScreenSize,
          general.onScreenControls ?? defaultUserSettings.onScreenControls,
          general.spritesheetMeta,
        );
        this.#geometryQuarterAngle = cameraQuarterAngle;
      }

      const targetRoomPositionWithScrolling = this.#targetRoomPosition(
        playable.state.position,
        this.#geometry,
        cameraQuarterAngle,
      );

      const snapInstantly =
        !this.#everRendered ||
        // the camera's discrete angle changed since the room was last placed
        // (a completed or endpoint-held turn, or an instant angle change -
        // possibly with no mid-turn frame ever rendered): the room must land
        // EXACTLY on the new angle's target, the position a freshly-created
        // renderer at this angle would snap to. The ease cannot be trusted to
        // close the gap - it stops anywhere inside its dead zone, and cannot
        // move at all at zero game speed, where its deltaMS is always 0:
        angleChanged ||
        // mid-transition frames held at an endpoint also land here: the
        // blend's value at an endpoint IS the exact per-angle target:
        cameraTransition !== undefined;
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
          const targetScrollDeltaFrame = easeTowards(
            targetScrollDelta,
            deltaMS,
          );

          this.#curScroll = {
            x: this.#curScroll.x - targetScrollDeltaFrame.x,
            y: this.#curScroll.y - targetScrollDeltaFrame.y,
          };
        }
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
const showRoomScrollBounds = <RoomId extends string, RoomItemId extends string>(
  roomState: RoomState<RoomId, RoomItemId>,
  cameraAngle: Xy,
  spritesheetMeta: SpritesheetMetadata,
) => {
  const {
    floors: {
      edgeLeftX: floorEdgeLeftX,
      edgeRightX: floorEdgeRightX,
      bottomEdgeY: floorBottomEdgeY,
      topEdgeY: floorTopEdgeY,
    },
    allItems: { topEdgeY: allItemsTopEdgeY },
  } = roomRenderExtent(roomState, spritesheetMeta, cameraAngle);

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
