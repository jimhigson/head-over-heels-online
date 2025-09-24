import type { SwitchSetting } from "../../../model/ItemInPlay";
import type { ItemAppearance } from "./ItemAppearance";

import { selectBooleanUserSetting } from "../../../store/slices/gameMenus/gameMenusSelectors";
import { store } from "../../../store/store";
import { createSprite } from "../createSprite";

type SwitchRenderProps = {
  setting: SwitchSetting;
};

export const switchAppearance: ItemAppearance<"switch", SwitchRenderProps> = ({
  renderContext: {
    item: {
      state: { setting: stateSetting },
      config: switchConfig,
    },
  },
  currentRendering,
}) => {
  const currentlyRenderedProps = currentRendering?.renderProps;

  // for store switches, ignore the switch's own state and read from the store:
  const setting =
    switchConfig.type === "in-store" ?
      selectBooleanUserSetting(store.getState().gameMenus, switchConfig.path) ?
        "right"
      : "left"
    : stateSetting;

  const render =
    currentlyRenderedProps === undefined ||
    setting !== currentlyRenderedProps.setting;

  if (!render) {
    return "no-update";
  }

  return {
    output: createSprite(`switch.${setting}`),
    renderProps: { setting },
  };
};
