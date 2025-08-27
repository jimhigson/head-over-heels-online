import type { Container, FederatedPointerEvent } from "pixi.js";

import { Graphics } from "pixi.js";

import type { Xy } from "../../../utils/vectors/vectors";
import type { Renderer } from "../Renderer";
import type { GeneralRenderContext } from "../RoomRenderContexts";
import type { HudRendererTickContext } from "./hudRendererContexts";
import type { OnScreenJoystickRenderer } from "./OnScreenJoystickRenderer";
import type { PointerGrabbingRender } from "./PointerGrabbingRenderer";

import { selectTotalUpscale } from "../../../store/slices/upscale/upscaleSlice";
import { store } from "../../../store/store";
import { pick } from "../../../utils/pick";
import { originXyz } from "../../../utils/vectors/vectors";
import { type InputStateTrackerInterface } from "../../input/InputStateTracker";
import { DragInertia } from "./DragInertia";

type LookRenderContext = {
  inputStateTracker: InputStateTrackerInterface;
  general: GeneralRenderContext<string>;
};

export class OnScreenLookRenderer<
    RoomId extends string = string,
    RoomItemId extends string = string,
  >
  implements
    Renderer<
      LookRenderContext,
      HudRendererTickContext<RoomId, RoomItemId>,
      Container
    >,
    PointerGrabbingRender
{
  output = new Graphics({ label: "OnScreenLook", eventMode: "static" });

  #curPointerId: number | undefined;

  #curXY: undefined | Xy = undefined;

  #joystickRenderer: OnScreenJoystickRenderer | undefined;

  /** Handles all inertia physics */
  #dragInertia = new DragInertia();

  constructor(public readonly renderContext: LookRenderContext) {
    const { x: w, y: h } = renderContext.general.upscale.gameEngineScreenSize;

    this.output.on("pointerenter", this.handlePointerEnter);
    this.output.on("pointerup", this.stopCurrentPointer);
    this.output.on("pointerupoutside", this.stopCurrentPointer);

    this.output.rect(0, 0, w, h).fill("#00000000");
  }

  handlePointerEnter = (e: FederatedPointerEvent) => {
    // already handling a pointer:
    if (this.#curPointerId !== undefined) {
      // switching from an old pointer to a new one
      this.stopCurrentPointer();
    }

    if (this.#joystickRenderer!.curPointerId === e.pointerId) {
      // being handled by the joystick
      return;
    }

    // allows tapping without movement:
    this.#curPointerId = e.pointerId;
    this.#curXY = pick(e, "x", "y");
    this.#dragInertia.startDrag();
    this.usePointerLocation(e);
    this.output.on("globalpointermove", this.usePointerLocation);
  };

  stopCurrentPointer = () => {
    this.#curPointerId = undefined;
    this.#curXY = undefined;
    this.#dragInertia.stopDrag();
    // Don't reset directionVector - let inertia handle it
    this.renderContext.inputStateTracker.hudInputState.directionVector =
      originXyz;
    this.output.off("globalpointermove", this.usePointerLocation);
  };

  usePointerLocation = (e: FederatedPointerEvent) => {
    if (e.pointerId !== this.#curPointerId) return;

    const curXy = this.#curXY!;

    const scale = selectTotalUpscale(store.getState());
    const { x: ex, y: ey } = e;

    const dx = (curXy.x - ex) / scale;
    const dy = (curXy.y - ey) / scale;

    // Update velocity tracking
    this.#dragInertia.updateVelocity({ x: dx, y: dy });

    const {
      inputStateTracker: { hudInputState },
    } = this.renderContext;

    // note we just increment the look vector. It is up to the scroller to
    // cancel this by setting it back to zero
    hudInputState.lookVector.x += dx;
    hudInputState.lookVector.y += dy;

    curXy.x = ex;
    curXy.y = ey;
  };

  tick(tickContext: HudRendererTickContext<RoomId, RoomItemId>) {
    const menusOpen = store.getState().gameMenus.openMenus.length > 0;

    if (menusOpen) {
      this.stopCurrentPointer();
      this.#dragInertia.reset();
      return;
    }

    const { deltaMS } = tickContext;
    const {
      inputStateTracker: { hudInputState },
    } = this.renderContext;

    // Check if dragging but stationary (resets velocity if needed)
    this.#dragInertia.checkStationaryDrag();

    // Apply inertia and get movement for this frame
    const inertiaMovement = this.#dragInertia.applyInertia(deltaMS);
    hudInputState.lookVector.x += inertiaMovement.x;
    hudInputState.lookVector.y += inertiaMovement.y;
  }

  destroy() {
    this.stopCurrentPointer();
    this.output.off("pointerenter", this.handlePointerEnter);
    this.output.off("pointerup", this.stopCurrentPointer);
    this.output.off("pointerupoutside", this.stopCurrentPointer);
    this.output.destroy();
  }

  get curPointerId() {
    return this.#curPointerId;
  }

  set joystickRenderer(renderer: OnScreenJoystickRenderer) {
    this.#joystickRenderer = renderer;
  }
}
