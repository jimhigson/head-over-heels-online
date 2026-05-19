import { lazy } from "react";

import type { WrapClickableRoomDecoratorComponent } from "./RoomDecoratorProps";

import { importOnce } from "../../../../../../utils/importOnce";

const importMapRoomTooltipDecorator = importOnce(
  () => import("./MapRoomTooltipDecorator"),
);

export const LazyMapRoomTooltipDecorator: WrapClickableRoomDecoratorComponent<string> =
  lazy(importMapRoomTooltipDecorator);
