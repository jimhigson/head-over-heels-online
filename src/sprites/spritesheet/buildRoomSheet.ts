import {
  Color,
  Container,
  type Filter,
  Rectangle,
  type RenderTexture,
  Sprite,
  Spritesheet,
  Texture,
} from "pixi.js";

import { speccySpritesheetMeta } from "../../../gfx/spritesheetMeta/speccySpritesheetMeta";
import { PaletteSwapFilter } from "../../game/render/filters/PaletteSwapFilter";
import { binariseAlphaFilter } from "../../game/render/filters/shadows/binariseAlphaFilter";
import { hardenChannelsFilter } from "../../game/render/filters/shadows/hardenChannelsFilter";
import { objectEntriesIter } from "../../utils/entries";
import { resolveSwops } from "../../utils/palette/palette";
import { paletteBlockstack } from "../palette/spritesheetPalette";
import { applySpritesheetFlips } from "./applySpritesheetFlips";
import {
  type AppSpritesheet,
  type AppSpritesheetDataWithVariants,
  type AppSpritesheetWithVariants,
  withVariantsBaked,
} from "./AppSpritesheet";
import { reifyTextureIds } from "./reifyTextureIds";
import { reuseOrCreateSheetTarget } from "./reuseOrCreateSheetTarget";
import { roomSpritesheetTextureSwops } from "./roomSpritesheetTextureSwops";
import { spritesheetSize } from "./spritesheetData/makeBaseSpritesheetData";
import { makeSpritesheetData } from "./spritesheetData/makeSpritesheetData";
import { packAllFrames } from "./spritesheetData/packAllFrames";
import { spritesheetMetas } from "./spritesheetData/spritesheetMetaData";
import {
  arcadeButtonSuffixes,
  isVariantId,
  variantIdSuffix,
  type VariantSuffix,
  type VariantTextureId,
} from "./spritesheetData/variantSpritesheetData";
import { type VariantBuildContext } from "./VariantBuildContext";
import {
  bakeableVariantSuffixes,
  filtersForPasses,
  type StripGroup,
  stripGroupOf,
  stripGroupPasses,
} from "./variantSwopRecipes";

const blitKey = "blit";
const shadowBlitKey = "shadow:blit";
const shadowBinariseKey = "shadow:binarise";
const shadowMaskBlitKey = "shadowMask:blit";
const shadowMaskHardenKey = "shadowMask:harden";
const variantKeyPrefix = "variant:";
const baseKeyPrefix = "base:";

/**
 * in ZX/uncolourised mode every sprite is coloured at render time by a per-room
 * tint, so the whole sheet is swopped to near-white and the shadows to full ink
 */
const uncolourisedAmbient = {
  lutType: "voronoi" as const,
  swops: resolveSwops(paletteBlockstack, {
    pureBlack: new Color(0x00_00_00),
    shadow: new Color(0xff_ff_ff),
    redShadow: new Color(0xff_ff_ff),
  }),
};

/**
 * Bakes the current room's spritesheet: every frame (base and variant) is
 * copied into a freshly-packed layout and baked through the maskless filter
 * chain its bake group needs. No frame is modified in place and no mask is used
 * - each group's container holds only the frames that share its recipe.
 */
export const buildRoomSheet = (
  context: VariantBuildContext,
  /** the preprocessed original sheet (shadows already alpha-encoded) to bake from */
  baseTexture: Texture,
  /** the previous room sheet's texture, re-baked into */
  previousTarget: RenderTexture | undefined,
): { sheet: AppSpritesheetWithVariants; target: RenderTexture } => {
  const { pixiRenderer, spriteOption, spritesheetMetaData } = context;
  const { name: spriteOptionName, uncolourised } = spriteOption;

  const meta = spritesheetMetas[spriteOptionName];
  const data = makeSpritesheetData(meta);

  const { ambient, textureSpecific = [] } =
    uncolourised ?
      { ambient: [uncolourisedAmbient], textureSpecific: [] }
    : roomSpritesheetTextureSwops(
        context.roomScenery,
        context.roomColor,
        spriteOptionName,
      );

  // arcade buttons are HUD (never reached by the render-time tint), so in
  // uncolourised mode they bake at the ZX hues on the speccy meta
  const variantContext: VariantBuildContext =
    uncolourised ?
      { ...context, spritesheetMetaData: speccySpritesheetMeta }
    : context;

  const tsMatchSets = textureSpecific.map(
    (ts) => new Set<string>(reifyTextureIds(ts.textureIds, data.frames)),
  );
  const tsDodge = textureSpecific.map((ts) => ts.dodgeAmbient === true);

  // uncolourised bakes only the arcade buttons; every other variant is invisible
  // (tinted at render time) so stays aliased to its base rect
  const bakeable: Set<VariantSuffix> =
    uncolourised ?
      new Set<VariantSuffix>(arcadeButtonSuffixes)
    : bakeableVariantSuffixes(spritesheetMetaData);

  const baseIdOfVariant = (id: VariantTextureId): string =>
    id.slice(0, -(variantIdSuffix(id).length + 1));

  const groupKeyOf = (id: string): null | string => {
    if (isVariantId(id)) {
      const suffix = variantIdSuffix(id);
      if (!bakeable.has(suffix)) {
        return null;
      }
      const group = stripGroupOf(suffix, id);
      if (stripGroupPasses(group, variantContext) === undefined) {
        return null;
      }
      return `${variantKeyPrefix}${group}`;
    }
    if (id.startsWith("shadow.")) {
      return uncolourised ? shadowBinariseKey : shadowBlitKey;
    }
    if (id.startsWith("shadowMask.")) {
      return uncolourised ? shadowMaskHardenKey : shadowMaskBlitKey;
    }
    if (id.startsWith("hud.")) {
      return blitKey;
    }
    const matched: number[] = [];
    for (let i = 0; i < tsMatchSets.length; i++) {
      if (tsMatchSets[i].has(id)) {
        matched.push(i);
      }
    }
    const applyAmbient = !matched.some((i) => tsDodge[i]);
    return `${baseKeyPrefix}${matched.join(",")}:${applyAmbient ? "a" : ""}`;
  };

  const pack = packAllFrames(data.frames, groupKeyOf, spritesheetSize.w);

  // re-point every frame at its packed dest; an aliased variant takes its base's
  const frames = {} as AppSpritesheetDataWithVariants["frames"];
  for (const [id, entry] of objectEntriesIter(data.frames)) {
    const dest =
      pack.rects[id] ?? pack.rects[baseIdOfVariant(id as VariantTextureId)];
    frames[id] = { ...entry, frame: { ...entry.frame, x: dest.x, y: dest.y } };
  }
  const packedData: AppSpritesheetDataWithVariants = { ...data, frames };

  // any cleanEdge upscale baked into the original sheet is carried through to
  // the room sheet: the bake's blits and filter passes all run at this
  // backing-store resolution over the same logical layout
  const bakeResolution = baseTexture.source.resolution;

  const target = reuseOrCreateSheetTarget(
    previousTarget,
    pack.height,
    bakeResolution,
  );

  // shared (destroyed once, after all groups): the ambient and texture-specific
  // palette swops, reused by every base recipe that references them
  const ambientFilters = filtersForPasses(ambient);
  const tsFilters = textureSpecific.map(
    // clipToViewport false: baked off-screen, must not be cropped to the viewport
    (ts) =>
      new PaletteSwapFilter(
        { swops: ts.swops, lutType: "sparse" },
        Texture.WHITE,
        false,
      ),
  );

  // the filters for a bake group, plus any that are private to this group (a
  // variant group builds fresh filters that must be destroyed after its bake)
  const filtersForGroup = (
    groupKey: string,
  ): { filters: Filter[]; disposable: PaletteSwapFilter[] } => {
    if (
      groupKey === blitKey ||
      groupKey === shadowBlitKey ||
      groupKey === shadowMaskBlitKey
    ) {
      return { filters: [], disposable: [] };
    }
    if (groupKey === shadowBinariseKey) {
      return { filters: [binariseAlphaFilter], disposable: [] };
    }
    if (groupKey === shadowMaskHardenKey) {
      return { filters: [hardenChannelsFilter], disposable: [] };
    }
    if (groupKey.startsWith(variantKeyPrefix)) {
      const group = groupKey.slice(variantKeyPrefix.length) as StripGroup;
      const disposable = filtersForPasses(
        stripGroupPasses(group, variantContext)!,
      );
      return { filters: disposable, disposable };
    }
    // base recipe: `base:INDICES:a?`
    const [, indices, applyAmbient] = groupKey.split(":");
    const tsChain =
      indices === "" ? [] : indices.split(",").map((i) => tsFilters[Number(i)]);
    return {
      filters: applyAmbient === "a" ? [...tsChain, ...ambientFilters] : tsChain,
      disposable: [],
    };
  };

  const cellsByGroup = new Map<string, typeof pack.cells>();
  for (const cell of pack.cells) {
    const existing = cellsByGroup.get(cell.groupKey);
    if (existing === undefined) {
      cellsByGroup.set(cell.groupKey, [cell]);
    } else {
      existing.push(cell);
    }
  }

  const cellTextures: Texture[] = [];
  let firstGroup = true;
  for (const [groupKey, cells] of cellsByGroup) {
    const { filters, disposable } = filtersForGroup(groupKey);
    const container = new Container();
    for (const cell of cells) {
      const cellTexture = new Texture({
        source: baseTexture.source,
        frame: new Rectangle(
          cell.source.x,
          cell.source.y,
          cell.source.w,
          cell.source.h,
        ),
      });
      cellTextures.push(cellTexture);
      const sprite = new Sprite(cellTexture);
      sprite.position.set(cell.dest.x, cell.dest.y);
      // filter each cell individually: the palette-swop filter loses detail when
      // applied to a large or sparsely-filled texture (its power-of-two filter
      // temp then samples fractionally), so each frame is filtered in its own
      // small pass
      sprite.filters = filters;
      container.addChild(sprite);
    }

    // the first render clears the (reused) target of the previous room's pixels
    pixiRenderer.render({ container, target, clear: firstGroup });
    firstGroup = false;

    for (const filter of disposable) {
      filter.destroy({
        destroyLutTexture: true,
        destroyMask: false,
        destroyPrograms: false,
      });
    }
    container.destroy({ children: true });
  }

  for (const filter of [...ambientFilters, ...tsFilters]) {
    filter.destroy({
      destroyLutTexture: true,
      destroyMask: false,
      destroyPrograms: false,
    });
  }
  for (const cellTexture of cellTextures) {
    // false = keep the shared base texture source
    cellTexture.destroy(false);
  }

  const sheet = new Spritesheet(target, packedData) as AppSpritesheet;
  // pixi's Spritesheet applies the sheet data's meta.scale (1) to the texture
  // source, wiping any cleanEdge bake resolution - restore it before parsing
  // so frame UVs are computed against the logical 1x size:
  sheet.textureSource.resolution = bakeResolution;
  sheet.parseSync();
  sheet.textureSource.scaleMode = "nearest";
  sheet.spriteOptionName = spriteOptionName;
  sheet.ambient = ambient;
  sheet.spritesheetMeta = meta;
  applySpritesheetFlips(sheet);

  return { sheet: withVariantsBaked(sheet), target };
};
