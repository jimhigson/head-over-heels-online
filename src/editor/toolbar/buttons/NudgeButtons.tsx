import { type ComponentChildren } from "preact";

import { twClass } from "../../../utils/twClass.tsx" with { type: "macro" };
import { type DirectionXyz4 } from "../../../utils/vectors/vectors";
import { CommandToolbarButton } from "../../commands/CommandToolbarButton";
import { nudgeCommandDefinitions } from "../../commands/nudgeCommandDefinitions";
import { type NudgeKind, nudgeKinds } from "../../slice/levelEditorSlice";

const lineContainerClassName = twClass(
  "flex flex-row flex-wrap gap-x-0 gap-y-oneScaledPix items-center mt-1 w-full",
);

const lineTitleHeaderClassName = twClass(
  "inline-block mr-1 text-lightGrey pr-oneScaledPix min-w-6",
);

const buttonsClassName = twClass(
  "flex flex-row flex-wrap gap-oneScaledPix items-center",
);

const forwardDirections = [
  "left",
  "right",
  "away",
  "towards",
  "up",
  "down",
] as const satisfies DirectionXyz4[];

const nudgeRows = {
  move: { label: "Move:", directions: forwardDirections },
  multiplyOrGrow: { label: "Multiply:", directions: forwardDirections },
  removeOrShrink: {
    label: "Shrink:",
    directions: ["right", "left", "towards", "away", "down", "up"],
  },
} as const satisfies Record<
  NudgeKind,
  { label: string; directions: readonly DirectionXyz4[] }
>;

export type ButtonRowProps = {
  label: string;
  children: ComponentChildren;
};

const ButtonRow = ({ label, children }: ButtonRowProps) => (
  <div class={lineContainerClassName}>
    <span class={lineTitleHeaderClassName}>{label}</span>
    <div class="flex-grow" />
    <div class={buttonsClassName}>{children}</div>
  </div>
);

export const NudgeButtons = () => (
  <>
    {nudgeKinds.map((nudgeKind) => {
      const { label, directions } = nudgeRows[nudgeKind];
      return (
        <ButtonRow key={nudgeKind} label={label}>
          {directions.map((direction) => (
            <CommandToolbarButton
              key={direction}
              small
              command={nudgeCommandDefinitions[`${nudgeKind}.${direction}`]}
            />
          ))}
        </ButtonRow>
      );
    })}
    <ButtonRow label="Rotate:">
      <CommandToolbarButton
        small
        command={nudgeCommandDefinitions["rotate.anticlockwise"]}
      />
      <CommandToolbarButton
        small
        command={nudgeCommandDefinitions["rotate.clockwise"]}
      />
    </ButtonRow>
  </>
);
