import { BitmapText } from "../../../../Sprite";
import { mainMenuCycle } from "./mainMenuCycle";

export const MainMenuHeading = ({ noSubtitle }: { noSubtitle?: boolean }) => (
  <div className="flex flex-col items-center me-1">
    <div className="flex">
      <div className="flex flex-col gap-y-oneScaledPix items-center me-1">
        <BitmapText className="sprites-double-height text-metallicBlue zx:text-zxYellow">
          Head
        </BitmapText>
        <div className="mt-1 relative">
          <span className="sprite zx:sprite-revert-to-white texture-animated-head.idle.right hover:texture-animated-head.walking.right relative z-topSprite" />
          <span className="sprite zx:hidden texture-shadow.smallRound absolute left-0 top-[calc(var(--scale)*1px)] opacity-halfBrite" />
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
          <span className="sprite zx:sprite-revert-to-white texture-heels.walking.towards.2 hover:texture-animated-heels.walking.towards relative z-topSprite" />
          <span className="sprite zx:hidden texture-shadow.smallRound absolute left-0 top-[calc(var(--scale)*1px)] opacity-halfBrite" />
        </div>
      </div>
    </div>
    {noSubtitle || (
      <div className="mt-1 w-max">
        <BitmapText className="text-pink zx:text-zxCyan">block</BitmapText>
        <BitmapText className="text-highlightBeige zx:text-zxYellow">
          stack
        </BitmapText>
        <BitmapText className="text-metallicBlue zx:text-zxBlack">.</BitmapText>
        <BitmapText className="text-moss zx:text-zxWhite">ing</BitmapText>
        <BitmapText classnameCycle={mainMenuCycle}> remake</BitmapText>
      </div>
    )}
  </div>
);
