import { type Container } from "pixi.js";

import { type ItemInPlayType } from "../../../../model/ItemInPlay";
import { AppearanceRenderer } from "../../appearance/AppearanceRenderer";
import {
  type ItemLeafRenderContext,
  type ItemLeafTickContext,
} from "../../ItemRenderContexts";
import { type ItemLeafPixiRenderer } from "./ItemPixiRenderer";

/** specialise appearance renderer (in types only) to handle (specifically) Items more conveniently */
export class ItemAppearancePixiRenderer<
    T extends ItemInPlayType,
    RenderProps extends object,
    Output extends Container = Container,
  >
  extends AppearanceRenderer<
    ItemLeafRenderContext<T>,
    ItemLeafTickContext,
    RenderProps,
    Output
  >
  implements ItemLeafPixiRenderer<T> {}
