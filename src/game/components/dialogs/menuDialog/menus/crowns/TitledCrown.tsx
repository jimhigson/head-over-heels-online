import type { TailwindPalette } from "../../../../../../../tailwind.config";
import type { PlanetName } from "../../../../../../sprites/planets";
import type { TextureId } from "../../../../../../sprites/spriteSheetData";
import { useAppSelector } from "../../../../../../store/hooks";
import { CssSprite, BitmapText } from "../../../../Sprite";

const colourCycle: Record<
  PlanetName,
  `text-${TailwindPalette} zx:text-${TailwindPalette}`[]
> = {
  egyptus: [
    "text-lightBeige zx:text-zxYellowDimmed",
    "text-midRed zx:text-zxRed",
    "text-highlightBeige zx:text-zxYellow",
  ],
  blacktooth: [
    "text-midGrey zx:text-zxWhiteDimmed",
    "text-lightGrey zx:text-zxWhite",
    "text-moss zx:text-zxGreenDimmed",
    "text-midRed zx:text-zxRed",
  ],
  safari: [
    "text-moss zx:text-zxGreen",
    "text-midRed zx:text-zxRed",
    "text-highlightBeige zx:text-zxYellowDimmed",
  ],
  bookworld: [
    "text-midRed zx:text-zxRed",
    "text-redShadow zx:text-zxRedDimmed",
    "text-midGrey zx:text-zxWhiteDimmed",
  ],
  penitentiary: [
    "text-shadow zx:text-zxWhiteDimmed",
    "text-metallicBlue zx:text-zxBlue",
    "text-midGrey zx:text-zxMagentaDimmed",
  ],
};

const crownTextureClasses: {
  [P in PlanetName]: `texture-crown.${P}` & `texture-${TextureId}`;
} = {
  // thanks tailwind - these have to be in the source :-s
  egyptus: "texture-crown.egyptus",
  blacktooth: "texture-crown.blacktooth",
  bookworld: "texture-crown.bookworld",
  penitentiary: "texture-crown.penitentiary",
  safari: "texture-crown.safari",
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
  const collected = useAppSelector((state) => state.planetsLiberated[planet]);

  return (
    <div className={`flex flex-col ${className}`}>
      <CssSprite
        className={`block ${collected ? crownTextureClasses[planet] : "texture-crown.dark"} mx-auto`}
      />
      <CssSprite
        className={`block texture-ball mx-auto ${colourCycle[planet][0]}`}
      />
      <BitmapText
        classnameCycle={colourCycle[planet]}
        className="block mx-auto"
      >
        {label}
      </BitmapText>
    </div>
  );
};
