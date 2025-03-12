import type { ItemInPlayType } from "../../../model/ItemInPlay";
import type { ItemRenderProps } from "../itemAppearances/ItemRenderProps";
import { AppearanceRenderer } from "../appearance/AppearanceRenderer";
import type { ItemRenderContext } from "../Renderer";
import type { ItemTypeUnion } from "../../../_generated/types/ItemInPlayUnion";

/** specialise appearance renderer (in types only) to handle (specifically) Items more conveniently */
export class ItemAppearanceRenderer<
  T extends ItemInPlayType,
  RoomId extends string,
  RoomItemId extends string,
> extends AppearanceRenderer<
  ItemTypeUnion<T, RoomId, RoomItemId>,
  ItemRenderProps<T>,
  RoomId,
  ItemRenderContext<RoomId, RoomItemId>
> {}
