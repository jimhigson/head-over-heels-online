import { type ItemInPlay } from "../../model/ItemInPlay";
import { flippedMirrorOrientation } from "../../model/MirrorOrientation";
import { neverTime } from "../../utils/neverTime";
import { type ItemTouchEvent } from "../physics/handleTouch/ItemTouchEvent";
import { switchMinTimeBetweenToggleMs } from "../physics/mechanicsConstants";
import { shadowFullBlock } from "../render/shadows/shadowCastTextures";
import { ItemBehaviour } from "./ItemBehaviour";

/**
 * reflects light beams; sits at 45° to the orthogonal axes
 */
export class MirrorBehaviour extends ItemBehaviour {
  constructor() {
    super({
      snagsHelpfulMovement: true,
      shadowCastTexture: shadowFullBlock,
    });
  }

  /**
   * mirrors flip like switches do - anything colliding with a mirror rotates
   * it to its other diagonal orientation. The turn direction follows the
   * torque of the push: pressing off-centre spins the pane away from the
   * pushed end
   */
  override onTouch<RoomId extends string, RoomItemId extends string>(
    mirrorItem: ItemInPlay<"mirror", RoomId, RoomItemId>,
    e: ItemTouchEvent<RoomId, RoomItemId>,
    isMover: boolean,
  ): void {
    if (isMover) {
      super.onTouch(mirrorItem, e, isMover);
      return;
    }
    const { movingItem, movementVector, room } = e;
    const lastFlippedAt: number =
      mirrorItem.state.lastFlippedAtRoomTime ?? neverTime;

    const { roomTime } = room;

    mirrorItem.state.lastFlippedAtRoomTime = roomTime;

    if (lastFlippedAt + switchMinTimeBetweenToggleMs > roomTime) {
      // mirror was already being pushed against so skip it:
      return;
    }

    /*
     * the push's torque about the mirror's vertical axis: contact point is
     * the centre of the two items' xy overlap, the force is the toucher's
     * movement. Positive z-cross is a turn from +x towards +y, which reads
     * as clockwise on screen
     */
    const mirrorBox = mirrorItem.state.box;
    const moverBox = movingItem.state.box;
    const contactX =
      (Math.max(mirrorBox.x, moverBox.x) +
        Math.min(mirrorBox.x + mirrorBox.xd, moverBox.x + moverBox.xd)) /
      2;
    const contactY =
      (Math.max(mirrorBox.y, moverBox.y) +
        Math.min(mirrorBox.y + mirrorBox.yd, moverBox.y + moverBox.yd)) /
      2;
    const torqueZ =
      (contactX - (mirrorBox.x + mirrorBox.xd / 2)) * movementVector.y -
      (contactY - (mirrorBox.y + mirrorBox.yd / 2)) * movementVector.x;

    mirrorItem.state.orientation = flippedMirrorOrientation(
      mirrorItem.state.orientation,
    );
    mirrorItem.state.flipDirection =
      torqueZ < 0 ? "anticlockwise" : "clockwise";
    mirrorItem.state.flippedAtRoomTime = roomTime;
  }
}
