import { useEffect, useRef, useState } from "preact/hooks";

import {
  createDiffEditor,
  type DiffEditorControls,
  type EditorStatus,
} from "../createDiffEditor.tsx";
import { loadMonaco } from "../monacoLoader.ts";
import { server, sides } from "../payload.ts";
import { PatchDiff } from "./PatchDiff.tsx";

export type MonacoDiffProps = {
  path: string;
  setCounts: (counts: [number, number]) => void;
};

export const MonacoDiff = ({ path, setCounts }: MonacoDiffProps) => {
  const hostRef = useRef<HTMLDivElement>(null);
  const controls = useRef<DiffEditorControls | undefined>(undefined);
  const [fallback, setFallback] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [status, setStatus] = useState<EditorStatus>({ kind: "", text: "" });

  useEffect(() => {
    let live = true;
    loadMonaco().then((monaco) => {
      const host = hostRef.current;
      if (!live) {
        return;
      }
      if (monaco === undefined || sides[path] === undefined || host === null) {
        setFallback(true);
        return;
      }
      controls.current = createDiffEditor(monaco, host, path, { setCounts, setDirty, setStatus });
    });
    return () => {
      live = false;
      controls.current?.dispose();
      controls.current = undefined;
    };
  }, [path, setCounts]);

  if (fallback) {
    return <PatchDiff path={path} />;
  }

  return (
    <>
      <div class="diff-monaco" ref={hostRef} />
      <div class="editor-bar">
        <span class="hint">
          {server === undefined ?
            "read-only — serve this review to edit and leave notes"
          : "editable — hover a line and click + to add a note"}
        </span>
        <span class={status.kind}>{status.text}</span>
        {server !== undefined && (
          <button
            type="button"
            class="save revert"
            title="back to the content this review was built from"
            onClick={() => controls.current?.revert()}
          >
            Revert
          </button>
        )}
        {server !== undefined && (
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
