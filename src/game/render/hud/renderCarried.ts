import type { Container, IRenderLayer } from "pixi.js";

import type { RoomState } from "../../../model/RoomState";
import type { PortableItem } from "../../physics/itemPredicates";
import type { GeneralRenderContext } from "../RoomRenderContexts";
import type { ZGraph } from "../sortZ/GraphEdges";

import { emptyMap, emptySet } from "../../../utils/empty";
import { neverTime } from "../../../utils/neverTime";
import { appearanceForItem } from "../itemAppearances/appearanceForItem";

type RenderContextSubset<RoomId extends string> = {
  general: GeneralRenderContext<RoomId>;
};

export const renderCarriedOnce = <
  RoomId extends string,
  RoomItemId extends string,
>(
  carrying: PortableItem<RoomId, RoomItemId>,
  renderContext: RenderContextSubset<RoomId>,
  room?: RoomState<RoomId, RoomItemId>,
): Container | undefined => {
  const appearance = appearanceForItem(carrying)!;

  if (!room) {
    // only possible in game over state
    return undefined;
  }

  const appearanceReturn = appearance({
    renderContext: {
      general: renderContext.general,
      item: carrying,
      room,
      // nothing that can be carried ever renders to the uncolourised layer so cheat the types to provide this:
      colourClashLayer: undefined as unknown as IRenderLayer,
      frontLayer: undefined as unknown as IRenderLayer,
      zEdges: emptyMap as unknown as ZGraph<RoomItemId>,
      getItemRenderPipeline() {
        throw new Error(
          "getOtherItemContainer not supported in carried sprite",
        );
      },
    },
    tickContext: {
      lastRenderRoomTime: neverTime,
      movedItems: emptySet,
      progression: 0,
      deltaMS: 1,
    },
  });

  if (appearanceReturn === "no-update") {
    throw new Error("no-update not supported in carried sprite");
  }

  return appearanceReturn.output;
};
