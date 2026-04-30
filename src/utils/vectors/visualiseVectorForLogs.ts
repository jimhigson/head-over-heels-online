import type { Xy, Xyz } from "./vectors";

/** spread returned generator into the params of console.log to visualise a vector */
export function* visualiseVectorForLogs(vec: Xy | Xyz) {
  yield { ...vec };
  yield `${
    vec.x > 0 ? "↖️"
    : vec.x < 0 ? "↘️"
    : ""
  }${
    vec.y > 0 ? "↗️"
    : vec.y < 0 ? "↙️"
    : ""
  }${
    "z" in vec ?
      vec.z > 0 ? "⬆️"
      : vec.z < 0 ? "⬇️"
      : ""
    : ""
  }`;
}
