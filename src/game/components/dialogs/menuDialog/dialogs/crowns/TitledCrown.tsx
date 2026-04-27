import type { PlanetName } from "../../../../../../sprites/planets";
import type { TextureTailwindClass } from "../../../../../../sprites/spritesheet/spritesheetData/TextureTailwindClass";

import { useAppSelector } from "../../../../../../store/hooks";
import { useIsUncolourised } from "../../../../../../store/slices/gameMenus/gameMenusSelectors";
import { twClass } from "../../../../../../utils/twClass";
import { BitmapText } from "../../../../tailwindSprites/BitmapText";

const colourCycle: Record<PlanetName, string[]> = {
  egyptus: [
    "text-lightBeige toppy:text-toppyWarm2",
    "text-midRed toppy:text-toppyPink2",
    "text-highlightBeige toppy:text-toppyWarm3",
  ],
  blacktooth: [
    "text-midGrey toppy:text-toppyGrey2",
    "text-lightGrey toppy:text-toppyGrey1",
    "text-moss toppy:text-toppyCool2",
    "text-midRed toppy:text-toppyPink2",
  ],
  safari: [
    "text-moss toppy:text-toppyCool2",
    "text-midRed toppy:text-toppyPink2",
    "text-highlightBeige toppy:text-toppyWarm3",
  ],
  bookworld: [
    "text-midRed toppy:text-toppyPink2",
    "text-redShadow toppy:text-toppyWarm5",
    "text-midGrey toppy:text-toppyGrey2",
  ],
  penitentiary: [
    "text-shadow toppy:text-toppyGrey3",
    "text-metallicBlue toppy:text-toppyCool3",
    "text-midGrey toppy:text-toppyGrey2",
  ],
};

const planetTextureClasses: {
  [P in PlanetName]: `texture-planet_${P}` & TextureTailwindClass;
} = {
  egyptus: twClass("texture-planet_egyptus"),
  blacktooth: twClass("texture-planet_blacktooth"),
  bookworld: twClass("texture-planet_bookworld"),
  penitentiary: twClass("texture-planet_penitentiary"),
  safari: twClass("texture-planet_safari"),
};

const crownTextureClasses: {
  [P in PlanetName]: `texture-crown_${P}` & TextureTailwindClass;
} = {
  // thanks tailwind - these have to be in the source :-s
  egyptus: twClass("texture-crown_egyptus"),
  blacktooth: twClass("texture-crown_blacktooth"),
  bookworld: twClass("texture-crown_bookworld"),
  penitentiary: twClass("texture-crown_penitentiary"),
  safari: twClass("texture-crown_safari"),
};

export const TitledCrown = ({
  planet,
  className,
  label = planet,
}: {
  planet: PlanetName;
  label?: string;
  className?: string;
}) => {
  const collected = useAppSelector(
    (state) => state.gameMenus.gameInPlay.planetsLiberated[planet],
  );
  const uncolourised = useIsUncolourised();

  return (
    <div
      className={`flex flex-col ${className}`}
      data-test-id={`crown-${planet}`}
      data-collected={collected ? "true" : "false"}
    >
      <span
        className={`sprite block mx-auto
          ${uncolourised ? `${"texture-crown_uncolourised" satisfies TextureTailwindClass} sprite-tinted` : crownTextureClasses[planet]}
          ${collected ? `zx:text-zxYellow toppy:text-toppyWarm1` : "colourised:brightness-halfBrite zx:text-zxMagentaDimmed toppy:brightness-halfBrite"}
          `}
      />
      <span
        className={`sprite block 
          ${uncolourised ? ("texture-ball_uncolourised" satisfies TextureTailwindClass) : planetTextureClasses[planet]} 
          zx:sprite-tinted mx-auto 
          ${collected ? `zx:text-zxWhite toppy:text-toppyWarm1` : "zx:text-zxYellowDimmed colourised:brightness-halfBrite toppy:brightness-halfBrite"} 
          ${colourCycle[planet][0]}
          `}
      />
      <BitmapText
        classnameCycle={uncolourised ? undefined : colourCycle[planet]}
        className={`block mx-auto ${collected ? "zx:text-zxMagenta toppy:text-toppyPink1" : "zx:text-zxMagentaDimmed colourised:brightness-halfBrite toppy:brightness-halfBrite"}`}
      >
        {label}
      </BitmapText>
    </div>
  );
};
