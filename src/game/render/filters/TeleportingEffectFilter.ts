import { defaultFilterVert, Filter, GlProgram } from "pixi.js";

import type { SpritesheetMetadata } from "../../../sprites/spritesheet/spritesheetData/spritesheetMetaData";
import type { SpriteOption } from "../../../store/slices/gameMenus/gameMenusSlice";

import { lutForSpriteOption } from "./lutTexture/stdLuts/lutForSpriteOption";
import fragment from "./teleportingEffect.frag";

const glProgram = GlProgram.from({
  vertex: defaultFilterVert,
  fragment,
  name: "attribute-block-filter",
});

type TeleportingEffectOptions = {
  /**
   * Size of each attribute block in pixels (e.g., 8 for spectacular 8x8 blocks)
   */
  blockSize: number;

  spriteOption: SpriteOption;
  spritesheetMeta: SpritesheetMetadata;
};

export class TeleportingEffectFilter extends Filter {
  #uniforms: {
    uBlockSize: number;
    uBlackPoint: number;
    uProgress: number;
    uCentreX: number;
    uCentreY: number;
  };

  constructor({
    blockSize,
    spriteOption,
    spritesheetMeta,
  }: TeleportingEffectOptions) {
    super({
      glProgram,
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
        },
        uLut: lutForSpriteOption(spriteOption).source,
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
}
