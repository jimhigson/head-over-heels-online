import { diffs } from "../payload.ts";

const diffLineClass = (line: string): string => {
  if (line.startsWith("@@")) {
    return "dl dl-hunk";
  }
  if (line.startsWith("+")) {
    return "dl dl-add";
  }
  if (line.startsWith("-")) {
    return "dl dl-rm";
  }
  if (line.startsWith("…")) {
    return "dl dl-meta";
  }
  return "dl";
};

export type PatchDiffProps = { path: string };

/** the patch, rendered as coloured lines - the fallback when monaco is absent */
export const PatchDiff = ({ path }: PatchDiffProps) => (
  <div class="diff-body">
    {/* the lines are the pre's only children: any literal whitespace around
        them would print as part of the patch */}
    <pre>
      {(diffs[path] ?? "").split("\n").map((line, index) => (
        <span class={diffLineClass(line)} key={index}>
          {line === "" ? " " : line}
        </span>
      ))}
    </pre>
  </div>
);
