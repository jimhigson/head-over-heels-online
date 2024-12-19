import type { ItemState } from "@/model/ItemInPlay";
import type { PlayableItem } from "../physics/itemPredicates";
import type { CharacterName } from "@/model/modelTypes";

/**
 * if a player loses a life and comes into a room again, the part of their state that
 * is restored
 */
export type PlayableEntryState = Pick<
  ItemState<CharacterName, string>,
  "position" | "facing" | "autoWalk" | "action"
>;
export const entryState = ({
  state: { position, facing, autoWalk, action },
}: PlayableItem): PlayableEntryState => ({
  position,
  facing,
  autoWalk,
  action,
});
