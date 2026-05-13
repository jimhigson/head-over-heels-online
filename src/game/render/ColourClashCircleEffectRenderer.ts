import type { SetRequired } from "type-fest";

import { Container } from "pixi.js";

import type { RoomStateItems } from "../../model/RoomState";
import type {
  RoomRenderContextInGame,
  RoomTickContext,
} from "./room/RoomRenderContexts";
import type {
  RoomRendererType,
  RoomRendererTypeInGameOnly,
} from "./room/RoomRendererType";
import type { SoundAndGraphicsOutput } from "./SoundAndGraphicsOutput";

import { characterNames } from "../../model/modelTypes";
import { store } from "../../store/store";
import { emptyArray } from "../../utils/empty";
import { addXyz, scaleXyz } from "../../utils/vectors/vectors";
import { type PlayableItem } from "../physics/itemPredicates";
import { fadeInOrOutDuration } from "./animationTimings";
import { ColourClashCircleEffectFilter } from "./filters/ColourClashCircleEffectFilter";
import { projectWorldXyzToScreenXy } from "./projections";

const effectProgress01 = (
  roomTime: number,
  startTime: number,
  duration: number,
  invert: boolean,
): number => {
  const elapsed = Math.max(0, Math.min(duration, roomTime - startTime));
  const proportion = elapsed / duration;
  return invert ? 1 - proportion : proportion;
};

type EffectTarget = {
  playable: PlayableItem;
  isDeath: boolean;
};

const findEffectTarget = <RoomId extends string, RoomItemId extends string>(
  items: RoomStateItems<RoomId, RoomItemId>,
  currentCharacterName: string,
  roomId: RoomId,
  deathDialogShowing: boolean,
): EffectTarget | undefined => {
  if (deathDialogShowing) {
    for (const name of characterNames) {
      const playable = items[name as RoomItemId] as PlayableItem | undefined;
      if (
        playable !== undefined &&
        playable.state.action === "death" &&
        playable.state.expires !== null
      ) {
        return { playable, isDeath: true };
      }
    }
  }

  const currentPlayable = items[currentCharacterName as RoomItemId] as
    | PlayableItem
    | undefined;

  if (
    currentPlayable !== undefined &&
    currentPlayable.state.teleporting !== null &&
    currentPlayable.state.teleporting.otherRoom !== roomId
  ) {
    return { playable: currentPlayable, isDeath: false };
  }

  return undefined;
};

/**
 * put the room on the screen in the right place - either scrolling, or at its home position similar to how
 * it would have been put onto the screen in the original game
 */
export class ColourClashCircleEffectRenderer<
  RoomId extends string,
  RoomItemId extends string,
> implements RoomRendererTypeInGameOnly<RoomId, RoomItemId>
{
  public output: SetRequired<SoundAndGraphicsOutput, "graphics">;

  #effectFilter: ColourClashCircleEffectFilter | undefined;
  #effectIsDeath: boolean = false;

  readonly renderContext: RoomRenderContextInGame<RoomId, RoomItemId>;
  #childRenderer: RoomRendererType<RoomId, RoomItemId>;

  constructor(
    renderContext: RoomRenderContextInGame<RoomId, RoomItemId>,
    childRenderer: RoomRendererType<RoomId, RoomItemId>,
  ) {
    this.renderContext = renderContext;
    this.#childRenderer = childRenderer;
    const { room } = renderContext;

    const childRendererGraphics = this.#childRenderer.output.graphics;

    const output = {
      sound: this.#childRenderer.output.sound,
      graphics: new Container({
        children: [childRendererGraphics],
        label: `ColourClashCircleEffectRenderer(${room.id})`,
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
      this.#effectFilter!.centreX = 1 - uY;
      this.#effectFilter!.centreY = uX;
    } else {
      // normal case
      this.#effectFilter!.centreX = uX;
      this.#effectFilter!.centreY = uY;
    }
  }

  #createFilter(isDeath: boolean, currentPlayable: PlayableItem) {
    const {
      renderContext: {
        general: {
          upscale: { gameEngineUpscale },
          spriteOption,
          spritesheetMeta,
        },
      },
    } = this;

    this.#effectFilter = new ColourClashCircleEffectFilter(
      isDeath ?
        {
          blockSize: gameEngineUpscale * 8,
          spriteOption,
          spritesheetMeta,
          isDeath,
          zxCircleMinSize: 0,
          blackCircleOffset: -0.5,
          blackCircleDarkening: 0.6,
          blackCircleFeathering: 0.8,
          // stifle the frame rate of the effect when running uncolourised to make it not
          // happen too smoothly
          timeStep: spriteOption.uncolourised ? 0.005 : undefined,
          distancePower: 6,
        }
      : {
          blockSize: gameEngineUpscale * 8,
          spriteOption,
          spritesheetMeta,
          isDeath,
          zxCircleSpeed: 1.7,
          // stifle the frame rate of the effect when running uncolourised to make it not
          // happen too smoothly
          timeStep: spriteOption.uncolourised ? 0.05 : undefined,
        },
    );
    this.#effectIsDeath = isDeath;
    this.#updateFilterCentreXy(currentPlayable);
    this.output.graphics.filters = [this.#effectFilter];
  }

  #destroyFilter() {
    this.#effectFilter = undefined;
    this.output.graphics.filters = emptyArray;
  }

  #update() {
    const {
      renderContext: {
        general: {
          gameState: { currentCharacterName },
        },
        room: { items, id: roomId, roomTime },
      },
    } = this;

    const deathDialogShowing = store
      .getState()
      .gameMenus.openMenus.some((m) => m.menuId === "death");

    const target = findEffectTarget(
      items,
      currentCharacterName,
      roomId,
      deathDialogShowing,
    );

    const hasEffect = this.#effectFilter !== undefined;

    if (target === undefined) {
      if (hasEffect) {
        this.#destroyFilter();
      }
      return;
    }

    const { playable, isDeath } = target;

    if (hasEffect && isDeath !== this.#effectIsDeath) {
      this.#destroyFilter();
      this.#createFilter(isDeath, playable);
    } else if (!hasEffect) {
      this.#createFilter(isDeath, playable);
    }

    let progress01: number;

    if (isDeath) {
      const startTime = playable.state.expires! - fadeInOrOutDuration;
      progress01 = effectProgress01(
        roomTime,
        startTime,
        fadeInOrOutDuration,
        false,
      );
    } else {
      const { startRoomTime, phase } = playable.state.teleporting!;
      progress01 = effectProgress01(
        roomTime,
        startRoomTime,
        fadeInOrOutDuration,
        phase === "in",
      );
    }

    this.#effectFilter!.progress = progress01;
    this.#updateFilterCentreXy(playable);
  }

  tick(tickContext: RoomTickContext<RoomId, RoomItemId>) {
    this.#childRenderer.tick(tickContext);
    this.#update();
  }

  destroy(): void {
    this.output.graphics.destroy({ children: true });
    this.#effectFilter?.destroy();
    this.#childRenderer.destroy();
  }
}
