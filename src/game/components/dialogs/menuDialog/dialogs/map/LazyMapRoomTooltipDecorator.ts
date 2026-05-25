import { lazy } from "react";

import { importOnce } from "../../../../../../utils/importOnce";
import { type WrapClickableRoomDecoratorComponent } from "./RoomDecoratorProps";

const importMapRoomTooltipDecorator = importOnce(
  () => import("./MapRoomTooltipDecorator"),
);

export const LazyMapRoomTooltipDecorator: WrapClickableRoomDecoratorComponent<string> =
  lazy(importMapRoomTooltipDecorator);
