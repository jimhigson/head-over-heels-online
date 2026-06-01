import { lazy } from "react";

import { importOnce } from "../../../../../../utils/importOnce";
import { type RoomBehaviourComponent } from "./RoomDecoratorProps";

const importMapRoomTooltipBehaviour = importOnce(
  () => import("./MapRoomTooltipBehaviour"),
);

export const LazyMapRoomTooltipBehaviour: RoomBehaviourComponent<string> = lazy(
  importMapRoomTooltipBehaviour,
);
