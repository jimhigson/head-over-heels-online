import {
  blockSizePx,
  defaultRoomHeightBlocks,
} from "../game/physics/mechanicsConstants";
import { type ItemTickContext } from "../game/render/ItemRenderContexts";
import { projectWorldXyzToScreenX } from "../game/render/projections";
import { type ItemInPlayType } from "../model/ItemInPlay";
import { roomItemsIterable } from "../model/RoomState";
import { rotateXyz } from "../utils/vectors/rotateXy";
import { audioCtx } from "./audioCtx";
import { type ItemSoundRenderContext } from "./ItemSoundRenderContext";
import { type ItemSoundRenderer } from "./ItemSoundRenderer";

// TODO: this doesn't account for scrolling!

const log = 0;

// screen-y (height) bounds; rarely below zero, so the floor isn't set low
const soundPositionMinY = blockSizePx.z * -1;
const soundPositionMaxY = blockSizePx.z * defaultRoomHeightBlocks;

// depth bounds: x+y from the listener, up to ~8+8 blocks
const soundPositionMinZ = 0;
const soundPositionMaxZ = blockSizePx.x * 16;

// reused scratch (only one renderer ticks at a time), to avoid per-tick allocation
const positionBuffer = { x: 0, y: 0, z: 0 };

const numberInRangeToMinus1To1Range = (
  value: number,
  min: number,
  max: number,
): number => {
  const proportionOfRange = (value - min) / (max - min);

  const rangeBetweenMinusOneAndOne = proportionOfRange * 2 - 1;

  return rangeBetweenMinusOneAndOne;
};

// smaller = subtler left/right panning
const maxXOffsetFromCentre = 0.3;
// smaller = subtler depth (z) loudness change
const maxZOffsetFromCentre = 0.3;

export class SoundPanRenderer<
  T extends ItemInPlayType,
> implements ItemSoundRenderer<T> {
  public readonly output = audioCtx.createPanner();
  #soundPositionMinX;
  #soundPositionMaxX;

  readonly renderContext: ItemSoundRenderContext<T>;
  #childRenderer: ItemSoundRenderer<T>;

  constructor(
    renderContext: ItemSoundRenderContext<T>,
    childRenderer: ItemSoundRenderer<T>,
  ) {
    this.renderContext = renderContext;
    this.#childRenderer = childRenderer;
    childRenderer.output.connect(this.output);
    this.output.rolloffFactor = 2;
    this.output.maxDistance = 5;
    this.output.distanceModel = "exponential";

    // half-width the pan normalises over. The pan itself tracks the camera (in
    // tick); only this range is angle-free: ±max(floor x span, y span) bounds
    // the projected screen-x at every quarter angle - enough for an ear-feel.
    let floorsMaxX = 0;
    let floorsMaxY = 0;
    for (const roomItem of roomItemsIterable(renderContext.room.items)) {
      if (roomItem.type === "floor") {
        const { naturalFootprint } = roomItem.config;
        floorsMaxX = Math.max(
          floorsMaxX,
          naturalFootprint.position.x + naturalFootprint.aabb.x,
        );
        floorsMaxY = Math.max(
          floorsMaxY,
          naturalFootprint.position.y + naturalFootprint.aabb.y,
        );
      }
    }
    const panHalfSpan = Math.max(floorsMaxX, floorsMaxY, blockSizePx.x);
    this.#soundPositionMinX = -panHalfSpan;
    this.#soundPositionMaxX = panHalfSpan;
  }

  tick(tickContext: ItemTickContext) {
    this.#childRenderer.tick(tickContext);

    const { item } = this.renderContext;
    const { box } = item.state;
    positionBuffer.x = box.x + box.xd / 2;
    positionBuffer.y = box.y + box.yd / 2;
    positionBuffer.z = box.z + box.zd / 2;
    const itemCentrePosition = positionBuffer;

    const { cameraAngle } = this.renderContext.general;

    const soundPositionX = numberInRangeToMinus1To1Range(
      projectWorldXyzToScreenX(itemCentrePosition, cameraAngle),
      this.#soundPositionMinX,
      this.#soundPositionMaxX,
    );

    // altitude (game z) mapped to screen height
    const soundPositionY = numberInRangeToMinus1To1Range(
      itemCentrePosition.z,
      soundPositionMinY,
      soundPositionMaxY,
    );

    if (!Number.isFinite(soundPositionY)) {
      // verbose on purpose - a hard-to-track-down bug
      throw new Error(
        `y position for sound rendering is not finite;
        positionY = numberInRangeToMinus1To1Range(
          itemCentrePosition = ${itemCentrePosition.z},
          ${soundPositionMinY},
          ${soundPositionMaxY},
        );
        itemCentrePosition = centre of ${JSON.stringify(item.state.box)}`,
      );
    }

    // depth (x+y in-game), rotated by the camera:
    const rotatedCentre = rotateXyz(itemCentrePosition, cameraAngle);
    const soundPositionZ = numberInRangeToMinus1To1Range(
      rotatedCentre.x + rotatedCentre.y,
      soundPositionMinZ,
      soundPositionMaxZ,
    );

    if (log) {
      console.log(
        item.id,
        `x= ${soundPositionX * maxXOffsetFromCentre}/(${this.#soundPositionMinX} - ${this.#soundPositionMaxX})`,
        soundPositionY,
        soundPositionZ,
      );
    }
    this.output.positionX.value = soundPositionX * maxXOffsetFromCentre;
    this.output.positionY.value = soundPositionY;
    this.output.positionZ.value = soundPositionZ * maxZOffsetFromCentre;
  }

  destroy(): void {
    this.#childRenderer.destroy();
  }
}
