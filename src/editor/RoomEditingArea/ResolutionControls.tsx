import { ToolbarButton } from "../tools/ToolbarButton";
import { type ResolutionName, resolutionNames } from "../../originalGame";
import { BitmapText } from "../../game/components/tailwindSprites/Sprite";
import { useShortTimeDisplay } from "../tools/useShortTimeDisplay";

const resolutionDisplayNames: Record<ResolutionName, string> = {
  amigaHiResPal: "Amiga Hi-Res PAL",
  classicMac: "Classic Mac",
  amigaLowResPal: "Amiga Low-Res PAL",
  zxSpectrum: "ZX Spectrum",
  handheld: "Handheld",
};

type ResolutionControlsProps = {
  selectedResolution: ResolutionName;
  onResolutionChange: (resolution: ResolutionName) => void;
};

export const ResolutionControls = ({
  selectedResolution,
  onResolutionChange,
}: ResolutionControlsProps) => {
  const currentResolutionIndex = resolutionNames.indexOf(selectedResolution);
  const canGoSmaller = currentResolutionIndex < resolutionNames.length - 1;
  const canGoBigger = currentResolutionIndex > 0;

  const { justDone, doneNow } = useShortTimeDisplay();

  return (
    <div className="absolute scale-editor top-0 right-1 z-popups flex gap-0 leading-none text-white">
      {justDone > 0 && (
        <BitmapText className="px-1 bg-moss items-center flex">
          {resolutionDisplayNames[selectedResolution]}
        </BitmapText>
      )}
      <ToolbarButton
        small
        disabled={!canGoBigger}
        tooltipContent={`##zoom ⬇\n\nmakes things look *smaller* by *increasing* emulated resolution`}
        onClick={() => {
          if (canGoBigger) {
            onResolutionChange(resolutionNames[currentResolutionIndex - 1]);
            doneNow();
          }
        }}
        shortcutKeys={["-"]}
      >
        <BitmapText>-</BitmapText>
      </ToolbarButton>
      <ToolbarButton
        small
        disabled={!canGoSmaller}
        tooltipContent={`##zoom ⬆\n\nmakes things look *bigger* by *decreasing* emulated resolution`}
        onClick={() => {
          if (canGoSmaller) {
            onResolutionChange(resolutionNames[currentResolutionIndex + 1]);
            doneNow();
          }
        }}
        shortcutKeys={["⇧+", "="]}
      >
        <BitmapText>+</BitmapText>
      </ToolbarButton>
    </div>
  );
};
