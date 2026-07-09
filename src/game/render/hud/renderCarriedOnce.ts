import { type Container } from "pixi.js";

import { type RoomState } from "../../../model/RoomState";
import { emptySet } from "../../../utils/empty";
import { neverTime } from "../../../utils/neverTime";
import { cameraAngleBase } from "../../../utils/vectors/rotateXy";
import { type PortableItem } from "../../physics/itemPredicates";
import { appearanceForItem } from "../itemAppearances/appearanceForItem";
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
  const appearance = appearanceForItem(carrying, cameraAngleBase)!;

  const appearanceReturn = appearance({
    // a standalone appearance context with no room renderer behind it - the
    // layer/render-box fields are genuinely absent (no portable item's
    // appearance reads them):
    renderContext: {
      general: renderContext.general,
      item: carrying,
      room,
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
