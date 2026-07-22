import { type EditorJsonItemUnion } from "./editorTypes";

/**
 * the distinct enable/disable states the editor can put an item into, regardless
 * of how each item type stores it (a `disabled` boolean vs an `activated` value)
 */
export type ActivationState =
  "disabled" | "enabled" | "enabledOnPlayerNear" | "enabledOnStand";

export const activationLabel = {
  enabled: "Enable",
  disabled: "Disable",
  enabledOnPlayerNear: "Wake on player near",
  enabledOnStand: "Enable on stand",
} as const satisfies Record<ActivationState, string>;

export type ItemActivation = {
  /** the states this item is able to be put into */
  supported: ActivationState[];
  /** the state the item is currently in */
  current: ActivationState;
};

/**
 * describe how an item expresses enabled/disabled (and any extra states), or
 * undefined if the item type has no enable/disable concept
 */
export const activationForItem = (
  item: EditorJsonItemUnion,
): ItemActivation | undefined => {
  switch (item.type) {
    case "deadlyBlock":
    case "conveyor":
      return {
        supported: ["enabled", "disabled"],
        current: item.config.disabled ? "disabled" : "enabled",
      };
    case "monster":
      if (item.config.which === "cyberman") {
        return {
          supported: ["enabled", "enabledOnPlayerNear", "disabled"],
          current:
            item.config.activated === "off" ? "disabled"
            : item.config.activated === "after-player-near" ?
              "enabledOnPlayerNear"
            : "enabled",
        };
      }
      return {
        supported: ["enabled", "disabled"],
        current: item.config.activated === "off" ? "disabled" : "enabled",
      };
    case "movingPlatform":
      return {
        supported: ["enabled", "enabledOnStand", "disabled"],
        current:
          item.config.activated === "off" ? "disabled"
          : item.config.activated === "on-stand" ? "enabledOnStand"
          : "enabled",
      };
    case "charles":
      return {
        supported: ["enabled", "disabled"],
        current: item.config.activated === false ? "disabled" : "enabled",
      };
    case "lamp":
      return {
        supported: ["enabled", "disabled"],
        // activated is undefined-means-on, so only an explicit false is disabled:
        current: item.config.activated === false ? "disabled" : "enabled",
      };
    default:
      return undefined;
  }
};

/**
 * put an item into the given activation state, mutating its config in place.
 * No-op for item types with no enable/disable concept.
 */
export const setItemActivationInPlace = (
  item: EditorJsonItemUnion,
  activation: ActivationState,
): void => {
  switch (item.type) {
    case "deadlyBlock":
    case "conveyor":
      // enabled is the default, so omit the property rather than storing false:
      if (activation === "disabled") {
        item.config.disabled = true;
      } else {
        delete item.config.disabled;
      }
      return;
    case "monster":
      if (item.config.which === "cyberman") {
        item.config.activated =
          activation === "disabled" ? "off"
          : activation === "enabledOnPlayerNear" ? "after-player-near"
          : "on";
      } else {
        item.config.activated = activation === "disabled" ? "off" : "on";
      }
      return;
    case "movingPlatform":
      item.config.activated =
        activation === "disabled" ? "off"
        : activation === "enabledOnStand" ? "on-stand"
        : "on";
      return;
    case "charles":
      // enabled is the default, so omit the property rather than storing true:
      if (activation === "disabled") {
        item.config.activated = false;
      } else {
        delete item.config.activated;
      }
      return;
    case "lamp":
      // lamps are placed activated; set the boolean explicitly either way:
      item.config.activated = activation !== "disabled";
      return;
  }
};
