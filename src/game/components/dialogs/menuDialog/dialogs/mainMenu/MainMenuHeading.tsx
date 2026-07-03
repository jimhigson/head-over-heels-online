import { ColourCycleText } from "../../../../ColourCycleText";
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
    <h1 className="text-single-line whitespace-nowrap">
      <span className="text-double-height text-double-height-on-baseline uppercase text-pastelBlue zx:text-zxYellow toppy:text-toppyCool2">
        Head
      </span>
      <CharacterSprite
        character="head"
        defaultFacing="right"
        className="inline-block align-baseline mx-1"
      />
      <ColourCycleText classnameCycle={mainMenuCycle}>over</ColourCycleText>
      <CharacterSprite
        character="heels"
        defaultFacing="towards"
        className="inline-block align-baseline mx-1"
      />
      <span className="text-double-height text-double-height-on-baseline uppercase text-pink zx:text-zxYellow toppy:text-toppyPink1">
        Heels
      </span>
    </h1>
    {noSubtitle || (
      <h2 className="mt-1 w-max resHandheld:hidden text-single-line">
        <span className="text-midRed zx:text-zxCyan toppy:text-toppyPink2">
          Block
        </span>
        <span className="text-highlightBeige zx:text-zxYellow toppy:text-toppyWarm3">
          Stack
        </span>
        <span className="text-metallicBlue zx:text-zxBlack toppy:text-toppyCool3">
          .
        </span>
        <span className="text-moss zx:text-zxWhite toppy:text-toppyCool1">
          ing
        </span>
        <ColourCycleText classnameCycle={mainMenuCycle}>
          {" remake"}
        </ColourCycleText>
      </h2>
    )}
  </header>
);
