import type {
  ButtonAppearance,
  ButtonContainerTypes,
  ButtonId,
  ButtonRenderContext,
  ButtonRenderProps,
  ButtonTickContext,
} from "./buttonAppearances/buttonTypes";

import { AppearanceRenderer } from "../../appearance/AppearanceRenderer";
import { carryAndJumpButtonAppearance } from "./buttonAppearances/carryAndJumpButtonAppearance";
import { carryButtonAppearance } from "./buttonAppearances/carryButtonAppearance";
import { fireButtonAppearance } from "./buttonAppearances/fireButtonAppearance";
import { jumpButtonAppearance } from "./buttonAppearances/jumpButtonAppearance";
import { mapButtonAppearance } from "./buttonAppearances/mapButtonAppearance";
import { menuButtonAppearance } from "./buttonAppearances/menuButtonAppearance";

export type {
  Button,
  ButtonId as ButtonType,
} from "./buttonAppearances/buttonTypes";

const buttonAppearances: {
  [BT in ButtonId]: ButtonAppearance<BT, string, ButtonContainerTypes[BT]>;
} = {
  jump: jumpButtonAppearance,
  carry: carryButtonAppearance,
  fire: fireButtonAppearance,
  carryAndJump: carryAndJumpButtonAppearance,
  menu: menuButtonAppearance,
  map: mapButtonAppearance,
};

export class OnScreenButtonRenderer<
  BT extends ButtonId,
  RoomId extends string,
> extends AppearanceRenderer<
  ButtonRenderContext<BT, RoomId>,
  ButtonTickContext,
  ButtonRenderProps[BT],
  ButtonContainerTypes[BT]
> {
  constructor(renderContext: ButtonRenderContext<BT, RoomId>) {
    const appearance = buttonAppearances[
      renderContext.button.which
    ] as ButtonAppearance<BT, RoomId, ButtonContainerTypes[BT]>;
    super(renderContext, appearance);
  }
}
