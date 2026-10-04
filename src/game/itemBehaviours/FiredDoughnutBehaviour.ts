import { type ItemTypeUnion } from "../../_generated/types/ItemInPlayUnion";
import { handleFiredDoughnutTouchingMonster } from "../physics/handleTouch/handleFiredDoughnutTouchingMonster";
import { type ItemTouchEvent } from "../physics/handleTouch/ItemTouchEvent";
import { shadowSmallRound } from "../render/shadows/shadowCastTextures";
import { NonSolidBehaviour } from "./NonSolidBehaviour";

/**
 * doughnuts that Head has fired
 */
export class FiredDoughnutBehaviour extends NonSolidBehaviour {
  constructor() {
    super({
      shadowCastTexture: shadowSmallRound,
    });
  }

  override onTouch<RoomId extends string, RoomItemId extends string>(
    doughnut: ItemTypeUnion<"firedDoughnut", RoomId, RoomItemId>,
    e: ItemTouchEvent<RoomId, RoomItemId>,
    isMover: boolean,
  ): void {
    const { touchedItem } = e;
    if (isMover && touchedItem.type === "monster") {
      handleFiredDoughnutTouchingMonster(touchedItem);
    }
    super.onTouch(doughnut, e, isMover);
  }
}
