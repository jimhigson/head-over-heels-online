import { ColourCycleText } from "../../../../ColourCycleText";
import { CharacterSprite } from "./CharacterSprite";
import { mainMenuCycle } from "./mainMenuCycle";

export const MainMenuHeading = ({
  noSubtitle,
  class: className,
}: {
  noSubtitle?: boolean;
  class?: string;
}) => (
  <header class={`flex flex-col items-center ${className}`}>
    <h1 class="text-single-line whitespace-nowrap">
      <span class="text-double-height text-double-height-on-baseline uppercase text-pastelBlue zx:text-zxYellow toppy:text-toppyCool2">
        Head
      </span>
      <CharacterSprite
        character="head"
        defaultFacing="right"
        class="inline-block align-baseline mx-1"
      />
      <ColourCycleText classnameCycle={mainMenuCycle}>over</ColourCycleText>
      <CharacterSprite
        character="heels"
        defaultFacing="towards"
        class="inline-block align-baseline mx-1"
      />
      <span class="text-double-height text-double-height-on-baseline uppercase text-pink zx:text-zxYellow toppy:text-toppyPink1">
        Heels
      </span>
    </h1>
    {noSubtitle || (
      <h2 class="mt-1 w-max resHandheld:hidden text-single-line">
        <span class="text-midRed zx:text-zxCyan toppy:text-toppyPink2">
          Block
        </span>
        <span class="text-highlightBeige zx:text-zxYellow toppy:text-toppyWarm3">
          Stack
        </span>
        <span class="text-metallicBlue zx:text-zxBlack toppy:text-toppyCool3">
          .
        </span>
        <span class="text-moss zx:text-zxWhite toppy:text-toppyCool1">ing</span>
        <ColourCycleText classnameCycle={mainMenuCycle}>
          {" remake"}
        </ColourCycleText>
      </h2>
    )}
  </header>
);
