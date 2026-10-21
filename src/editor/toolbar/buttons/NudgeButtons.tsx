import { twClass } from "../../../utils/twClass" with { type: "macro" };
import { CommandToolbarButton } from "../../commands/CommandToolbarButton";
import { nudgeCommandDefinitions } from "../../commands/nudgeCommandDefinitions";

const lineContainerClassName = twClass(
  "flex flex-row flex-wrap gap-x-0 gap-y-oneScaledPix items-center mt-1 w-full",
);

const lineTitleHeaderClassName = twClass(
  "inline-block mr-1 text-lightGrey pr-oneScaledPix min-w-6",
);

const buttonsClassName = twClass(
  "flex flex-row flex-wrap gap-oneScaledPix items-center",
);

export const NudgeButtons = () => (
  <div class={lineContainerClassName}>
    <span class={lineTitleHeaderClassName}>{"Move:"}</span>
    <div class="flex-grow" />
    <div class={buttonsClassName}>
      <CommandToolbarButton
        small
        command={nudgeCommandDefinitions["move.left"]}
      />
      <CommandToolbarButton
        small
        command={nudgeCommandDefinitions["move.right"]}
      />
      <CommandToolbarButton
        small
        command={nudgeCommandDefinitions["move.away"]}
      />
      <CommandToolbarButton
        small
        command={nudgeCommandDefinitions["move.towards"]}
      />
      <CommandToolbarButton
        small
        command={nudgeCommandDefinitions["move.up"]}
      />
      <CommandToolbarButton
        small
        command={nudgeCommandDefinitions["move.down"]}
      />
    </div>

    <div class={lineContainerClassName}>
      <span class={lineTitleHeaderClassName}>{"Multiply:"}</span>
      <div class="flex-grow" />
      <div class={buttonsClassName}>
        <CommandToolbarButton
          small
          command={nudgeCommandDefinitions["multiply.left"]}
        />
        <CommandToolbarButton
          small
          command={nudgeCommandDefinitions["multiply.right"]}
        />
        <CommandToolbarButton
          small
          command={nudgeCommandDefinitions["multiply.away"]}
        />
        <CommandToolbarButton
          small
          command={nudgeCommandDefinitions["multiply.towards"]}
        />
        <CommandToolbarButton
          small
          command={nudgeCommandDefinitions["multiply.up"]}
        />
        <CommandToolbarButton
          small
          command={nudgeCommandDefinitions["multiply.down"]}
        />
      </div>
    </div>

    <div class={lineContainerClassName}>
      <span class={lineTitleHeaderClassName}>Shrink:</span>
      <div class="flex-grow" />
      <div class={buttonsClassName}>
        <CommandToolbarButton
          small
          command={nudgeCommandDefinitions["shrink.right"]}
        />
        <CommandToolbarButton
          small
          command={nudgeCommandDefinitions["shrink.left"]}
        />
        <CommandToolbarButton
          small
          command={nudgeCommandDefinitions["shrink.towards"]}
        />
        <CommandToolbarButton
          small
          command={nudgeCommandDefinitions["shrink.away"]}
        />
        <CommandToolbarButton
          small
          command={nudgeCommandDefinitions["shrink.down"]}
        />
        <CommandToolbarButton
          small
          command={nudgeCommandDefinitions["shrink.up"]}
        />
      </div>
    </div>

    <div class={lineContainerClassName}>
      <span class={lineTitleHeaderClassName}>Rotate:</span>
      <div class="flex-grow" />
      <div class={buttonsClassName}>
        <CommandToolbarButton
          small
          command={nudgeCommandDefinitions["rotate.anticlockwise"]}
        />
        <CommandToolbarButton
          small
          command={nudgeCommandDefinitions["rotate.clockwise"]}
        />
      </div>
    </div>
  </div>
);
