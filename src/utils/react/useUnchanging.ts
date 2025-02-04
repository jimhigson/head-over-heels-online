import { useRef } from "react";

export const useUnchanging = <T>(latest: T, errorText?: string) => {
  const { current: original } = useRef(latest);

  if (original !== latest)
    throw new Error(
      `Value should not change between renders: ${errorText ?? ""} ${original} => ${latest}`,
    );
};
