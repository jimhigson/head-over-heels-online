import type { Renderer as PixiRenderer } from "pixi.js";
import { AlphaFilter, Container, RenderTexture, Sprite } from "pixi.js";
import { projectWorldXyzToScreenXy } from "../projectToScreen";
import type { CreateSpriteOptions } from "../createSprite";
import { createSprite } from "../createSprite";
import type { Collideable } from "../../collision/aabbCollision";
import { collision1to1 } from "../../collision/aabbCollision";
import { concat, objectEntries, objectValues } from "iter-tools";
import type { SetRequired } from "type-fest";
import { veryHighZ } from "../../physics/mechanicsConstants";
import type {
  ItemInPlay,
  ItemInPlayType,
  UnionOfAllItemInPlayTypes,
} from "../../../model/ItemInPlay";
import type { RoomState } from "../../../model/modelTypes";
import type { SceneryName } from "../../../sprites/planets";
import { iterate } from "../../../utils/iterate";
import type { Xy, Xyz } from "../../../utils/vectors/vectors";
import { subXy } from "../../../utils/vectors/vectors";
import { store } from "../../../store/store";
import type { RenderContext, Renderer } from "../Renderer";
import { blockSizePx } from "../../../sprites/spritePivots";
import type { ConsolidatableConfig } from "../../../model/json/ItemConfigMap";

type Cast = {
  /* the sprite of the shadow */
  sprite: Container;
  /* used for tracking the shadows that have been used in this frame (ie, don't have to be removed) */
  renderedOnProgression: number;
};

const renderContainerToSprite = (
  pixiRenderer: PixiRenderer,
  container: Container,
): Sprite => {
  // the shadowmask is a container - this is the case for 'times'
  const localBounds = container.getLocalBounds();

  // general containers with multiple sprites can't be used as shadow masks,
  // so we need to render the shadow mask to a sprite:
  const renderTexture = RenderTexture.create({
    width: localBounds.maxX - localBounds.minX,
    height: localBounds.maxY - localBounds.minY,
    // TODO: resolution (reduce size of texture)
  });

  // displace container contents to the origin of the sprite:
  container.x -= localBounds.minX;
  container.y -= localBounds.minY;
  pixiRenderer.render({ container, target: renderTexture });

  return new Sprite({
    texture: renderTexture,
    label: "shadowMaskSprite (of renderTexture)",
    // un-displace to the origin of the sprite so it works the same as the container
    // we're rendering from:
    pivot: { x: -localBounds.minX, y: -localBounds.minY },
  });
};

const renderMultipliedXy = (
  pixiRenderer: PixiRenderer,
  createSpriteOptions: CreateSpriteOptions,
  timesXyz: Partial<Xyz> | undefined,
): Sprite => {
  const timesXy: Xy | undefined = timesXyz && {
    x: timesXyz.x ?? 1,
    y: timesXyz.y ?? 1,
  };

  const renderingContainer = createSprite({
    ...(typeof createSpriteOptions === "string" ?
      { textureId: createSpriteOptions }
    : createSpriteOptions),
    times: timesXy,
  });

  if (renderingContainer instanceof Sprite) {
    // simple case where we got a sprite:
    return renderingContainer;
  } else {
    // times case where createSprite gave us a container of sprites:
    return renderContainerToSprite(pixiRenderer, renderingContainer);
  }
};

export class ItemShadowRenderer<
  T extends ItemInPlayType,
  RoomId extends string,
  ItemId extends string,
> implements Renderer
{
  #container: Container = new Container({
    label: "ItemShadowRenderer",
  });
  #shadowsContainer: Container = new Container({
    label: "shadows",
  });

  /**
   * record all the shadows currently being cast, to maintain some state between frames so we ca
   * cut out unnecessary extra work
   */
  #casts = {} as Record<string, Cast>;

  constructor(
    /** the item currently being rendered for = the one that the shadow is cast on  */
    private item: SetRequired<
      ItemInPlay<T, SceneryName, RoomId, ItemId>,
      "shadowMask"
    >,
    private room: RoomState<SceneryName, RoomId, ItemId>,
    private pixiRenderer: PixiRenderer,
  ) {
    const {
      userSettings: {
        displaySettings: { showShadowMasks },
      },
    } = store.getState();

    // due to this issue:
    // https://github.com/pixijs/pixijs/issues/4334
    // using alpha fitler (not .alpha) to set alpha here:
    // https://pixijs.download/dev/docs/filters.AlphaFilter.html
    if (!showShadowMasks) {
      this.#container.filters = new AlphaFilter({ alpha: 0.5 });
    }

    const {
      shadowMask: { spriteOptions },
    } = item;
    if (spriteOptions) {
      const { times } = item.config as ConsolidatableConfig;

      const shadowMaskSprite = renderMultipliedXy(
        pixiRenderer,
        spriteOptions,
        times,
      );

      if (item.shadowMask.relativeTo === "top") {
        shadowMaskSprite.y -= item.aabb.z;
      }
      if (times) {
        // move the shadow mast up if the item is multiplied in z:
        shadowMaskSprite.y -= ((times.z ?? 1) - 1) * blockSizePx.h;
      }

      this.#container.addChild(shadowMaskSprite);
      if (!showShadowMasks) {
        this.#container.mask = shadowMaskSprite;
      }
    }

    this.#container.addChild(this.#shadowsContainer);
    //this.#container.addChild(new Graphics().circle(0, 0, 2).fill(0xff0000));
  }

  destroy() {
    this.#container.destroy(true);
  }
  /**
   * @returns true iff the item needs z-order resorting for the room
   */
  tick({ movedItems, progression }: RenderContext) {
    const surfaceMoved = movedItems.has(this.item);
    const itemTop = this.item.state.position.z + this.item.aabb.z;

    const shadowCastersIter = iterate(objectValues(this.room.items)).filter(
      function castsAShadow(
        c,
      ): c is SetRequired<typeof c, "shadowCastTexture"> {
        return c.shadowCastTexture !== undefined;
      },
    );

    const spaceAboveSurface: Collideable = {
      id: this.item.id,
      state: {
        position: {
          ...this.item.state.position,
          z: itemTop,
        },
      },
      aabb: {
        ...this.item.aabb,
        z: veryHighZ,
      },
    };

    // collide up from this item to find which of the shadow casters is above it:
    const bins = Object.groupBy(shadowCastersIter, (caster) => {
      const previouslyHadShadow = this.#casts[caster.id] !== undefined;
      const casterMoved = movedItems.has(caster);
      if (!surfaceMoved && !casterMoved) {
        // neither the surface being cast onto, nor the item casting the shadow have moved - keep as-is:
        if (previouslyHadShadow) {
          return "keepUnchanged";
        } else {
          return "noShadow";
        }
      }
      if (collision1to1(spaceAboveSurface, caster)) {
        if (previouslyHadShadow) {
          return "update";
        } else {
          return "create";
        }
      }
      // now know caster has no shadow:
      return "noShadow";
    });

    // record that these are going through this generation:
    for (const casterItem of concat(bins.keepUnchanged, bins.update)) {
      this.#casts[casterItem.id].renderedOnProgression = progression;
    }

    if (bins.create)
      for (const casterItem of bins.create) {
        const { times } = casterItem.config as ConsolidatableConfig;

        const newShadowSprite = renderMultipliedXy(
          this.pixiRenderer,
          casterItem.shadowCastTexture,
          times,
        );
        newShadowSprite.label = casterItem.id;
        //newShadowSprite.filters = [new BlurFilter()];
        this.#shadowsContainer.addChild(newShadowSprite);
        this.#casts[casterItem.id] = {
          sprite: newShadowSprite,
          renderedOnProgression: progression,
        };
      }

    for (const casterItem of concat(bins.create, bins.update)) {
      const { sprite } = this.#casts[casterItem.id];

      const screenXy = projectWorldXyzToScreenXy({
        ...subXy(casterItem.state.position, this.item.state.position),
        z: this.item.aabb.z,
      });
      // this fails for composite sprites, since they get their x,y set in the sprite they are rendered to
      sprite.x = screenXy.x;
      sprite.y = screenXy.y;

      //const heightDifference = casterItem.state.position.z - itemTop;
      //const [blurFilter] = shadow.container.filters as BlurFilter[];
      //blurFilter.strength = 0.5 + (8 * heightDifference) / 36;
    }

    // clean out casts that are no longer needed:
    for (const [
      id,
      { sprite: container, renderedOnProgression: currentAsOfProgression },
    ] of objectEntries(this.#casts)) {
      if (currentAsOfProgression !== progression) {
        container.destroy();
        delete this.#casts[id];
      }
    }

    // for efficiency, hide all shadow rendering if nothing is casting on this item:
    this.#container.visible =
      (bins.keepUnchanged?.length ?? 0) +
        (bins.update?.length ?? 0) +
        (bins.create?.length ?? 0) >
      0;
  }

  get container() {
    return this.#container;
  }
}
