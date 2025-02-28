import { BitmapText } from "../../../../Sprite";
import { TitledCrown } from "./TitledCrown";

export const FiveCrownsDisplay = () => {
  return (
    <>
      <BitmapText className="block sprites-double-height text-highlightBeige zx:text-zxYellow mx-auto w-max">
        The blacktooth empire
      </BitmapText>
      <TitledCrown planet="egyptus" className="w-12 absolute left-0 top-1" />
      <TitledCrown
        planet="penitentiary"
        className="w-12 absolute left-14 top-1"
      />
      <TitledCrown planet="safari" className="w-12 absolute left-0 top-8" />
      <TitledCrown
        planet="bookworld"
        label="book world"
        className="w-12 absolute left-14 top-8"
      />
      <TitledCrown planet="blacktooth" className="w-12 absolute left-7 top-4" />
    </>
  );
};
