import { useEffect, useReducer } from "preact/hooks";

import { timeAgo } from "../utils/timeAgo";

const tickIntervalMs = 5_000;
const toggle = (b: boolean) => !b;

export type TimeagoProps = {
  timestamp: number;
  class?: string;
};

export const Timeago = ({ timestamp, class: className }: TimeagoProps) => {
  const [, tick] = useReducer(toggle, false);

  useEffect(() => {
    const interval = setInterval(tick, tickIntervalMs);
    return () => clearInterval(interval);
  }, [tick]);

  return (
    <span class={`text-single-line${className ? ` ${className}` : ""}`}>
      {timeAgo(timestamp)}
    </span>
  );
};
