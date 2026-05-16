import { defaultFilterVert, Filter, GlProgram } from "pixi.js";

import type { SpritesheetMetadata } from "../../../sprites/spritesheet/spritesheetData/spritesheetMetaData";
import type { SpriteOption } from "../../../store/slices/userSettings/userSettingsSlice";

import fragment from "./colourClashCircleEffect.frag";
import {
  deathLutForSpriteOption,
  teleportingLutForSpriteOption,
} from "./lutTexture/stdLuts/lutForSpriteOption";

type ColourClashCircleEffectOptions = {
  /**
   * Size of each attribute block in pixels (e.g., 8 for spectacular 8x8 blocks)
   */
  blockSize: number;

  spriteOption: SpriteOption;
  spritesheetMeta: SpritesheetMetadata;

  /** true = death effect (uses deactivated palette LUT), false = teleporting effect (uses spectrum LUT) */
  isDeath: boolean;

  /** multiplier on uProgress for the ZX colour-clash circle, controlling how fast it closes relative to the overall effect duration */
  zxCircleSpeed?: number;
  /** constant subtracted from the ZX circle's scaled progress — higher values delay when the circle starts closing */
  zxCircleOffset?: number;
  /** floor for the ZX circle radius — 0 lets it close completely, higher values leave a hole in the centre */
  zxCircleMinSize?: number;
  /** constant subtracted from uProgress for the darkening circle — higher values delay when darkening begins */
  blackCircleOffset?: number;
  /** floor for the darkening circle radius — prevents it from fully closing, leaving final fade-out to the global darkening */
  blackCircleMinSize?: number;
  /** quantisation step for uProgress inside the shader — larger values simulate a lower frame rate for the effect */
  timeStep?: number;
  /** how much darkening the outer circle applies — 1.0 fades fully to black, lower values leave some room detail visible */
  blackCircleDarkening?: number;
  /** edge softness of the darkening circle — 0 gives a hard edge, higher values soften it */
  blackCircleFeathering?: number;
  /** exponent for the distance-to-centre curve — must be positive. 1.0 gives linear closing rate, higher values (e.g. 3.0) close the outer region faster while the centre lingers, values below 1.0 (e.g. 0.5) do the opposite: the outer region lingers and the centre closes faster */
  distancePower?: number;
};

export class ColourClashCircleEffectFilter extends Filter {
  #uniforms: {
    uBlockSize: number;
    uBlackPoint: number;
    uProgress: number;
    uCentreX: number;
    uCentreY: number;
    uTimeStep: number;
  };

  constructor({
    blockSize,
    spriteOption,
    spritesheetMeta,
    isDeath,
    zxCircleSpeed = 1.5,
    zxCircleOffset = -0.3,
    zxCircleMinSize = 0.0,
    blackCircleOffset = -0.2,
    blackCircleMinSize = 0.33,
    // small default value restricts to 10,000 fps (effectively no quantisation),
    // higher values create low fps effect
    timeStep = 0.0001,
    blackCircleDarkening = 1.0,
    blackCircleFeathering = 0.4,
    distancePower = 3.0,
  }: ColourClashCircleEffectOptions) {
    super({
      glProgram: GlProgram.from({
        vertex: defaultFilterVert,
        fragment,
        name: "colour-clash-circle-effect-filter",
      }),
      resources: {
        attributeBlockUniforms: {
          uBlockSize: {
            value: blockSize,
            type: "f32",
          },
          uBlackPoint: {
            value: spritesheetMeta.teleporterEffectBlackPoint,
            type: "f32",
          },
          /** progress uniform 0 for just starting, 1 for finished */
          uProgress: {
            value: 0,
            type: "f32",
          },
          uCentreX: {
            value: 0,
            type: "f32",
          },
          uCentreY: {
            value: 0,
            type: "f32",
          },
          uZxCircleSpeed: {
            value: zxCircleSpeed,
            type: "f32",
          },
          uZxCircleOffset: {
            value: zxCircleOffset,
            type: "f32",
          },
          uZxCircleMinSize: {
            value: zxCircleMinSize,
            type: "f32",
          },
          uBlackCircleOffset: {
            value: blackCircleOffset,
            type: "f32",
          },
          uBlackCircleMinSize: {
            value: blackCircleMinSize,
            type: "f32",
          },
          uTimeStep: {
            value: timeStep,
            type: "f32",
          },
          uBlackCircleDarkening: {
            value: blackCircleDarkening,
            type: "f32",
          },
          uBlackCircleFeathering: {
            value: blackCircleFeathering,
            type: "f32",
          },
          uDistancePower: {
            value: distancePower,
            type: "f32",
          },
        },
        uLut: (isDeath ?
          deathLutForSpriteOption(spriteOption)
        : teleportingLutForSpriteOption(spriteOption)
        ).source,
      },
    });

    this.#uniforms = this.resources.attributeBlockUniforms.uniforms;
  }

  set progress(value: number) {
    this.#uniforms.uProgress = value;
  }
  set centreX(value: number) {
    this.#uniforms.uCentreX = value;
  }
  set centreY(value: number) {
    this.#uniforms.uCentreY = value;
  }
  set timeStep(value: number) {
    this.#uniforms.uTimeStep = value;
  }
}
