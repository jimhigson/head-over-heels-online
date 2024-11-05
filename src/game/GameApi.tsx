import { Campaign, RoomState } from "@/model/modelTypes";
import { PlanetName } from "@/sprites/planets";
import { Emitter } from "mitt";
import { GameState } from "./gameState/GameState";
import { RenderOptions } from "./RenderOptions";

export type ApiEvents<RoomId extends string> = {
  roomChange: RoomId;
};

export type GameApi<RoomId extends string> = {
  campaign: Campaign<RoomId>;
  events: Emitter<ApiEvents<RoomId>>;
  /** Instantly move to a different room. Mostly for testing, debugging etc */
  changeRoom: (newRoom: RoomId) => void;
  /** gets the game state for the room that is currently being viewed */
  currentRoom: RoomState<PlanetName, RoomId>;
  renderIn: (div: HTMLDivElement) => void;
  gameState: GameState<RoomId>;
  set renderOptions(options: RenderOptions<RoomId>);
  stop: () => void;
};
