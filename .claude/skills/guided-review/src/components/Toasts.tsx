import { dismissToast, toastStore, useStore } from "../stores.ts";

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
          <p class="toast-text">{entry.text}</p>
          {entry.actions !== undefined && entry.actions.length > 0 && (
            <div class="toast-actions">
              {entry.actions.map((action) => (
                <button
                  type="button"
                  key={action.label}
                  onClick={() => {
                    action.onClick();
                    dismissToast(entry.id);
                  }}
                >
                  {action.label}
                </button>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
