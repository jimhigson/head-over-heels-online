import type { PlayableItem, ItemInPlay } from "@/model/ItemInPlay";
import type { PlanetName } from "@/sprites/planets";
import { blockSizePx } from "@/sprites/spritePivots";
import { subXyz } from "@/utils/vectors";
import { changeCharacterRoom } from "../../../gameState/changeCharacterRoom";
import { currentRoom, type GameState } from "../../../gameState/GameState";

export const handlePlayerTouchingPortal = <RoomId extends string>(
  gameState: GameState<RoomId>,
  player: PlayableItem,
  portal: ItemInPlay<"portal", PlanetName, RoomId>,
) => {
  console.log(
    "🙈",
    gameState.gameTime,
    "player",
    player.id,
    "touched a portal",
    portal.id,
    "portal at",
    portal.state.position,
    " to",
    portal.config.toRoom,
    "in",
    currentRoom(gameState).id,
    "....",
  );

  changeCharacterRoom(
    gameState,
    portal.config.toRoom,
    subXyz(player.state.position, portal.config.relativePoint),
  );

  console.log(
    "...and is now in",
    currentRoom(gameState).id,
    "at",
    player.state.position,
  );

  // automatically walk forward a short way in the new room to put character properly
  // inside the room (this doesn't happen for entering a room via teleporting or falling/climbing
  //  - only doors)
  // TODO: maybe this should be side-effect free
  player.state.autoWalkDistance = blockSizePx.w * 0.75;
};
