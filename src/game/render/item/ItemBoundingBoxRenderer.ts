import type { ColorSource } from "pixi.js";
import { Graphics, Container, Text } from "pixi.js";
import type { ItemInPlayType, ItemInPlay } from "../../../model/ItemInPlay";
import type { Aabb } from "../../../utils/vectors/vectors";
import { isItemType } from "../../physics/itemPredicates";
import { projectWorldXyzToScreenXy } from "../projectToScreen";
import type { ItemRenderContext, Renderer } from "../Renderer";

const cuboidBB = (aabb: Aabb, graphics: Graphics) => {
  graphics
    // bottom:
    .poly([
      projectWorldXyzToScreenXy({}),
      projectWorldXyzToScreenXy({ x: aabb.x }),
      projectWorldXyzToScreenXy({ x: aabb.x, y: aabb.y }),
      projectWorldXyzToScreenXy({ y: aabb.y }),
    ])
    // right:
    .poly([
      projectWorldXyzToScreenXy({}),
      projectWorldXyzToScreenXy({ z: aabb.z }),
      projectWorldXyzToScreenXy({ y: aabb.y, z: aabb.z }),
      projectWorldXyzToScreenXy({ y: aabb.y }),
    ])
    // left:
    .poly([
      projectWorldXyzToScreenXy({ x: aabb.x }),
      projectWorldXyzToScreenXy({ x: aabb.x, z: aabb.z }),
      projectWorldXyzToScreenXy(aabb),
      projectWorldXyzToScreenXy({ x: aabb.x, y: aabb.y }),
    ])
    // top:
    .poly([
      projectWorldXyzToScreenXy({ z: aabb.z }),
      projectWorldXyzToScreenXy({ x: aabb.x, z: aabb.z }),
      projectWorldXyzToScreenXy({
        x: aabb.x,
        y: aabb.y,
        z: aabb.z,
      }),
      projectWorldXyzToScreenXy({ y: aabb.y, z: aabb.z }),
    ]);
};

const renderBB = (aabb: Aabb, color: ColorSource) => {
  const graphics = new Graphics();
  cuboidBB(aabb, graphics);

  graphics.stroke({
    width: 0.5,
    color,
    alpha: 1,
  });

  graphics.eventMode = "static";
  graphics.on("pointerenter", () => {
    graphics.fill({ color, alpha: 0.5 });
  });
  graphics.on("pointerleave", () => {
    graphics.clear();
    cuboidBB(aabb, graphics);

    graphics.stroke({
      width: 0.5,
      color,
      alpha: 1,
    });
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
  RoomItemid extends string,
> implements Renderer<ItemRenderContext<RoomId>>
{
  #container: Container;

  constructor(item: ItemInPlay<T, RoomId, RoomItemid>) {
    const color = bbColors[item.type] ?? "rgba(255,255,255)";

    this.#container = new Container({
      label: `ItemBoundingBoxRenderer ${item.id}`,
    });

    if (isItemType("portal")(item)) {
      const relativePointScreenXy = projectWorldXyzToScreenXy(
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

    this.#container.addChild(
      new Graphics({ label: "objectOrigin" }).circle(0, 0, 2).fill(color),
    );
    this.#container.addChild(renderBB(item.aabb, color));
    if (item.renderAabb) {
      this.#container.addChild(
        renderBB(item.renderAabb, "rgba(184, 184, 255)"),
      );
    }

    this.#container.eventMode = "static";
    let textNode: Text | undefined;
    this.#container.on("pointerenter", () => {
      if (textNode !== undefined) {
        return;
      }
      const text = `${item.id} ${item.type}
@(${item.state.position.x}, ${item.state.position.y}, ${item.state.position.z})}
#(${item.aabb.x}, ${item.aabb.y}, ${item.aabb.z})}`;
      this.#container.addChild(
        (textNode = new Text({
          text,
          style: {
            fill: color,
            fontSize: 6,
            fontFamily: "Menlo",
          },
        })),
      );
      textNode.resolution = 4;
    });
    this.#container.on("pointerleave", () => {
      if (textNode === undefined) {
        return;
      }
      this.#container.removeChild(textNode);
      textNode = undefined;
    });
    /*this.#container.on("pointerleave", () => {
      graphics.clear();
      cuboidBB(aabb, graphics);
  
      graphics.stroke({
        width: 0.5,
        color,
        alpha: 1,
      });
    });*/
  }
  tick(_renderContext: ItemRenderContext<RoomId>) {}
  destroy(): void {
    this.#container.destroy({ children: true });
  }
  get container() {
    return this.#container;
  }
}
