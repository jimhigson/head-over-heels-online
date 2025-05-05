import type { ItemInPlayType } from "../../../../model/ItemInPlay";
import { AppearanceRenderer } from "../../appearance/AppearanceRenderer";
import type { ItemRenderContext, ItemTickContext } from "../../Renderer";
import type { ItemPixiRenderer } from "./ItemRenderer";
import type { Container } from "pixi.js";

/** specialise appearance renderer (in types only) to handle (specifically) Items more conveniently */
export class ItemAppearancePixiRenderer<
    T extends ItemInPlayType,
    RenderProps extends object,
    Output extends Container = Container,
  >
  extends AppearanceRenderer<
    ItemRenderContext<T>,
    ItemTickContext,
    RenderProps,
    Output
  >
  implements ItemPixiRenderer<T> {}
