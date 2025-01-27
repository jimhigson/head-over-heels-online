import type { AssignableInput } from "../../../input/InputState";
import { BitmapText, CssSprite, MultipleBitmapText } from "../../Sprite";
import { twMerge } from "tailwind-merge";

const friendlyName = (k: AssignableInput) => {
  const specialCharClassName = "text-moss zx:text-zxGreenDimmed";

  const joystickRegex = /joystick:((?<button>\d+)|(?<axis>x|y))/;
  const joystickMatch = joystickRegex.exec(k);
  if (joystickMatch !== null) {
    const { button, axis } = joystickMatch.groups!;

    if (button) {
      return (
        <>
          <span className={specialCharClassName}>🕹</span>
          {axis === "x" ? "⬅➡" : "⬆⬇"}
        </>
      );
    }
    if (axis) {
      return (
        <>
          <span className={specialCharClassName}>🕹</span>
          {axis === "x" ? "⬅➡" : "⬆⬇"}
        </>
      );
    }
  }

  const match = /(Numpad|F)(.*)/.exec(k);
  if (match !== null) {
    return (
      <>
        <span className={specialCharClassName}>{match[1]}</span>
        {match[2]}
      </>
    );
  }

  switch (k) {
    case " ":
      return "space";
    case "ArrowDown":
      return (
        <>
          <span className={specialCharClassName}>Cursor</span>⬇
        </>
      );
    case "ArrowUp":
      return (
        <>
          <span className={specialCharClassName}>Cursor</span>⬆
        </>
      );
    case "ArrowLeft":
      return (
        <>
          <span className={specialCharClassName}>Cursor</span>⬅
        </>
      );
    case "ArrowRight":
      return (
        <>
          <span className={specialCharClassName}>Cursor</span>➡
        </>
      );
    default:
      return k;
  }
};

export const CurrentKeyAssignment = ({
  inputs,
  deliminatorClassName,
  keyClassName,
  className,
  flashingCursor = false,
  noCommas = false,
}: {
  inputs: Readonly<AssignableInput[]>;
  deliminatorClassName?: string;
  keyClassName?: string;
  className?: string;
  flashingCursor?: boolean;
  noCommas?: boolean;
}) => {
  return (
    <div className={className}>
      {inputs.map((k, i) => {
        const isNotLast = i < inputs.length - 1;
        return (
          <span className="text-nowrap" key={k}>
            <MultipleBitmapText className={keyClassName}>
              {friendlyName(k)}
            </MultipleBitmapText>
            {!noCommas && isNotLast && (
              <BitmapText className={twMerge("me-1", deliminatorClassName)}>
                ,
              </BitmapText>
            )}
          </span>
        );
      })}
      {flashingCursor && (
        <CssSprite className="texture-hud.char.space bg-[currentColor] animate-flash" />
      )}
    </div>
  );
};
