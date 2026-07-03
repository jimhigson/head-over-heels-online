import { ColourCycleText } from "../../../../ColourCycleText";
import { mainMenuCycle } from "./mainMenuCycle";

export const MainMenuFooter = () => (
  <footer class="flex justify-center gap-2 resHandheld:gap-1 text-single-line h-[calc(26px*var(--scale))]">
    <div class="flex flex-col items-center">
      <span class="text-pastelBlue zx:text-zxBlack toppy:text-toppyCool2 relative left-oneScaledPix">
        1987 Original
      </span>
      <div class="flex gap-1">
        <address class="flex flex-col items-center relative bottom-oneScaledPix">
          <ColourCycleText
            class="relative left-[calc(6.5px*var(--scale))]"
            classnameCycle={mainMenuCycle}
          >
            Jon
          </ColourCycleText>
          <ColourCycleText
            class="relative bottom-[calc(3px*var(--scale))]"
            classnameCycle={mainMenuCycle}
          >
            Ritman
          </ColourCycleText>
        </address>
        <address class="flex flex-col items-center relative bottom-oneScaledPix">
          <ColourCycleText classnameCycle={mainMenuCycle}>
            Bernie
          </ColourCycleText>
          <ColourCycleText
            class="relative bottom-[calc(3px*var(--scale))]"
            classnameCycle={mainMenuCycle}
          >
            Drummand
          </ColourCycleText>
        </address>
      </div>
    </div>
    <div class="flex flex-col items-center">
      <span class="text-pink zx:text-zxBlack toppy:text-toppyPink1">
        2026 Remake
      </span>
      <address class="flex relative left-[calc(0.5px*var(--scale))] bottom-oneScaledPix">
        <div class="flex flex-col items-center">
          <ColourCycleText
            class="relative left-[calc(1.5px*var(--scale))]"
            classnameCycle={mainMenuCycle}
          >
            Jim
          </ColourCycleText>
          <ColourCycleText
            class="relative bottom-[calc(3px*var(--scale))]"
            classnameCycle={mainMenuCycle}
          >
            Higson
          </ColourCycleText>
        </div>
      </address>
    </div>
  </footer>
);
