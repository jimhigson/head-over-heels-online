import { Container } from "pixi.js";

import type { ItemInPlayType } from "../../../../model/ItemInPlay";
import type {
  ItemRenderContext,
  ItemTickContext,
} from "../../ItemRenderContexts";
import type { ItemPixiRenderer } from "./ItemRenderer";

import { iterateRoomItems } from "../../../../model/RoomState";
import {
  spritesheetPalette,
  spritesheetPaletteDim,
} from "../../../../sprites/palette/spritesheetPalette";
import { isModifier } from "../../../physics/itemPredicates";
import { OneColourFilter } from "../../filters/oneColourFilter";
import { OutlineFilter } from "../../filters/outlineFilter";

const flashDurationMs = 75;

export class ItemFlashOnSwitchedRenderer<T extends ItemInPlayType>
  implements ItemPixiRenderer<T>
{
  public readonly output: Container = new Container({
    label: "ItemFlashOnSwitchedRenderer",
  });

  #leftColourFilter: OneColourFilter;
  #rightColourFilter: OneColourFilter;
  #outlineFilter: OutlineFilter;

  constructor(
    readonly renderContext: ItemRenderContext<T>,
    private readonly childRenderer: ItemPixiRenderer<T>,
  ) {
    this.output.addChild(childRenderer.output);

    const palette =
      renderContext.room.color.shade === "dimmed" ?
        spritesheetPaletteDim
      : spritesheetPalette;

    this.#leftColourFilter = new OneColourFilter(palette.moss);
    this.#rightColourFilter = new OneColourFilter(palette.midRed);
    this.#outlineFilter = new OutlineFilter({
      color: palette.pureBlack,
    });

    this.#leftColourFilter.enabled = false;
    this.#rightColourFilter.enabled = false;
    this.#outlineFilter.enabled = false;

    this.output.filters = [
      this.#leftColourFilter,
      this.#rightColourFilter,
      this.#outlineFilter,
    ];
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

    const isFlashing = roomTime - switchedAtRoomTime < flashDurationMs;
    const isLeft = switchedSetting === "left";

    this.#leftColourFilter.enabled = isFlashing && isLeft;
    this.#rightColourFilter.enabled = isFlashing && !isLeft;
    this.#outlineFilter.enabled = isFlashing;

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
