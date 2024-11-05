import { ItemInPlay, ItemInPlayType } from "@/model/ItemInPlay";
import { ColorSource, Container, Graphics } from "pixi.js";
import { projectWorldXyzToScreenXy } from "./projectToScreen";
import { Aabb } from "@/utils/vectors";

const renderBB = (aabb: Aabb, color: ColorSource) => {
  return (
    new Graphics()
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
      ])
      .stroke({
        width: 0.5,
        color,
      })
  );
};

const renderItemBBs = <T extends ItemInPlayType>(
  item: Pick<ItemInPlay<T>, "aabb" | "type" | "id" | "renderAabb">,
): Container => {
  const color =
    item.type === "wall" ? "rgba(255,0,0, 0.5)" : "rgba(255,255,255,0.5)";

  const containerWithBB = new Container();

  containerWithBB.addChild(new Graphics().circle(0, 0, 2).fill(color));
  containerWithBB.addChild(renderBB(item.aabb, color));
  if (item.renderAabb) {
    containerWithBB.addChild(renderBB(item.renderAabb, "green"));
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
