import Portal from "@mutabazia/react-portal";
import { twMerge } from "tailwind-merge";

export const SelectedItemHint = ({ className }: { className?: string }) => {
  return (
    <div className={twMerge("contents", className)}>
      <Portal.Placeholder />
    </div>
  );
};
