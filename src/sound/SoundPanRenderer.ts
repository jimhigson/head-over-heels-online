import {
  blockXyzToFineXyz,
  projectWorldXyzToScreenX,
} from "../game/render/projectToScreen";
import type { ItemInPlayType } from "../model/ItemInPlay";
import { audioCtx } from "./audioCtx";
import type { ItemSoundRenderContext } from "./ItemSoundRenderContext";
import type { ItemSoundRenderer } from "./ItemSoundRenderer";
import type { ItemTickContext } from "../game/render/Renderer";
import { blockSizePx } from "../sprites/spritePivots";
import { defaultRoomHeightBlocks } from "../game/physics/mechanicsConstants";
import { addXyz, scaleXyz } from "../utils/vectors/vectors";

// TODO: this doesn't account for scrolling!

const yPositionMax = blockSizePx.h * defaultRoomHeightBlocks;
// things can go below zero but it is rare, and at this point they are effectively out of the game
// so set the limit not very low:
const yPositionMin = blockSizePx.h * -1;

// x+y blocks away from the listener - a typical large room is 8, so
// max depth would be 8+8 = 16
const zPositionMax = blockSizePx.w * 16;
const zPositionMin = 0;

const numberInRangeToMinus1To1Range = (
  value: number,
  min: number,
  max: number,
): number => {
  const proportionOfRange = (value - min) / (max - min);

  const rangeBetweenMinusOneAndOne = proportionOfRange * 2 - 1;

  return rangeBetweenMinusOneAndOne;
};

export class SoundPanRenderer<
  T extends ItemInPlayType,
  RoomId extends string,
  RoomItemId extends string,
> implements ItemSoundRenderer<T, RoomId, RoomItemId>
{
  public readonly output = audioCtx.createPanner();
  private positionMinX;
  private positionMaxX;

  constructor(
    public readonly renderContext: ItemSoundRenderContext<
      T,
      RoomId,
      RoomItemId
    >,
    private readonly childRenderer: ItemSoundRenderer<T, RoomId, RoomItemId>,
  ) {
    childRenderer.output.connect(this.output);
    this.output.rolloffFactor = 2;
    this.output.maxDistance = 5;
    this.output.distanceModel = "exponential";

    const {
      room: {
        size: { y: roomYSize, x: roomXSize },
      },
    } = renderContext;

    this.positionMinX = projectWorldXyzToScreenX(
      blockXyzToFineXyz({ x: 0, y: roomYSize }),
    );
    this.positionMaxX = projectWorldXyzToScreenX(
      blockXyzToFineXyz({ x: roomXSize, y: 0 }),
    );
  }

  tick(tickContext: ItemTickContext<RoomId, RoomItemId>) {
    this.childRenderer.tick(tickContext);

    const { item } = this.renderContext;
    const itemState = item.state;
    const itemCentrePosition = addXyz(
      itemState.position,
      scaleXyz(item.aabb, 0.5),
    );

    const positionX = numberInRangeToMinus1To1Range(
      projectWorldXyzToScreenX(itemCentrePosition),
      this.positionMaxX,
      this.positionMinX,
    );

    // y (height on screen, z in-game)
    const positionY = numberInRangeToMinus1To1Range(
      itemCentrePosition.z,
      yPositionMin,
      yPositionMax,
    );

    // z (depth on screen, x+y in-game)
    const positionZ = numberInRangeToMinus1To1Range(
      itemCentrePosition.x + itemCentrePosition.y,
      zPositionMin,
      zPositionMax,
    );

    this.output.positionX.value = positionX;
    this.output.positionY.value = positionY;
    this.output.positionZ.value = positionZ;
  }

  destroy(): void {
    this.childRenderer.destroy();
  }
}
