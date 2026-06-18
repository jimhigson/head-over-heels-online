import { type Container, type RenderLayer } from "pixi.js";

import { type RoomState } from "../../../model/RoomState";
import { emptyMap, emptySet } from "../../../utils/empty";
import { neverTime } from "../../../utils/neverTime";
import { type PortableItem } from "../../physics/itemPredicates";
import { appearanceForItem } from "../itemAppearances/appearanceForItem";
import { type ItemZGraph } from "../ItemRenderContexts";
import { type GeneralRenderContext } from "../room/RoomRenderContexts";

type RenderContextSubset<RoomId extends string> = {
  general: GeneralRenderContext<RoomId>;
};

export const renderCarriedOnce = <
  RoomId extends string,
  RoomItemId extends string,
>(
  carrying: PortableItem<RoomId, RoomItemId>,
  renderContext: RenderContextSubset<RoomId>,
  room: RoomState<RoomId, RoomItemId>,
): Container => {
  const appearance = appearanceForItem(carrying)!;

  const appearanceReturn = appearance({
    renderContext: {
      general: renderContext.general,
      item: carrying,
      room,
      // nothing that can be carried ever renders to the uncolourised layer so cheat the types to provide this:
      colourClashLayer: undefined as unknown as RenderLayer,
      frontLayer: undefined as unknown as RenderLayer,
      zEdges: emptyMap as ItemZGraph<RoomId, RoomItemId>,
      getItemRenderPipeline() {
        throw new Error(
          "getOtherItemContainer not supported in carried sprite",
        );
      },
      isReflection: false,
    },
    tickContext: {
      lastRenderRoomTime: neverTime,
      movedOrResizedItems: emptySet,
      deltaMS: 1,
    },
  });

  if (appearanceReturn === "no-update") {
    throw new Error("no-update not supported in carried sprite");
  }

  return appearanceReturn.output!;
};
