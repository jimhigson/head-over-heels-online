import { BitmapText } from "../../../../Sprite";
import { mainMenuCycle } from "./mainMenuCycle";

export const MainMenuHeading = ({
  noSubtitle,
  className,
}: {
  noSubtitle?: boolean;
  className?: string;
}) => (
  <div className={`flex flex-col items-center ${className}`}>
    <div className="flex">
      <div className="flex flex-col resGameboy:flex-row resGameboy:gap-1 gap-y-oneScaledPix items-center me-1">
        <BitmapText className="sprites-double-height text-metallicBlue zx:text-zxYellow resGameboy:mt-1">
          Head
        </BitmapText>
        <div className="mt-1 resGameboy:mt-0 relative">
          <span className="sprite zx:sprite-revert-to-white texture-animated-head.idle.right hover:texture-animated-head.walking.right relative z-topSprite" />
          <span className="sprite zx:hidden texture-shadow.smallRound absolute left-0 top-[calc(var(--scale)*1px)] opacity-halfBrite" />
        </div>
      </div>
      <BitmapText
        classnameCycle={mainMenuCycle}
        className="mt-1 me-1 resGameboy:mt-2"
      >
        over
      </BitmapText>
      <div className="flex flex-col resGameboy:flex-row-reverse resGameboy:gap-1 items-center me-1">
        <BitmapText className="sprites-double-height text-pink zx:text-zxYellow resGameboy:mt-1">
          Heels
        </BitmapText>
        <div className="mt-1 resGameboy:mt-0 relative">
          <span className="sprite zx:sprite-revert-to-white texture-heels.walking.towards.2 hover:texture-animated-heels.walking.towards relative z-topSprite" />
          <span className="sprite zx:hidden texture-shadow.smallRound absolute left-0 top-[calc(var(--scale)*1px)] opacity-halfBrite" />
        </div>
      </div>
    </div>
    {noSubtitle || (
      <div className="mt-1 w-max resGameboy:hidden">
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
