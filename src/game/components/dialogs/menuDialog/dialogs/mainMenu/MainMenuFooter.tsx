import { BitmapText } from "../../../../tailwindSprites/Sprite";
import { mainMenuCycle } from "./mainMenuCycle";

export const MainMenuFooter = ({ className }: { className?: string }) => (
  <div
    className={`flex justify-center gap-2 resHandheld:gap-1 leading-none ${className ?? ""}`}
  >
    <div className="flex flex-col items-center">
      <BitmapText className="text-pastelBlue zx:text-zxBlack">
        1987 Original
      </BitmapText>
      <div className="flex gap-1">
        <address className="flex flex-col items-center relative bottom-oneScaledPix">
          <BitmapText
            className="relative left-[calc(6px*var(--scale))]"
            classnameCycle={mainMenuCycle}
          >
            Jon
          </BitmapText>
          <BitmapText
            className="relative bottom-[calc(3px*var(--scale))]"
            classnameCycle={mainMenuCycle}
          >
            Ritman
          </BitmapText>
        </address>
        <address className="flex flex-col items-center relative bottom-oneScaledPix">
          <BitmapText classnameCycle={mainMenuCycle}>Bernie</BitmapText>
          <BitmapText
            className="relative bottom-[calc(3px*var(--scale))]"
            classnameCycle={mainMenuCycle}
          >
            Drummand
          </BitmapText>
        </address>
      </div>
    </div>
    <div className="flex flex-col items-center">
      <BitmapText className="text-pink zx:text-zxBlack">2025 Remake</BitmapText>
      <address className="flex relative bottom-oneScaledPix">
        <div className="flex flex-col items-center">
          <BitmapText
            className="relative left-[calc(2px*var(--scale))]"
            classnameCycle={mainMenuCycle}
          >
            Jim
          </BitmapText>
          <BitmapText
            className="relative bottom-[calc(3px*var(--scale))]"
            classnameCycle={mainMenuCycle}
          >
            Higson
          </BitmapText>
        </div>
      </address>
    </div>
  </div>
);
