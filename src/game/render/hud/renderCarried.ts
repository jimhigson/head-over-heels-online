import type { Container, IRenderLayer } from "pixi.js";
import { emptySet } from "../../../utils/empty";
import { neverTime } from "../../../utils/veryClose";
import type { PortableItem } from "../../physics/itemPredicates";
import { appearanceForItem } from "../itemAppearances/appearanceForItem";
import type { HudRendererTickContext } from "./hudRendererContexts";
import type { GeneralRenderContext } from "../RoomRenderContexts";

type RenderContextSubset<RoomId extends string> = {
  general: GeneralRenderContext<RoomId>;
};

export const renderCarriedOnce = <
  RoomId extends string,
  RoomItemId extends string,
>(
  carrying: PortableItem<RoomId, RoomItemId>,
  renderContext: RenderContextSubset<RoomId>,
  tickContext: HudRendererTickContext<RoomId, RoomItemId>,
): Container | undefined => {
  const appearance = appearanceForItem(carrying)!;

  if (!tickContext.room) {
    // only possible in game over state
    return undefined;
  }

  const appearanceReturn = appearance({
    renderContext: {
      general: renderContext.general,
      item: carrying,
      room: tickContext.room,
      // nothing that can be carried ever renders to the uncolourised layer so cheat the types to provide this:
      uncolourisedLayer: undefined as unknown as IRenderLayer,
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
