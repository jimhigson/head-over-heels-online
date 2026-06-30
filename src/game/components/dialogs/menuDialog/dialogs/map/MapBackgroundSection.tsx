import { hudCharTextureSize } from "../../../../../../sprites/spritesheet/spritesheetData/textureSizes";
import { useTotalUpscale } from "../../../../../../store/slices/upscale/upscaleSelectors";
import { mapSvgMarginX } from "./mapConstants";

export const MapBackgroundSection = ({
  mapTitle,
  y = 0,
  className,
  textOnly = false,
}: {
  mapTitle: string;
  y?: number;
  className: string;
  textOnly?: boolean;
}) => {
  const scale = useTotalUpscale();
  // the font's em maps to the 8px design grid, so font-size is grid * scale
  const fontSize = hudCharTextureSize.h * scale;
  // section titles render at double height: the baseline sits below the cap row
  // by the doubled height so the scaleY grows the text up to the same top
  const baselineY = y + 16 + 2 * fontSize;
  // indent by 2 blocks (a block is one font-size) to keep the text clear of the
  // phone camera notch
  const x = mapSvgMarginX + 2 * fontSize;
  return (
    <g className={className}>
      {textOnly || <rect y={y} width={10_000} height={10_000} />}
      <text
        fill="currentColor"
        fontFamily="HeadOverHeels"
        fontSize={fontSize}
        x={x}
        y={baselineY}
        transform={`translate(0 ${baselineY}) scale(1 2) translate(0 ${-baselineY})`}
      >
        {mapTitle}
      </text>
    </g>
  );
};
