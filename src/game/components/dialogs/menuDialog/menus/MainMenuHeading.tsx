import { BitmapText } from "../../../Sprite";
import { mainMenuCycle } from "./mainMenu";

export const MainMenuHeading = () => (
  <div className="flex  ml-3">
    <div className="flex flex-col gap-y-oneScaledPix items-center me-1">
      <BitmapText className="sprites-double-height text-metallicBlue zx:text-zxYellow">
        Head
      </BitmapText>
      <div className="mt-1 relative">
        <span className="sprite texture-animated-head.idle.right hover:texture-animated-head.walking.right relative z-topSprite" />
        <span className="sprite texture-shadow.smallRound absolute left-0 top-[calc(var(--scale)*1px)] opacity-halfBrite" />
      </div>
    </div>
    <BitmapText classnameCycle={mainMenuCycle} className="mt-1 me-1">
      over
    </BitmapText>
    <div className="flex flex-col items-center me-1">
      <BitmapText className="sprites-double-height text-pink zx:text-zxYellow">
        Heels
      </BitmapText>
      <div className="mt-1 relative">
        <span className="sprite texture-heels.walking.towards.2 hover:texture-animated-heels.walking.towards relative z-topSprite" />
        <span className="sprite texture-shadow.smallRound absolute left-0 top-[calc(var(--scale)*1px)] opacity-halfBrite" />
      </div>
    </div>
    <BitmapText classnameCycle={mainMenuCycle} className="mt-1">
      online
    </BitmapText>
  </div>
);
