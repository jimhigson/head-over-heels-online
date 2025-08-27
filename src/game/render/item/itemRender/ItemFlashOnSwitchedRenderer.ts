import type { Filter } from "pixi.js";

import { Container } from "pixi.js";

import type { ItemInPlayType } from "../../../../model/ItemInPlay";
import type {
  ItemRenderContext,
  ItemTickContext,
} from "../../ItemRenderContexts";
import type { ItemPixiRenderer } from "./ItemRenderer";

import { spritesheetPalette } from "../../../../../gfx/spritesheetPalette";
import { OneColourFilter } from "../../filters/oneColourFilter";
import { outlineFilters } from "../../filters/outlineFilter";
import { noFilters } from "../../filters/standardFilters";

const recentlySwitchedFiltersRight: Array<Filter> = [
  new OneColourFilter(spritesheetPalette.midRed),
  outlineFilters.pureBlack,
];
const recentlySwitchedFiltersLeft: Array<Filter> = [
  new OneColourFilter(spritesheetPalette.moss),
  outlineFilters.pureBlack,
];

const flashDurationMs = 75;
export class ItemFlashOnSwitchedRenderer<T extends ItemInPlayType>
  implements ItemPixiRenderer<T>
{
  public readonly output: Container = new Container({
    label: "ItemFlashOnSwitchedRenderer",
  });

  constructor(
    readonly renderContext: ItemRenderContext<T>,
    private readonly childRenderer: ItemPixiRenderer<T>,
  ) {
    this.output.addChild(childRenderer.output);
  }

  tick(tickContext: ItemTickContext) {
    const {
      renderContext: {
        item: {
          state: { switchedAtRoomTime, switchedSetting },
        },
        room: { roomTime },
      },
    } = this;

    this.output.filters =
      roomTime - switchedAtRoomTime < flashDurationMs ?
        switchedSetting === "left" ?
          recentlySwitchedFiltersLeft
        : recentlySwitchedFiltersRight
      : noFilters;
    this.childRenderer.tick(tickContext);
  }

  destroy(): void {
    this.output.destroy();
    this.childRenderer.destroy();
  }
}
