import { Container } from "pixi.js";

import type { ItemInPlayType } from "../../../../model/ItemInPlay";
import type {
  ItemRenderContext,
  ItemTickContext,
} from "../../ItemRenderContexts";
import type { ItemPixiRenderer } from "./ItemRenderer";

import { roomItemsIterable } from "../../../../model/RoomState";
import { zxSpectrumColor, zxSpectrumColors } from "../../../../originalGame";
import { effectColour } from "../../../../sprites/palette/spritesheetPalette";
import { getSpriteSheetVariant } from "../../../../sprites/spritesheet/variants/getSpriteSheetVariant";
import { getAmbientSwoppedColour } from "../../../../utils/palette/palette";
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

  readonly renderContext: ItemRenderContext<T>;
  #childRenderer: ItemPixiRenderer<T>;

  constructor(
    renderContext: ItemRenderContext<T>,
    childRenderer: ItemPixiRenderer<T>,
  ) {
    this.renderContext = renderContext;
    this.#childRenderer = childRenderer;
    this.output.addChild(childRenderer.output);

    const { spriteOption, spritesheetMeta } = renderContext.general;
    const { color: roomColor } = renderContext.room;

    const useDim = roomColor.shade === "dimmed";

    let leftColour;
    let rightColour;
    if (spriteOption.uncolourised) {
      // Speccy is two-tone - either room colour or black:
      leftColour = zxSpectrumColor(roomColor);
      rightColour = zxSpectrumColors.black;
    } else {
      leftColour = effectColour(spritesheetMeta, useDim, "left");
      rightColour = effectColour(spritesheetMeta, useDim, "right");
    }

    this.#leftColourFilter = new OneColourFilter(leftColour);
    this.#rightColourFilter = new OneColourFilter(rightColour);

    this.#outlineFilter = new OutlineFilter({
      color:
        spriteOption.uncolourised ?
          zxSpectrumColors.black
        : getAmbientSwoppedColour(
            spritesheetMeta.palette,
            spritesheetMeta.effectColours.outline,
            getSpriteSheetVariant("for-current-room").ambient,
          ),
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

    this.#childRenderer.tick(tickContext);
  }

  destroy(): void {
    this.output.destroy();
    this.#childRenderer.destroy();
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

  const isModifiedItem = roomItemsIterable(items)
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
