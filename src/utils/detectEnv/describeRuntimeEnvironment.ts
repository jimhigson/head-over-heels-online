import {
  type DeploymentType,
  detectDeploymentType,
} from "./detectDeploymentType";

/** human-readable label for the deployment, matching how players talk about it */
const deploymentLabels = {
  browser: "web",
  pwa: "pwa",
  tauri: "tauri (native)",
} as const satisfies Record<DeploymentType, string>;

/**
 * Patterns ordered so that browsers whose user-agent embeds another browser's
 * token (Edge and Opera both contain "Chrome") are matched before it.
 */
const browserPatterns = [
  { name: "Edge", pattern: /Edg\/(?<version>[\d.]+)/ },
  { name: "Opera", pattern: /OPR\/(?<version>[\d.]+)/ },
  { name: "Firefox", pattern: /Firefox\/(?<version>[\d.]+)/ },
  { name: "Chrome", pattern: /Chrome\/(?<version>[\d.]+)/ },
  { name: "Safari", pattern: /Version\/(?<version>[\d.]+).*Safari/ },
] as const;

const detectBrowser = (): string => {
  const { userAgent } = navigator;
  for (const { name, pattern } of browserPatterns) {
    const match = pattern.exec(userAgent);
    if (match !== null) {
      return `${name} ${match.groups?.version ?? ""}`.trim();
    }
  }
  return "unknown browser";
};

const osPatterns = [
  { name: "Windows", pattern: /Windows/ },
  // Android contains "Linux" too, so it must come first
  { name: "Android", pattern: /Android/ },
  { name: "iOS", pattern: /iPhone|iPad|iPod/ },
  { name: "macOS", pattern: /Mac OS X|Macintosh/ },
  { name: "Linux", pattern: /Linux/ },
] as const;

const detectOs = (): string => {
  const { userAgent } = navigator;
  for (const { name, pattern } of osPatterns) {
    if (pattern.test(userAgent)) {
      return name;
    }
  }
  return "unknown OS";
};

/**
 * A short multi-line description of where the game is running — deployment
 * (web/pwa/tauri), browser, and OS — for putting at the top of a bug report.
 * Written to never throw, since it runs while building an error report.
 */
export const describeRuntimeEnvironment = (): string => {
  if (typeof navigator === "undefined") {
    return "running as: server";
  }
  return [
    `running as: ${deploymentLabels[detectDeploymentType()]}`,
    `browser: ${detectBrowser()}`,
    `OS: ${detectOs()}`,
  ].join("\n");
};
