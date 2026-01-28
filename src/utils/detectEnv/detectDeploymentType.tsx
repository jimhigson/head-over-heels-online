import { typedURLSearchParams } from "../../options/queryParams";

interface NonStandardIosNavigator extends Navigator {
  standalone?: boolean;
}

export const deploymentTypes = ["browser", "pwa", "tauri"] as const;
export type DeploymentType = (typeof deploymentTypes)[number];

/**
 * Detect the deployment type, with support for overriding via `?deployment=` query param.
 *
 * Prefer inline `import.meta.env.TAURI_ENV_PLATFORM` checks where override-ability
 * is not needed — Vite statically replaces `import.meta.env.*` at build time, allowing
 * esbuild to eliminate dead code branches (e.g., Tauri API imports in non-Tauri builds).
 * Calling this function defeats that dead code elimination.
 */
export const detectDeploymentType = (): DeploymentType => {
  const deploymentOverride = typedURLSearchParams().get("deployment");

  if (deploymentOverride !== null) {
    return deploymentOverride;
  }

  return (
    import.meta.env.TAURI_ENV_PLATFORM ? "tauri"
    : (
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as NonStandardIosNavigator).standalone
    ) ?
      "pwa"
    : "browser"
  );
};
