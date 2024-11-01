import { ItemType } from "@/model/Item";
import { ItemInPlay } from "@/model/ItemInPlay";
import { ColorSource, Container, Graphics } from "pixi.js";
import { RenderOptions } from "../RenderOptions";
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

export const maybeRenderBB = <T extends ItemType, RoomId extends string>(
  item: Pick<ItemInPlay<T>, "aabb" | "type" | "id" | "renderAabb">,
  itemRendering: Container,
  options: RenderOptions<RoomId>,
): Container => {
  if (
    options.showBoundingBoxes === "all" ||
    (options.showBoundingBoxes === "non-wall" && item.type !== "wall")
  ) {
    const containerWithBB = new Container();
    const color =
      item.type === "wall" ? "rgba(255,0,0, 0.5)" : "rgba(255,255,255,0.5)";

    const posGraphics = new Graphics().circle(0, 0, 2).fill(color);
    containerWithBB.addChild(itemRendering);
    containerWithBB.addChild(posGraphics);
    containerWithBB.addChild(renderBB(item.aabb, color));
    if (item.renderAabb) {
      containerWithBB.addChild(renderBB(item.renderAabb, "green"));
    }
    itemRendering.alpha = 0.8;
    return containerWithBB;
  } else return itemRendering;
};
