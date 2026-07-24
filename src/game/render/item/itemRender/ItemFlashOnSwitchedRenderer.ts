import { Container, type Filter } from "pixi.js";

import { type ItemInPlayType } from "../../../../model/ItemInPlay";
import { roomItemsIterable } from "../../../../model/RoomState";
import { zxSpectrumColor, zxSpectrumColors } from "../../../../originalGame";
import { effectColour } from "../../../../sprites/palette/spritesheetPalette";
import { getAmbientSwoppedColour } from "../../../../utils/palette/palette";
import { isModifier } from "../../../physics/itemPredicates";
import { OneColourFilter } from "../../filters/OneColourFilter";
import { OutlineFilter } from "../../filters/OutlineFilter";
import {
  type ItemRenderContext,
  type ItemTickContext,
} from "../../ItemRenderContexts";
import { type DecorateItemRenderer } from "./DecorateItemRenderer";
import { type ItemChainPixiRenderer } from "./ItemPixiRenderer";

const flashDurationMs = 75;

class ItemFlashOnSwitchedRenderer<
  T extends ItemInPlayType,
> implements ItemChainPixiRenderer<T> {
  public readonly output: Container = new Container({
    label: "ItemFlashOnSwitchedRenderer",
  });

  #leftColourFilter: Filter;
  #rightColourFilter: Filter;
  #outlineFilter: Filter;

  readonly renderContext: ItemRenderContext<T>;
  #childRenderer: ItemChainPixiRenderer<T>;

  constructor(
    renderContext: ItemRenderContext<T>,
    childRenderer: ItemChainPixiRenderer<T>,
  ) {
    this.renderContext = renderContext;
    this.#childRenderer = childRenderer;
    this.output.addChild(childRenderer.output);

    const { spriteOption, spritesheets, spritesheetMeta } =
      renderContext.general;
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

    // shared via the room renderer's filter cache (one of each per colour
    // serves every switch-modified item in the room), so flashing is applied
    // by attaching/detaching them, never by mutating the filters:
    const { filterCache } = renderContext;
    this.#leftColourFilter = filterCache.getOrInsertComputed(
      `oneColour(${leftColour.toHex()})`,
      () => new OneColourFilter(leftColour),
    );
    this.#rightColourFilter = filterCache.getOrInsertComputed(
      `oneColour(${rightColour.toHex()})`,
      () => new OneColourFilter(rightColour),
    );

    const outlineColour =
      spriteOption.uncolourised ?
        zxSpectrumColors.black
      : getAmbientSwoppedColour(
          spritesheetMeta.palette,
          spritesheetMeta.effectColours.outline,
          spritesheets.spritesheetForCurrentRoom.ambient,
        );
    this.#outlineFilter = filterCache.getOrInsertComputed(
      `outline(${outlineColour.toHex()})`,
      () => new OutlineFilter({ color: outlineColour }),
    );
  }

  #appliedFlash: "left" | "none" | "right" = "none";

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
    const flash =
      !isFlashing ? "none"
      : switchedSetting === "left" ? "left"
      : "right";

    if (flash !== this.#appliedFlash) {
      this.output.filters =
        flash === "none" ?
          []
        : [
            flash === "left" ? this.#leftColourFilter : this.#rightColourFilter,
            this.#outlineFilter,
          ];
      this.#appliedFlash = flash;
    }

    this.#childRenderer.tick(tickContext);
  }

  destroy(): void {
    this.output.destroy();
    this.#childRenderer.destroy();
  }
}

export const flashOnSwitchedDecorateItemRenderer: DecorateItemRenderer = (
  itemRenderContext,
  childRenderer,
) => {
  const {
    item,
    room: { items },
  } = itemRenderContext;

  // check if this item is modified by any switch etc in the room:
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
  }
  return childRenderer;
};
