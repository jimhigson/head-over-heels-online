import { useMemo } from "react";

import { type CustomLeaderComponent } from "../MenuItem";

export const customTextLeader =
  (text: string): CustomLeaderComponent =>
  ({ doubleHeight }) => {
    return (
      <span
        className={`text-center w-2 ${doubleHeight ? "text-double-height" : ""}`}
      >
        {text}
      </span>
    );
  };

export const useCustomTextLeader = (text: string): CustomLeaderComponent => {
  return useMemo(() => customTextLeader(text), [text]);
};
