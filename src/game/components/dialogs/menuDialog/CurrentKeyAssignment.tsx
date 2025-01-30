import { twMerge } from "tailwind-merge";
import { useAppSelector } from "../../../../store/hooks";
import { standardControllerButtonNames } from "../../../input/controllers";
import type { BooleanAction } from "../../../input/InputState";
import type { Key } from "../../../input/keys";
import { CssSprite, MultipleBitmapText } from "../../Sprite";

const specialCharClassName =
  "text-moss zx:text-zxGreen selectedMenuItem:text-mossHalfbrite zx:selectedMenuItem:text-zxGreen";

const friendlyKeyName = (key: Key) => {
  const match = /(Numpad|F)(.*)/.exec(key);
  if (match !== null) {
    return (
      <>
        <span className={specialCharClassName}>{match[1]}</span>
        {match[2]}
      </>
    );
  }

  switch (key) {
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
      return key;
  }
};
const friendlyAxisName = (axis: number) => {
  return (
    <>
      <span className={specialCharClassName}>🕹</span>
      {axis === 0 ?
        "⬅➡"
      : axis === 1 ?
        "⬆⬇"
      : `axis${axis}`}
    </>
  );
};

const friendlyButtonName = (button: number) => {
  return (
    <>
      <span className={specialCharClassName}>🕹</span>
      {standardControllerButtonNames[button] ?? button}
    </>
  );
};

type CurrentKeyAssignmentsProp = {
  action: BooleanAction;
  keyClassName?: string;
  className?: string;
  flashingCursor?: boolean;
};

export const CurrentKeyAssignments = ({
  action,
  keyClassName,
  className,
  flashingCursor = false,
}: CurrentKeyAssignmentsProp) => {
  const assignments = useAppSelector((state) =>
    state.assigningInput?.action === action ?
      // assigning input so show provisional:
      state.assigningInput?.inputs
    : state.userSettings.inputAssignment[action],
  );

  return (
    <div className={className}>
      {assignments.keys.map((k) => {
        return (
          <span
            className={twMerge("text-nowrap", keyClassName)}
            key={`key:${k}`}
          >
            <MultipleBitmapText>{friendlyKeyName(k)}</MultipleBitmapText>
          </span>
        );
      })}
      {assignments.gamepadAxes.map((k) => {
        return (
          <span
            className={twMerge("text-nowrap", keyClassName)}
            key={`key:${k}`}
          >
            <MultipleBitmapText>{friendlyAxisName(k)}</MultipleBitmapText>
          </span>
        );
      })}
      {assignments.gamepadButtons.map((k) => {
        return (
          <span
            className={twMerge("text-nowrap", keyClassName)}
            key={`key:${k}`}
          >
            <MultipleBitmapText>{friendlyButtonName(k)}</MultipleBitmapText>
          </span>
        );
      })}
      {flashingCursor && (
        <CssSprite className="texture-hud.char.space bg-[currentColor] animate-flash" />
      )}
    </div>
  );
};
