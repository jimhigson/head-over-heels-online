import type { ColorSource } from "pixi.js";
import { Graphics, Container, Text } from "pixi.js";
import type { ItemInPlayType } from "../../../../model/ItemInPlay";
import type { Aabb } from "../../../../utils/vectors/vectors";
import { isItemType } from "../../../physics/itemPredicates";
import { projectWorldXyzToScreenXy } from "../../projections";
import type { ItemRenderContext } from "../../ItemRenderContexts";
import type { ItemPixiRenderer } from "./ItemRenderer";

const addCuboidPaths = (cuboid: Aabb, graphics: Graphics) => {
  graphics
    // bottom:
    .poly([
      projectWorldXyzToScreenXy({}),
      projectWorldXyzToScreenXy({ x: cuboid.x }),
      projectWorldXyzToScreenXy({ x: cuboid.x, y: cuboid.y }),
      projectWorldXyzToScreenXy({ y: cuboid.y }),
    ])
    // right:
    .poly([
      projectWorldXyzToScreenXy({}),
      projectWorldXyzToScreenXy({ z: cuboid.z }),
      projectWorldXyzToScreenXy({ y: cuboid.y, z: cuboid.z }),
      projectWorldXyzToScreenXy({ y: cuboid.y }),
    ])
    // left:
    .poly([
      projectWorldXyzToScreenXy({ x: cuboid.x }),
      projectWorldXyzToScreenXy({ x: cuboid.x, z: cuboid.z }),
      projectWorldXyzToScreenXy(cuboid),
      projectWorldXyzToScreenXy({ x: cuboid.x, y: cuboid.y }),
    ])
    // top:
    .poly([
      projectWorldXyzToScreenXy({ z: cuboid.z }),
      projectWorldXyzToScreenXy({ x: cuboid.x, z: cuboid.z }),
      projectWorldXyzToScreenXy({
        x: cuboid.x,
        y: cuboid.y,
        z: cuboid.z,
      }),
      projectWorldXyzToScreenXy({ y: cuboid.y, z: cuboid.z }),
    ]);
};

const renderBB = (aabb: Aabb, color: ColorSource) => {
  const graphics = new Graphics();
  addCuboidPaths(aabb, graphics);

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
    addCuboidPaths(aabb, graphics);

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
  pickup: "rgba(0,196,255)",
  emitter: "rgba(0,255,255)",
  stopAutowalk: "rgba(255,128,128)",
  floatingText: "rgba(128,0,255)",
};

export class ItemBoundingBoxRenderer<T extends ItemInPlayType>
  implements ItemPixiRenderer<T>
{
  #container: Container;

  constructor(public readonly renderContext: ItemRenderContext<T>) {
    const { item } = renderContext;

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
      const renderAabbColour = "rgba(184, 184, 255)";
      const renderAabbGraphics = renderBB(item.renderAabb, renderAabbColour);
      if (item.renderAabbOffset) {
        const offset = projectWorldXyzToScreenXy(item.renderAabbOffset);
        renderAabbGraphics.position.set(offset.x, offset.y);
        renderAabbGraphics.circle(0, 0, 2).fill(renderAabbColour);
      }
      this.#container.addChild(renderAabbGraphics);
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
  tick() {
    // never update the rendering
  }
  destroy(): void {
    this.#container.destroy({ children: true });
  }
  get output() {
    return this.#container;
  }
}
