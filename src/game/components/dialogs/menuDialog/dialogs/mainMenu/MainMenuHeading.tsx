import { BitmapText } from "../../../../tailwindSprites/BitmapText";
import { CharacterSprite } from "./CharacterSprite";
import { mainMenuCycle } from "./mainMenuCycle";

export const MainMenuHeading = ({
  noSubtitle,
  className,
}: {
  noSubtitle?: boolean;
  className?: string;
}) => (
  <header className={`flex flex-col items-center ${className}`}>
    <h1 className="flex">
      <div className="flex flex-row gap-1 items-center me-1 sprites-uppercase">
        <BitmapText className="sprites-double-height text-pastelBlue zx:text-zxYellow toppy:text-toppyCool2 mt-1">
          Head
        </BitmapText>
        <CharacterSprite character="head" defaultFacing="right" />
      </div>
      <BitmapText classnameCycle={mainMenuCycle} className="mt-2 me-1">
        over
      </BitmapText>
      <div className="flex flex-row-reverse gap-1 items-center sprites-uppercase">
        <BitmapText className="sprites-double-height text-pink zx:text-zxYellow toppy:text-toppyPink1 mt-1">
          Heels
        </BitmapText>
        <CharacterSprite character="heels" defaultFacing="towards" />
      </div>
    </h1>
    {noSubtitle || (
      <h2 className="mt-1 w-max resHandheld:hidden">
        <BitmapText className="text-midRed zx:text-zxCyan toppy:text-toppyPink2">
          Block
        </BitmapText>
        <BitmapText className="text-highlightBeige zx:text-zxYellow toppy:text-toppyWarm3">
          Stack
        </BitmapText>
        <BitmapText className="text-metallicBlue zx:text-zxBlack toppy:text-toppyCool3">
          .
        </BitmapText>
        <BitmapText className="text-moss zx:text-zxWhite toppy:text-toppyCool1">
          ing
        </BitmapText>
        <BitmapText classnameCycle={mainMenuCycle}> remake</BitmapText>
      </h2>
    )}
  </header>
);
