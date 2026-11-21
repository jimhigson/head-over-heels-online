import { livesAfterLosingLife } from "../../../../../../game/gameState/mutators/livesAfterLosingLife";
import { pokeableToNumber } from "../../../../../../model/ItemStateMap";
import { closeMenuThunk } from "../../../../../../store/slices/gameMenus/closeMenuThunk";
import type { DeathMenuParam } from "../../../../../../store/slices/gameMenus/gameMenusSlice";
import { useDispatchActionCallback } from "../../../../../../store/useDispatchActionCallback";
import { Dialog } from "../../../../../../ui/Dialog";
import { DialogPortal } from "../../../../../../ui/DialogPortal";
import { detectDeviceType } from "../../../../../../utils/detectEnv/detectDeviceType";
import { useActionTap } from "../../../useActionTap";
import { CurrentKeyAssignments } from "../../CurrentKeyAssignments";

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

/**
 * what this death leads to, worked out by applying the game's own lives rules
 * to copies of the lives as they were when the character died
 */
const deathOutcome = ({
  dyingCharacterName,
  headLives,
  heelsLives,
}: DeathMenuParam): DeathOutcome => {
  // a death in symbiosis costs both of them a life, head's first
  const headLoses = dyingCharacterName !== "heels";
  const heelsLoses = dyingCharacterName !== "head";
  let headLivesAfter = headLives;
  let heelsLivesAfter = heelsLives;
  if (headLoses) {
    ({ losingLives: headLivesAfter, otherLives: heelsLivesAfter } =
      livesAfterLosingLife(headLivesAfter, heelsLivesAfter, -1));
  }
  if (heelsLoses) {
    ({ losingLives: heelsLivesAfter, otherLives: headLivesAfter } =
      livesAfterLosingLife(heelsLivesAfter, headLivesAfter, -1));
  }

  const headBefore = pokeableToNumber(headLives);
  const heelsBefore = pokeableToNumber(heelsLives);
  const headAfter = pokeableToNumber(headLivesAfter);
  const heelsAfter = pokeableToNumber(heelsLivesAfter);

  if (headAfter === 0 && heelsAfter === 0) {
    return { kind: "gameOver" };
  }
  if (headBefore > 0 && headAfter === 0) {
    return {
      kind: "carryOnAlone",
      outOfGameName: "Head",
      survivorName: "Heels",
    };
  }
  if (heelsBefore > 0 && heelsAfter === 0) {
    return {
      kind: "carryOnAlone",
      outOfGameName: "Heels",
      survivorName: "Head",
    };
  }
  // a character left with nothing by its own death but carrying on was given
  // a life by the other, at the cost of the other's lives beyond its own death
  if (headLoses && headBefore - 1 === 0) {
    return {
      kind: "donate",
      dyingName: "Head",
      donorName: "Heels",
      livesToDonate:
        heelsBefore - (heelsLoses ? 1 : 0) - heelsAfter === 1 ? 1 : 2,
    };
  }
  if (heelsLoses && heelsBefore - 1 === 0) {
    return {
      kind: "donate",
      dyingName: "Heels",
      donorName: "Head",
      livesToDonate: headBefore - (headLoses ? 1 : 0) - headAfter === 1 ? 1 : 2,
    };
  }
  return { kind: "respawn" };
};

const headColourClass = "text-zxCyan toppy:text-toppyCool2";
const heelsColourClass = "text-zxMagenta toppy:text-toppyPink2";

const characterColourClass = (name: string) =>
  name === "Head" ? headColourClass : heelsColourClass;

export type LostLifeMessageProps = {
  dyingCharacterName: DeathMenuParam["dyingCharacterName"];
};

/**
 * who lost the life - which of two dialogs queued by deaths close together
 * this one is
 */
const LostLifeMessage = ({ dyingCharacterName }: LostLifeMessageProps) => (
  <div
    class="px-1 bg-zxBlack py-oneScaledPix"
    data-test-id="death-lost-life-message"
  >
    <span class="text-single-line">
      {dyingCharacterName === "headOverHeels" ?
        <>
          <span class={headColourClass}>Head</span> and{" "}
          <span class={heelsColourClass}>Heels</span>
        </>
      : dyingCharacterName === "head" ?
        <span class={headColourClass}>Head</span>
      : <span class={heelsColourClass}>Heels</span>}{" "}
      lost a life
      {dyingCharacterName === "headOverHeels" ? " each" : ""}
    </span>
  </div>
);

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
          class="text-multi-line px-1 my-1 bg-zxBlack py-oneScaledPix flex flex-col gap-1"
          data-test-id="death-outcome-message"
        >
          <div>
            <span class={characterColourClass(outcome.donorName)}>
              {outcome.donorName}
            </span>{" "}
            will donate{" "}
            <span class={highlightClass}>{outcome.livesToDonate}</span>{" "}
            {outcome.livesToDonate === 1 ? "life" : "lives"}
          </div>
          <div>
            so{" "}
            <span class={characterColourClass(outcome.dyingName)}>
              {outcome.dyingName}
            </span>{" "}
            can continue with <span class={highlightClass}>1</span>
          </div>
        </div>
      );
    case "carryOnAlone":
      return (
        <div
          class="text-multi-line px-1 my-1 bg-zxBlack py-oneScaledPix"
          data-test-id="death-outcome-message"
        >
          <div>
            <span class={characterColourClass(outcome.outOfGameName)}>
              {outcome.outOfGameName}
            </span>{" "}
            is out of the game
          </div>
          <div>
            <span class={characterColourClass(outcome.survivorName)}>
              {outcome.survivorName}
            </span>{" "}
            will carry on alone
          </div>
        </div>
      );
    case "gameOver":
      return (
        <div
          class="px-1 my-1 bg-zxBlack py-oneScaledPix"
          data-test-id="death-outcome-message"
        >
          <span class={`${highlightClass} text-single-line`}>Game over</span>
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

const DeathDialog = (props: DeathDialogProps) => {
  const dismiss = useDispatchActionCallback(closeMenuThunk, "death");
  const outcome = deathOutcome(props);
  const action = actionText(outcome);

  useActionTap({
    action: "jump",
    handler: dismiss,
  });

  return (
    <DialogPortal>
      <Dialog
        class="!h-min !w-max text-center toppy:text-toppyWarm1 p-0 bg-transparent text-zxYellow"
        onClick={dismiss}
        dialogId="death"
      >
        <div class="w-min mx-auto px-1 bg-zxBlack py-oneScaledPix uppercase">
          <span class="text-double-height text-nowrap">Uh-oh!</span>
        </div>
        <span class="zx">
          <LostLifeMessage dyingCharacterName={props.dyingCharacterName} />
          <OutcomeMessage outcome={outcome} />
          {detectDeviceType() === "desktop" ?
            <div class="text-multi-line px-1 bg-zxBlack py-oneScaledPix">
              <div class="text-single-line">
                Press <span class={highlightClass}>JUMP</span> to{" "}
                <span class={highlightClass}>{action}</span>:
              </div>
              <div class="flex flex-row gap-1 mx-auto">
                <CurrentKeyAssignments
                  class="flex flex-row gap-1"
                  keyClassName="text-zxRed toppy:text-toppyPink2"
                  action="jump"
                  doNotShowForAction="carry"
                />
              </div>
            </div>
          : <div class="px-1 bg-zxBlack py-oneScaledPix">
              <span class="text-zxRed toppy:text-toppyPink2 text-single-line">
                Tap screen
              </span>{" "}
              <span class="text-single-line">to {action}</span>
            </div>
          }
        </span>
      </Dialog>
    </DialogPortal>
  );
};

export default DeathDialog;
