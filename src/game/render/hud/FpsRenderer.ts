import { Container } from "pixi.js";

import { blockStackSpritesheetMeta } from "../../../../gfx/spritesheetMeta/blockStackSpritesheetMeta";
import {
  type BlockstackPaletteColourName,
  maybeDimPalette,
} from "../../../sprites/palette/spritesheetPalette";
import { hudCharTextureSize } from "../../../sprites/spritesheet/spritesheetData/textureSizes";
import { type FrameTimingStatsEvent } from "../../mainLoop/frameTiming/FrameTimingStats";
import {
  loadedFrameTimingStats,
  loadFrameTimingStats,
} from "../../mainLoop/frameTiming/lazyFrameTimingStats";
import { type Renderer } from "../Renderer";
import { TextContainer } from "../text/TextContainer";
import { type HudRenderContext } from "./hudRendererContexts";

export class FpsRenderer implements Renderer<
  HudRenderContext<string>,
  FrameTimingStatsEvent,
  Container
> {
  #container = new Container({ label: "FpsRenderer" });
  #fpsText: TextContainer;
  #isDark = false;
  #fpsValue: number | undefined;
  #destroyed = false;

  set isDark(value: boolean) {
    const changed = this.#isDark !== value;
    if (changed) {
      this.#isDark = value;
      this.#updateRendering();
    }
  }

  readonly renderContext: HudRenderContext<string>;

  constructor(renderContext: HudRenderContext<string>) {
    this.renderContext = renderContext;
    this.#fpsText = new TextContainer({
      pixiRenderer: renderContext.general.pixiRenderer,
      spritesheet:
        renderContext.general.spritesheetVariants.originalSpritesheet,
      label: "fps",
      outline: true,
      y: hudCharTextureSize.h,
      text: "...",
    });
    this.#container.addChild(this.#fpsText);
    // the frame-timing chunk is lazy-loaded; subscribe once it lands (the
    // "..." placeholder shows until the first stats event):
    loadFrameTimingStats().then((frameTimingStats) => {
      if (!this.#destroyed) {
        frameTimingStats.on(this.tick);
      }
    });
  }

  #colourNameForFps(
    fpsValue: number,
    goodFps: number,
  ): BlockstackPaletteColourName {
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
    const palette = maybeDimPalette(blockStackSpritesheetMeta, this.#isDark);
    this.#fpsText.colour = palette[colourName];
  }

  tick = (frameTimingStatsEvent: FrameTimingStatsEvent): void => {
    this.#fpsValue = frameTimingStatsEvent.fps;
    this.#updateRendering();
  };

  get output() {
    return this.#container;
  }

  destroy() {
    this.#destroyed = true;
    // undefined if destroyed while the frame-timing chunk is still in
    // flight - in that case the load callback above never subscribes:
    loadedFrameTimingStats()?.off(this.tick);
    this.#container.destroy();
  }
}
