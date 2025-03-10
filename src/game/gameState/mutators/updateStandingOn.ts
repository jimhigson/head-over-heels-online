import { objectValues } from "iter-tools";
import { removeStandingOn, setStandingOn } from "./modifyStandingOn";
import type { SceneryName } from "../../../sprites/planets";
import {
  spatiallyCheckStandingOn,
  findStandingOnWithHighestPriorityAndMostOverlap,
} from "../../collision/checkStandingOn";
import type { RoomState } from "../../../model/RoomState";
import { iterateStoodOnByItems } from "../../../model/stoodOnItemsLookup";

/**
 * remove the standing on if not still applies, and
 * set a new standing on if that applies instead
 */
export const updateStandingOn = <RoomId extends string>(
  room: RoomState<SceneryName, RoomId>,
) => {
  /**
   * standing on updated here for all - because, eg, if a lift moves down with a player on it,
   * if the check is done inside the lift's tick, the player is then not on the lift and has no
   * ability to walk (the walk mechanic will return a null result) while the lift descends
   */
  for (const item of objectValues(room.items)) {
    // check what is standing on us - this implies that we're also checking what everything is stood on,
    // but gives us a chance to apply latent movement:
    for (const stander of iterateStoodOnByItems(item.state.stoodOnBy, room)) {
      /*console.log(
          stander.id,
          "still stood on",
          item.id,
          "?",
          spatiallyCheckStandingOn(stander, item),
        );*/

      if (!room.items[stander.id]) {
        // stander is no longer in the room:
        removeStandingOn(stander);
        continue;
      }

      if (!spatiallyCheckStandingOn(stander, item)) {
        removeStandingOn(stander);
        // if we are standing on something else (ie, walked from one block to an adjacent block) get that
        // set up so that in the next frame there is no pause in the walking (detects in the walk mechanic on
        // the very next frame that we can walk)
        const newStandingOn = findStandingOnWithHighestPriorityAndMostOverlap(
          stander,
          objectValues(room.items),
        );
        if (newStandingOn !== undefined) {
          setStandingOn({ above: stander, below: newStandingOn });
        }
      }
    }
  }
};
