import type { TailwindPalette } from "../../../../../../../tailwind.config";
import type { PlanetName } from "../../../../../../sprites/planets";
import type { TextureId } from "../../../../../../sprites/spritesheet/spritesheetData/spriteSheetData";
import type { SanitisedForClassName } from "../../../../tailwindSprites/SanitiseForClassName";

import { twClass } from "../../../../../../editor/twClass";
import { useAppSelector } from "../../../../../../store/hooks";
import { useIsUncolourised } from "../../../../../../store/slices/gameMenus/gameMenusSelectors";
import { BitmapText } from "../../../../tailwindSprites/Sprite";

const colourCycle: Record<PlanetName, `text-${TailwindPalette}`[]> = {
  egyptus: ["text-lightBeige", "text-midRed", "text-highlightBeige"],
  blacktooth: ["text-midGrey", "text-lightGrey", "text-moss", "text-midRed"],
  safari: ["text-moss", "text-midRed", "text-highlightBeige"],
  bookworld: ["text-midRed", "text-redShadow", "text-midGrey"],
  penitentiary: ["text-shadow", "text-metallicBlue", "text-midGrey"],
};

const crownTextureClasses: {
  [P in PlanetName]: `texture-crown_${P}` &
    `texture-${SanitisedForClassName<TextureId>}`;
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
          ${uncolourised ? "texture-crown_uncolourised sprite-tinted" : crownTextureClasses[planet]} 
          ${collected ? `zx:text-zxYellow` : "colourised:brightness-halfBrite zx:text-zxMagentaDimmed"}
          `}
      />
      <span
        className={`sprite block 
          ${uncolourised ? "texture-ball_uncolourised" : "texture-ball"} 
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
