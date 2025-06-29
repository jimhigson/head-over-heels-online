import type { TailwindPalette } from "../../../../../../../tailwind.config";
import { twClass } from "../../../../../../editor/twClass";
import type { PlanetName } from "../../../../../../sprites/planets";
import type { TextureId } from "../../../../../../sprites/spriteSheetData";
import { useAppSelector } from "../../../../../../store/hooks";
import { useIsUncolourised } from "../../../../../../store/selectors";
import type { SanitisedForClassName } from "../../../../tailwindSprites/SanitiseForClassName";
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
    (state) => state.gameMenus.planetsLiberated[planet],
  );
  const colourised = !useIsUncolourised();

  return (
    <div className={`flex flex-col ${className}`}>
      <span
        className={`sprite block ${crownTextureClasses[planet]} ${collected ? `zx:sprite-revert-zxYellow` : "colourised:brightness-halfBrite zx:sprite-revert-zxMagenta"} mx-auto`}
      />
      <span
        className={`sprite block texture-ball zx:sprite-revert-zxYellow mx-auto ${collected ? `` : "colourised:brightness-halfBrite"} ${colourCycle[planet][0]}`}
      />
      <BitmapText
        classnameCycle={colourised ? colourCycle[planet] : undefined}
        className={`block mx-auto zx:text-zxMagenta ${collected ? "" : "colourised:brightness-halfBrite"}`}
      >
        {label}
      </BitmapText>
    </div>
  );
};
