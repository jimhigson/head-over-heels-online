import { BitmapText } from "../../../Sprite";
import { mainMenuCycle } from "./mainMenu";


export const MainMenuHeading = () => (
  <div className="flex  ml-3">
    <div className="flex flex-col gap-y-oneScaledPix">
      <BitmapText className="sprites-double-height text-metallicBlue zx:text-zxYellow me-1">
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
    <div className="flex flex-col">
      <BitmapText className="sprites-double-height text-pink zx:text-zxYellow me-1">
        Heels
      </BitmapText>
      <div className="mt-1 ml-2 relative">
        <span className="sprite texture-heels.walking.towards.2 hover:texture-animated-heels.walking.towards relative z-topSprite" />
        <span className="sprite texture-shadow.smallRound absolute left-0 top-[calc(var(--scale)*1px)] opacity-halfBrite" />
      </div>
    </div>
    <BitmapText classnameCycle={mainMenuCycle} className="mt-1">
      online
    </BitmapText>
  </div>
);
