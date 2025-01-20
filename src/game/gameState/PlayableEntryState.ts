import type { ItemState } from "../../model/ItemInPlay";
import type { CharacterName } from "../../model/modelTypes";
import type { PlayableItem } from "../physics/itemPredicates";

/**
 * if a player loses a life and comes into a room again, the part of their state that
 * is restored
 */
export type PlayableEntryState = Pick<
  ItemState<CharacterName, string>,
  "position" | "facing" | "autoWalk" | "action" | "vels"
>;
export const entryState = ({
  state: { position, facing, autoWalk, action, vels },
}: PlayableItem): PlayableEntryState => {
  return {
    position,
    facing,
    autoWalk,
    action,
    // vels is (unusually) a mutable object on the state, so it needs to be
    // copied for safety:
    vels: { ...vels },
  };
};
