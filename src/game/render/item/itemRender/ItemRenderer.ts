import type { Container } from "pixi.js";
import type { ItemInPlayType } from "../../../../model/ItemInPlay";
import type {
  ItemRenderContext,
  ItemTickContext,
  Renderer,
} from "../../Renderer";

export type ItemPixiRenderer<
  T extends ItemInPlayType,
  Output extends Container = Container,
> = Renderer<ItemRenderContext<T>, ItemTickContext, Output>;
