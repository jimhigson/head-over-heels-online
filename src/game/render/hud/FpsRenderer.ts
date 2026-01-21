import { Container } from "pixi.js";

import type { Renderer } from "../Renderer";
import type { HudRenderContext } from "./hudRendererContexts";

import {
  getSpritesheetPalette,
  type SpritesheetPaletteColourName,
} from "../../../sprites/palette/spritesheetPalette";
import { hudCharTextureSize } from "../../../sprites/spritesheet/spritesheetData/textureSizes";
import {
  frameTimingStats,
  type FrameTimingStatsEvent,
} from "../../mainLoop/frameTiming/FrameTimingStats";
import { TextContainer } from "../text/TextContainer";

export class FpsRenderer
  implements
    Renderer<HudRenderContext<string>, FrameTimingStatsEvent, Container>
{
  #container = new Container({ label: "FpsRenderer" });
  #fpsText: TextContainer;
  #isDark = false;
  #fpsValue: number | undefined;

  set isDark(value: boolean) {
    const changed = this.#isDark !== value;
    if (changed) {
      this.#isDark = value;
      this.#updateRendering();
    }
  }

  constructor(public readonly renderContext: HudRenderContext<string>) {
    this.#fpsText = new TextContainer({
      pixiRenderer: renderContext.general.pixiRenderer,
      label: "fps",
      outline: true,
      y: hudCharTextureSize.h,
      text: "...",
    });
    this.#container.addChild(this.#fpsText);
    frameTimingStats.on(this.tick);
  }

  #colourNameForFps(
    fpsValue: number,
    goodFps: number,
  ): SpritesheetPaletteColourName {
    const ratio = fpsValue / goodFps;
    return (
      ratio > 1.95 ? "white"
      : ratio > 1.67 ? "highlightBeige"
      : ratio > 0.97 ? "moss"
      : ratio > 0.92 ? "pastelBlue"
      : ratio > 0.83 ? "metallicBlue"
      : ratio > 0.67 ? "pink"
      : "midRed"
    );
  }

  #updateRendering() {
    const fpsValue = this.#fpsValue;
    this.#fpsText.text =
      fpsValue === undefined ? "..." : `${Math.round(fpsValue)} FPS`;
    const colourName =
      fpsValue === undefined ? "white" : this.#colourNameForFps(fpsValue, 60);
    const palette = getSpritesheetPalette(this.#isDark);
    this.#fpsText.tint = palette[colourName];
  }

  tick = (frameTimingStatsEvent: FrameTimingStatsEvent): void => {
    this.#fpsValue = frameTimingStatsEvent.fps;
    this.#updateRendering();
  };

  get output() {
    return this.#container;
  }

  destroy() {
    frameTimingStats.off(this.tick);
    this.#container.destroy();
  }
}
