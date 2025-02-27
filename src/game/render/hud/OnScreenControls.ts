import { Container } from "pixi.js";

import type {
  CharacterName,
  IndividualCharacterName,
} from "../../../model/modelTypes";
import type { Xy } from "../../../utils/vectors/vectors";
import type { GameState } from "../../gameState/GameState";

import type { TickOptions } from "./HudRenderer";
import { objectValues } from "iter-tools";
import { selectAbilities } from "../../gameState/gameStateSelectors/selectPlayableItem";
import { OnScreenJoystick } from "./OnScreenJoystick";
import type { OnScreenButtonName } from "./OnScreenButton";
import { OnScreenButton, buttonSpriteSize } from "./OnScreenButton";

const mainButtonsSpreadPx = 14;

export class OnScreenControls<RoomId extends string> {
  #container = new Container({ label: "OnScreenControls" });

  #hudElements;

  constructor(private gameState: GameState<RoomId>) {
    this.#hudElements = {
      mainButtonNest: new Container({ label: "mainButtonNest" }),
      buttons: {} as Record<OnScreenButtonName, OnScreenButton>,
      joystick: new OnScreenJoystick(gameState.inputStateTracker),
    };

    const buttons = (this.#hudElements.buttons = {
      menu_openOrExit: new OnScreenButton(
        ["menu_openOrExit"],
        gameState.inputStateTracker,
        undefined,
        "hud.char.Menu",
      ),
      jump: new OnScreenButton(["jump"], gameState.inputStateTracker, "green"),
      carry: new OnScreenButton(["carry"], gameState.inputStateTracker, "blue"),
      fire: new OnScreenButton(["fire"], gameState.inputStateTracker, "red"),
      carryAndJump: new OnScreenButton(
        ["carry", "jump"],
        gameState.inputStateTracker,
        "yellow",
      ),
    });

    const { mainButtonNest, joystick } = this.#hudElements;
    mainButtonNest.addChild(buttons.jump.container);
    mainButtonNest.addChild(buttons.carry.container);
    mainButtonNest.addChild(buttons.fire.container);
    mainButtonNest.addChild(buttons.carryAndJump.container);

    buttons.jump.container.y = mainButtonsSpreadPx;
    buttons.carry.container.x = -mainButtonsSpreadPx * 2;
    buttons.carryAndJump.container.y = -mainButtonsSpreadPx;
    buttons.fire.container.x = mainButtonsSpreadPx * 2;

    buttons.menu_openOrExit.container.x = 12;
    buttons.menu_openOrExit.container.y = 12;

    this.#container.addChild(mainButtonNest);
    this.#container.addChild(buttons.menu_openOrExit.container);
    this.#container.addChild(joystick.container);

    this.#initInteractivity();
  }

  #initInteractivity() {}

  /* change the position of elements in the hud (ie, to adjust to different screen sizes) */
  #updateElementPositions(screenSize: Xy) {
    const offsetFromSides = buttonSpriteSize.w + mainButtonsSpreadPx;
    this.#hudElements.mainButtonNest.x = screenSize.x - offsetFromSides;
    this.#hudElements.mainButtonNest.y = screenSize.y - 14;

    this.#hudElements.joystick.container.x = offsetFromSides - 10;
    this.#hudElements.joystick.container.y = screenSize.y - 24;
  }

  /* change the position of elements in the hud (ie, to adjust to different screen sizes) */
  #updateShowAndHide() {
    const { currentCharacterName } = this.gameState;

    const heelsAbilities = selectAbilities(this.gameState, "heels");
    const headAbilities = selectAbilities(this.gameState, "head");

    const carryVisible =
      (this.#characterIsActive(currentCharacterName, "heels") &&
        heelsAbilities?.hasBag) ??
      false;

    this.#hudElements.buttons.carryAndJump.container.visible =
      this.#hudElements.buttons.carry.container.visible = carryVisible;

    const fireVisible =
      (this.#characterIsActive(currentCharacterName, "head") &&
        headAbilities?.hasHooter) ??
      false;

    this.#hudElements.buttons.fire.container.visible = fireVisible;
  }

  #characterIsActive(
    currentCharacterName: CharacterName,
    characterName: IndividualCharacterName,
  ) {
    return (
      currentCharacterName === characterName ||
      currentCharacterName === "headOverHeels"
    );
  }

  tick({ screenSize, colourise }: TickOptions<RoomId>): void {
    this.#updateElementPositions(screenSize);
    for (const b of objectValues(this.#hudElements.buttons)) {
      b.update(colourise);
    }
    this.#updateShowAndHide();
  }

  get container() {
    return this.#container;
  }

  destroy() {
    this.#container.destroy();
  }
}
