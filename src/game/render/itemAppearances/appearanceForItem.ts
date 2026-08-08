import { Container } from "pixi.js";

import { type ItemTypeUnion } from "../../../_generated/types/ItemInPlayUnion";
import { type ItemInPlayType } from "../../../model/ItemInPlay";
import { smallItemTextureSize } from "../../../sprites/spritesheet/spritesheetData/textureSizes";
import { variantTextureId } from "../../../sprites/spritesheet/variantTextureId";
import {
  asReuseSprite,
  maybeRenderContainerToSprite,
} from "../../../utils/pixi/bakeContainerToSprite";
import { nearestQuarterAngle } from "../../../utils/vectors/cameraAngleVectors";
import { octantIndexOfDirection } from "../../../utils/vectors/octantIndexOfDirection" with { type: "macro" };
import { spriteFlipXAtAngle } from "../../../utils/vectors/resolveCameraRelativeVector";
import { axisIndexXy8 } from "../../../utils/vectors/vectors";
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
      // the art is keyed by the barrier's WORLD axis (d0 = x, d2 = y) and
      // flipped on odd quarter turns - the flip gives the other axis's
      // mirror-symmetric form while the painted shading stays on the
      // barrier's world faces (the light source stays fixed in the world):
      return maybeRenderContainerToSprite(
        pixiRenderer,
        createSprite({
          textureId: variantTextureId(
            `barrier.d${axisIndexXy8[axis]}${disappearing ? ".disappearing" : ""}`,
            isReflection,
            false,
            false,
            false,
          ),
          flipX: spriteFlipXAtAngle(cameraQuarterAngle),
          times,
          cameraQuarterAngle,
          spritesheet: spritesheets.spritesheetForCurrentRoom,
        }),
        asReuseSprite(currentRendering?.output),
      );
    },
    // the barrier's flip resolves per quarter turn:
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
        general: { spritesheets, cameraAngle },
      },
    }) => {
      // sliding books lie along world y (d2); the flip keeps the art's
      // painted shading (the book's, or a puck's highlight) on its world
      // faces as the camera turns:
      return createSprite({
        textureId: variantTextureId(
          style === "book" ? `book.d${octantIndexOfDirection("away")}` : style,
          isReflection,
          false,
          false,
          false,
        ),
        flipX: spriteFlipXAtAngle(cameraAngle),
        spritesheet: spritesheets.spritesheetForCurrentRoom,
      });
    },
    // the flip resolves per quarter turn:
    (_item, cameraQuarterAngle) => cameraQuarterAngle,
  ),

  block: blockAppearance,

  switch: switchAppearance,
  button: buttonAppearance,

  conveyor: conveyorAppearance,

  lift: itemAppearanceRenderMemoised(
    ({
      renderContext: {
        isReflection,
        general: { paused, spritesheets, cameraAngle },
      },
    }) => {
      const rendering = new Container();
      const { spritesheetForCurrentRoom: spritesheet } = spritesheets;
      const flipX = spriteFlipXAtAngle(cameraAngle);

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
          flipX,
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
          flipX,
          spritesheet,
        }),
      );

      return rendering;
    },
    // the flip resolves per quarter turn:
    (_item, cameraQuarterAngle) => cameraQuarterAngle,
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
        general: { spritesheets, cameraAngle },
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
        flipX: spriteFlipXAtAngle(cameraAngle),
        spritesheet: spritesheets.spritesheetForCurrentRoom,
      });
    },
    // the flip resolves per quarter turn:
    (_item, cameraQuarterAngle) => cameraQuarterAngle,
  ),

  pickup: itemAppearanceRenderMemoised(
    ({
      renderContext: {
        isReflection,
        item: { config },
        general: { paused, spritesheets, cameraAngle },
      },
    }) => {
      const { spritesheetForCurrentRoom: spritesheet } = spritesheets;
      const flipX = spriteFlipXAtAngle(cameraAngle);

      if (config.gives === "crown") {
        return createSprite({
          textureId: variantTextureId(
            `crown.${config.planet}`,
            isReflection,
            false,
            false,
            false,
          ),
          flipX,
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
          flipX,
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
          flipX,
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
          flipX,
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
          flipX,
          spritesheet,
        },
        bag: {
          textureId: variantTextureId("bag", isReflection, false, false, false),
          flipX,
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
          flipX,
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
          flipX,
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
          flipX,
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
          flipX,
          paused,
          spritesheet,
        },
      };
      const createSpriteOptions = pickupSpriteOptions[config.gives];

      return createSprite(createSpriteOptions);
    },
    // the flip resolves per quarter turn:
    (_item, cameraQuarterAngle) => cameraQuarterAngle,
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
        general: { spritesheets, cameraAngle },
      },
    }) =>
      createSprite({
        textureId: variantTextureId(style, isReflection, false, false, false),
        flipX: spriteFlipXAtAngle(cameraAngle),
        spritesheet: spritesheets.spritesheetForCurrentRoom,
      }),
    // the flip resolves per quarter turn:
    (_item, cameraQuarterAngle) => cameraQuarterAngle,
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
