import type { Filter } from "pixi.js";

import { Container } from "pixi.js";

import type { ItemInPlayType } from "../../../../model/ItemInPlay";
import type {
  ItemRenderContext,
  ItemTickContext,
} from "../../ItemRenderContexts";
import type { ItemPixiRenderer } from "./ItemRenderer";

import { spritesheetPalette } from "../../../../../gfx/spritesheetPalette";
import { iterateRoomItems } from "../../../../model/RoomState";
import { isModifier } from "../../../physics/itemPredicates";
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

export const maybeWrapInFlashOnSwitchedRenderer = <T extends ItemInPlayType>(
  itemRenderContext: ItemRenderContext<T>,
  childRenderer: ItemPixiRenderer<T>,
): ItemPixiRenderer<T> => {
  const {
    item,
    room: { items },
  } = itemRenderContext;

  const isModifiedItem = iterateRoomItems(items)
    .filter(isModifier)
    .some(({ config: { modifies } }) => {
      return modifies.some((m) =>
        m.targets === undefined ?
          m.expectType === item.type
        : m.targets.includes(item.id),
      );
    });

  if (isModifiedItem) {
    return new ItemFlashOnSwitchedRenderer(itemRenderContext, childRenderer);
  } else return childRenderer;
};
