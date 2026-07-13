import { Container } from "pixi.js";

import { type ItemInPlayType } from "../../../../model/ItemInPlay";
import { roomItemsIterable } from "../../../../model/RoomState";
import { renderBobBounce } from "../../../../utils/maths/renderBob";
import { isConveyor, isFreeItem } from "../../../physics/itemPredicates";
import {
  type ItemRenderContext,
  type ItemTickContext,
} from "../../ItemRenderContexts";
import { type DecorateItemRenderer } from "./DecorateItemRenderer";
import { type ItemChainPixiRenderer } from "./ItemPixiRenderer";

const baseBobPeriod = 50;
const bobAmplitude = 0.66;

class ConveyorBobRenderer<T extends ItemInPlayType>
  implements ItemChainPixiRenderer<T>
{
  public readonly output: Container = new Container({
    label: "ConveyorBobRenderer",
  });

  readonly renderContext: ItemRenderContext<T>;
  #childRenderer: ItemChainPixiRenderer<T>;

  constructor(
    renderContext: ItemRenderContext<T>,
    childRenderer: ItemChainPixiRenderer<T>,
  ) {
    this.renderContext = renderContext;
    this.#childRenderer = childRenderer;
    this.output.addChild(childRenderer.output);
  }

  tick(tickContext: ItemTickContext) {
    const { item, room } = this.renderContext;

    const standingOnItemId =
      isFreeItem(item) ? item.state.standingOnItemId : null;

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
          item.hash,
          this.renderContext.general.spriteOption.uncolourised,
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
      new ConveyorBobRenderer(itemRenderContext, childRenderer)
    : childRenderer;
};
