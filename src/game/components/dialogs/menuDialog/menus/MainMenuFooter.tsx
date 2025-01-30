import { BitmapText } from "../../../Sprite";
import { mainMenuCycle } from "./mainMenu";

export const MainMenuFooter = () => (
  <>
    <div className="flex justify-center gap-2 leading-none">
      <div className="flex flex-col gap-y-oneScaledPix items-center">
        <BitmapText className="text-metallicBlue zx:text-zxRedDimmed">
          1987 original
        </BitmapText>
        <div className="flex gap-1">
          <div className="flex flex-col gap-y-oneScaledPix items-center">
            <BitmapText classnameCycle={mainMenuCycle}>Jon</BitmapText>
            <BitmapText classnameCycle={mainMenuCycle}>Ritman</BitmapText>
          </div>
          <div className="flex flex-col gap-y-oneScaledPix items-center">
            <BitmapText classnameCycle={mainMenuCycle}>Bernie</BitmapText>
            <BitmapText classnameCycle={mainMenuCycle}>Drummand</BitmapText>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-y-oneScaledPix items-center">
        <BitmapText className="text-pink zx:text-zxRedDimmed">
          2025 remake
        </BitmapText>
        <div className="flex">
          <div className="flex flex-col gap-y-oneScaledPix items-center">
            <BitmapText classnameCycle={mainMenuCycle}>Jim</BitmapText>
            <BitmapText classnameCycle={mainMenuCycle}>Higson</BitmapText>
          </div>
        </div>
      </div>
    </div>
    <div className="absolute bottom-1">
      <BitmapText className="text-metallicBlue zx:text-zxRedDimmed">
        https://
      </BitmapText>
      <BitmapText className="text-pink zx:text-zxBlack">block</BitmapText>
      <BitmapText className="text-highlightBeige zx:text-zxBlueDimmed">
        stack
      </BitmapText>
      <BitmapText className="text-metallicBlue zx:text-zxRedDimmed">
        .
      </BitmapText>
      <BitmapText className="text-moss zx:text-zxBlack">ing</BitmapText>
    </div>
  </>
);
