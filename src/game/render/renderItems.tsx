import { Container, Graphics } from "pixi.js";
import { UnknownRoomState, RoomState } from "../../model/modelTypes";
import { hasItemClick, RenderOptions } from "../RenderOptions";
import { moveSpriteToItemProjection } from "./projectToScreen";
import { itemAppearances } from "./ItemAppearances";
import { ItemType } from "../../model/Item";
import { PlanetName } from "@/sprites/planets";
import { ItemInPlay } from "@/model/ItemInPlay";
import { projectWorldXyzToScreenXy } from "./projectToScreen";

const maybeRenderBB = <T extends ItemType, RoomId extends string>(
  item: ItemInPlay<T>,
  itemRendering: Container,
  options: RenderOptions<RoomId>,
): Container => {
  if (options.showBoundingBoxes === true && item.aabb !== undefined) {
    const containerWithBB = new Container();
    const bbGraphics = new Graphics()
      // bottom:
      .poly([
        projectWorldXyzToScreenXy({}),
        projectWorldXyzToScreenXy({ x: item.aabb.x }),
        projectWorldXyzToScreenXy({ x: item.aabb.x, y: item.aabb.y }),
        projectWorldXyzToScreenXy({ y: item.aabb.y }),
      ])
      // right:
      .poly([
        projectWorldXyzToScreenXy({}),
        projectWorldXyzToScreenXy({ z: item.aabb.z }),
        projectWorldXyzToScreenXy({ y: item.aabb.y, z: item.aabb.z }),
        projectWorldXyzToScreenXy({ y: item.aabb.y }),
      ])
      // left:
      .poly([
        projectWorldXyzToScreenXy({ x: item.aabb.x }),
        projectWorldXyzToScreenXy({ x: item.aabb.x, z: item.aabb.z }),
        projectWorldXyzToScreenXy(item.aabb),
        projectWorldXyzToScreenXy({ x: item.aabb.x, y: item.aabb.y }),
      ])
      // top:
      .poly([
        projectWorldXyzToScreenXy({ z: item.aabb.z }),
        projectWorldXyzToScreenXy({ x: item.aabb.x, z: item.aabb.z }),
        projectWorldXyzToScreenXy({
          x: item.aabb.x,
          y: item.aabb.y,
          z: item.aabb.z,
        }),
        projectWorldXyzToScreenXy({ y: item.aabb.y, z: item.aabb.z }),
      ])
      .stroke({ width: 0.5, color: "rgba(255,255,255,0.5)" });
    //itemRendering.alpha = 0.8;
    containerWithBB.addChild(itemRendering);
    containerWithBB.addChild(bbGraphics);
    //itemRendering.alpha = 0.8;
    return containerWithBB;
  } else return itemRendering;
};

const renderItem = <T extends ItemType, RoomId extends string>(
  item: ItemInPlay<T>,
  room: UnknownRoomState,
  options: RenderOptions<RoomId>,
) => {
  const itemAppearance = itemAppearances[item.type];

  if (itemAppearance === undefined) {
    throw new Error(`item type "${item.type}" has no appearance`);
  }

  const itemRendering = new Container();
  const result = maybeRenderBB(item, itemRendering, options);

  const renderInContainer = () => {
    itemRendering.removeChildren();
    const sprite = itemAppearance(item.config, room, item.position, item.state);
    itemRendering.addChild(sprite);
  };

  const position = () => {
    moveSpriteToItemProjection(item, result);
  };

  renderInContainer();
  position();

  item.events.on("move", position);
  item.events.on("stateChange", renderInContainer);

  return result;
};

export function* renderItems<RoomId extends string>(
  room: RoomState<PlanetName, RoomId>,
  options: RenderOptions<RoomId>,
): Generator<Container, undefined, undefined> {
  for (const item of room.items) {
    const rendering = renderItem(item, room, options);

    if (hasItemClick(options)) {
      rendering.eventMode = "static";
      rendering.on("pointertap", () => {
        options.onItemClick(item);
      });
    }

    yield rendering;
  }
}
