import type { Xyz } from "./vectors";

export const visualiseVectorForLogs = (dir: Xyz) => {
  return `${
    dir.x > 0 ? "↖️"
    : dir.x < 0 ? "↘️"
    : ""
  }${
    dir.y > 0 ? "↗️"
    : dir.y < 0 ? "↙️"
    : ""
  }${
    dir.z > 0 ? "⬆️"
    : dir.z < 0 ? "⬇️"
    : ""
  }`;
};
