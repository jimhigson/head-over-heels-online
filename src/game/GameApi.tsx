import type { Emitter } from "mitt";
import type { GameState } from "./gameState/GameState";
import type { RenderOptions } from "./RenderOptions";
import type { Container } from "pixi.js";
import type { AnyItemInPlay } from "../model/ItemInPlay";
import type { Campaign, RoomState } from "../model/modelTypes";
import type { SceneryName } from "../sprites/planets";
import type { InputStateChangeEvent } from "./input/listenForInput";

export type GameEvents<RoomId extends string> = {
  roomChange: RoomId;
  scrollOpened: { page: string };
  gameOver: undefined;
  /** emitted when input changes - only really so react/dom bits can close when some input happens */
  inputStateChanged: InputStateChangeEvent;
  itemClicked: { container: Container; item: AnyItemInPlay<RoomId> };
};

export type GameApi<RoomId extends string> = {
  campaign: Campaign<RoomId>;
  events: Emitter<GameEvents<RoomId>>;
  /** Instantly move to a different room. Mostly for testing, debugging etc */
  changeRoom: (newRoom: RoomId) => void;
  /** gets the game state for the room that is currently being viewed */
  currentRoom: RoomState<SceneryName, RoomId>;
  renderIn: (div: HTMLDivElement) => void;
  gameState: GameState<RoomId>;
  set renderOptions(options: RenderOptions);
  stop: () => void;
};
