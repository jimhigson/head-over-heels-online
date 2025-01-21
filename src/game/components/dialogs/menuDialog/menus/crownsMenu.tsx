import type { Menu } from "../menus";
import { BitmapText } from "../../../Sprite";
import type { PlanetName } from "../../../../../sprites/planets";
import { PixiSprite } from "../../../PixiSprite";

const TitledCrown = ({
  planet,
  className,
  label = planet,
}: {
  planet: PlanetName;
  label?: string;
  className?: string;
}) => {
  return (
    <div className={`flex flex-col ${className}`}>
      <PixiSprite
        className="block mx-auto"
        textureId="crown"
        revertColourTo="pink"
      />
      <PixiSprite
        className="block mx-auto"
        textureId="ball"
        revertColourTo="highlightBeige"
      />
      <BitmapText className="block mx-auto text-pink">{label}</BitmapText>
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
    </>
  );
};

export const crownsMenu: Menu = {
  dialogClassName: "bg-pureBlack w-zx h-full block p-0",
  borderClassName: "bg-pureBlack",
  Content: CrownsMenuContent,
  items: [],
};
