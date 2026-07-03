import { useEffect, useReducer } from "preact/hooks";
import { format } from "timeago.js";

const tickIntervalMs = 5000;
const toggle = (b: boolean) => !b;

export type TimeagoProps = {
  timestamp: number;
  className?: string;
};

export const Timeago = ({ timestamp, className }: TimeagoProps) => {
  const [, tick] = useReducer(toggle, false);

  useEffect(() => {
    const interval = setInterval(tick, tickIntervalMs);
    return () => clearInterval(interval);
  }, [tick]);

  return (
    <span className={`text-single-line${className ? ` ${className}` : ""}`}>
      {format(timestamp)}
    </span>
  );
};
