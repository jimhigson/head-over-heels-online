import type { Campaign, RoomState } from "@/model/modelTypes";
import type { PlanetName } from "@/sprites/planets";
import type { Emitter } from "mitt";
import type { GameState } from "./gameState/GameState";
import type { RenderOptions } from "./RenderOptions";
import type { InputState } from "./input/InputState";

export type GameEvents<RoomId extends string> = {
  roomChange: RoomId;
  scrollOpened: { markdown: string };
  /** emitted when input changes - only really so react/dom bits can close when some input happens */
  inputStateChanged: InputState;
};

export type GameApi<RoomId extends string> = {
  campaign: Campaign<RoomId>;
  events: Emitter<GameEvents<RoomId>>;
  /** Instantly move to a different room. Mostly for testing, debugging etc */
  changeRoom: (newRoom: RoomId) => void;
  /** gets the game state for the room that is currently being viewed */
  currentRoom: RoomState<PlanetName, RoomId>;
  renderIn: (div: HTMLDivElement) => void;
  gameState: GameState<RoomId>;
  set renderOptions(options: RenderOptions<RoomId>);
  stop: () => void;
};
