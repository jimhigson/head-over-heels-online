import type { PlanetName } from "../../../../../../sprites/planets";
import type { TextureTailwindClass } from "../../../../../../sprites/spritesheet/spritesheetData/TextureTailwindClass";
import type { TailwindColourisedColourName } from "../../../../../../tailwind/tailwindColours";

import { twClass } from "../../../../../../editor/twClass";
import { useAppSelector } from "../../../../../../store/hooks";
import { useIsUncolourised } from "../../../../../../store/slices/gameMenus/gameMenusSelectors";
import { BitmapText } from "../../../../tailwindSprites/BitmapText";

const colourCycle: Record<
  PlanetName,
  `text-${TailwindColourisedColourName}`[]
> = {
  egyptus: ["text-lightBeige", "text-midRed", "text-highlightBeige"],
  blacktooth: ["text-midGrey", "text-lightGrey", "text-moss", "text-midRed"],
  safari: ["text-moss", "text-midRed", "text-highlightBeige"],
  bookworld: ["text-midRed", "text-redShadow", "text-midGrey"],
  penitentiary: ["text-shadow", "text-metallicBlue", "text-midGrey"],
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
    <div className={`flex flex-col ${className}`}>
      <span
        className={`sprite block mx-auto
          ${uncolourised ? `${"texture-crown_uncolourised" satisfies TextureTailwindClass} sprite-tinted` : crownTextureClasses[planet]} 
          ${collected ? `zx:text-zxYellow` : "colourised:brightness-halfBrite zx:text-zxMagentaDimmed"}
          `}
      />
      <span
        className={`sprite block 
          ${uncolourised ? ("texture-ball_uncolourised" satisfies TextureTailwindClass) : planetTextureClasses[planet]} 
          zx:sprite-tinted mx-auto 
          ${collected ? `zx:text-zxWhite` : "zx:text-zxYellowDimmed colourised:brightness-halfBrite"} 
          ${colourCycle[planet][0]}
          `}
      />
      <BitmapText
        classnameCycle={uncolourised ? undefined : colourCycle[planet]}
        className={`block mx-auto ${collected ? "zx:text-zxMagenta" : "zx:text-zxMagentaDimmed colourised:brightness-halfBrite"}`}
      >
        {label}
      </BitmapText>
    </div>
  );
};
