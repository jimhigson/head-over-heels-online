import type { Container, Sprite } from "pixi.js";

import type { RoomState } from "../../../../../model/RoomState";
import type { Xy } from "../../../../../utils/vectors/vectors";
import type { BooleanAction } from "../../../../input/actions";
import type { InputStateTrackerInterface } from "../../../../input/InputStateTracker";
import type { PlayableItem } from "../../../../physics/itemPredicates";
import type { Appearance } from "../../../appearance/Appearance";
import type { GeneralRenderContext } from "../../../room/RoomRenderContexts";
import type { TextContainer } from "../../../text/TextContainer";
import type { ArcadeStyleButtonContainer } from "../ArcadeStyleButtonContainer";
import type { CarryAndJumpButtonRenderProps } from "./carryAndJumpButtonAppearance";
import type { CarryButtonRenderProps } from "./carryButtonAppearance";
import type { FireButtonRenderProps } from "./fireButtonAppearance";
import type { JumpButtonRenderProps } from "./jumpButtonAppearance";
import type { MapButtonRenderProps } from "./mapButtonAppearance";
import type { MenuButtonRenderProps } from "./menuButtonAppearance";

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

export type ButtonRenderProps = {
  jump: JumpButtonRenderProps;
  carry: CarryButtonRenderProps;
  fire: FireButtonRenderProps;
  carryAndJump: CarryAndJumpButtonRenderProps;
  menu: MenuButtonRenderProps;
  map: MapButtonRenderProps;
};

export type ButtonContainerTypes = {
  jump: ArcadeStyleButtonContainer<Sprite | TextContainer>;
  carry: ArcadeStyleButtonContainer;
  fire: ArcadeStyleButtonContainer<Container<Sprite | TextContainer>>;
  carryAndJump: ArcadeStyleButtonContainer<TextContainer>;
  menu: Sprite;
  map: TextContainer;
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
  TContainer extends Container,
> = Appearance<
  ButtonRenderContext<BT, RoomId>,
  ButtonTickContext,
  ButtonRenderProps[BT],
  TContainer
>;

export const textYForButtonCentre = -11;
