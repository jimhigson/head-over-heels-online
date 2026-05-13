import type { ItemState } from "../../model/ItemState";
import type { CharacterName } from "../../model/modelTypes";
import type { PlayableItem } from "../physics/itemPredicates";

/**
 * if a player loses a life and comes into a room again, the part of their state that
 * is restored
 */
export type PlayableEntryState = Pick<
  ItemState<CharacterName, string, string>,
  | "action"
  | "autoWalk"
  | "facing"
  | "jumped"
  | "jumpStartZ"
  | "position"
  | "teleporting"
  | "vels"
  | "visualFacingVector"
>;
export const entryState = ({
  state: {
    position,
    facing,
    autoWalk,
    action,
    vels,
    teleporting,
    jumped,
    jumpStartZ,
    visualFacingVector,
  },
}: PlayableItem): PlayableEntryState => {
  return {
    position,
    facing,
    autoWalk,
    action,
    // need to capture this so a player who dies teleporting doesn't stay teleporting when they respawn,
    // or if they teleported in, they teleport in again:
    teleporting,
    // vels is (unusually) a mutable object on the state, so it needs to be
    // copied for safety:
    vels: { ...vels },
    jumped,
    jumpStartZ,
    visualFacingVector,
  };
};
