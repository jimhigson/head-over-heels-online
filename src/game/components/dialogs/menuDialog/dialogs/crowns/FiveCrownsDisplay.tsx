import { BitmapText } from "../../../../tailwindSprites/Sprite";
import { TitledCrown } from "./TitledCrown";

export const FiveCrownsDisplay = () => {
  return (
    <>
      <BitmapText className="block sprites-double-height text-highlightBeige zx:text-zxYellow mx-auto w-max">
        The Blacktooth Empire
      </BitmapText>
      <div className="mx-auto relative w-0 h-1">
        <TitledCrown
          planet="egyptus"
          label="Egyptus"
          className="w-12 absolute left-m10 top-1 resHandheld:left-m8 resHandheld:top-m1 translate-x-[-50%]"
        />
        <TitledCrown
          planet="penitentiary"
          label="Penitentiary"
          className="w-12 absolute left-10 top-1 resHandheld:left-8 resHandheld:top-m1 translate-x-[-50%]"
        />
        <TitledCrown
          planet="safari"
          label="Safari"
          className="w-12 left-m10 top-15 absolute resHandheld:left-m8 resHandheld:top-8 translate-x-[-50%]"
        />
        <TitledCrown
          planet="bookworld"
          label="Book World"
          className="w-12 absolute left-10 top-15 resHandheld:left-8 resHandheld:top-8 translate-x-[-50%]"
        />
        <TitledCrown
          planet="blacktooth"
          label="Blacktooth"
          className="w-12 absolute left-0 top-8 resHandheld:left-0 ml-[-50%] resHandheld:top-3 translate-x-[-50%]"
        />
      </div>
    </>
  );
};
