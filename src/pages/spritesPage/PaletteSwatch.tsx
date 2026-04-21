import jsonPalette from "../../_generated/palette/spritesheetPalette.json" with { type: "json" };
import jsonToppyPalette from "../../_generated/palette/spritesheetToppyPalette.json" with { type: "json" };
import { BitmapText } from "../../game/components/tailwindSprites/BitmapText";
import { zxSpectrumColors } from "../../originalGame";
import { useSpritesOption } from "../../store/slices/gameMenus/gameMenusSelectors";
import { Tooltip } from "../../ui/Tooltip";
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
            className="w-3 h-3 border-oneScaledPix border-shadow zx:border-zxWhiteDimmed toppy:border-toppyGrey2"
            style={{ backgroundColor: hex }}
          />
        }
        tooltipContent={
          <div className="text-shadow zx:text-zxBlack toppy:text-toppyGrey3 flex flex-col gap-oneScaledPix">
            <BitmapText>{name}</BitmapText>
            <BitmapText>{hex}</BitmapText>
            <BitmapText>{srgbHexToP3(hex)}</BitmapText>
          </div>
        }
      />
    ));

  return (
    <div className="flex flex-col gap-oneScaledPix p-half">
      <div className="flex flex-wrap gap-oneScaledPix">{renderRow(main)}</div>
      {swops.length > 0 && (
        <div className="flex flex-wrap gap-oneScaledPix">
          {renderRow(swops)}
        </div>
      )}
    </div>
  );
};
