import { Point, type Renderer, type Sprite } from "pixi.js";

import { type Spritesheets } from "../../../sprites/spritesheet/Spritesheets";
import { type PointerTracker } from "../../input/PointerTracker";
import { createSprite } from "../createSprite";

/**
 * Draws the mouse pointer as a pixi sprite, so it is part of the picture on
 * the television and gets the same CRT effect as the rest of it. Only shown
 * while {@link SoftwarePointerPixiRenderer.tick} is told the pointer belongs
 * on the tube - the rest of the time the page draws it instead
 */
export class SoftwarePointerPixiRenderer {
  readonly output: Sprite;

  #pointerTracker: PointerTracker;
  #pixiRenderer: Renderer;
  // reused on every tick, so moving the pointer allocates nothing
  #point = new Point();

  constructor(
    pointerTracker: PointerTracker,
    pixiRenderer: Renderer,
    spritesheets: Spritesheets,
  ) {
    this.#pointerTracker = pointerTracker;
    this.#pixiRenderer = pixiRenderer;
    this.output = createSprite({
      textureId: "pointer",
      spritesheet: spritesheets.spritesheetForCurrentRoom,
      // the hotspot is the pointer's top-left corner
      anchor: { x: 0, y: 0 },
      label: "SoftwarePointerPixiRenderer",
    });
    this.output.visible = false;
    // never hit by the mouse, so it cannot come between the mouse and what is under it
    this.output.eventMode = "none";
  }

  tick(
    /** whether the pointer is drawn on the television, rather than the page */
    pointerOnTube: boolean,
  ): void {
    const { output } = this;
    const shown = pointerOnTube && this.#pointerTracker.shown;
    output.visible = shown;
    if (!shown || output.parent === null) {
      return;
    }

    const point = this.#point;
    // from the page onto the canvas, then into the container it is drawn in
    this.#pixiRenderer.events.mapPositionToPoint(
      point,
      this.#pointerTracker.clientX,
      this.#pointerTracker.clientY,
    );
    output.parent.toLocal(point, undefined, point);
    // whole game pixels, so it lands on the pixel grid
    output.position.set(Math.round(point.x), Math.round(point.y));
  }

  destroy(): void {
    this.output.destroy();
  }
}
