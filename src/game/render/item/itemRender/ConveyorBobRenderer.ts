import { Container } from "pixi.js";

import type {
  ItemRenderContext,
  ItemTickContext,
} from "../../ItemRenderContexts";
import type { DecorateItemRenderer } from "./DecorateItemRenderer";
import type { ItemPixiRenderer } from "./ItemPixiRenderer";

import { roomItemsIterable } from "../../../../model/RoomState";
import { renderBobBounce } from "../../../../utils/maths/renderBob";
import {
  type FreeItem,
  type FreeItemTypes,
  isConveyor,
  isFreeItem,
} from "../../../physics/itemPredicates";

const baseBobPeriod = 50;
const bobAmplitude = 0.66;

class ConveyorBobRenderer<T extends FreeItemTypes>
  implements ItemPixiRenderer<T>
{
  public readonly output: Container = new Container({
    label: "ConveyorBobRenderer",
  });

  readonly renderContext: ItemRenderContext<T>;
  #childRenderer: ItemPixiRenderer<T>;

  constructor(
    renderContext: ItemRenderContext<T>,
    childRenderer: ItemPixiRenderer<T>,
  ) {
    this.renderContext = renderContext;
    this.#childRenderer = childRenderer;
    this.output.addChild(childRenderer.output);
  }

  tick(tickContext: ItemTickContext) {
    const item = this.renderContext.item as FreeItem<string, string>;
    const {
      state: { standingOnItemId },
    } = item;
    const { room } = this.renderContext;

    if (standingOnItemId !== null) {
      const standingOn = room.items[standingOnItemId];
      if (
        standingOn !== undefined &&
        isConveyor(standingOn) &&
        !standingOn.state.disabled
      ) {
        const speedMultiplier = standingOn.config.speed ?? 1;
        this.output.y = renderBobBounce(
          room.roomTime,
          baseBobPeriod / speedMultiplier,
          bobAmplitude,
          this.renderContext.item.id,
        );
      } else {
        this.output.y = 0;
      }
    } else {
      this.output.y = 0;
    }

    this.#childRenderer.tick(tickContext);
  }

  destroy(): void {
    this.output.destroy();
    this.#childRenderer.destroy();
  }
}

export const conveyorBobDecorateItemRenderer: DecorateItemRenderer = (
  itemRenderContext,
  childRenderer,
) => {
  const roomHasConveyor = roomItemsIterable(itemRenderContext.room.items).some(
    isConveyor,
  );

  return roomHasConveyor && isFreeItem(itemRenderContext.item) ?
      (new ConveyorBobRenderer(
        itemRenderContext as ItemRenderContext<FreeItemTypes>,
        childRenderer as ItemPixiRenderer<FreeItemTypes>,
      ) as typeof childRenderer)
    : childRenderer;
};
