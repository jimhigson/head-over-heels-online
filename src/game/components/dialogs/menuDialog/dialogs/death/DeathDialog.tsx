import type { DeathMenuParam } from "../../../../../../store/slices/gameMenus/gameMenusSlice";

import { pokeableToNumber } from "../../../../../../model/ItemStateMap";
import { backToParentMenu } from "../../../../../../store/slices/gameMenus/gameMenusSlice";
import { useDispatchActionCallback } from "../../../../../../store/useDispatchActionCallback";
import { Dialog } from "../../../../../../ui/Dialog";
import { DialogPortal } from "../../../../../../ui/DialogPortal";
import { detectDeviceType } from "../../../../../../utils/detectEnv/detectDeviceType";
import {
  BitmapText,
  MultipleBitmapText,
} from "../../../../tailwindSprites/BitmapText";
import { useActionTap } from "../../../useActionTap";
import { CurrentKeyAssignments } from "../../CurrentKeyAssignments";
import { multilineTextClass } from "../../multilineTextClass";

const highlightClass = "text-zxWhite";

type DeathOutcome =
  | { kind: "carryOnAlone"; outOfGameName: string; survivorName: string }
  | {
      kind: "donate";
      dyingName: string;
      donorName: string;
      livesToDonate: 1 | 2;
    }
  | { kind: "gameOver" }
  | { kind: "respawn" };

const deathOutcome = ({
  dyingCharacterName,
  headLives: rawHeadLives,
  heelsLives: rawHeelsLives,
}: DeathMenuParam): DeathOutcome => {
  const headLives = pokeableToNumber(rawHeadLives);
  const heelsLives = pokeableToNumber(rawHeelsLives);

  if (dyingCharacterName === "headOverHeels") {
    const minLives = Math.min(headLives, heelsLives);
    const maxLives = Math.max(headLives, heelsLives);

    if (minLives <= 1 && maxLives >= 2) {
      const donorName = headLives > heelsLives ? "Head" : "Heels";
      const dyingName = headLives > heelsLives ? "Heels" : "Head";
      return {
        kind: "donate",
        dyingName,
        donorName,
        livesToDonate: maxLives === 2 ? 1 : 2,
      };
    }

    if (minLives <= 1 && maxLives <= 1) {
      return { kind: "gameOver" };
    }

    return { kind: "respawn" };
  }

  const dyingLives = dyingCharacterName === "head" ? headLives : heelsLives;
  const otherLives = dyingCharacterName === "head" ? heelsLives : headLives;
  const otherName = dyingCharacterName === "head" ? "Heels" : "Head";

  if (dyingLives > 1) {
    return { kind: "respawn" };
  }

  if (otherLives >= 2) {
    const dyingName = dyingCharacterName === "head" ? "Head" : "Heels";
    return {
      kind: "donate",
      dyingName,
      donorName: otherName,
      livesToDonate: otherLives === 2 ? 1 : 2,
    };
  }

  if (otherLives >= 1) {
    const outOfGameName = dyingCharacterName === "head" ? "Head" : "Heels";
    return { kind: "carryOnAlone", outOfGameName, survivorName: otherName };
  }

  return { kind: "gameOver" };
};

const headColourClass = "text-zxCyan toppy:text-toppyCool2";
const heelsColourClass = "text-zxMagenta toppy:text-toppyPink2";

const characterColourClass = (name: string) =>
  name === "Head" ? headColourClass : heelsColourClass;

type OutcomeMessageProps = {
  outcome: DeathOutcome;
};

const OutcomeMessage = ({ outcome }: OutcomeMessageProps) => {
  switch (outcome.kind) {
    case "respawn":
      return null;
    case "donate":
      return (
        <div
          className={`${multilineTextClass} px-1 my-1 bg-zxBlack py-oneScaledPix flex flex-col gap-1`}
          data-test-id="death-outcome-message"
        >
          <MultipleBitmapText>
            <div>
              <span className={characterColourClass(outcome.donorName)}>
                {outcome.donorName}
              </span>{" "}
              will donate{" "}
              <span className={highlightClass}>{outcome.livesToDonate}</span>{" "}
              {outcome.livesToDonate === 1 ? "life" : "lives"}
            </div>
            <div>
              so{" "}
              <span className={characterColourClass(outcome.dyingName)}>
                {outcome.dyingName}
              </span>{" "}
              can continue with <span className={highlightClass}>1</span>
            </div>
          </MultipleBitmapText>
        </div>
      );
    case "carryOnAlone":
      return (
        <div
          className={`${multilineTextClass} px-1 my-1 bg-zxBlack py-oneScaledPix`}
          data-test-id="death-outcome-message"
        >
          <MultipleBitmapText>
            <div>
              <span className={characterColourClass(outcome.outOfGameName)}>
                {outcome.outOfGameName}
              </span>{" "}
              out of the game
            </div>
            <div>
              <span className={characterColourClass(outcome.survivorName)}>
                {outcome.survivorName}
              </span>{" "}
              will carry on alone
            </div>
          </MultipleBitmapText>
        </div>
      );
    case "gameOver":
      return (
        <div
          className={`${multilineTextClass} px-1 my-1 bg-zxBlack py-oneScaledPix`}
          data-test-id="death-outcome-message"
        >
          <BitmapText className={highlightClass}>Game over</BitmapText>
        </div>
      );
    default:
      return outcome satisfies never;
  }
};

const actionText = (outcome: DeathOutcome): string => {
  switch (outcome.kind) {
    case "respawn":
    case "donate":
      return "respawn";
    case "carryOnAlone":
      return `continue as ${outcome.survivorName}`;
    case "gameOver":
      return "continue";
    default:
      return outcome satisfies never;
  }
};

export type DeathDialogProps = DeathMenuParam;

export const DeathDialog = (props: DeathDialogProps) => {
  const dismiss = useDispatchActionCallback(backToParentMenu);
  const outcome = deathOutcome(props);
  const action = actionText(outcome);

  useActionTap({
    action: "jump",
    handler: dismiss,
  });

  return (
    <DialogPortal>
      <Dialog
        className="!h-min !w-max text-center toppy:text-toppyWarm1 p-0 bg-transparent text-zxYellow"
        onClick={dismiss}
        dialogId="death"
      >
        <BitmapText className="block w-min mx-auto px-1 sprites-double-height bg-zxBlack py-oneScaledPix sprites-uppercase">
          Uh-oh!
        </BitmapText>
        <span className="zx">
          <OutcomeMessage outcome={outcome} />
          {detectDeviceType() === "desktop" ?
            <div
              className={`${multilineTextClass} px-1 bg-zxBlack py-oneScaledPix`}
            >
              <MultipleBitmapText>
                Press <span className={highlightClass}>JUMP</span> to{" "}
                <span className={highlightClass}>{action}</span>:
              </MultipleBitmapText>
              <div className="flex flex-row gap-1 mx-auto">
                <CurrentKeyAssignments
                  className="flex flex-row gap-1"
                  keyClassName="text-zxRed toppy:text-toppyPink2"
                  action="jump"
                  doNotShowForAction="carry"
                />
              </div>
            </div>
          : <div
              className={`${multilineTextClass} px-1 bg-zxBlack py-oneScaledPix`}
            >
              <BitmapText className="me-1 text-zxRed toppy:text-toppyPink2">
                Tap screen
              </BitmapText>
              <BitmapText>to {action}</BitmapText>
            </div>
          }
        </span>
      </Dialog>
    </DialogPortal>
  );
};
