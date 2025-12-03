import { Container } from "pixi.js";

import type { Renderer } from "../Renderer";
import type { HudRenderContext } from "./hudRendererContexts";

import { spritesheetPalette } from "../../../sprites/palette/spritesheetPalette";
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

  #colourForFps(fpsValue: number, goodFps: number) {
    const ratio = fpsValue / goodFps;
    return (
      ratio > 1.95 ? spritesheetPalette.white
      : ratio > 1.67 ? spritesheetPalette.highlightBeige
      : ratio > 0.97 ? spritesheetPalette.moss
      : ratio > 0.92 ? spritesheetPalette.pastelBlue
      : ratio > 0.83 ? spritesheetPalette.metallicBlue
      : ratio > 0.67 ? spritesheetPalette.pink
      : spritesheetPalette.midRed
    );
  }

  tick = (frameTimingStatsEvent: FrameTimingStatsEvent): void => {
    const fpsValue = frameTimingStatsEvent.fps;
    this.#fpsText.text = `${Math.round(fpsValue)} FPS`;
    this.#fpsText.tint = this.#colourForFps(fpsValue, 60);
  };

  get output() {
    return this.#container;
  }

  destroy() {
    frameTimingStats.off(this.tick);
    this.#container.destroy();
  }
}
