import type { Container } from "pixi.js";

import type { ItemInPlayType } from "../../../../model/ItemInPlay";
import type {
  ItemRenderContext,
  ItemTickContext,
} from "../../ItemRenderContexts";
import type { ItemPixiRenderer } from "./ItemRenderer";

import { AppearanceRenderer } from "../../appearance/AppearanceRenderer";

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
