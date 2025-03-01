import { BitmapText } from "../../../../Sprite";
import { TitledCrown } from "./TitledCrown";

export const FiveCrownsDisplay = () => {
  return (
    <>
      <BitmapText className="block sprites-double-height text-highlightBeige zx:text-zxYellow mx-auto w-max">
        The blacktooth empire
      </BitmapText>
      <div className="mx-auto relative w-0 h-1">
        <TitledCrown
          planet="egyptus"
          className="w-12 absolute left-m10 top-1 resGameboy:left-m8 resGameboy:top-m1 translate-x-[-50%]"
        />
        <TitledCrown
          planet="penitentiary"
          className="w-12 absolute left-10 top-1 resGameboy:left-8 resGameboy:top-m1 translate-x-[-50%]"
        />
        <TitledCrown
          planet="safari"
          className="w-12 left-m10 top-15 absolute resGameboy:left-m8 resGameboy:top-6 translate-x-[-50%]"
        />
        <TitledCrown
          planet="bookworld"
          label="book world"
          className="w-12 absolute left-10 top-15 resGameboy:left-8 resGameboy:top-6 translate-x-[-50%]"
        />
        <TitledCrown
          planet="blacktooth"
          className="w-12 absolute left-0 top-8 resGameboy:left-0 ml-[-50%] resGameboy:top-2 translate-x-[-50%]"
        />
      </div>
    </>
  );
};
