import type { ItemInPlay, ItemInPlayType } from "@/model/ItemInPlay";
import type { ColorSource } from "pixi.js";
import { Container, Graphics } from "pixi.js";
import { projectWorldXyzToScreenXyFloat } from "./projectToScreen";
import type { Aabb } from "@/utils/vectors";

const renderBB = (aabb: Aabb, color: ColorSource) => {
  return (
    new Graphics()
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
      })
  );
};

const bbColors: Partial<Record<ItemInPlayType, string>> = {
  head: "rgba(255,184,0)",
  wall: "rgba(128,200,0)",
  portal: "rgba(255,0,255)",
};

const renderItemBBs = <T extends ItemInPlayType>(
  item: Pick<ItemInPlay<T>, "aabb" | "type" | "id" | "renderAabb">,
): Container => {
  const color = bbColors[item.type] ?? "rgba(255,255,255)";

  const containerWithBB = new Container();

  containerWithBB.addChild(new Graphics().circle(0, 0, 2).fill(color));
  containerWithBB.addChild(renderBB(item.aabb, color));
  if (item.renderAabb) {
    containerWithBB.addChild(renderBB(item.renderAabb, "rgba(184, 184, 255)"));
  }
  return containerWithBB;
};

export const itemRenderingInContainerAlongsideBBRendering = <
  T extends ItemInPlayType,
>(
  item: ItemInPlay<T>,
): Container => {
  const wrappingContainer = new Container();
  if (item.renderContainer !== undefined) {
    // it is ok for a non-rendering item to have its BB illustrated,
    // but in this case there's nothing to add to the wrapping container
    wrappingContainer.addChild(item.renderContainer);
  }
  wrappingContainer.addChild(renderItemBBs(item));
  return wrappingContainer;
};
