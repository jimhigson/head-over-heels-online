import { type SwitchSetting } from "../../../model/ItemInPlay";
import { type SwitchConfig } from "../../../model/json/SwitchConfig";
import { selectBooleanUserSetting } from "../../../store/slices/gameMenus/gameMenusSelectors";
import { store } from "../../../store/store";
import { createSprite } from "../createSprite";
import { type ItemAppearance } from "./ItemAppearance";

type SwitchRenderProps = {
  setting: SwitchSetting;
};

const settingFromStore = (
  switchConfig: Extract<SwitchConfig<string, string>, { type: "in-store" }>,
): SwitchSetting => {
  const { userSettings } = store.getState();

  try {
    const boolValue = selectBooleanUserSetting(userSettings, switchConfig.path);
    return boolValue ? "right" : "left";
  } catch (e) {
    throw new Error(
      `Error getting switch setting from store for switch with path "${switchConfig.path}"\n
while store has: ${JSON.stringify(userSettings, null, 2)}`,
      { cause: e },
    );
  }
};

export const switchAppearance: ItemAppearance<"switch", SwitchRenderProps> = ({
  renderContext: {
    item: {
      state: { setting: stateSetting },
      config: switchConfig,
    },
    general: { spritesheetVariants },
  },
  currentRendering,
}) => {
  const currentlyRenderedProps = currentRendering?.renderProps;

  // for store switches, ignore the switch's own state and read from the store:
  const setting =
    switchConfig.type === "in-store" ?
      settingFromStore(switchConfig)
    : stateSetting;

  const render =
    currentlyRenderedProps === undefined ||
    setting !== currentlyRenderedProps.setting;

  if (!render) {
    return "no-update";
  }

  return {
    output: createSprite({
      textureId: `switch.${setting}`,
      spritesheet: spritesheetVariants.currentMainSpritesheet(),
    }),
    renderProps: { setting },
  };
};
