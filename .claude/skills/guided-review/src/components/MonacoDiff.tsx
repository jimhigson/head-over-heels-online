import { useEffect, useRef, useState } from "preact/hooks";

import {
  createDiffEditor,
  type DiffEditorControls,
  type EditorStatus,
} from "../createDiffEditor.tsx";
import { loadMonaco } from "../monacoLoader.ts";
import { activeReviewIsEditable, server, sides } from "../payload.ts";

export type MonacoDiffProps = {
  path: string;
  setCounts: (counts: [number, number]) => void;
};

export const MonacoDiff = ({ path, setCounts }: MonacoDiffProps) => {
  const hostRef = useRef<HTMLDivElement>(null);
  const controls = useRef<DiffEditorControls | undefined>(undefined);
  const [loadError, setLoadError] = useState<string | undefined>(undefined);
  const [dirty, setDirty] = useState(false);
  const [status, setStatus] = useState<EditorStatus>({ kind: "", text: "" });

  useEffect(() => {
    if (sides[path] === undefined) {
      return;
    }
    let live = true;
    loadMonaco()
      .then((monaco) => {
        const host = hostRef.current;
        if (!live || host === null) {
          return;
        }
        controls.current = createDiffEditor(monaco, host, path, { setCounts, setDirty, setStatus });
      })
      .catch((error: Error) => {
        // monaco is a dependency, not an enhancement - failing to get it is a
        // failure to show, not a mode to degrade into
        if (live) {
          setLoadError(error.message);
        }
      });
    return () => {
      live = false;
      controls.current?.dispose();
      controls.current = undefined;
    };
  }, [path, setCounts]);

  if (sides[path] === undefined) {
    return (
      <p class="diff-missing">
        not embedded — longer than <code>--max-side-lines</code> when this review was built; read
        the file in the tree itself
      </p>
    );
  }

  if (loadError !== undefined) {
    return <p class="diff-error">code diff unavailable: {loadError}</p>;
  }

  const editable = activeReviewIsEditable();

  return (
    <>
      <div class="diff-monaco" ref={hostRef} />
      <div class="editor-bar">
        <span class="hint">
          {server === undefined ?
            "read-only — serve this review to edit and leave notes"
          : editable ?
            "editable — hover a line and click + to add a note"
          : "read-only — the served checkout is on another review's branch; notes still work"}
        </span>
        <span class={status.kind}>{status.text}</span>
        {editable && (
          <button
            type="button"
            class="save revert"
            title="back to the content this review was built from"
            onClick={() => controls.current?.revert()}
          >
            Revert
          </button>
        )}
        {editable && (
          <button
            type="button"
            class="save"
            disabled={!dirty}
            onClick={() => controls.current?.save()}
          >
            Save
          </button>
        )}
      </div>
    </>
  );
};
