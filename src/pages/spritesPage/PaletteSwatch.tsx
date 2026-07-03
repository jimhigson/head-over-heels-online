import jsonPalette from "../../_generated/palette/spritesheetPalette.json" with { type: "json" };
import jsonToppyPalette from "../../_generated/palette/spritesheetToppyPalette.json" with { type: "json" };
import { zxSpectrumColors } from "../../originalGame";
import { useSpritesOption } from "../../store/slices/gameMenus/gameMenusSelectors";
import { Tooltip } from "../../ui/tooltip/Tooltip";
import { srgbHexToP3 } from "../../utils/colour/srgbHexToP3";
import { objectEntriesIter } from "../../utils/entries";

const paletteUtilityColours = new Set([
  "replaceLight",
  "replaceDark",
  "ss_alphaKey",
  "ss_background",
]);

type ColourEntry = readonly [string, string];

const isSecondary = ([name]: ColourEntry) =>
  name.startsWith("swop_") || name.startsWith("shadow_");

const displayEntries = (palette: Record<string, string>) =>
  objectEntriesIter(palette)
    .filter(([name]) => !paletteUtilityColours.has(name))
    .toArray();

const partitionSwops = (
  entries: ColourEntry[],
): { main: ColourEntry[]; swops: ColourEntry[] } => ({
  main: entries.filter((e) => !isSecondary(e)),
  swops: entries.filter(isSecondary),
});

const blockstackEntries = partitionSwops(displayEntries(jsonPalette));
const toppyEntries = partitionSwops(displayEntries(jsonToppyPalette));
const zxEntries = partitionSwops(
  objectEntriesIter(zxSpectrumColors)
    .map(([name, colour]) => [name, colour.toHex()] as const)
    .toArray(),
);

export const PaletteSwatch = () => {
  const spritesOption = useSpritesOption();

  const { main, swops } =
    spritesOption.uncolourised ? zxEntries
    : spritesOption.name === "Toppy" ? toppyEntries
    : blockstackEntries;

  const renderRow = (entries: ColourEntry[]) =>
    entries.map(([name, hex]) => (
      <Tooltip
        key={name}
        triggerContent={
          <div
            class="w-3 h-3 border-oneScaledPix border-shadow zx:border-zxWhiteDimmed toppy:border-toppyGrey2"
            style={{ backgroundColor: hex }}
          />
        }
        tooltipContent={
          <div class="text-shadow zx:text-zxBlack toppy:text-toppyGrey3 flex flex-col gap-oneScaledPix">
            <span class="text-single-line">{name}</span>
            <span class="text-single-line">{hex}</span>
            <span class="text-single-line">{srgbHexToP3(hex)}</span>
          </div>
        }
      />
    ));

  return (
    <div class="flex flex-col gap-oneScaledPix p-half">
      <div class="flex flex-wrap gap-oneScaledPix">{renderRow(main)}</div>
      {swops.length > 0 && (
        <div class="flex flex-wrap gap-oneScaledPix">{renderRow(swops)}</div>
      )}
    </div>
  );
};
