import { Container } from "pixi.js";
import type { RoomState } from "../../../model/modelTypes";
import type { SceneryName } from "../../../sprites/planets";
import type { GameState } from "../../gameState/GameState";
import type { Renderer, RenderContext } from "../Renderer";
import type {
  Appearance,
  RenderProps,
  RenderSubject,
} from "../appearance/Appearance";
import type { ItemInPlay, ItemInPlayType } from "../../../model/ItemInPlay";
import type { ItemRenderProps } from "../itemAppearances/ItemRenderProps";

/*
const assignMouseActions = <RoomId extends string>(
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
*/

export class AppearanceRenderer<
  S extends RenderSubject,
  RP extends RenderProps,
  RoomId extends string,
> implements Renderer
{
  #currentlyRenderedProps: RP | undefined = undefined;
  #container: Container;

  constructor(
    private subject: S,
    private room: RoomState<SceneryName, RoomId>,
    private gameState: GameState<RoomId>,
    private appearance: Appearance<S, RP>,
  ) {
    this.#container = new Container({
      label: `AppearanceRenderer ${subject.id}`,
    });

    //assignMouseActions(subject, this.#container, gameState);
  }

  destroy() {
    this.#container.destroy({ children: true });
  }

  tick(renderContext: RenderContext) {
    const rendering = this.appearance<RoomId>({
      subject: this.subject,
      room: this.room,
      currentlyRenderedProps: this.#currentlyRenderedProps,
      displaySettings: renderContext.displaySettings,
      previousRendering: this.#container.children.at(0) ?? null,
      onHold: renderContext.onHold,
      gameState: this.gameState,
    });

    if (rendering !== "no-update") {
      this.#currentlyRenderedProps = rendering.renderProps;
      // it is ok to return the same container back, in which case we don't need to do anything:
      if (this.#container.children.at(0) !== rendering.container) {
        this.#container.removeChildren();
        if (rendering.container !== null)
          this.#container.addChild(rendering.container);
      }
    }
  }

  get container() {
    return this.#container;
  }
}

export class ItemAppearanceRenderer<
  T extends ItemInPlayType,
  RoomId extends string,
  ItemId extends string,
> extends AppearanceRenderer<
  ItemInPlay<T, SceneryName, RoomId, ItemId>,
  ItemRenderProps<T>,
  RoomId
> {}
