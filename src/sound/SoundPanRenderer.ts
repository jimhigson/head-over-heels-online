import type { EmptyObject } from "type-fest";
import {
  blockXyzToFineXyz,
  projectWorldXyzToScreenX,
} from "../game/render/projectToScreen";
import type { ItemInPlayType } from "../model/ItemInPlay";
import { audioCtx } from "./audioCtx";
import type { ItemSoundRenderContext } from "./ItemSoundRenderContext";
import type { ItemSoundRenderer } from "./ItemSoundRenderer";

export class SoundPanRenderer<
  T extends ItemInPlayType,
  RoomId extends string,
  RoomItemId extends string,
> implements ItemSoundRenderer<T, RoomId, RoomItemId>
{
  public readonly output = audioCtx.createStereoPanner();
  private roomMaxProjectedX: number;
  private roomMinProjectedX: number;

  constructor(
    public readonly renderContext: ItemSoundRenderContext<
      T,
      RoomId,
      RoomItemId
    >,
    private readonly childRenderer: ItemSoundRenderer<T, RoomId, RoomItemId>,
  ) {
    childRenderer.output.connect(this.output);

    const {
      room: {
        size: { y: roomYSize, x: roomXSize },
      },
    } = renderContext;

    this.roomMaxProjectedX = projectWorldXyzToScreenX(
      blockXyzToFineXyz({ x: 0, y: roomYSize }),
    );
    this.roomMinProjectedX = projectWorldXyzToScreenX(
      blockXyzToFineXyz({ x: roomXSize, y: 0 }),
    );
  }

  tick(tickContext: EmptyObject) {
    this.childRenderer.tick(tickContext);

    const itemPosition = this.renderContext.item.state.position;

    const stereoPosition = Math.min(
      1,
      Math.max(
        -1,
        ((projectWorldXyzToScreenX(itemPosition) - this.roomMinProjectedX) /
          (this.roomMaxProjectedX - this.roomMinProjectedX)) *
          2 -
          1,
      ),
    );
    this.output.pan.value = stereoPosition;
  }

  destroy(): void {
    this.childRenderer.destroy();
  }
}
