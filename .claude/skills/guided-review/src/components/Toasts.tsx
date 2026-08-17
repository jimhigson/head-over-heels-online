import { toastStore, useStore } from "../stores.ts";

export const Toasts = () => {
  const toasts = useStore(toastStore);
  return (
    <div class="toasts" aria-live="polite">
      {toasts.map((entry) => (
        <div
          class={`toast toast-${entry.kind} ${entry.leaving ? "leaving" : ""}`}
          role="status"
          key={entry.id}
        >
          {entry.text}
        </div>
      ))}
    </div>
  );
};
