import type { Container } from "pixi.js";
import type { ItemInPlayType } from "../../../../model/ItemInPlay";
import type { Renderer } from "../../Renderer";
import type {
  ItemRenderContext,
  ItemTickContext,
} from "../../ItemRenderContexts";

export type ItemPixiRenderer<
  T extends ItemInPlayType,
  Output extends Container = Container,
> = Renderer<ItemRenderContext<T>, ItemTickContext, Output>;
