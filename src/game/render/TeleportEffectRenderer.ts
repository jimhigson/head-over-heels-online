import type { SetRequired } from "type-fest";

import { Container } from "pixi.js";

import type { PlayableItem } from "../physics/itemPredicates";
import type {
  RoomRenderContextInGame,
  RoomTickContext,
} from "./room/RoomRenderContexts";
import type {
  RoomRendererType,
  RoomRendererTypeInGameOnly,
} from "./room/RoomRendererType";
import type { SoundAndGraphicsOutput } from "./SoundAndGraphicsOutput";

import { emptyArray } from "../../utils/empty";
import { addXyz, scaleXyz } from "../../utils/vectors/vectors";
import { fadeInOrOutDuration } from "./animationTimings";
import { TeleportingEffectFilter } from "./filters/TeleportingEffectFilter";
import { projectWorldXyzToScreenXy } from "./projections";

/**
 * put the room on the screen in the right place - either scrolling, or at its home position similar to how
 * it would have been put onto the screen in the original game
 */
export class TeleportEffectRenderer<
  RoomId extends string,
  RoomItemId extends string,
> implements RoomRendererTypeInGameOnly<RoomId, RoomItemId>
{
  public output: SetRequired<SoundAndGraphicsOutput, "graphics">;

  #teleportingEffectFilter: TeleportingEffectFilter | undefined;

  constructor(
    public readonly renderContext: RoomRenderContextInGame<RoomId, RoomItemId>,
    private readonly childRenderer: RoomRendererType<RoomId, RoomItemId>,
  ) {
    const { room } = renderContext;

    const childRendererGraphics = this.childRenderer.output.graphics;

    const output = {
      sound: this.childRenderer.output.sound,
      graphics: new Container({
        children: [childRendererGraphics],
        label: `TeleportEffectRenderer(${room.id})`,
      }),
    };

    this.output = output;
    this.#update();
  }

  #updateFilterCentreXy(currentPlayable: PlayableItem) {
    const playableMidXyz = addXyz(
      currentPlayable.state.position,
      scaleXyz(currentPlayable.aabb, 0.5),
    );

    const {
      renderContext: {
        general: {
          upscale: { rotate90 },
        },
      },
    } = this;

    const { x: xPx, y: yPx } = projectWorldXyzToScreenXy(playableMidXyz);

    const containerLocalBounds = this.output.graphics.getLocalBounds();

    // setting the filter area to the local bounds ensures the filter
    // only applies to the part of the container that is active - this makes
    // it easier to accurately decide where on the surface the filter is rendering
    // to the playable character actually is:
    this.output.graphics.filterArea = containerLocalBounds.rectangle;

    const uX = (xPx - containerLocalBounds.x) / containerLocalBounds.width;
    const uY = (yPx - containerLocalBounds.y) / containerLocalBounds.height;

    // pixi filters operate on screen-space even inside rotated containers, so
    // compensate accordingly:
    if (rotate90) {
      // rotated case
      this.#teleportingEffectFilter!.centreX = 1 - uY;
      this.#teleportingEffectFilter!.centreY = uX;
    } else {
      // normal case
      this.#teleportingEffectFilter!.centreX = uX;
      this.#teleportingEffectFilter!.centreY = uY;
    }
  }

  #update() {
    const {
      renderContext: {
        general: {
          gameState: { currentCharacterName },
        },
        room: { items },
      },
    } = this;

    const currentPlayable = items[currentCharacterName as RoomItemId] as
      | PlayableItem
      | undefined;

    if (currentPlayable !== undefined) {
      const { teleporting } = currentPlayable.state;

      if (
        (this.#teleportingEffectFilter === undefined) !==
        (teleporting === null)
      ) {
        // need to create or destroy the filter:
        if (teleporting !== null) {
          // create
          const {
            renderContext: {
              general: {
                upscale: { gameEngineUpscale },
              },
            },
          } = this;

          this.#teleportingEffectFilter = new TeleportingEffectFilter({
            blockSize: gameEngineUpscale * 8,
          });
          this.#updateFilterCentreXy(currentPlayable);
          this.output.graphics.filters = [this.#teleportingEffectFilter];
        } else {
          // destroy
          this.#teleportingEffectFilter = undefined;
          this.output.graphics.filters = emptyArray;
        }
      } else {
        // no need to create/destroy, check if need to update:
        if (teleporting !== null) {
          // update filter progress and x/y:
          const { timeRemaining, phase } = teleporting;
          const proportion = timeRemaining / fadeInOrOutDuration;
          const progress01 = phase === "in" ? proportion : 1 - proportion;

          this.#teleportingEffectFilter!.progress = progress01;
          this.#updateFilterCentreXy(currentPlayable);
        }
      }
    }
  }

  tick(tickContext: RoomTickContext<RoomId, RoomItemId>) {
    this.childRenderer.tick(tickContext);
    this.#update();
  }

  destroy(): void {
    this.output.graphics.destroy({ children: true });
    this.#teleportingEffectFilter?.destroy();
    this.childRenderer.destroy();
  }
}
