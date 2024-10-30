import { Container, Graphics } from "pixi.js";
import { UnknownRoomState, RoomState } from "../../model/modelTypes";
import { hasPortalClick, RenderOptions } from "../RenderOptions";
import { makeClickPortal } from "./makeClickPortal";
import { moveContainerToXyz } from "./positionSprite";
import { itemAppearances } from "./ItemAppearances";
import { ItemType } from "../../model/Item";
import { PlanetName } from "@/sprites/planets";
import { ItemInPlay } from "@/model/ItemInPlay";
import { projectToScreen } from "./projectToScreen";

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
        projectToScreen({}),
        projectToScreen({ x: item.aabb.x }),
        projectToScreen({ x: item.aabb.x, y: item.aabb.y }),
        projectToScreen({ y: item.aabb.y }),
      ])
      // right:
      .poly([
        projectToScreen({}),
        projectToScreen({ z: item.aabb.z }),
        projectToScreen({ y: item.aabb.y, z: item.aabb.z }),
        projectToScreen({ y: item.aabb.y }),
      ])
      // left:
      .poly([
        projectToScreen({ x: item.aabb.x }),
        projectToScreen({ x: item.aabb.x, z: item.aabb.z }),
        projectToScreen(item.aabb),
        projectToScreen({ x: item.aabb.x, y: item.aabb.y }),
      ])
      // top:
      .poly([
        projectToScreen({ z: item.aabb.z }),
        projectToScreen({ x: item.aabb.x, z: item.aabb.z }),
        projectToScreen({ x: item.aabb.x, y: item.aabb.y, z: item.aabb.z }),
        projectToScreen({ y: item.aabb.y, z: item.aabb.z }),
      ])
      .stroke({ width: 0.5, color: "rgba(255,255,255,0.6)" });
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
    moveContainerToXyz(item.position, result, { giveZIndex: true });
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

    if (hasPortalClick(options)) {
      if (
        item.type === "teleporter" ||
        item.type === "doorFar" ||
        item.type === "doorNear"
      ) {
        makeClickPortal(item.config.toRoom, options, rendering);
      }
      if (item.type === "lift" && room.roomAbove !== undefined) {
        makeClickPortal(room.roomAbove, options, rendering);
      }
    }

    yield rendering;
  }
}
