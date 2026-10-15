import { type ItemTypeUnion } from "../../../../_generated/types/ItemInPlayUnion";
import { type PlayableItem } from "../../../../model/ItemInPlayNarrowedUnions";
import { type PlayableActionState } from "../../../../model/ItemStateMap";

/** what a character, playable or scenery, is drawn doing */
export const characterAction = (
  character: ItemTypeUnion<"sceneryPlayer"> | PlayableItem,
): PlayableActionState =>
  character.type === "sceneryPlayer" ?
    // scenery players can only stand or fall:
    character.state.standingOnItemId === null ?
      "falling"
    : "idle"
  : character.state.action;
