import type { Emitter } from "mitt";
import type { GameState } from "./gameState/GameState";
import type { Container } from "pixi.js";
import type { AnyItemInPlay } from "../model/ItemInPlay";
import type { Campaign } from "../model/modelTypes";
import type { SceneryName } from "../sprites/planets";
import type { Xy } from "../utils/vectors/vectors";
import type { RoomState } from "../model/RoomState";

export type GameEvents<RoomId extends string> = {
  roomChange: RoomId;
  gameOver: undefined;
  itemClicked: { container: Container; item: AnyItemInPlay<RoomId> };
};

export type GameApi<RoomId extends string> = {
  campaign: Campaign<RoomId>;
  events: Emitter<GameEvents<RoomId>>;
  /** Instantly move to a different room. Mostly for testing, debugging etc */
  changeRoom: (newRoom: RoomId) => void;
  resizeTo: (newSize: Xy) => void;
  /**
   * @returns the state for the room that is currently being viewed, or undefined if
   * none (game over)
   */
  currentRoom: RoomState< RoomId> | undefined;
  renderIn: (div: HTMLDivElement) => void;
  gameState: GameState<RoomId>;
  stop: () => void;
};
