import type { GameState } from "../../gameState/GameState";
import { Container } from "pixi.js";
import type { RoomState } from "../../../model/modelTypes";
import type { SceneryName } from "../../../sprites/planets";
import type {
  AnyItemInPlay,
  UnknownItemInPlay,
} from "../../../model/ItemInPlay";
import { store } from "../../../store/store";
import type { RenderContext, Renderer } from "../Renderer";
import { ItemAppearanceRenderer } from "./ItemAppearanceRenderer";
import { ItemBoundingBoxRenderer } from "./ItemBoundingBoxRenderer";
import { ItemPositionRenderer } from "./ItemPositionRenderer";
import { ItemShadowRenderer } from "./ItemShadowRenderer";
import type { SetRequired } from "type-fest";

export const assignMouseActions = <RoomId extends string>(
  item: AnyItemInPlay<RoomId>,
  container: Container,
  gameState: GameState<RoomId>,
) => {
  if (container !== undefined) {
    container.eventMode = "static";
    container.on("pointertap", () => {
      gameState.events.emit("itemClicked", { item, container });
    });
  }
};

const hasShadowMask = (
  item: UnknownItemInPlay,
): item is SetRequired<UnknownItemInPlay, "shadowMask"> =>
  item.shadowMask !== undefined;

export const createItemRenderer = <
  RoomId extends string,
  ItemId extends string,
>(
  item: UnknownItemInPlay<RoomId, ItemId>,
  room: RoomState<SceneryName, RoomId, ItemId>,
  gameState: GameState<RoomId>,
): Renderer | "not-needed" => {
  const {
    userSettings: {
      displaySettings: { showBoundingBoxes },
    },
  } = store.getState();

  const renderBoundingBoxes =
    showBoundingBoxes === "all" ||
    (showBoundingBoxes === "non-wall" && item.type !== "wall");

  const renderers: Renderer[] = [];

  if (item.renders) {
    renderers.push(new ItemAppearanceRenderer(item, room, gameState));
    if (hasShadowMask(item)) {
      renderers.push(new ItemShadowRenderer(item, room));
    }
  }
  if (renderBoundingBoxes) {
    renderers.push(new ItemBoundingBoxRenderer(item));
  }

  if (renderers.length === 0) {
    return "not-needed";
  } else {
    return new ItemPositionRenderer(item, new CompositeRenderer(renderers));
  }
};

class CompositeRenderer implements Renderer {
  #componentRenderers: Renderer[];
  #container: Container = new Container({ label: "CompositeRenderer" });
  constructor(componentRenderers: Renderer[]) {
    this.#componentRenderers = componentRenderers;
    this.#container.addChild(...componentRenderers.map((r) => r.container));
  }
  tick(renderContext: RenderContext) {
    for (const componentRenderer of this.#componentRenderers) {
      componentRenderer.tick(renderContext);
    }
  }
  destroy() {
    for (const componentRenderer of this.#componentRenderers) {
      componentRenderer.destroy();
    }
  }
  get container() {
    return this.#container;
  }
}
