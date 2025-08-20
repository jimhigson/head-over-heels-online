import { projectWorldXyzToScreenX } from "../game/render/projections";
import type { ItemInPlayType } from "../model/ItemInPlay";
import { audioCtx } from "./audioCtx";
import type { ItemSoundRenderContext } from "./ItemSoundRenderContext";
import type { ItemSoundRenderer } from "./ItemSoundRenderer";
import type { ItemTickContext } from "src/game/render/ItemRenderContexts";
import { blockSizePx } from "../sprites/spritePivots";
import { defaultRoomHeightBlocks } from "../game/physics/mechanicsConstants";
import { addXyz, scaleXyz } from "../utils/vectors/vectors";
import { floorsRenderExtent } from "../game/render/floorsExtent";

// TODO: this doesn't account for scrolling!

const log = 0;

// bounds for how 'high' into the screen the sound is
// things can go below zero but it is rare, and at this point they are effectively out of the game
// so set the limit not very low:
const soundPositionMinY = blockSizePx.h * -1;
const soundPositionMaxY = blockSizePx.h * defaultRoomHeightBlocks;

// bounds for how 'deep' into the screen the sound is
const soundPositionMinZ = 0;
// x+y blocks away from the listener - a typical large room is 8, so
// max depth would be 8+8 = 16
const soundPositionMaxZ = blockSizePx.w * 16;

const numberInRangeToMinus1To1Range = (
  value: number,
  min: number,
  max: number,
): number => {
  const proportionOfRange = (value - min) / (max - min);

  const rangeBetweenMinusOneAndOne = proportionOfRange * 2 - 1;

  return rangeBetweenMinusOneAndOne;
};

/* tone down the extremeness on the x left/right stereo channels - a smaller number
   makes the panning more subtle */
const maxXOffsetFromCentre = 0.5;
/* going into the screen (z-direction) changes the loudness in too extreme ways. Allow
   to adjust in a more reasonable way */
const maxZOffsetFromCentre = 0.3;

export class SoundPanRenderer<T extends ItemInPlayType>
  implements ItemSoundRenderer<T>
{
  public readonly output = audioCtx.createPanner();
  private soundPositionMinX;
  private soundPositionMaxX;

  constructor(
    public readonly renderContext: ItemSoundRenderContext<T>,
    private readonly childRenderer: ItemSoundRenderer<T>,
  ) {
    childRenderer.output.connect(this.output);
    this.output.rolloffFactor = 2;
    this.output.maxDistance = 5;
    this.output.distanceModel = "exponential";

    const floorRenderExtends = floorsRenderExtent(renderContext.room).floors;

    this.soundPositionMinX = floorRenderExtends.edgeLeftX;
    this.soundPositionMaxX = floorRenderExtends.edgeRightX;
  }

  tick(tickContext: ItemTickContext) {
    this.childRenderer.tick(tickContext);

    const { item } = this.renderContext;
    const itemState = item.state;
    const itemCentrePosition = addXyz(
      itemState.position,
      scaleXyz(item.aabb, 0.5),
    );

    const soundPositionX = numberInRangeToMinus1To1Range(
      projectWorldXyzToScreenX(itemCentrePosition),
      this.soundPositionMinX,
      this.soundPositionMaxX,
    );

    // y in screen-coords, z (altitude) in game-coords
    const soundPositionY = numberInRangeToMinus1To1Range(
      itemCentrePosition.z,
      soundPositionMinY,
      soundPositionMaxY,
    );

    if (!Number.isFinite(soundPositionY)) {
      // leaving a descriptive error here to help find a bug that's tricky to track down
      throw new Error(
        `y position for sound rendering is not finite;
        positionY = numberInRangeToMinus1To1Range(
          itemCentrePosition = ${itemCentrePosition.z},
          ${soundPositionMinY},
          ${soundPositionMaxY},
        );
        itemCentrePosition = addXyz(
          itemState.position = ${JSON.stringify(itemState.position)},
          scaleXyz(${JSON.stringify(item.aabb)}, 0.5),
        )`,
      );
    }

    // z (depth on screen, x+y in-game)
    const soundPositionZ = numberInRangeToMinus1To1Range(
      itemCentrePosition.x + itemCentrePosition.y,
      soundPositionMinZ,
      soundPositionMaxZ,
    );

    if (log) {
      console.log(
        item.id,
        `x= ${soundPositionX * maxXOffsetFromCentre}/(${this.soundPositionMinX} - ${this.soundPositionMaxX})`,
        soundPositionY,
        soundPositionZ,
      );
    }
    this.output.positionX.value = soundPositionX * maxXOffsetFromCentre;
    this.output.positionY.value = soundPositionY;
    this.output.positionZ.value = soundPositionZ * maxZOffsetFromCentre;
  }

  destroy(): void {
    this.childRenderer.destroy();
  }
}
