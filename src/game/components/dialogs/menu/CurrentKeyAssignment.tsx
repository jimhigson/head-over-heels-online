import type { AssignableInput, Action } from "@/game/input/InputState";
import { useAppSelector } from "@/store/hooks";
import type { Color } from "pixi.js";
import { Fragment } from "react";
import { BitmapText } from "../../Sprite";

const friendlyName = (k: AssignableInput) => {
  if (k.startsWith("joystick:")) {
    return k.replace("joystick:", "🕹");
  }

  switch (k) {
    case " ":
      return "space";
    case "ArrowDown":
      return "Cursor⬇";
    case "ArrowUp":
      return "Cursor⬆";
    case "ArrowLeft":
      return "Cursor⬅";
    case "ArrowRight":
      return "Cursor➡";
    default:
      return k;
  }
};

export const CurrentKeyAssignment = ({
  action,
  deliminatorColor,
  keyColor,
  className,
}: {
  action: Action;
  deliminatorColor: Color;
  keyColor: Color;
  className?: string;
}) => {
  const keys = useAppSelector((state) => {
    return state.keyAssignment[action];
  });

  return (
    <div className={className}>
      {keys.map((k, i) => {
        const isNotLast = i < keys.length - 1;
        return (
          <Fragment key={k}>
            <BitmapText colour={keyColor} noSpaceAfter={isNotLast}>
              {friendlyName(k)}
            </BitmapText>
            {isNotLast && <BitmapText colour={deliminatorColor}>,</BitmapText>}
          </Fragment>
        );
      })}
    </div>
  );
};
