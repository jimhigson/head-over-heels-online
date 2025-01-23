import type { ColorSource } from "pixi.js";
import { Graphics, Container } from "pixi.js";
import type { ItemInPlayType, ItemInPlay } from "../../../model/ItemInPlay";
import type { SceneryName } from "../../../sprites/planets";
import type { Aabb } from "../../../utils/vectors/vectors";
import { isItemType } from "../../physics/itemPredicates";
import { projectWorldXyzToScreenXyFloat } from "../projectToScreen";
import type { RenderContext, Renderer } from "../Renderer";

const renderBB = (aabb: Aabb, color: ColorSource) => {
  const graphics = new Graphics()
    // bottom:
    .poly([
      projectWorldXyzToScreenXyFloat({}),
      projectWorldXyzToScreenXyFloat({ x: aabb.x }),
      projectWorldXyzToScreenXyFloat({ x: aabb.x, y: aabb.y }),
      projectWorldXyzToScreenXyFloat({ y: aabb.y }),
    ])
    // right:
    .poly([
      projectWorldXyzToScreenXyFloat({}),
      projectWorldXyzToScreenXyFloat({ z: aabb.z }),
      projectWorldXyzToScreenXyFloat({ y: aabb.y, z: aabb.z }),
      projectWorldXyzToScreenXyFloat({ y: aabb.y }),
    ])
    // left:
    .poly([
      projectWorldXyzToScreenXyFloat({ x: aabb.x }),
      projectWorldXyzToScreenXyFloat({ x: aabb.x, z: aabb.z }),
      projectWorldXyzToScreenXyFloat(aabb),
      projectWorldXyzToScreenXyFloat({ x: aabb.x, y: aabb.y }),
    ])
    // top:
    .poly([
      projectWorldXyzToScreenXyFloat({ z: aabb.z }),
      projectWorldXyzToScreenXyFloat({ x: aabb.x, z: aabb.z }),
      projectWorldXyzToScreenXyFloat({
        x: aabb.x,
        y: aabb.y,
        z: aabb.z,
      }),
      projectWorldXyzToScreenXyFloat({ y: aabb.y, z: aabb.z }),
    ])
    .stroke({
      width: 0.5,
      color,
      alpha: 1,
    });

  graphics.eventMode = "static";
  graphics.on("pointerenter", () => {
    graphics.fill({ color, alpha: 0.5 });
  });
  graphics.on("pointerleave", () => {
    graphics.fill({ color: "transparent" });
  });

  return graphics;
};

const bbColors: Partial<Record<ItemInPlayType, string>> = {
  head: "rgba(255,184,0)",
  wall: "rgba(128,200,0)",
  portal: "rgba(255,0,255)",
  stopAutowalk: "rgba(255,128,128)",
};

export class ItemBoundingBoxRenderer<
  T extends ItemInPlayType,
  RoomId extends string,
  ItemId extends string,
> implements Renderer
{
  #container: Container;

  constructor(item: ItemInPlay<T, SceneryName, RoomId, ItemId>) {
    const color = bbColors[item.type] ?? "rgba(255,255,255)";

    this.#container = new Container({
      label: `ItemBoundingBoxRenderer ${item.id}`,
    });

    if (isItemType("portal")(item)) {
      const relativePointScreenXy = projectWorldXyzToScreenXyFloat(
        item.config.relativePoint,
      );
      this.#container.addChild(
        new Graphics()
          .circle(relativePointScreenXy.x, relativePointScreenXy.y, 5)
          .stroke(color),
      );
      this.#container.addChild(
        new Graphics()
          .circle(relativePointScreenXy.x, relativePointScreenXy.y, 2)
          .fill(color),
      );
    }

    this.#container.addChild(new Graphics().circle(0, 0, 2).fill(color));
    this.#container.addChild(renderBB(item.aabb, color));
    if (item.renderAabb) {
      this.#container.addChild(
        renderBB(item.renderAabb, "rgba(184, 184, 255)"),
      );
    }
  }
  tick(_renderContext: RenderContext) {}
  destroy(): void {
    this.#container.destroy({ children: true });
  }
  get container() {
    return this.#container;
  }
}
