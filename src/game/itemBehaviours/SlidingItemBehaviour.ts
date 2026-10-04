import { itemBehaviourKey } from "../../model/ItemInPlay";
import {
  isPlayableItem,
  isSlidingItem,
  type SlidingItem,
} from "../../model/ItemInPlayNarrowedUnions";
import { epsilon } from "../../utils/epsilon";
import {
  dotProductXy,
  dotProductXyz,
  lengthXySquared,
  originXyz,
  scaleXyzInPlace,
  unitVectorInPlace,
  xyzEqual,
} from "../../utils/vectors/vectors";
import { visualiseVectorForLogs } from "../../utils/vectors/visualiseVectorForLogs";
import { type ItemTouchEvent } from "../physics/handleTouch/ItemTouchEvent";
import { moveSpeedPixPerMs } from "../physics/mechanicsConstants";
import { mtv, mtvAlongVector, mtvXy } from "../physics/mtv";
import { FreeItemBehaviour } from "./freeItem/FreeItemBehaviour";

const log = import.meta.env.VITE_LOG_MOVE_ITEM;

/**
 * items that keep sliding once pushed, until they hit something
 */
export class SlidingItemBehaviour extends FreeItemBehaviour {
  override onTouch<RoomId extends string, RoomItemId extends string>(
    slidingItem: SlidingItem<RoomId, RoomItemId>,
    e: ItemTouchEvent<RoomId, RoomItemId>,
    isMover: boolean,
  ): void {
    if (!isMover) {
      this.#touchedBy(slidingItem, e);
      return;
    }

    const { touchedItem } = e;
    // playables and sliding items react to this before it stops on them:
    if (isPlayableItem(touchedItem) || isSlidingItem(touchedItem)) {
      super.onTouch(slidingItem, e, isMover);
      this.#touching(slidingItem, e);
    } else {
      this.#touching(slidingItem, e);
      super.onTouch(slidingItem, e, isMover);
    }
  }

  /**
   * a solid item pushing this sliding item starts it sliding
   */
  #touchedBy<RoomId extends string, RoomItemId extends string>(
    slidingItem: SlidingItem<RoomId, RoomItemId>,
    e: ItemTouchEvent<RoomId, RoomItemId>,
  ): void {
    const { movingItem: touchingItem, movementVector } = e;

    if (
      touchingItem[itemBehaviourKey].isNonSolid(touchingItem) &&
      // fired doughnuts aren't solid but they can start a sliding item moving:
      touchingItem.type !== "firedDoughnut"
    ) {
      return;
    }

    if (log) {
      console.group(
        `💥🛝 SlidingItemBehaviour.onTouchedBy: solid item ${touchingItem.id} touching sliding item ${slidingItem.id}`,
        e,
      );
    }

    const {
      state: { box: slidingItemBox },
    } = slidingItem;

    // the overlap mtv is the simple mtv required to get the pusher and pushee
    // to no longer overlap. Usually, but not always, this would be in the direction
    // of travel, but because of chain reactions it is possible for them to be orthogonal
    const mtvOverlap = mtvXy(touchingItem.state.box, slidingItemBox);

    const slidingVector = mtvAlongVector(
      touchingItem.state.box,
      slidingItemBox,
      movementVector,
    );
    slidingVector.z = 0; // we don't slide in z

    const mtvAvMagnitudeSquared = lengthXySquared(slidingVector);
    if (mtvAvMagnitudeSquared < epsilon) {
      // no mtv when mtv constrained to direction of movement; probably
      // means items are not overlapping already
      // - exit early to avoid divByZero
      return;
    }

    const backingOffProjectedOnMovementVectorMagnitude: number =
      dotProductXy(mtvOverlap, slidingVector) / mtvAvMagnitudeSquared;

    if (log) {
      console.log(
        "\nmtvOverlap:",
        ...visualiseVectorForLogs(mtvOverlap),
        "\nmtvAv:",
        ...visualiseVectorForLogs(slidingVector),
        "\nconstrained along movementVector:",
        ...visualiseVectorForLogs(movementVector),
        "giving projection of",
        backingOffProjectedOnMovementVectorMagnitude,
      );
    }

    if (backingOffProjectedOnMovementVectorMagnitude < 0.44) {
      // do no sliding
      if (log) {
        console.groupEnd();
      }
      return;
    }

    // adjust the sliding vector to be the magnitude of move speed of a ball:
    // (all sliding items move at same speed)
    unitVectorInPlace(slidingVector);
    scaleXyzInPlace(slidingVector, -moveSpeedPixPerMs.ball);

    if (log) {
      console.log(
        `giving ${slidingItem.id} state.vels.sliding`,
        ...visualiseVectorForLogs(slidingVector),
      );
    }

    slidingItem.state.vels.sliding = slidingVector;

    if (log) {
      console.groupEnd();
    }
  }

  /**
   * a sliding item stops when it slides into something solid
   */
  #touching<RoomId extends string, RoomItemId extends string>(
    slidingItem: SlidingItem<RoomId, RoomItemId>,
    e: ItemTouchEvent<RoomId, RoomItemId>,
  ): void {
    const { touchedItem } = e;

    if (touchedItem[itemBehaviourKey].isNonSolid(touchedItem)) {
      return;
    }

    const slidingVel = slidingItem.state.vels.sliding;

    if (xyzEqual(slidingVel, originXyz)) {
      return;
    }

    if (log) {
      console.group(
        `💥🛝 SlidingItemBehaviour.onTouching: sliding item ${slidingItem.id} touching solid item ${touchedItem.id} while sliding`,
        e,
      );
    }

    const {
      state: { box: slidingItemBox },
    } = slidingItem;

    const m = mtv(touchedItem.state.box, slidingItemBox);

    // dot product > 0 means collision has a component in the direction
    // this item was sliding in
    const d = dotProductXyz(m, slidingItem.state.vels.sliding);

    if (d > 0) {
      // stop sliding
      slidingItem.state.vels.sliding = originXyz;
      if (log) {
        console.log(
          `non-zero dot product, stopping ${slidingItem.id} sliding because of touch with ${touchedItem.id}`,
        );
      }
    } else {
      if (log) {
        console.log(`dot product <= 0, not stopping ${slidingItem.id} sliding`);
      }
    }
    if (log) {
      console.groupEnd();
    }
  }
}
