import { standardControllerButtonNames } from "../../../input/controllers";
import type { ActionInputAssignment } from "../../../input/InputState";
import type { Key } from "../../../input/keys";
import { CssSprite, MultipleBitmapText } from "../../Sprite";

const specialCharClassName =
  "text-moss zx:text-zxGreenDimmed selectedMenuItem:text-mossHalfbrite zx:selectedMenuItem:text-zxGreenDimmed";

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
  assignments: Readonly<ActionInputAssignment>;
  keyClassName?: string;
  className?: string;
  flashingCursor?: boolean;
};

export const CurrentKeyAssignments = ({
  assignments,
  keyClassName,
  className,
  flashingCursor = false,
}: CurrentKeyAssignmentsProp) => {
  return (
    <div className={className}>
      {assignments.keys.map((k) => {
        return (
          <span className="text-nowrap" key={`key:${k}`}>
            <MultipleBitmapText className={keyClassName}>
              {friendlyKeyName(k)}
            </MultipleBitmapText>
          </span>
        );
      })}
      {assignments.gamepadAxes.map((k) => {
        return (
          <span className="text-nowrap" key={`key:${k}`}>
            <MultipleBitmapText className={keyClassName}>
              {friendlyAxisName(k)}
            </MultipleBitmapText>
          </span>
        );
      })}
      {assignments.gamepadButtons.map((k) => {
        return (
          <span className="text-nowrap" key={`key:${k}`}>
            <MultipleBitmapText className={keyClassName}>
              {friendlyButtonName(k)}
            </MultipleBitmapText>
          </span>
        );
      })}
      {flashingCursor && (
        <CssSprite className="texture-hud.char.space bg-[currentColor] animate-flash" />
      )}
    </div>
  );
};
