import { isItemType } from "../physics/itemPredicates";
import type { ColorSource } from "pixi.js";
import { Container, Graphics } from "pixi.js";
import { projectWorldXyzToScreenXyFloat } from "./projectToScreen";
import type { Aabb } from "../../utils/vectors/vectors";
import type { ItemInPlayType, AnyItemInPlay } from "../../model/ItemInPlay";

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
      width: 0.25,
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

export const renderItemBBs = (item: AnyItemInPlay): Container => {
  const color = bbColors[item.type] ?? "rgba(255,255,255)";

  const containerWithBB = new Container();

  if (isItemType("portal")(item)) {
    const relativePointScreenXy = projectWorldXyzToScreenXyFloat(
      item.config.relativePoint,
    );
    containerWithBB.addChild(
      new Graphics()
        .circle(relativePointScreenXy.x, relativePointScreenXy.y, 5)
        .stroke(color),
    );
    containerWithBB.addChild(
      new Graphics()
        .circle(relativePointScreenXy.x, relativePointScreenXy.y, 2)
        .fill(color),
    );
  }

  containerWithBB.addChild(new Graphics().circle(0, 0, 2).fill(color));
  containerWithBB.addChild(renderBB(item.aabb, color));
  if (item.renderAabb) {
    containerWithBB.addChild(renderBB(item.renderAabb, "rgba(184, 184, 255)"));
  }
  return containerWithBB;
};
