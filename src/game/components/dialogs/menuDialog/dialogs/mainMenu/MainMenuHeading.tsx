import { BitmapText } from "../../../../tailwindSprites/Sprite";
import { mainMenuCycle } from "./mainMenuCycle";
import { CharacterSprite } from "./CharacterSprite";

export const MainMenuHeading = ({
  noSubtitle,
  className,
}: {
  noSubtitle?: boolean;
  className?: string;
}) => (
  <div className={`flex flex-col items-center ${className}`}>
    <h1 className="flex">
      <div className="flex flex-col resHandheld:flex-row resHandheld:gap-1 gap-y-oneScaledPix items-center me-1">
        <BitmapText className="sprites-double-height text-pastelBlue zx:text-zxYellow resHandheld:mt-1">
          Head
        </BitmapText>
        <CharacterSprite
          character="head"
          defaultFacing="right"
          className="mt-1 resHandheld:mt-0"
        />
      </div>
      <BitmapText
        classnameCycle={mainMenuCycle}
        className="mt-1 me-1 resHandheld:mt-2"
      >
        over
      </BitmapText>
      <div className="flex flex-col resHandheld:flex-row-reverse resHandheld:gap-1 items-center me-1">
        <BitmapText className="sprites-double-height text-pink zx:text-zxYellow resHandheld:mt-1">
          Heels
        </BitmapText>
        <CharacterSprite
          character="heels"
          defaultFacing="towards"
          className="mt-1 resHandheld:mt-0"
        />
      </div>
    </h1>
    {noSubtitle || (
      <h2 className="mt-1 w-max resHandheld:hidden">
        <BitmapText className="text-midRed zx:text-zxCyan">hello</BitmapText>
        <BitmapText className="text-highlightBeige zx:text-zxYellow">
          Jon
        </BitmapText>
      </h2>
    )}
  </div>
);
