import type { Filter } from "pixi.js";
import { Container } from "pixi.js";
import type { ItemInPlayType } from "../../../../model/ItemInPlay";
import type { ItemPixiRenderer } from "./ItemRenderer";
import type { ItemRenderContext, ItemTickContext } from "../../Renderer";
import { OneColourFilter } from "../../filters/oneColourFilter";
import { spritesheetPalette } from "../../../../../gfx/spritesheetPalette";
import { noFilters } from "../../filters/standardFilters";

const recentlySwitchedFiltersRight: Array<Filter> = [
  new OneColourFilter(spritesheetPalette.midRed),
];
const recentlySwitchedFiltersLeft: Array<Filter> = [
  new OneColourFilter(spritesheetPalette.moss),
];

const flashDurationMs = 75;
export class ItemFlashOnSwitchedRenderer<
  T extends ItemInPlayType,
  RoomId extends string,
  RoomItemId extends string,
> implements ItemPixiRenderer<T, RoomId, RoomItemId>
{
  public readonly output: Container = new Container();

  constructor(
    readonly renderContext: ItemRenderContext<T, RoomId, RoomItemId>,
    private readonly childRenderer: ItemPixiRenderer<T, RoomId, RoomItemId>,
  ) {
    this.output.addChild(childRenderer.output);
  }

  tick(tickContext: ItemTickContext<RoomId, RoomItemId>) {
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
