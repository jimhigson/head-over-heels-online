import type { ItemState, PlayableItem } from "@/model/ItemInPlay";
import type { CharacterName } from "@/model/modelTypes";

/**
 * if a player loses a life and comes into a room again, the part of their state that
 * is restored
 */

export type EntryState = Pick<
  ItemState<CharacterName>,
  "position" | "facing" | "autoWalkDistance" | "jumpEndTime" | "action"
>;

export const entryState = ({
  state: { position, facing, autoWalkDistance, jumpEndTime, action },
}: PlayableItem): EntryState => ({
  position,
  facing,
  autoWalkDistance,
  jumpEndTime, // TODO: this is wrong simce the gameTime will have changed since - a vertical velocity would fix it
  action,
});
