import { BitmapText } from "../../../../tailwindSprites/Sprite";
import { mainMenuCycle } from "./mainMenuCycle";

export const MainMenuFooter = () => (
  <>
    <div className="flex justify-center gap-2 resHandheld:gap-1 leading-none">
      <div className="flex flex-col gap-y-oneScaledPix items-center">
        <BitmapText className="text-pastelBlue zx:text-zxBlack">
          1987 original
        </BitmapText>
        <div className="flex gap-1">
          <address className="flex flex-col gap-y-oneScaledPix items-center">
            <BitmapText classnameCycle={mainMenuCycle}>Jon</BitmapText>
            <BitmapText classnameCycle={mainMenuCycle}>Ritman</BitmapText>
          </address>
          <address className="flex flex-col gap-y-oneScaledPix items-center">
            <BitmapText classnameCycle={mainMenuCycle}>Bernie</BitmapText>
            <BitmapText classnameCycle={mainMenuCycle}>Drummand</BitmapText>
          </address>
        </div>
      </div>
      <div className="flex flex-col gap-y-oneScaledPix items-center">
        <BitmapText className="text-pink zx:text-zxBlack">
          2025 remake
        </BitmapText>
        <address className="flex">
          <div className="flex flex-col gap-y-oneScaledPix items-center">
            <BitmapText classnameCycle={mainMenuCycle}>Jim</BitmapText>
            <BitmapText classnameCycle={mainMenuCycle}>Higson</BitmapText>
          </div>
        </address>
      </div>
    </div>
  </>
);
