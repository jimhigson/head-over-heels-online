import type { ItemState, PlayableItem } from "@/model/ItemInPlay";
import type { CharacterName } from "@/model/modelTypes";

/**
 * if a player loses a life and comes into a room again, the part of their state that
 * is restored
 */

export type EntryState = Pick<
  ItemState<CharacterName>,
  "position" | "facing" | "autoWalkDistance" | "action"
>;

export const entryState = ({
  state: { position, facing, autoWalkDistance, action },
}: PlayableItem): EntryState => ({
  position,
  facing,
  autoWalkDistance,
  action,
});
