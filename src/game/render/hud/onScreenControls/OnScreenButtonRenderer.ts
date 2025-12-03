import type { Container } from "pixi.js";

import type { RoomState } from "../../../../model/RoomState";
import type { Xy } from "../../../../utils/vectors/vectors";
import type { BooleanAction } from "../../../input/actions";
import type { InputStateTrackerInterface } from "../../../input/InputStateTracker";
import type { PlayableItem } from "../../../physics/itemPredicates";
import type { Appearance } from "../../appearance/Appearance";
import type { GeneralRenderContext } from "../../room/RoomRenderContexts";

import { AppearanceRenderer } from "../../appearance/AppearanceRenderer";

export type ButtonId =
  | "carry"
  | "carryAndJump"
  | "fire"
  | "jump"
  | "map"
  | "menu";

export type Button<Which extends ButtonId = ButtonId> = {
  id: string;
  which: Which;
  actions: BooleanAction[];
};

export type ButtonRenderContext<BT extends ButtonId, RoomId extends string> = {
  button: Button<BT>;
  inputStateTracker: InputStateTrackerInterface;
  general: GeneralRenderContext<RoomId>;
};

export type ButtonTickContext = {
  room: RoomState<string, string>;
  currentPlayable: PlayableItem | undefined;
  screenSize: Xy;
};

export type ButtonAppearance<
  BT extends ButtonId,
  RoomId extends string,
  RP extends object,
  TContainer extends Container,
> = Appearance<
  ButtonRenderContext<BT, RoomId>,
  ButtonTickContext,
  RP,
  TContainer
>;

export const textYForButtonCentre = -11;

export class OnScreenButtonRenderer<
  BT extends ButtonId,
  RoomId extends string,
  RP extends object,
  TContainer extends Container,
> extends AppearanceRenderer<
  ButtonRenderContext<BT, RoomId>,
  ButtonTickContext,
  RP,
  TContainer
> {
  constructor(
    renderContext: ButtonRenderContext<BT, RoomId>,
    appearance: ButtonAppearance<BT, RoomId, RP, TContainer>,
  ) {
    super(renderContext, appearance);
  }
}
