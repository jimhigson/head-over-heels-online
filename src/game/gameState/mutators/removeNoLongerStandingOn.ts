// if the period of the frame rate is less than this value, each rendering tick
// will be split into multiple physics ticks down to this size:
// this needs to be small enough that the fastest movement
// (jumping: 2px per frame in original game @25fps, so 50px per second)
// can be guaranteed to take up every half-pixel position.

import {
  spatiallyCheckStandingOn,
  findStandingOnWithHighestPriorityAndMostOverlap,
} from "@/game/collision/checkStandingOn";
import type { RoomState } from "@/model/modelTypes";
import type { PlanetName } from "@/sprites/planets";
import { objectValues } from "iter-tools";
import { removeStandingOn, setStandingOn } from "./modifyStandingOn";

export const removeNoLongerStandingOn = <RoomId extends string>(
  room: RoomState<PlanetName, RoomId>,
) => {
  /**
   * standing on updated here for all - because, eg, if a lift moves down with a player on it,
   * if the check is done inside the lift's tick, the player is then not on the lift and has no
   * ability to walk (the walk mechanic will return a null result) while the lift descends
   */
  for (const item of objectValues(room.items)) {
    // check what is standing on us - this implies that we're also checking what everything is stood on,
    // but gives us a chance to apply latent movement:
    for (const stander of item.state.stoodOnBy) {
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
          setStandingOn(stander, newStandingOn);
        }
      }
    }
  }
};
