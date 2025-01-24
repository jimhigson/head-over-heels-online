import type { Menu } from "../menus";
import { BitmapText, CssSprite } from "../../../Sprite";
import type { PlanetName } from "../../../../../sprites/planets";
import { PixiSprite } from "../../../PixiSprite";
import type { SpritesheetPaletteColourName } from "../../../../../../gfx/spritesheetPalette";
import { useAppSelector } from "../../../../../store/hooks";
import { backMenuItem } from "../backMenuItem";
import { MenuItems } from "../MenuItems";
import type { TextureId } from "../../../../../sprites/spriteSheetData";

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

const TitledCrown = ({
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
      {collected ?
        <CssSprite className={`block ${crownTextureClasses[planet]} mx-auto`} />
      : <PixiSprite
          className="block mx-auto text-shadow"
          textureId={`crown.${planet}`}
          revertColour
        />
      }
      <PixiSprite
        className={`block mx-auto ${colourCycle[planet][0]}`}
        textureId="ball"
        revertColour
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
const CrownsMenuContent = () => {
  return (
    <>
      <BitmapText className="block sprites-double-height text-highlightBeige ml-6">
        The blacktooth empire
      </BitmapText>
      <TitledCrown
        planet="egyptus"
        className="w-12 absolute left-[calc(var(--block,8px)*0)] top-[calc(var(--block,8px)*3)]"
      />
      <TitledCrown
        planet="penitentiary"
        className="w-12 absolute left-[calc(var(--block,8px)*20)] top-[calc(var(--block,8px)*3)]"
      />
      <TitledCrown
        planet="safari"
        className="w-12 absolute left-[calc(var(--block,8px)*0)] top-[calc(var(--block,8px)*17)]"
      />
      <TitledCrown
        planet="bookworld"
        label="book world"
        className="w-12 absolute left-[calc(var(--block,8px)*20)] top-[calc(var(--block,8px)*17)]"
      />
      <TitledCrown
        planet="blacktooth"
        className="w-12 absolute left-[calc(var(--block,8px)*10)] top-[calc(var(--block,8px)*10)]"
      />
      <MenuItems className="hidden" />
    </>
  );
};

export const crownsMenu: Menu = {
  dialogClassName: "bg-pureBlack w-zx h-full block p-0",
  borderClassName: "bg-pureBlack",
  Content: CrownsMenuContent,
  // back menu item in the (hidden) menu just allows exiting more easily by pressing any button that
  // would normally select an item
  items: [backMenuItem],
};
