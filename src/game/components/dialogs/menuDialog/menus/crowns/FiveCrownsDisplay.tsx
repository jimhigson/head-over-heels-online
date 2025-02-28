import { BitmapText } from "../../../../Sprite";
import { TitledCrown } from "./TitledCrown";

export const FiveCrownsDisplay = () => {
  return (
    <>
      <BitmapText className="block sprites-double-height text-highlightBeige zx:text-zxYellow mx-auto w-max">
        The blacktooth empire
      </BitmapText>

      <TitledCrown
        planet="egyptus"
        className="w-12 absolute left-0 top-3 resGameboy:left-0 resGameboy:top-1"
      />
      <TitledCrown
        planet="penitentiary"
        className="w-12 absolute left-20 top-3 resGameboy:left-14 resGameboy:top-1"
      />
      <TitledCrown
        planet="safari"
        className="w-12 left-0 top-17 absolute resGameboy:left-0 resGameboy:top-8"
      />
      <TitledCrown
        planet="bookworld"
        label="book world"
        className="w-12 absolute left-20 top-17 resGameboy:left-14 resGameboy:top-8"
      />
      <TitledCrown
        planet="blacktooth"
        className="w-12 absolute left-10 top-10 resGameboy:left-7 resGameboy:top-4"
      />
    </>
  );
};
