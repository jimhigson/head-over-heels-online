import {
  type Renderer,
  RenderTexture,
  Sprite,
  Spritesheet,
  Texture,
} from "pixi.js";

import type { ZxSpectrumRoomColour } from "../../../originalGame";
import type { SpriteOption } from "../../../store/slices/userSettings/userSettingsSlice";
import type { SceneryName } from "../../planets";
import type { VariantBuildContext } from "../VariantBuildContext";

import blockStackSpritesheetUrl from "../../../../gfx/sprites.webp";
import toppySpritesheetUrl from "../../../../gfx/spritesToppy.webp";
import { type PaletteSwopSpec } from "../../../game/render/filters/PaletteSwapFilter";
import { ShadowPreprocessFilter } from "../../../game/render/filters/shadows/ShadowPreprocessFilter";
import { selectSpritesheetOverrideBlobUrl } from "../../../store/slices/spritesheetOverrideSlice";
import { store } from "../../../store/store";
import { detectDeviceType } from "../../../utils/detectEnv/detectDeviceType";
import { stripIccProfileWebp } from "../../../utils/image/stripIccProfileWebp";
import { black, renderMaskTexture, white } from "../renderMaskTexture";
import {
  makeSpritesheetData,
  type TextureId,
} from "../spritesheetData/makeSpritesheetData";
import {
  type SpritesheetMetadata,
  spritesheetMetaForOption,
  spritesheetMetas,
} from "../spritesheetData/spritesheetMetaData";
import { buildCurrentRoomSpritesheet } from "./currentRoomSpritesheetVariant";
import { buildDeactivatedSpritesheet } from "./deactivatedSpritesheetVariant";
import { buildDoughnuttedSpritesheet } from "./doughnuttedSpritesheetVariant";
import { buildSceneryPlayerSpritesheet } from "./sceneryPlayerSpritesheetVariant";
import { buildUncolourisedSpritesheet } from "./uncolourisedSpritesheetVariant";

export type AppSpritesheetData = ReturnType<typeof makeSpritesheetData>;
export type AppSpritesheet = Spritesheet<AppSpritesheetData> & {
  spriteOption: LoadableSpriteOption;
  ambient?: PaletteSwopSpec[];
  spritesheetMeta: SpritesheetMetadata;
};

export type LoadableSpriteOption = SpriteOption["name"];

const destroySpritesheet = (sheet: AppSpritesheet | undefined) => {
  if (sheet !== undefined) {
    sheet.textureSource.destroy();
    sheet.destroy(true);
  }
};

export class SpritesheetVariants {
  #loadedTexture: Texture | undefined;
  #loadImageAbortController: AbortController | undefined;
  #spriteOption: LoadableSpriteOption | undefined;
  #originalSpritesheet: AppSpritesheet | undefined;
  #forCurrentRoomSpritesheet: AppSpritesheet | undefined;
  #deactivatedSpritesheet: AppSpritesheet | undefined;
  #doughnuttedSpritesheet: AppSpritesheet | undefined;
  #sceneryPlayerSpritesheet: AppSpritesheet | undefined;
  #uncolourisedSpritesheet: AppSpritesheet | undefined;

  get #baseTexture(): Texture {
    if (this.#loadedTexture === undefined) {
      throw new Error("spritesheet texture not loaded");
    }
    return this.#loadedTexture;
  }

  isTextureLoaded(spriteOption: LoadableSpriteOption): boolean {
    return this.#spriteOption === spriteOption;
  }

  rebuild(
    pixiRenderer: Renderer,
    roomScenery: SceneryName,
    roomColor: ZxSpectrumRoomColour,
    spriteOption: SpriteOption,
  ): void {
    if (this.#originalSpritesheet?.spriteOption !== spriteOption.name) {
      destroySpritesheet(this.#originalSpritesheet);
      this.#originalSpritesheet = this.#buildOriginal(
        pixiRenderer,
        spriteOption.name,
      );
    }

    const bt = this.#baseTexture;
    const orig = this.#originalSpritesheet;

    if (spriteOption.uncolourised) {
      this.#destroyColourisedVariants();
      destroySpritesheet(this.#uncolourisedSpritesheet);
      this.#uncolourisedSpritesheet = buildUncolourisedSpritesheet(
        pixiRenderer,
        bt,
        orig,
      );
    } else {
      destroySpritesheet(this.#uncolourisedSpritesheet);
      this.#uncolourisedSpritesheet = undefined;

      const context: VariantBuildContext = {
        pixiRenderer,
        roomScenery,
        roomColor,
        spriteOption: spriteOption.name,
        spritesheetMetaData: spritesheetMetaForOption(
          spriteOption,
        ) as SpritesheetMetadata,
      };

      this.#destroyColourisedVariants();
      this.#forCurrentRoomSpritesheet = buildCurrentRoomSpritesheet(
        context,
        bt,
        orig,
      );
      this.#deactivatedSpritesheet = buildDeactivatedSpritesheet(
        context,
        bt,
        orig,
      );
      this.#doughnuttedSpritesheet = buildDoughnuttedSpritesheet(
        context,
        bt,
        orig,
      );
      this.#sceneryPlayerSpritesheet = buildSceneryPlayerSpritesheet(
        context,
        bt,
        orig,
      );
    }
  }

  get originalSpritesheet(): AppSpritesheet {
    if (this.#originalSpritesheet === undefined) {
      throw new Error(
        "originalSpritesheet not available — rebuild() not yet called",
      );
    }
    return this.#originalSpritesheet;
  }

  currentMainSpritesheet(
    activated: boolean = true,
    doughnutted: boolean = false,
  ): AppSpritesheet {
    if (this.#uncolourisedSpritesheet !== undefined) {
      return this.#uncolourisedSpritesheet;
    }
    const sheet =
      doughnutted ? this.#doughnuttedSpritesheet
      : activated ? this.#forCurrentRoomSpritesheet
      : this.#deactivatedSpritesheet;
    if (sheet === undefined) {
      throw new Error(
        "currentMainSpritesheet not available — rebuild() not yet called",
      );
    }
    return sheet;
  }

  get shadowSpritesheet(): AppSpritesheet {
    return this.#uncolourisedSpritesheet ?? this.originalSpritesheet;
  }

  get spritesheetForCurrentRoom(): AppSpritesheet {
    if (this.#forCurrentRoomSpritesheet === undefined) {
      throw new Error(
        "spritesheetForCurrentRoom not available — rebuild() not yet called or in uncolourised mode",
      );
    }
    return this.#forCurrentRoomSpritesheet;
  }

  get sceneryPlayerSpritesheet(): AppSpritesheet {
    if (this.#uncolourisedSpritesheet !== undefined) {
      return this.#uncolourisedSpritesheet;
    }
    if (this.#sceneryPlayerSpritesheet === undefined) {
      throw new Error(
        "sceneryPlayerSpritesheet not available — rebuild() not yet called or in uncolourised mode",
      );
    }
    return this.#sceneryPlayerSpritesheet;
  }

  async loadImage(spriteOption: LoadableSpriteOption): Promise<void> {
    if (this.#spriteOption === spriteOption) {
      return;
    }

    this.#loadImageAbortController?.abort();
    const abortController = new AbortController();
    this.#loadImageAbortController = abortController;
    const { signal } = abortController;

    const overrideBlobUrl = selectSpritesheetOverrideBlobUrl(
      store.getState(),
      spriteOption,
    );
    const url =
      overrideBlobUrl ??
      (spriteOption === "BlockStack" ?
        blockStackSpritesheetUrl
      : toppySpritesheetUrl);
    let strippedImageObjectUrl: string | undefined = undefined;

    try {
      const response = await fetch(url, { signal });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status} - ${response.statusText}`);
      }
      const buffer = await response.arrayBuffer();
      const strippedBuffer = stripIccProfileWebp(buffer);
      const blob = new Blob([strippedBuffer], { type: "image/webp" });

      strippedImageObjectUrl = URL.createObjectURL(blob);
      const img = new Image();
      img.src = strippedImageObjectUrl;
      await img.decode();

      if (signal.aborted) {
        return;
      }

      this.#loadedTexture?.destroy(true);
      this.#loadedTexture = Texture.from(img);
      this.#spriteOption = spriteOption;
      this.#loadImageAbortController = undefined;
    } catch (e) {
      if (signal.aborted) {
        return;
      }
      if (detectDeviceType() === "server") {
        console.warn(
          "did not load textures - we are running under node so will use Texture.EMPTY",
        );
        this.#loadedTexture = Texture.EMPTY;
        this.#spriteOption = spriteOption;
        this.#loadImageAbortController = undefined;
      } else {
        throw new Error(`failed to load spritesheet from ${url}`, {
          cause: e,
        });
      }
    } finally {
      if (strippedImageObjectUrl !== undefined) {
        URL.revokeObjectURL(strippedImageObjectUrl);
      }
    }
  }

  #buildOriginal(
    pixiRenderer: Renderer,
    spriteOption: LoadableSpriteOption,
  ): AppSpritesheet {
    if (this.#loadedTexture === undefined) {
      throw new Error("cannot build original spritesheet before texture load");
    }

    const spritesheetMeta = spritesheetMetas[spriteOption];
    const spriteSheetData = makeSpritesheetData(spritesheetMeta);

    const shadowSpritesMask = renderMaskTexture(pixiRenderer, {
      rects: {
        textureIds: (candidate: TextureId) => candidate.startsWith("shadow."),
        color: white,
        spritesheetDataFrames: spriteSheetData.frames,
      },
      clearColour: black,
    });

    const preprocessShadowTexturesFilter = new ShadowPreprocessFilter(
      "invertRedToAlpha",
      shadowSpritesMask,
    );

    const sprite = new Sprite(this.#loadedTexture);
    sprite.filters = preprocessShadowTexturesFilter;

    const processedTexture = RenderTexture.create({
      width: this.#loadedTexture.width,
      height: this.#loadedTexture.height,
    });

    pixiRenderer.render({
      container: sprite,
      target: processedTexture,
    });

    const spriteSheet = new Spritesheet(
      processedTexture,
      spriteSheetData,
    ) as AppSpritesheet;
    spriteSheet.parseSync();
    spriteSheet.textureSource.scaleMode = "nearest";
    spriteSheet.spriteOption = spriteOption;
    spriteSheet.spritesheetMeta = spritesheetMeta;

    sprite.destroy();
    shadowSpritesMask.destroy(true);

    return spriteSheet;
  }

  #destroyColourisedVariants() {
    destroySpritesheet(this.#forCurrentRoomSpritesheet);
    destroySpritesheet(this.#deactivatedSpritesheet);
    destroySpritesheet(this.#doughnuttedSpritesheet);
    destroySpritesheet(this.#sceneryPlayerSpritesheet);
    this.#forCurrentRoomSpritesheet = undefined;
    this.#deactivatedSpritesheet = undefined;
    this.#doughnuttedSpritesheet = undefined;
    this.#sceneryPlayerSpritesheet = undefined;
  }

  destroy() {
    this.#loadImageAbortController?.abort();
    this.#loadImageAbortController = undefined;
    this.#loadedTexture?.destroy(true);
    this.#loadedTexture = undefined;
    this.#spriteOption = undefined;
    destroySpritesheet(this.#originalSpritesheet);
    this.#originalSpritesheet = undefined;
    this.#destroyColourisedVariants();
    destroySpritesheet(this.#uncolourisedSpritesheet);
    this.#uncolourisedSpritesheet = undefined;
  }
}
