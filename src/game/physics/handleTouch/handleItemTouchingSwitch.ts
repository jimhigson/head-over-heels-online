import { currentRoom, type GameState } from "@/game/gameState/GameState";
import type { ItemInPlay, UnknownItemInPlay } from "@/model/ItemInPlay";
import type { PlanetName } from "@/sprites/planets";
import { objectEntriesIter } from "@/utils/entries";
import type { Xyz } from "@/utils/vectors/vectors";

export const handleItemTouchingSwitch = <RoomId extends string>(
  switchItem: ItemInPlay<"switch", PlanetName, RoomId>,
  _touchee: UnknownItemInPlay<RoomId>,
  _movementVector: Xyz,
  gameState: GameState<RoomId>,
) => {
  const room = currentRoom(gameState);

  const {
    config: { activates },
    state: { setting, touchedOnProgression },
  } = switchItem;

  switchItem.state.touchedOnProgression = gameState.progression;

  if (gameState.progression === touchedOnProgression + 1) {
    // switch was already being pressed so skip it:
    return;
  }

  const newSetting = (switchItem.state.setting =
    setting === "left" ? "right" : "left");

  for (const [k, v] of objectEntriesIter(activates)) {
    const affectedItem = room.items[k];

    affectedItem.state = { ...affectedItem.state, ...v[newSetting] };
  }
};
