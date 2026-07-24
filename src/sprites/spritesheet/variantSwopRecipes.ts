import { Texture } from "pixi.js";

import {
  PaletteSwapFilter,
  type PaletteSwopSpec,
} from "../../game/render/filters/PaletteSwapFilter";
import { replacementColours } from "../../game/render/gameColours/gameColours";
import { halfbrite } from "../../utils/colour/halfbrite";
import { emptyObject } from "../../utils/empty";
import {
  resolveNamedColourSwops,
  resolveSwops,
} from "../../utils/palette/palette";
import { omitArray } from "../../utils/pick";
import {
  maybeDimPalette,
  paletteBlockstack,
  paletteBlockstackDim,
} from "../palette/spritesheetPalette";
import {
  blockstackAmbienceNamedSwops,
  blockstackAmbienceSwops,
} from "./roomSpritesheetTextureSwops";
import {
  arcadeButtonActionOfSuffix,
  type ArcadeButtonSuffix,
  arcadeButtonSuffixes,
  doorHueOfSuffix,
  type DoorHueSuffix,
  doorHueSuffixes,
  type VariantSuffix,
} from "./spritesheetData/variantSpritesheetData";
import { type VariantBuildContext } from "./VariantBuildContext";

const isDoorHueSuffix = (group: string): group is DoorHueSuffix =>
  (doorHueSuffixes as readonly string[]).includes(group);

const isArcadeButtonSuffix = (group: string): group is ArcadeButtonSuffix =>
  (arcadeButtonSuffixes as readonly string[]).includes(group);

/**
 * the variant suffixes this sheet can actually re-bake: those whose swops the
 * meta declares. Cells of other suffixes stay unbaked and their frame entries
 * stay aliased to the base rects
 */
export const bakeableVariantSuffixes = (
  spritesheetMetaData: VariantBuildContext["spritesheetMetaData"],
): Set<VariantSuffix> => {
  const bakeable = new Set<VariantSuffix>();
  const { swops } = spritesheetMetaData;
  if (swops?.deactivated !== undefined) {
    bakeable.add("deactivated");
  }
  if (swops?.doughnutted !== undefined) {
    bakeable.add("doughnutted");
  }
  if (swops?.mirrorReflection !== undefined) {
    bakeable.add("mirrorReflection");
  }
  if (swops?.sceneryPlayer !== undefined) {
    bakeable.add("sceneryPlayer");
  }
  // door destination-colour recolours derive from the game colour system, not
  // per-sheet swop declarations - bakeable on every sheet with a room bake:
  for (const suffix of doorHueSuffixes) {
    bakeable.add(suffix);
  }
  for (const suffix of arcadeButtonSuffixes) {
    bakeable.add(suffix);
  }
  return bakeable;
};

/**
 * the cells are grouped so each group can take one homogeneous filter chain:
 * the deactivated variant preserves each playable's characteristic colours on
 * their own sprites, so head/heels cells form their own groups
 */
export type StripGroup = `${VariantSuffix}${".head" | ".heels" | ""}`;

/** the strip group a variant id belongs to, splitting deactivated by playable */
export const stripGroupOf = (
  suffix: VariantSuffix,
  /** an id in the group, to split deactivated head/heels */
  id: string,
): StripGroup => {
  if (suffix === "deactivated") {
    if (id.startsWith("head.")) {
      return "deactivated.head";
    }
    if (id.startsWith("heels.")) {
      return "deactivated.heels";
    }
  }
  return suffix;
};

/**
 * the ordered ambient palette-swop passes to bake a strip group with, in the
 * given room - the variant's own swops, then the dim palette in dimmed rooms
 * (deactivated instead takes the room ambience in non-dimmed rooms).
 * Undefined = this sheet does not bake this group.
 */
export const stripGroupPasses = (
  group: StripGroup,
  {
    roomScenery,
    roomColor,
    spritesheetMetaData,
  }: Pick<
    VariantBuildContext,
    "roomColor" | "roomScenery" | "spritesheetMetaData"
  >,
): PaletteSwopSpec[] | undefined => {
  const { palette, paletteDim, swops } = spritesheetMetaData;

  const dimmed = roomColor.shade === "dimmed";
  const dimPass: PaletteSwopSpec | undefined =
    dimmed && paletteDim !== undefined ?
      { swops: resolveSwops(palette, paletteDim), lutType: "sparse" }
    : undefined;

  if (isArcadeButtonSuffix(group)) {
    // recolour the placeholder button art to this action's colour, dimmed per room:
    const buttonPalette = maybeDimPalette(spritesheetMetaData, dimmed);
    const colour =
      buttonPalette[
        spritesheetMetaData.buttonColours[arcadeButtonActionOfSuffix(group)]
      ];
    return [
      {
        swops: resolveSwops(paletteBlockstack, {
          replaceLight: colour,
          replaceDark: halfbrite(colour, 0.66),
          pureBlack: buttonPalette[spritesheetMetaData.effectColours.outline],
        }),
        lutType: "sparse",
      },
    ];
  }

  if (isDoorHueSuffix(group)) {
    // a door frame recoloured for the room its door leads to. One merged pass:
    // the room's ambience/dim replacements cover the non-placeholder pixels,
    // and the destination replacements are spread last so the placeholder
    // colours map to the destination room's colours
    const destinationHue = doorHueOfSuffix(group);
    // moonbase doors are illuminated:
    const trend = roomScenery === "moonbase" ? "light-mid" : "light-dark";
    return [
      {
        swops: resolveSwops(paletteBlockstack, {
          ...(spritesheetMetaData.name === "BlockStack" ?
            dimmed ? paletteBlockstackDim
            : blockstackAmbienceNamedSwops(roomScenery, roomColor)
          : emptyObject),
          ...replacementColours(
            destinationHue,
            dimmed && paletteDim !== undefined,
            trend,
          ),
        }),
        lutType: "sparse",
      },
    ];
  }

  switch (group) {
    case "deactivated":
    case "deactivated.head":
    case "deactivated.heels": {
      const deactivated = swops?.deactivated;
      if (deactivated === undefined) {
        return undefined;
      }
      const ambientNamed = resolveNamedColourSwops(
        deactivated.colours,
        palette,
      );
      const preserved =
        group === "deactivated.head" ?
          (deactivated.playableDeactivatedPreserveColours?.head ?? [])
        : group === "deactivated.heels" ?
          (deactivated.playableDeactivatedPreserveColours?.heels ?? [])
        : undefined;
      const named =
        preserved === undefined ? ambientNamed : (
          omitArray(ambientNamed, preserved)
        );
      const variantPass: PaletteSwopSpec = {
        swops: resolveSwops(palette, named),
        lutType: "sparse",
      };
      return [
        variantPass,
        ...(dimPass !== undefined ? [dimPass]
        : dimmed ? []
        : [blockstackAmbienceSwops(roomScenery, roomColor)]),
      ];
    }
    case "doughnutted":
    case "mirrorReflection":
    case "sceneryPlayer": {
      const colours = swops?.[group]?.colours;
      if (colours === undefined) {
        return undefined;
      }
      const variantPass: PaletteSwopSpec = {
        swops: resolveSwops(palette, resolveNamedColourSwops(colours, palette)),
        lutType: "sparse",
      };
      return [variantPass, ...(dimPass !== undefined ? [dimPass] : [])];
    }
  }
};

/**
 * build the maskless palette-swop filters for an ordered list of swop passes.
 * clipToViewport is false: these bake the sheet off-screen, so the filter must
 * not be cropped to the screen viewport
 */
export const filtersForPasses = (
  passes: PaletteSwopSpec[],
): PaletteSwapFilter[] =>
  passes.map((pass) => new PaletteSwapFilter(pass, Texture.WHITE, false));
