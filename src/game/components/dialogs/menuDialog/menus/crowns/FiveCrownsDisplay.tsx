import { BitmapText } from "../../../../Sprite";
import { TitledCrown } from "./TitledCrown";

export const FiveCrownsDisplay = () => {
  return (
    <>
      <BitmapText className="block sprites-double-height text-highlightBeige ml-6">
        The blacktooth empire
      </BitmapText>
      <TitledCrown
        planet="egyptus"
        className="w-12 absolute left-[calc(var(--block,8px)*0)] top-[calc(var(--block,8px)*3)]" />
      <TitledCrown
        planet="penitentiary"
        className="w-12 absolute left-[calc(var(--block,8px)*20)] top-[calc(var(--block,8px)*3)]" />
      <TitledCrown
        planet="safari"
        className="w-12 absolute left-[calc(var(--block,8px)*0)] top-[calc(var(--block,8px)*17)]" />
      <TitledCrown
        planet="bookworld"
        label="book world"
        className="w-12 absolute left-[calc(var(--block,8px)*20)] top-[calc(var(--block,8px)*17)]" />
      <TitledCrown
        planet="blacktooth"
        className="w-12 absolute left-[calc(var(--block,8px)*10)] top-[calc(var(--block,8px)*10)]" />
    </>
  );
};
