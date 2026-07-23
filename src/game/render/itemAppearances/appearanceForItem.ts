import { Container } from "pixi.js";

import { type ItemTypeUnion } from "../../../_generated/types/ItemInPlayUnion";
import { type ItemInPlayType } from "../../../model/ItemInPlay";
import { smallItemTextureSize } from "../../../sprites/spritesheet/spritesheetData/textureSizes";
import { variantTextureId } from "../../../sprites/spritesheet/variantTextureId";
import {
  asReuseSprite,
  maybeRenderContainerToSprite,
} from "../../../utils/pixi/renderContainerToSprite";
import { nearestQuarterAngle } from "../../../utils/vectors/rotateXy";
import { rotateAxisXyByCameraAngle } from "../../../utils/vectors/vectors";
import { createSprite, type CreateSpriteOptions } from "../createSprite";
import { blockAppearance } from "./blockAppearance";
import { buttonAppearance } from "./buttonAppearance";
import { charlesAppearance } from "./charlesAppearance";
import { conveyorAppearance } from "./conveyorAppearance";
import { deadlyBlockAppearance } from "./deadlyBlockAppearance";
import { doorFrameAppearance, doorLegsAppearance } from "./door/doorAppearance";
import { floatingTextAppearance } from "./floatingTextAppearance";
import { floorAppearance } from "./floorAppearance/floorAppearance";
import {
  itemAppearanceRenderMemoised,
  itemStaticAnimatedAppearance,
  itemStaticAppearance,
} from "./ItemAppearance";
import {
  itemAppearanceOutsideView,
  type ItemAppearanceOutsideView,
} from "./itemAppearanceOutsideView";
import { joystickAppearance } from "./joystickAppearance";
import { lampAppearance } from "./lampAppearance";
import { lightBeamAppearance } from "./lightBeamAppearance";
import { mirrorAppearance } from "./mirror/mirrorAppearance";
import { monsterAppearance } from "./monsterAppearance";
import { sceneryPlayerAppearance } from "./sceneryPlayerAppearance";
import { spikyBallAppearance } from "./spikyBallAppearance";
import { springAppearance } from "./springAppearance";
import { switchAppearance } from "./switchAppearance";
import { teleporterAppearance } from "./teleporterAppearance";
import { wallAppearance } from "./wallAppearance";

const itemAppearancesMap: {
  [T in ItemInPlayType]?: ItemAppearanceOutsideView<T>;
} = {
  // casts allow these appearances to use Container specialisations as their output without
  // clashing with the `itemAppearances` types
  doorFrame: itemAppearanceOutsideView(doorFrameAppearance),
  doorLegs: doorLegsAppearance,
  monster: monsterAppearance,
  floatingText: floatingTextAppearance,

  barrier: itemAppearanceRenderMemoised(
    ({
      renderContext: {
        isReflection,
        item: {
          config: { axis, times, disappearing },
        },
        general: { spritesheets, pixiRenderer, cameraAngle },
      },
      currentRendering,
    }) => {
      const cameraQuarterAngle = nearestQuarterAngle(cameraAngle);
      const renderedAxis = rotateAxisXyByCameraAngle(axis, cameraQuarterAngle);
      return maybeRenderContainerToSprite(
        pixiRenderer,
        createSprite({
          textureId: variantTextureId(
            `barrier.${renderedAxis}${disappearing ? ".disappearing" : ""}`,
            isReflection,
            false,
            false,
            false,
          ),
          times,
          cameraQuarterAngle,
          spritesheet: spritesheets.spritesheetForCurrentRoom,
        }),
        asReuseSprite(currentRendering?.output),
      );
    },
    // the barrier's art follows its apparent (rotated) axis:
    (_item, cameraQuarterAngle) => cameraQuarterAngle,
  ),

  deadlyBlock: deadlyBlockAppearance,
  spikes: itemStaticAppearance("spikes"),

  slidingDeadly: spikyBallAppearance,

  slidingBlock: itemAppearanceRenderMemoised(
    ({
      renderContext: {
        isReflection,
        item: {
          config: { style },
        },
        general: { spritesheets },
      },
    }) => {
      return createSprite({
        textureId: variantTextureId(
          style === "book" ? "book.y" : style,
          isReflection,
          false,
          false,
          false,
        ),
        spritesheet: spritesheets.spritesheetForCurrentRoom,
      });
    },
  ),

  block: blockAppearance,

  switch: switchAppearance,
  button: buttonAppearance,

  conveyor: conveyorAppearance,

  lift: itemAppearanceRenderMemoised(
    ({
      renderContext: {
        isReflection,
        general: { paused, spritesheets },
      },
    }) => {
      const rendering = new Container();
      const { spritesheetForCurrentRoom: spritesheet } = spritesheets;

      const pivot = {
        x: smallItemTextureSize.w / 2,
        y: smallItemTextureSize.h,
      };
      rendering.addChild(
        createSprite({
          animationId: variantTextureId(
            "lift",
            isReflection,
            false,
            false,
            false,
          ),
          pivot,
          paused,
          spritesheet,
        }),
      );

      rendering.addChild(
        createSprite({
          textureId: variantTextureId(
            "lift.static",
            isReflection,
            false,
            false,
            false,
          ),
          pivot,
          spritesheet,
        }),
      );

      return rendering;
    },
  ),

  teleporter: teleporterAppearance,
  portableTeleporter: teleporterAppearance,

  lamp: lampAppearance,
  // the mirror renders other items' reflections via the context's
  // createItemLeafPixiRenderer capability, so it needs no injected lookup:
  mirror: mirrorAppearance,
  lightBeam: lightBeamAppearance,

  wall: wallAppearance,

  sceneryCrown: itemAppearanceRenderMemoised(
    ({
      renderContext: {
        isReflection,
        item: {
          config: { planet },
        },
        general: { spritesheets },
      },
    }) => {
      return createSprite({
        textureId: variantTextureId(
          `crown.${planet}`,
          isReflection,
          false,
          false,
          false,
        ),
        spritesheet: spritesheets.spritesheetForCurrentRoom,
      });
    },
  ),

  pickup: itemAppearanceRenderMemoised(
    ({
      renderContext: {
        isReflection,
        item: { config },
        general: { paused, spritesheets },
      },
    }) => {
      const { spritesheetForCurrentRoom: spritesheet } = spritesheets;

      if (config.gives === "crown") {
        return createSprite({
          textureId: variantTextureId(
            `crown.${config.planet}`,
            isReflection,
            false,
            false,
            false,
          ),
          spritesheet,
        });
      }

      const pickupSpriteOptions: Record<
        (typeof config)["gives"],
        CreateSpriteOptions
      > = {
        shield: {
          textureId: variantTextureId(
            "whiteRabbit.shield",
            isReflection,
            false,
            false,
            false,
          ),
          spritesheet,
        },
        jumps: {
          textureId: variantTextureId(
            "whiteRabbit.jumps",
            isReflection,
            false,
            false,
            false,
          ),
          spritesheet,
        },
        fast: {
          textureId: variantTextureId(
            "whiteRabbit.fast",
            isReflection,
            false,
            false,
            false,
          ),
          spritesheet,
        },
        "extra-life": {
          textureId: variantTextureId(
            "whiteRabbit.extra-life",
            isReflection,
            false,
            false,
            false,
          ),
          spritesheet,
        },
        bag: {
          textureId: variantTextureId("bag", isReflection, false, false, false),
          spritesheet,
        },
        doughnuts: {
          textureId: variantTextureId(
            "doughnuts",
            isReflection,
            false,
            false,
            false,
          ),
          spritesheet,
        },
        hooter: {
          textureId: variantTextureId(
            "hooter",
            isReflection,
            false,
            false,
            false,
          ),
          spritesheet,
        },
        scroll: {
          textureId: variantTextureId(
            "scroll",
            isReflection,
            false,
            false,
            false,
          ),
          spritesheet,
        },
        reincarnation: {
          animationId: variantTextureId(
            "fish",
            isReflection,
            false,
            false,
            false,
          ),
          paused,
          spritesheet,
        },
      };
      const createSpriteOptions = pickupSpriteOptions[config.gives];

      return createSprite(createSpriteOptions);
    },
  ),

  // these are always dead fish:
  moveableDeadly: itemStaticAppearance("fish.dead"),

  charles: charlesAppearance,

  joystick: joystickAppearance,

  movingPlatform: itemStaticAppearance("sandwich"),
  pushableBlock: itemStaticAppearance("stepStool"),

  portableBlock: itemAppearanceRenderMemoised(
    ({
      renderContext: {
        isReflection,
        item: {
          config: { style },
        },
        general: { spritesheets },
      },
    }) =>
      createSprite({
        textureId: variantTextureId(style, isReflection, false, false, false),
        spritesheet: spritesheets.spritesheetForCurrentRoom,
      }),
  ),

  spring: springAppearance,

  sceneryPlayer: sceneryPlayerAppearance,

  hushPuppy: itemStaticAppearance("hushPuppy"),

  bubbles: itemAppearanceRenderMemoised(
    ({
      renderContext: {
        isReflection,
        item: {
          hash,
          config: { style },
        },
        general: { paused, spritesheets },
      },
    }) => {
      return createSprite({
        animationId: variantTextureId(
          `bubbles.bounce.${style}`,
          isReflection,
          false,
          false,
          false,
        ),
        paused,
        startFramePhase: hash,
        spritesheet: spritesheets.spritesheetForCurrentRoom,
      });
    },
  ),
  firedDoughnut: itemStaticAnimatedAppearance({
    animationId: "bubbles.doughnut",
  }),

  ball: itemStaticAppearance("ball"),

  floor: floorAppearance,

  particle: itemAppearanceRenderMemoised(
    ({
      renderContext: {
        item: {
          config: { forCharacter },
        },
        general: { paused, spritesheets },
      },
    }) => {
      const characterEquivalent = forCharacter === "head" ? "head" : "heels";

      // particles are an unreflected item type, so never take the
      // mirror-reflection suffix:
      return createSprite({
        animationId: `particle.${characterEquivalent}.fade`,
        anchor: { x: 0.5, y: 0.5 },
        paused,
        spritesheet: spritesheets.spritesheetForCurrentRoom,
      });
    },
  ),
};

/**
 * for any given item, return the appearance for that item, or undefined if we
 * have none.
 */
export const appearanceForItem = <T extends ItemInPlayType>(
  item: ItemTypeUnion<T, string, string>,
): ItemAppearanceOutsideView<T> | undefined =>
  itemAppearancesMap[item.type as T];
