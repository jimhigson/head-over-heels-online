import { ColourCycleText } from "../../../../ColourCycleText";
import { mainMenuCycle } from "./mainMenuCycle";

export const MainMenuFooter = () => (
  <footer className="flex justify-center gap-2 resHandheld:gap-1 text-single-line h-[calc(26px*var(--scale))]">
    <div className="flex flex-col items-center">
      <span className="text-pastelBlue zx:text-zxBlack toppy:text-toppyCool2 relative left-oneScaledPix">
        1987 Original
      </span>
      <div className="flex gap-1">
        <address className="flex flex-col items-center relative bottom-oneScaledPix">
          <ColourCycleText
            className="relative left-[calc(6.5px*var(--scale))]"
            classnameCycle={mainMenuCycle}
          >
            Jon
          </ColourCycleText>
          <ColourCycleText
            className="relative bottom-[calc(3px*var(--scale))]"
            classnameCycle={mainMenuCycle}
          >
            Ritman
          </ColourCycleText>
        </address>
        <address className="flex flex-col items-center relative bottom-oneScaledPix">
          <ColourCycleText classnameCycle={mainMenuCycle}>
            Bernie
          </ColourCycleText>
          <ColourCycleText
            className="relative bottom-[calc(3px*var(--scale))]"
            classnameCycle={mainMenuCycle}
          >
            Drummand
          </ColourCycleText>
        </address>
      </div>
    </div>
    <div className="flex flex-col items-center">
      <span className="text-pink zx:text-zxBlack toppy:text-toppyPink1">
        2026 Remake
      </span>
      <address className="flex relative left-[calc(0.5px*var(--scale))] bottom-oneScaledPix">
        <div className="flex flex-col items-center">
          <ColourCycleText
            className="relative left-[calc(1.5px*var(--scale))]"
            classnameCycle={mainMenuCycle}
          >
            Jim
          </ColourCycleText>
          <ColourCycleText
            className="relative bottom-[calc(3px*var(--scale))]"
            classnameCycle={mainMenuCycle}
          >
            Higson
          </ColourCycleText>
        </div>
      </address>
    </div>
  </footer>
);
