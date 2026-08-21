import { entries } from "../../utils/entries";

export const keyframesToCss = (
  keyframeObj: Record<string, Record<string, Record<string, string>>>,
) =>
  entries(keyframeObj)
    .map(
      ([rule, stops]) =>
        `${rule} { ${entries(stops)
          .map(
            ([pct, props]) =>
              `${pct} { ${entries(props)
                .map(([k, v]) => `${k}: ${v}`)
                .join("; ")} }`,
          )
          .join(" ")} }`,
    )
    .join("\n");
