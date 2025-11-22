interface NonStandardIosNavigator extends Navigator {
  standalone?: boolean;
}

export type DeploymentType = "browser" | "pwa" | "tauri";

export const detectDeploymentType = (): DeploymentType =>
  import.meta.env.TAURI_ENV_PLATFORM ? "tauri"
  : (
    window.matchMedia("(display-mode: standalone)").matches ||
    (window.navigator as NonStandardIosNavigator).standalone
  ) ?
    "pwa"
  : "browser";
