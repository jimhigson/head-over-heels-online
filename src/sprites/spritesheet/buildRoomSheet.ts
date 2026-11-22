import {
  Container,
  type Filter,
  Rectangle,
  type RenderTexture,
  Sprite,
  Texture,
} from "pixi.js";

import { spritesheetSideLength } from "../../../gfx/spritesheetMeta/spritesheetSize.macro.ts" with { type: "macro" };
import { PaletteSwapFilter } from "../../game/render/filters/PaletteSwapFilter";
import { binariseAlphaFilter } from "../../game/render/filters/shadows/binariseAlphaFilter";
import { hardenChannelsFilter } from "../../game/render/filters/shadows/hardenChannelsFilter";
import { objectEntriesIter } from "../../utils/entries";
import {
  type AppSpritesheetDataWithVariants,
  type AppSpritesheetWithVariants,
  withVariantsBaked,
} from "./AppSpritesheet";
import { reifyTextureIds } from "./reifyTextureIds";
import type { FrameRect } from "./repackSpritesheetForSmoothUpscale";
import { reuseOrCreateRoomSheetTexture } from "./reuseOrCreateRoomSheetTexture";
import { roomSpritesheetTextureSwops } from "./roomSpritesheetTextureSwops";
import {
  makeSpritesheetData,
  type TextureId,
} from "./spritesheetData/makeSpritesheetData";
import { packAllFrames } from "./spritesheetData/packAllFrames";
import {
  spritesheetArtName,
  spritesheetMetas,
} from "./spritesheetData/spritesheetMetaData";
import {
  arcadeButtonSuffixes,
  isVariantId,
  variantIdSuffix,
  type VariantSuffix,
  type VariantTextureId,
} from "./spritesheetData/variantSpritesheetData";
import { spritesheetOverBakedTexture } from "./spritesheetOverBakedTexture";
import type { VariantBuildContext } from "./VariantBuildContext";
import {
  bakeableVariantSuffixes,
  filtersForPasses,
  type StripGroup,
  stripGroupOf,
  stripGroupPasses,
} from "./variantSwopRecipes";
import { withRepackedRects } from "./withRepackedRects";

const blitKey = "blit";
const shadowBlitKey = "shadow:blit";
const shadowBinariseKey = "shadow:binarise";
const shadowMaskBlitKey = "shadowMask:blit";
const shadowMaskHardenKey = "shadowMask:harden";
const variantKeyPrefix = "variant:";
const baseKeyPrefix = "base:";

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
  /**
   * where each frame's art lives in the base texture, when that sheet was
   * composed for the upscale rather than taken straight from the authored
   * image - the composition lays the frames out afresh, so without these the
   * bake would read every one of them from the wrong place
   */
  repackedFrameRects?: ReadonlyMap<TextureId, FrameRect>,
): { sheet: AppSpritesheetWithVariants; target: RenderTexture } => {
  const { pixiRenderer, spritesheetMetaData } = context;
  const uncolourised = spritesheetMetaData.isUncolourisedOf !== undefined;
  const artName = spritesheetArtName(spritesheetMetaData);

  const artSpritesheetMeta = spritesheetMetas[artName];
  const data: AppSpritesheetDataWithVariants = withRepackedRects(
    makeSpritesheetData(artSpritesheetMeta),
    repackedFrameRects,
  );

  const { ambient, textureSpecific = [] } = roomSpritesheetTextureSwops(
    context.roomScenery,
    context.roomColor,
    spritesheetMetaData.name,
  );

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
      if (stripGroupPasses(group, context) === undefined) {
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

  const pack = packAllFrames(data.frames, groupKeyOf, spritesheetSideLength);

  // every frame at its packed dest; an aliased variant takes its base's
  const packedData = withRepackedRects(
    data,
    new Map(
      objectEntriesIter(data.frames).map(([id]) => [
        id,
        pack.rects[id] ?? pack.rects[baseIdOfVariant(id as VariantTextureId)],
      ]),
    ),
  );

  // any upscale baked into the original sheet is carried through to
  // the room sheet: the bake's blits and filter passes all run at this
  // backing-store resolution over the same logical layout
  const spritesheetSmoothUpscale = baseTexture.source.resolution;

  const target = reuseOrCreateRoomSheetTexture(
    previousTarget,
    pack.height,
    spritesheetSmoothUpscale,
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
      const disposable = filtersForPasses(stripGroupPasses(group, context)!);
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

  const sheet = spritesheetOverBakedTexture(
    target,
    packedData,
    artName,
    artSpritesheetMeta,
  );
  sheet.ambient = ambient;

  return { sheet: withVariantsBaked(sheet), target };
};
