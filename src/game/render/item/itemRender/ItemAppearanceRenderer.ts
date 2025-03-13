import type { ItemInPlayType } from "../../../../model/ItemInPlay";
import type { ItemRenderProps } from "../../itemAppearances/ItemRenderProps";
import { AppearanceRenderer } from "../../appearance/AppearanceRenderer";
import type { ItemRenderContext, ItemTickContext } from "../../Renderer";
import type { ItemRenderer } from "./ItemRenderer";
import type { Container } from "pixi.js";

/** specialise appearance renderer (in types only) to handle (specifically) Items more conveniently */
export class ItemAppearanceRenderer<
    T extends ItemInPlayType,
    RoomId extends string,
    RoomItemId extends string,
    RenderTarget extends Container = Container,
  >
  extends AppearanceRenderer<
    ItemRenderContext<T, RoomId, RoomItemId>,
    ItemTickContext<RoomId, RoomItemId>,
    ItemRenderProps<T>,
    RenderTarget
  >
  implements ItemRenderer<T, RoomId, RoomItemId> {}
