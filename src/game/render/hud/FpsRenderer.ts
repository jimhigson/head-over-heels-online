import type { EmptyObject } from "type-fest";

import { spritesheetPalette } from "gfx/spritesheetPalette";
import { Container } from "pixi.js";

import type { OutlineFilter } from "../filters/outlineFilter";
import type { Renderer } from "../Renderer";

import { hudCharTextureSize } from "../../../sprites/textureSizes";
import {
  frameTimingStats,
  type FrameTimingStatsEvent,
} from "../../mainLoop/frameTiming/FrameTimingStats";
import { RevertColouriseFilter } from "../filters/RevertColouriseFilter";
import { hudOutlineFilter } from "./hudFilters";
import { makeTextContainer, showTextInContainer } from "./showTextInContainer";

type Filters = [RevertColouriseFilter, OutlineFilter];

export class FpsRenderer
  implements Renderer<EmptyObject, FrameTimingStatsEvent, Container>
{
  #container = new Container({ label: "FpsRenderer" });
  #fpsText = makeTextContainer({ label: "fps", outline: true });

  constructor(public readonly renderContext: EmptyObject = {}) {
    this.#fpsText.filters = [
      new RevertColouriseFilter(spritesheetPalette.pink),
      hudOutlineFilter,
    ];
    this.#fpsText.y = hudCharTextureSize.h;
    this.#container.addChild(this.#fpsText);

    showTextInContainer(this.#fpsText, "...");
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
    const fpsText = Math.round(fpsValue);
    showTextInContainer(this.#fpsText, fpsText);
    (this.#fpsText.filters as Filters)[0].targetColor = this.#colourForFps(
      fpsValue,
      60,
    );
  };

  get output() {
    return this.#container;
  }

  destroy() {
    frameTimingStats.off(this.tick);
    this.#container.destroy();
  }
}
