import { useTotalUpscale } from "../../../../../../store/slices/upscale/upscaleSelectors";
import { BitmapText } from "../../../../tailwindSprites/Sprite";
import { multilineTextClass } from "../../multilineTextClass";
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
  return (
    <g className={className}>
      {textOnly || <rect y={y} width={10_000} height={10_000} />}
      <foreignObject
        width={scale * (mapTitle.length + 3) * 8}
        height={scale * 16 * 3}
        x={mapSvgMarginX}
        y={y + 16}
      >
        {/* ml-2 keeps content off the camera notch on phones like iphone x ... 17 ... ? */}
        <BitmapText
          className={`left-2 relative sprites-double-height ${multilineTextClass}`}
        >
          {mapTitle}
        </BitmapText>
      </foreignObject>
    </g>
  );
};
