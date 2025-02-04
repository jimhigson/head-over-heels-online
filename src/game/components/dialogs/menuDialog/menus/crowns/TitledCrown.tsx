import type { SpritesheetPaletteColourName } from "../../../../../../../gfx/spritesheetPalette";
import type { PlanetName } from "../../../../../../sprites/planets";
import type { TextureId } from "../../../../../../sprites/spriteSheetData";
import { useAppSelector } from "../../../../../../store/hooks";
import { CssSprite, BitmapText } from "../../../../Sprite";

const colourCycle: Record<
  PlanetName,
  `text-${SpritesheetPaletteColourName}`[]
> = {
  egyptus: ["text-lightBeige", "text-midRed", "text-highlightBeige"],
  blacktooth: ["text-midGrey", "text-lightGrey", "text-moss", "text-midRed"],
  safari: ["text-moss", "text-midRed", "text-redShadow"],
  bookworld: ["text-midRed", "text-redShadow", "text-midGrey"],
  penitentiary: ["text-shadow", "text-metallicBlue", "text-midGrey"],
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
